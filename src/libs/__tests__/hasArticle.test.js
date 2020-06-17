import hasArticle from "../hasArticle";

describe(`helpers/hasArticle()`, () => {
  describe(`should return true`, () => {
    it(`with an existing article ID`, () => {
      expect(hasArticle("KALIARTI000023306963")).toBe(true);
    });

    it(`with an existing article CID`, () => {
      expect(hasArticle("KALIARTI000005768420")).toBe(true);
    });
  });

  describe(`should return false`, () => {
    it(`with a nonexistant agreement ID`, () => {
      expect(hasArticle("KALIARTI123456789012")).toBe(false);
    });

    it(`with a malformed input`, () => {
      expect(hasArticle("MALFORMEDID")).toBe(false);
    });
  });
});
