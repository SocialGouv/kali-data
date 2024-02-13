import getAgreements from "../getAgreements";

describe(`libs/getAgreements()`, () => {
    it(`should return more than one agreement`, async () => {
        expect((await getAgreements()).length).toBeGreaterThan(1);
    });
});
