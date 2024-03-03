import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    root: process.cwd(),

    setupFiles: ["vitest.polyfills.ts"],

    globals: true,

    exclude: [
      "node_modules",
      ".next",
      ".docusaurus",
      "cypress",
      "**/node_modules/**",
    ],

    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/*.model.ts",
        "**/*.enum.ts",
        "**/index.ts",
        "**/test/**",
        "**/__playground.ts",
      ],
      statements: 95,
      branches: 80,
      functions: 100,
      lines: 95,
    },
  },
});
