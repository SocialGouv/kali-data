module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.js", "<rootDir>/scripts/generators/**/*.js"],
  coverageDirectory: "<rootDir>/coverage",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  verbose: true,
};
