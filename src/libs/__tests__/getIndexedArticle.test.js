import getIndexedArticle from "../getIndexedArticle";

describe(`libs/getIndexedArticle()`, () => {
    describe(`should match properties`, () => {
        it(`with an existing article ID`, () => {
            expect(getIndexedArticle("KALIARTI000023306963")).toMatchObject({
                agreementId: "KALICONT000005635085",
                articleCid: "KALIARTI000005768420",
                articleId: "KALIARTI000023306963",
            });
        });

        it(`with an existing article CID`, () => {
            expect(getIndexedArticle("KALIARTI000005768420")).toMatchObject({
                agreementId: "KALICONT000005635085",
                articleCid: "KALIARTI000005768420",
                articleId: "KALIARTI000023306963",
            });
        });
    });

    describe(`should throw`, () => {
        it(`with a nonexistent article ID or CID`, () => {
            expect(() => getIndexedArticle("KALIARTI123456789012")).toThrow();
        });
    });
});
