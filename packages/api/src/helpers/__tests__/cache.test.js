import waait from "waait";

import cache from "../cache";

describe("helpers/cache()", () => {
  beforeEach(() => {
    cache.set("a-cache-key", "A Cached Value", 2);
  });

  it(`should return the cached value`, async () => {
    await waait(1000);
    expect(cache.get("a-cache-key")).toBe("A Cached Value");
  });

  it(`should return undefined`, async () => {
    await waait(3000);
    expect(cache.get("a-cache-key")).toBeUndefined();
  });
});
