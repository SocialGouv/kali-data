import getArticles from "../getArticles";

describe(`helpers/getArticles()`, () => {
  it(`should return more than one article`, () => {
    expect(getArticles().length).toBeGreaterThan(1);
  });
});
