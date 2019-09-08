import fs from "fs";
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

//for each convention, fetch convention conteneur, populate conteneur texts, and ouput to JSON file.
pMap(
  conventions,
  convention => {
    const filePath = `./data/${convention.id}.json`;
    //if (!fs.existsSync(filePath)) {
    console.log(`fetch ${convention.id}`);
    return fetchCCN(convention.id)
      .then(data => {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`wrote ${filePath}`);
      })
      .catch(console.error);
    //}
  },
  { concurrency: 2 }
)
  .then(() => console.log("done !"))
  .catch(console.log);

// IDCC 1747 - Convention collective nationale des activités industrielles de boulangerie et pâtisserie du 13 juillet 1993.

// fetchCCN("KALICONT000005635173")
//   .then(data => {
//     fs.writeFileSync("./data/test.json", JSON.stringify(data, null, 2));
//     console.log("wrote ./data/test.json");
//   })
//   .catch(console.error);
