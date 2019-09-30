import fs from "fs";
import path from "path";
import pMap from "p-map";

import { getCCNContainer } from "./fetch-steps/get-ccn-container";
import { embedCCNTexts } from "./fetch-steps/embed-ccn-texts";

import { filterData } from "../src/filterData";
import astify from "../src/astify";

// fetch all conventions from index.json
import conventions from "../data/index.json";

const fetchCCN = id =>
  getCCNContainer(id)
    .then(filterData) // first pass to reduce the number of text calls
    .then(embedCCNTexts) // add textes attaches & salaires
    .then(filterData) // second and final pass to trim and order additional texts
    .then(astify); // convert to AST format

const strfy = data => JSON.stringify(data, null, 2);

//for each convention, fetch convention conteneur, populate conteneur texts, and ouput to JSON file.
pMap(
  conventions,
  convention => {
    const filePath = path.join(__dirname, `../data/${convention.id}.json`);
    console.log(`fetch ${convention.id}`);
    return fetchCCN(convention.id)
      .then(data => {
        const exists = fs.existsSync(filePath);
        const changed = strfy(exists && require(filePath)) !== strfy(data); // poor-man compare
        if (changed) {
          fs.writeFileSync(filePath, strfy(data));
          console.log(`wrote ${filePath}`);
        }
      })
      .catch(console.error);
  },
  { concurrency: 3 }
)
  .then(() => console.log("done !"))
  .catch(e => {
    console.log(e);
    throw e;
  });

// IDCC 1747 - Convention collective nationale des activités industrielles de boulangerie et pâtisserie du 13 juillet 1993.

// fetchCCN("KALICONT000005635173")
//   .then(data => {
//     fs.writeFileSync("./data/test.json", JSON.stringify(data, null, 2));
//     console.log("wrote ./data/test.json");
//   })
//   .catch(console.error);
