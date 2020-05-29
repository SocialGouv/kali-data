import { getAgreement, getAgreements } from "@socialgouv/kali-data";
import log from "npmlog";
import findAllAfter from "unist-util-find-all-after";

log.enableColor();
const INDEXED_AGREEMENTS = getAgreements();

const ccnWithUrl = INDEXED_AGREEMENTS.filter(convention => !!convention.url);

for (const { id } of ccnWithUrl) {
  const tree = getAgreement(id);
  const nodes = findAllAfter(
    tree,
    1,
    node => node.type === "section" && node.children && node.children.length === 0,
  );

  if (nodes.length > 0) {
    log.error("check()", `${id} has ${nodes.length} empty nodes`);

    process.exit(-1);
  }
}
