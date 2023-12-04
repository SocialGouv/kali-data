import getArticleWithPath from "../getArticleWithPath";

describe(`libs/getArticleWithPath()`, () => {
    describe(`should match properties`, () => {
        it(`with an existing main article ID`, () => {
            const received = getArticleWithPath("KALIARTI000043941797");

            expect(received.data.cid).toBe("KALIARTI000043941797");
            expect(received.data.id).toBe("KALIARTI000043941797");
            expect(received.path.length).toBeGreaterThan(1);
        });

        it(`with an existing main article CID`, () => {
            const received = getArticleWithPath("KALIARTI000005849315");

            expect(received.data.cid).toBe("KALIARTI000005849315");
            expect(received.data.id).toBe("KALIARTI000005849317");
            expect(received.path.length).toBeGreaterThan(1);
        });

        it(`with an existing additional article ID`, () => {
            const received = getArticleWithPath("KALIARTI000041787475");

            expect(received.data.cid).toBe("KALIARTI000041787475");
            expect(received.data.id).toBe("KALIARTI000041787475");
            expect(received.path.length).toBeGreaterThan(1);
        });
    });
});
