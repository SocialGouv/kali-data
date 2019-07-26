const conventions = require("../data/index.json");

console.log(`id | idcc | title | date_publi`);
console.log(`----|----|----|----`);

conventions.forEach(convention => {
  console.log(
    `${convention.id} | ${convention.num} | ${convention.titre} | ${convention.date_publi}`
  );
});
