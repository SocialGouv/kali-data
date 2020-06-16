import checkArticleId from "../checkArticleId";

describe(`helpers/checkArticleId()`, () => {
  describe(`should not throw`, () => {
    it(`with a valid article ID`, () => {
      expect(() => checkArticleId("KALIARTI123456789012")).not.toThrow();
    });
  });

  describe(`should throw`, () => {
    it(`with a malformed article ID`, () => {
      expect(() => checkArticleId("MALFORMEDID")).toThrow();
    });
  });
});
