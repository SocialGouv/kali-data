import getArticles from "../getArticles";

describe(`libs/getArticles()`, () => {
    it(`should return more than one article`, () => {
        expect(getArticles().length).toBeGreaterThan(1);
    });
});
