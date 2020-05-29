import getAgreementByIdOrIdcc from "../getAgreementByIdOrIdcc";

describe("libs/getAgreementByIdOrIdcc()", () => {
  describe("should return the expected agreement unist tree", () => {
    it(`with <agreementIdOrIdcc>="KALICONT000038661444"`, () => {
      const received = getAgreementByIdOrIdcc("KALICONT000038661444", "5.14");

      expect(received.data.id).toBe("KALICONT000038661444");
      expect(received.data.num).toBe(3230);
    });
  });
});
