import getAgreementArticlesWithPath from "../getAgreementArticlesWithPath";

describe(`libs/getAgreementArticlesWithPath()`, () => {
    describe(`should match snapshot`, () => {
        it(`with an existing agreement ID`, () => {
            const received = getAgreementArticlesWithPath("KALICONT000005635221");

            expect(received[0].path.length).toBeGreaterThan(1);
        });

        it(`with an existing agreement IDCC (string)`, () => {
            const received = getAgreementArticlesWithPath("1480");

            expect(received[0].path.length).toBeGreaterThan(1);
        });

        it(`with an existing agreement IDCC (number)`, () => {
            const received = getAgreementArticlesWithPath(1480);

            expect(received[0].path.length).toBeGreaterThan(1);
        });
    });
});
