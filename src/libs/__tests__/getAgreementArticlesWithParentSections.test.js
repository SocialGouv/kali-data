import getAgreementArticlesWithParentSections from "../getAgreementArticlesWithParentSections";

describe(`libs/getAgreementArticlesWithParentSections()`, () => {
  describe(`should match snapshot`, () => {
    it(`with an existing agreement ID`, () => {
      const received = getAgreementArticlesWithParentSections("KALICONT000005635221");

      expect(received[0].sections.length).toBeGreaterThan(1);
    });

    it(`with an existing agreement IDCC (string)`, () => {
      const received = getAgreementArticlesWithParentSections("1480");

      expect(received[0].sections.length).toBeGreaterThan(1);
    });

    it(`with an existing agreement IDCC (number)`, () => {
      const received = getAgreementArticlesWithParentSections(1480);

      expect(received[0].sections.length).toBeGreaterThan(1);
    });
  });
});
