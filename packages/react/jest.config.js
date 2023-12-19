const { jest } = require('@siberiacancode/jest');

/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig = {
  ...jest,
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};

module.exports = jestConfig;
