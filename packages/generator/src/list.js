// @ts-check

/**
 * Update agreements list markdown file.
 */

import { getAgreements } from "@socialgouv/kali-data";
import fs from "fs";
import log from "npmlog";
import path from "path";

log.enableColor();

const clean = str => ("" + (str || "")).replace(/&#13;/g, "").replace(/\n/g, " ").trim();
const cleanDate = dte => (dte && dte.split("T")[0].split("-").reverse().join("/")) || "-";

const sourceLines = [`# Agreement References`, ``, `ID | IDCC | Title | Published At`, `-|-|-|-`];
getAgreements().forEach(convention => {
  sourceLines.push(
    `${clean(convention.id)} | ${clean(convention.num)} | ${clean(
      convention.shortTitle,
    )} | ${cleanDate(convention.date_publi)}`,
  );
});

log.info("list()", `Updating REFERENCES.md…`);

const filePath = path.join(__dirname, "../../../REFERENCES.md");
const source = sourceLines.join("\n");
fs.writeFileSync(filePath, source);

log.info("list()", `Done.`);
