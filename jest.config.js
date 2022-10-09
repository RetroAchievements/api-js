module.exports = {
  roots: ["<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  testPathIgnorePatterns: [
    "<rootDir>[/\\\\](node_modules|.next|.docusaurus|cypress)[/\\\\]"
  ],

  projects: [
    {
      displayName: {
        name: "UNIT",
        color: "blue"
      },
      testMatch: ["<rootDir>/src/**/*.test.ts"],
      transform: {
        "&.+\\.(ts|tsx)$": "@swc/jest"
      },
      coverageThreshold: {
        global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100
        }
      },
      collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.model.ts",
        "!src/**/index.ts",
        "!src/test/**/*.ts",
        "!src/__playground.ts"
      ]
    }
  ]
};
