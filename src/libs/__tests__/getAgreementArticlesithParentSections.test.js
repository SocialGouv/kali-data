import getAgreementArticlesithParentSections from "../getAgreementArticlesithParentSections";

describe(`helpers/getAgreementArticlesithParentSections()`, () => {
  describe(`should match snapshot`, () => {
    it(`with an existing agreement ID`, () => {
      const received = getAgreementArticlesithParentSections("KALICONT000005635444");

      expect(received[0].sections.length).toBeGreaterThan(1);
    });

    it(`with an existing agreement IDCC (string)`, () => {
      const received = getAgreementArticlesithParentSections("1480");

      expect(received[0].sections.length).toBeGreaterThan(1);
    });

    it(`with an existing agreement IDCC (number)`, () => {
      const received = getAgreementArticlesithParentSections(1480);

      expect(received[0].sections.length).toBeGreaterThan(1);
    });
  });
});
