import getAgreement from "../getAgreement";

describe(`helpers/getAgreement()`, () => {
  describe(`should match snapshot`, () => {
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
});
