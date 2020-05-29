import getEnrichedAgreementsArticles from "../getEnrichedAgreementsArticles";

describe("libs/getEnrichedAgreementsArticles()", () => {
  describe("should return the expected first article path", () => {
    it(`with <agreementIdOrIdcc>="KALICONT000005635085"`, () => {
      const received = getEnrichedAgreementsArticles("KALICONT000005635085");

      expect(received[0].path).toMatch(/Préambule$/);
    });

    it(`with <agreementIdOrIdcc>="KALICONT000005635091"`, () => {
      const received = getEnrichedAgreementsArticles("KALICONT000005635091");

      expect(received[0].path).toMatch(/Champ d'application » Article 1.1$/);
    });
  });
});
