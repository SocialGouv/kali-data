import fs from "fs";
import pMap from "p-map";

import { getCCNContainer } from "./fetch-steps/get-ccn-container";
import { filterData } from "./fetch-steps/filter-data";
import { embedCCNTexts } from "./fetch-steps/embed-ccn-texts";

// fetch all conventions from index.json
import conventions from "../data/index.json";

// convert to syntax-tree format : flatten articles|sections in children
const astify = (node, depth = 0) => ({
  type: "section",
  intOrdre: node.intOrdre,
  title: node.title,
  id: node.id,
  etat: node.etat,
  ...(depth === 0 && {
    num: node.num,
    shortTitle: node.shortTitle
  }),
  children: [
    ...((node.sections && node.sections.map(node => astify(node, depth + 1))) ||
      []),
    ...((node.articles &&
      node.articles.map(article => ({
        type: "article",
        ...article
      }))) ||
      [])
  ]
});

const fetchCCN = id =>
  getCCNContainer(id)
    .then(filterData) // first pass to reduce the number of text calls
    .then(embedCCNTexts)
    .then(filterData) // second and final pass to trim and order additional texts
    .then(astify);

//for each convention, fetch convention conteneur, populate conteneur texts, and ouput to JSON file.
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

// fetchCCN("KALICONT000005635173")
//   .then(data => {
//     fs.writeFileSync("./data/test.json", JSON.stringify(data, null, 2));
//     console.log("wrote ./data/test.json");
//   })
//   .catch(console.error);
