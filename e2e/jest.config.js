module.exports = {
  collectCoverage: false,
  displayName: "E2E",
  rootDir: "..",
  roots: [`<rootDir>/e2e`],
  setupFilesAfterEnv: ["<rootDir>/e2e/jest.setup.js"],
};
