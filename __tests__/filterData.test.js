const {
  isValidArticleFilter,
  isValidSection,
  filterData
} = require("../src/filterData");

const sampleConvention = require("./kaliCont-sample.json");

const sampleArticles = [
  {
    id: "KALIARTI000001",
    cid: 1
  },
  {
    id: "KALIARTI000003",
    cid: 1
  },
  {
    id: "KALIARTI000002",
    cid: 1
  }
];

describe("isValidArticleFilterFilter", () => {
  test("isValidArticleFilterFilter should return false if its an old version of the article", () => {
    expect(
      isValidArticleFilter(
        {
          id: "KALIARTI000001",
          cid: 1
        },
        0,
        sampleArticles
      )
    ).toMatchSnapshot();
  });

  test("isValidArticleFilterFilter should return true if its the newer version of the article", () => {
    expect(
      isValidArticleFilter(
        {
          id: "KALIARTI000003",
          cid: 1
        },
        0,
        sampleArticles
      )
    ).toMatchSnapshot();
  });
});

describe("isValidSection", () => {
  test("should exclude section ABROGE", () => {
    expect(isValidSection({ etat: "ABROGE" })).toEqual(false);
  });
  test("should exclude section PERIME", () => {
    expect(isValidSection({ etat: "PERIME" })).toEqual(false);
  });
  test("should include section VIGUEUR", () => {
    expect(isValidSection({ etat: "VIGUEUR" })).toEqual(true);
  });
  test("should include section VIGUEUR_ETEN", () => {
    expect(isValidSection({ etat: "VIGUEUR_ETEN" })).toEqual(true);
  });
  test("should include section VIGUEUR_NON_ETEN", () => {
    expect(isValidSection({ etat: "VIGUEUR_NON_ETEN" })).toEqual(true);
  });
});

describe("filterData", () => {
  test("should sort and filter sample convention", () => {
    expect(filterData(sampleConvention)).toMatchSnapshot();
  });
});
