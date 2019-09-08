const astify = require("../src/astify");
const sampleConvention = require("./kaliCont-sample.json");

// check structure conversion
test("should convert structure to AST tree", () => {
  expect(astify(sampleConvention)).toMatchSnapshot();
});
