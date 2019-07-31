import fs from "fs";
import pMap from "p-map";

import { getCCNContainer } from "./fetch-steps/get-ccn-container";
import { filterData } from "./fetch-steps/filter-data";
import { embedCCNTexts } from "./fetch-steps/embed-ccn-texts";

const fetchCCN = id =>
  getCCNContainer(id)
    .then(filterData) // first pass to reduce the number of text calls
    .then(embedCCNTexts)
    .then(filterData); // second and final pass to trim and order additional texts

// fetch all conventions from this fixed list
const conventions = require("../data/index.json");

// for each convention, fetch convention conteneur, populate conteneur texts, and ouput to JSON file.
pMap(
  conventions,
  convention => {
    const filePath = `./data/${convention.id}.json`;
    console.log(`fetch ${convention.id}`);
    return fetchCCN(convention.id)
      .then(data => {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`wrote ${filePath}`);
      })
      .catch(console.error);
  },
  { concurrency: 2 }
)
  .then(() => console.log("done !"))
  .catch(console.log);

// IDCC 1747 - Convention collective nationale des activités industrielles de boulangerie et pâtisserie du 13 juillet 1993.
/*
fetchCCN("KALICONT000005635173")
  .then(data => {
    fs.writeFileSync("./data/test.json", JSON.stringify(data, null, 2));
    console.log("wrote ./data/test.json");
  })
  .catch(console.error);
*/
