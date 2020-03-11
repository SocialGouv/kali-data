import fs from "fs";
import path from "path";
import Queue from "p-queue";
import pPipe from "p-pipe";
import retry from "p-retry";
import map from "unist-util-map";
import remove from "unist-util-remove";
import { promisify } from "util";

import conventions from "../data/index.json";
import astify from "../src/astify";

import { getKaliCont, getKaliText } from "../src/api";

const writeFile = promisify(fs.writeFile);

const queue = new Queue({ concurrency: 10, intervalCap: 20, interval: 1000 });

const t0 = Date.now();

function fetchKaliCont(id) {
  return queue.add(() => {
    console.log(`fetch ${id}`);
    return retry(() => getKaliCont(id), { retries: 3 });
  });
}

async function fetchAdditionalText(container) {
  if (!container.sections) {
    throw new Error(`container ${container.id} is empty`);
  }
  const [
    textedeBase,
    ...additionnalSections
  ] = container.sections.filter(({ etat }) => etat.startsWith("VIGUEUR"));

  const pAdditionnalSections = additionnalSections.map(async mainSection => {
    const pSections = mainSection.sections.map(text =>
      queue.add(() => {
        console.log(`› fetch text ${text.id}`);
        return retry(() => getKaliText(text.id), { retries: 10 });
      })
    );
    mainSection.sections = await Promise.all(pSections);
    mainSection.sections.forEach(section => {
      section.etat = section.jurisState;
    });
    return mainSection;
  });
  const sectionsWithText = await Promise.all(pAdditionnalSections);
  container.sections = [textedeBase, ...sectionsWithText];
  return container;
}

function cleanAst(tree) {
  remove(
    tree,
    ({ data: { etat } }) =>
      etat !== "ABROGE" && etat !== "PERIME" && etat !== "REMPLACE"
  );
  const sortByOrdre = sortBy("intOrdre");
  const keys = [
    "cid",
    "num",
    "intOrdre",
    "title",
    "id",
    "content",
    "etat",
    "shortTitle",
    "categorisation",
    "dateParution",
    "surtitre",
    "historique",
    "modifDate",
    "lstLienModification"
  ];
  return map(tree, ({ type, data: rawData, children }) => {
    const data = keys.reduce((data, key) => {
      if (rawData[key] !== null || rawData[key]) {
        data[key] = rawData[key];
      }
      return data;
    }, {});
    if (children && children.length) {
      children.sort(sortByOrdre);
    }
    return { type, data, children };
  });
}

async function saveFile(container) {
  await writeFile(
    path.join(__dirname, `../data/${container.data.id}.json`),
    JSON.stringify(container, 0, 2)
  );
  console.log(`› write ${container.data.id}.json`);
}

function toFix(value, nb = 2) {
  const digit = Math.pow(10, nb);
  return Math.round(value * digit) / digit;
}

function sortBy(key) {
  return function(a, b) {
    return a.data[key] - b.data[key];
  };
}

async function main() {
  const pipeline = pPipe(
    fetchKaliCont,
    fetchAdditionalText,
    astify,
    cleanAst,
    saveFile
  );

  const ccnList = conventions.filter(convention => !!convention.url);
  const pResults = ccnList.map(({ id }) => pipeline(id));

  await Promise.all(pResults);
  console.log(`››› Done in ${toFix((Date.now() - t0) / 1000)} s`);
}

main().catch(error => {
  console.error(error);
  console.log(`››› Failed in ${toFix((Date.now() - t0) / 1000)} s`);
  process.exit(-1);
});
