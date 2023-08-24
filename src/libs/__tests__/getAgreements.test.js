import getAgreements from "../getAgreements";

describe(`libs/getAgreements()`, () => {
    it(`should return more than one agreement`, () => {
        expect(getAgreements().length).toBeGreaterThan(1);
    });
});
