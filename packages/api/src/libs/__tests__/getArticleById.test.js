import getArticleById from "../getArticleById";

describe("libs/getArticleById()", () => {
  describe("should return the expected article unist node", () => {
    it(`with <articleId>="KALIARTI000020976019"`, () => {
      const received = getArticleById("KALIARTI000020976019");

      expect(received.data.cid).toBe("KALIARTI000005782386");
      expect(received.data.id).toBe("KALIARTI000020976019");
    });
  });
});
