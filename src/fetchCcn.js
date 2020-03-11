import { embedCcnTexts } from "./embedCcnTexts";
import { getCcnContainer } from "./getCcnContainer";

import astify from "../src/astify";
import { filterData } from "../src/filterData";

const fetchCcn = id =>
  getCcnContainer(id)
    //.then(re => console.log("getContainer", re) || re)
    .then(filterData) // first pass to reduce the number of text calls
    .then(embedCcnTexts) // add textes attaches & salaires
    .then(filterData) // second and final pass to trim and order additional texts
    .then(astify); // convert to AST format

export default fetchCcn;
