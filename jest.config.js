module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/packages/api/src/**/*.js",
    "<rootDir>/packages/data/src/**/*.js",
    "<rootDir>/packages/generator/src/**/*.js",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coveragePathIgnorePatterns: ["<rootDir>/packages/api/src/middlewares/router.js"],
  projects: ["<rootDir>/e2e/jest.config.js", "<rootDir>/packages/*/jest.config.js"],
};
