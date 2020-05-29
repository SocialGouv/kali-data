import cleanQuery from "../cleanQuery";

describe("helpers/cleanQuery()", () => {
  it(`should return the expected string`, () => {
    expect(cleanQuery(`  Une  requête  ?  `)).toBe(`'une 'requête`);
  });
});
