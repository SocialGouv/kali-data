import astify from "../src/astify";
import sampleConvention from "./kaliCont-sample.json";

// check structure conversion
test("should convert structure to AST tree", () => {
  expect(astify(sampleConvention)).toMatchSnapshot();
});
