import findAgreements from "../findAgreements";

describe("libs/findAgreements()", () => {
  describe("should return the expected first indexed agreement", () => {
    it(`with no <query>`, () => {
      const received = findAgreements();

      expect(received).toHaveLength(385);
      expect(received[0].id).toBe("KALICONT000038661444");
      expect(received[0].num).toBe(3230);
    });

    it(`with <query>="journalistes"`, () => {
      const received = findAgreements(`journalistes`);

      expect(received[0].id).toBe("KALICONT000005635444");
      expect(received[0].num).toBe(1480);
    });
  });
});
