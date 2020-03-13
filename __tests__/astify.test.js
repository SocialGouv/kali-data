import astify, {
  isValidSection,
  latestArticleVersionFilter
} from "../src/astify";
import sampleConvention from "./kaliCont-sample.json";

test("should convert structure to AST tree", () => {
  expect(astify(sampleConvention)).toMatchSnapshot();
});

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

describe("latestArticleVersionFilter", () => {
  test("latestArticleVersionFilter should return false if its an old version of the article", () => {
    expect(
      latestArticleVersionFilter(
        {
          id: "KALIARTI000001",
          cid: 1
        },
        0,
        sampleArticles
      )
    ).toMatchSnapshot();
  });

  test("latestArticleVersionFilter should return true if its the newer version of the article", () => {
    expect(
      latestArticleVersionFilter(
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
  test("should include section without etaet", () => {
    expect(isValidSection({})).toEqual(true);
  });
});
