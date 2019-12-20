import { getCcnContainer } from "./getCcnContainer";

import { filterData } from "../src/filterData";
import astify from "../src/astify";

const fetchCcn = id =>
  getCcnContainer(id)
    //.then(re => console.log("getContainer", re) || re)
    .then(filterData) // first pass to reduce the number of text calls
    .then(astify); // convert to AST format

export default fetchCcn;
