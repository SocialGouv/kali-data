import pPipe from "p-pipe";
import Queue from "p-queue";
import retry from "p-retry";

import astify, { cleanAst, isValidSection, latestVersionFilter } from "../astify";
import sampleConvention from "./fixtures/sample.json";

test("should convert structure to AST tree", () => {
  expect(astify(sampleConvention)).toMatchSnapshot();
});

test("should clean an AST tree", () => {
  const ast = astify(sampleConvention);
  expect(cleanAst(ast)).toMatchSnapshot();
});

const sampleArticles = [
  {
    cid: 1,
    id: "KALIARTI000001",
  },
  {
    cid: 1,
    id: "KALIARTI000003",
  },
  {
    cid: 1,
    id: "KALIARTI000002",
  },
];

describe("latestVersionFilter", () => {
  test("latestVersionFilter should return false if its an old version of the article", () => {
    expect(
      latestVersionFilter(
        {
          cid: 1,
          id: "KALIARTI000001",
        },
        0,
        sampleArticles,
      ),
    ).toMatchSnapshot();
  });

  test("latestVersionFilter should return true if its the newer version of the article", () => {
    expect(
      latestVersionFilter(
        {
          cid: 1,
          id: "KALIARTI000003",
        },
        0,
        sampleArticles,
      ),
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
  test("should include section without etat", () => {
    expect(isValidSection({ jurisState: "VIGUEUR" })).toEqual(true);
  });
});

describe("HACK(douglasduteil): Secure main script", () => {
  test("should be pipable", async () => {
    const pipeline = pPipe(astify);
    await expect(pipeline(sampleConvention)).resolves.toMatchObject({
      children: expect.any(Array),
      data: expect.any(Object),
      type: "convention collective",
    });
  });
  test("should be queueble", async () => {
    expect.assertions(1);
    const queue = new Queue();
    queue.add(() =>
      expect(astify(sampleConvention)).toMatchObject({
        children: expect.any(Array),
        data: expect.any(Object),
        type: "convention collective",
      }),
    );
    await queue.onIdle();
  });
  test("should be retryable", async () => {
    await retry(() =>
      expect(astify(sampleConvention)).toMatchObject({
        children: expect.any(Array),
        data: expect.any(Object),
        type: "convention collective",
      }),
    );
  });
});
