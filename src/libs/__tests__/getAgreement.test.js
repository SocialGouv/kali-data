import getAgreement from "../getAgreement";

describe(`libs/getAgreement()`, () => {
  describe(`should match properties`, () => {
    it(`with an existing agreement ID`, () => {
      const received = getAgreement("KALICONT000005635444");

      expect(received.data.id).toBe("KALICONT000005635444");
      expect(received.data.num).toBe(1480);
    });

    it(`with an existing agreement IDCC (string)`, () => {
      const received = getAgreement("1480");

      expect(received.data.id).toBe("KALICONT000005635444");
      expect(received.data.num).toBe(1480);
    });

    it(`with an existing agreement IDCC (number)`, () => {
      const received = getAgreement(1480);

      expect(received.data.id).toBe("KALICONT000005635444");
      expect(received.data.num).toBe(1480);
    });
  });
  describe(`should throw`, () => {
    it(`with a nonexistent agreement ID`, () => {
      expect(() => getAgreement("KALICONT123456789012")).toThrow();
    });

    it(`with a nonexistent agreement IDCC (string)`, () => {
      expect(() => getAgreement("1234")).toThrow();
    });

    it(`with a nonexistent agreement IDCC (number)`, () => {
      expect(() => getAgreement(1234)).toThrow();
    });
  });
});
