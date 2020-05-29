import smartenArticleQuery from "../smartenArticleQuery";

describe("helpers/smartenArticleQuery()", () => {
  describe("should return the expected string", () => {
    it(`when including "article"`, () => {
      expect(smartenArticleQuery(`'article '1`)).toBe(`'» article 1$`);
      expect(smartenArticleQuery(`'article '1.2`)).toBe(`'» article 1.2$`);
      expect(smartenArticleQuery(`'article '1.2.3`)).toBe(`'» article 1.2.3$`);
    });

    it(`when including an index`, () => {
      expect(smartenArticleQuery(`'1`)).toBe(`'» article 1$`);
      expect(smartenArticleQuery(`'1.2`)).toBe(`'» article 1.2$`);
      expect(smartenArticleQuery(`'1.2.3`)).toBe(`'» article 1.2.3$`);
    });

    it(`when including a date and an index`, () => {
      expect(smartenArticleQuery(`'1984 '1`)).toBe(`'1984 '» article 1$`);
      expect(smartenArticleQuery(`'1984 '1.2`)).toBe(`'1984 '» article 1.2$`);
      expect(smartenArticleQuery(`'1984 '1.2.3`)).toBe(`'1984 '» article 1.2.3$`);
    });

    it(`when including an index and a date`, () => {
      expect(smartenArticleQuery(`'1 '1984`)).toBe(`'» article 1$ '1984`);
      expect(smartenArticleQuery(`'1.2 '1984`)).toBe(`'» article 1.2$ '1984`);
      expect(smartenArticleQuery(`'1.2.3 '1984`)).toBe(`'» article 1.2.3$ '1984`);
    });

    it(`when including a date`, () => {
      expect(smartenArticleQuery(`'1984`)).toBe(`'1984`);
    });
  });
});
