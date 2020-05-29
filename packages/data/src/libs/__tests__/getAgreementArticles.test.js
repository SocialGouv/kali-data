import getAgreementArticles from "../getAgreementArticles";

describe(`helpers/getAgreementArticles()`, () => {
  describe(`should match snapshot`, () => {
    it(`with an existing agreement ID`, () => {
      const received = getAgreementArticles("KALICONT000005635444");

      expect(received[0].sections.length).toBeGreaterThan(1);
    });

    it(`with an existing agreement IDCC (string)`, () => {
      const received = getAgreementArticles("1480");

      expect(received[0].sections.length).toBeGreaterThan(1);
    });

    it(`with an existing agreement IDCC (number)`, () => {
      const received = getAgreementArticles(1480);

      expect(received[0].sections.length).toBeGreaterThan(1);
    });
  });
});
