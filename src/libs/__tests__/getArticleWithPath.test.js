import getArticleWithPath from "../getArticleWithPath";

describe(`libs/getArticleWithPath()`, () => {
  describe(`should match properties`, () => {
    it(`with an existing main article ID`, () => {
      const received = getArticleWithPath("KALIARTI000005781818");

      expect(received.data.cid).toBe("KALIARTI000005781818");
      expect(received.data.id).toBe("KALIARTI000005781818");
      expect(received.path.length).toBeGreaterThan(1);
    });

    it(`with an existing main article CID`, () => {
      const received = getArticleWithPath("KALIARTI000005781804");

      expect(received.data.cid).toBe("KALIARTI000005781804");
      expect(received.data.id).toBe("KALIARTI000045466361");
      expect(received.path.length).toBeGreaterThan(1);
    });

    it(`with an existing additional article ID`, () => {
      const received = getArticleWithPath("KALIARTI000041787475");

      expect(received.data.cid).toBe("KALIARTI000041787475");
      expect(received.data.id).toBe("KALIARTI000041787475");
      expect(received.path.length).toBeGreaterThan(1);
    });
  });
});
