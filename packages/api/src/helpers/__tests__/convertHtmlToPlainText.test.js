import convertHtmlToPlainText from "../convertHtmlToPlainText";

describe("helpers/convertHtmlToPlainText()", () => {
  it(`should return the expected result`, () => {
    const source = `<p><br/>A <a alt='alternative' href='/path?a=b&c=d'>link</a>, a text.</p>`;
    const expected = `A link, a text.`;
    const result = convertHtmlToPlainText(source);

    expect(result.length).toBeGreaterThan(0);
    expect(result).toStrictEqual(expected);
  });
});
