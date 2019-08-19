const conventions = require("../data/index.json");

// produce a markdown table from existing data/index.json

console.log(`id | idcc | title | date_publi`);
console.log(`---|------|-------|-----------`);

const clean = str =>
  ("" + (str || ""))
    .replace(/&#13;/g, "")
    .replace(/\n/g, " ")
    .trim();

const cleanDate = dte =>
  dte
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");

conventions.forEach(convention => {
  console.log(
    `${clean(convention.id)} | ${clean(convention.num)} | ${clean(
      convention.titre
    )} | ${cleanDate(convention.date_publi)}`
  );
});
