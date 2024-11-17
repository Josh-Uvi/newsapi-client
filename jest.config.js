/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  testMatch: ["**/tests/**/*.test.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
