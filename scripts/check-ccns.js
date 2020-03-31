import findAllAfter from "unist-util-find-all-after";
import ccn from "../data/index.json";

const ccnWithUrl = ccn.filter((convention) => !!convention.url);

for (const { id } of ccnWithUrl) {
  const tree = require(`../data/${id}.json`);
  const nodes = findAllAfter(
    tree,
    1,
    (node) =>
      node.type === "section" && node.children && node.children.length === 0
  );
  if (nodes.length > 0) {
    console.log(`${id} has ${nodes.length} empty nodes`);
    process.exit(-1);
  }
}
