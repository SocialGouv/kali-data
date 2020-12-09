import fs from "fs";
import log from "npmlog";
import pPipe from "p-pipe";
import Queue from "p-queue";
import retry from "p-retry";
import path from "path";
import map from "unist-util-map";
import filter from "unist-util-filter";
import { promisify } from "util";

import { getAgreements } from "../src";
import sortByIntOrdre from "./helpers/sortByIntOrdre";
import { getKaliCont, getKaliText } from "./libs/api";
import astify, { isValidSection } from "./libs/astify";

log.enableColor();
const writeFile = promisify(fs.writeFile);

const INDEXED_AGREEMENTS = getAgreements();

const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;

if (OAUTH_CLIENT_ID === undefined || OAUTH_CLIENT_SECRET === undefined) {
  log.error(
    "fetch()",
    `Missing environment variables. Please run "yarn setup" to reset your .env file.`,
  );

  process.exit(-1);
}

const queue = new Queue({ concurrency: 10, interval: 1000, intervalCap: 20 });
const t0 = Date.now();

function fetchKaliCont(id) {
  return queue.add(() => {
    log.verbose("fetch()", `Fetching ${id}`);

    return retry(() => getKaliCont(id), { retries: 10 });
  });
}

async function fetchAdditionalText(container) {
  if (!container.sections) {
    throw new Error(`container ${container.id} is empty`);
  }
  const nbBaseText = container.texteBaseId.length;
  const textedeBase = container.sections.slice(0, nbBaseText).filter(isValidSection);
  const additionnalSections = container.sections.slice(nbBaseText).filter(isValidSection);

  const pAdditionnalSections = additionnalSections.map(async mainSection => {
    const pSections = mainSection.sections.filter(isValidSection).map(text =>
      queue.add(() => {
        return retry(() => getKaliText(text.id), { retries: 30 });
      }),
    );
    const sections = await Promise.all(pSections);
    // prevent dila api to return corrupted text ex: KALITEXT000042085809
    mainSection.sections = sections.filter(({ id }) => Boolean(id));
    mainSection.sections.forEach(section => {
      section.etat = section.jurisState;
    });

    return mainSection;
  });

  // Ensure Additionnal Text Section is not empty
  const sectionsWithText = (await Promise.all(pAdditionnalSections)).filter(
    ({ sections }) => sections.length > 0,
  );
  container.sections = [...textedeBase, ...sectionsWithText];

  return container;
}

function cleanAst(tree) {
  const cleanedTree = filter(tree, node => {
    return (
      node.type !== "section" ||
      (["article", "section"].includes(node.type) && (node.data.etat || "").startsWith("VIGUEUR"))
    );
  });

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
    "lstLienModification",
  ];

  return map(cleanedTree, ({ type, data: rawData, children }) => {
    const data = keys.reduce((data, key) => {
      if (rawData[key] !== null || rawData[key]) {
        data[key] = rawData[key];
      }

      return data;
    }, {});
    if (children && children.length) {
      children.sort(sortByIntOrdre);
    }

    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    return { type, data, children };
  });
}

async function saveFile(container) {
  await writeFile(
    path.join(__dirname, "..", "data", `${container.data.id}.json`),
    JSON.stringify(container, 0, 2),
  );
  log.verbose("fetch()", `Updating ${container.data.id}.json`);
}

function toFix(value, nb = 2) {
  const digit = Math.pow(10, nb);

  return Math.round(value * digit) / digit;
}

async function main() {
  const pipeline = pPipe(fetchKaliCont, fetchAdditionalText, astify, cleanAst, saveFile);

  const ccnList = INDEXED_AGREEMENTS.filter(convention => !!convention.url);

  const pResults = ccnList.map(({ id }) => {
    return pipeline(id).catch(error => {
      log.error("main()", `pipeline failed for ${id}`);
      throw error;
    });
  });
  await Promise.all(pResults);
  log.info("fetch()", `Done in ${toFix((Date.now() - t0) / 1000)} s`);
}

main().catch(error => {
  log.error("fetch()", `Failed in ${toFix((Date.now() - t0) / 1000)} s`);
  console.error(error);

  process.exit(-1);
});
