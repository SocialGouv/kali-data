import getArticleWithParentSections from "../getArticleWithParentSections";

describe(`helpers/getArticleWithParentSections()`, () => {
  describe(`should match snapshot`, () => {
    it(`with an existing main article ID`, () => {
      const received = getArticleWithParentSections("KALIARTI000019508230");

      expect(received.data.cid).toBe("KALIARTI000005781804");
      expect(received.data.id).toBe("KALIARTI000019508230");
      expect(received.sections.length).toBeGreaterThan(1);
    });

    it(`with an existing additional article ID`, () => {
      const received = getArticleWithParentSections("KALIARTI000041787475");

      expect(received.data.cid).toBe("KALIARTI000041787475");
      expect(received.data.id).toBe("KALIARTI000041787475");
      expect(received.sections.length).toBeGreaterThan(1);
    });
  });
});
