import hasAgreement from "../hasAgreement";

describe(`libs/hasAgreement()`, () => {
  describe(`should return true`, () => {
    it(`with an existing agreement ID`, () => {
      expect(hasAgreement("KALICONT000005635444")).toBe(true);
    });

    it(`with an existing agreement IDCC (string)`, () => {
      expect(hasAgreement("1480")).toBe(true);
    });

    it(`with an existing agreement IDCC (number)`, () => {
      expect(hasAgreement(1480)).toBe(true);
    });
  });

  describe(`should return false`, () => {
    it(`with a nonexistant agreement ID`, () => {
      expect(hasAgreement("KALICONT000001234567")).toBe(false);
    });

    it(`with a nonexistant agreement IDCC (string)`, () => {
      expect(hasAgreement("1234")).toBe(false);
    });

    it(`with a nonexistant agreement IDCC (number)`, () => {
      expect(hasAgreement(1234)).toBe(false);
    });

    it(`with a malformed input`, () => {
      expect(hasAgreement("MALFORMEDID")).toBe(false);
    });
  });
});
