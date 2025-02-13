import getAgreementIdFromIdOrIdcc from "../getAgreementIdFromIdOrIdcc";

describe(`libs/getAgreementIdFromIdOrIdcc()`, () => {
    describe(`should return the expected ID`, () => {
        it(`with an existing agreement ID`, () => {
            expect(getAgreementIdFromIdOrIdcc("KALICONT000005635444")).toBe("KALICONT000005635444");
        });

        it(`with an existing agreement IDCC (string)`, () => {
            expect(getAgreementIdFromIdOrIdcc("3239")).toBe("KALICONT000044594539");
        });

        it(`with an existing agreement IDCC (number)`, () => {
            expect(getAgreementIdFromIdOrIdcc(3239)).toBe("KALICONT000044594539");
        });
    });

    describe(`should throw`, () => {
        it(`with a malformed input`, () => {
            expect(() => getAgreementIdFromIdOrIdcc("MALFORMEDID")).toThrow();
        });

        it(`with a nonexistant agreement IDCC`, () => {
            expect(() => getAgreementIdFromIdOrIdcc("1234")).toThrow();
        });
    });
});
