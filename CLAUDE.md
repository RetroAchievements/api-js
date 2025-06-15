# CLAUDE.md

## Commands

### Development

- `pnpm dev` - Watch mode for playground file development
- `pnpm test` - Run all tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report

### Validation & Build

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm build` - Build distribution files (ESM, CJS, UMD)
- `pnpm verify` - Full validation: format check, lint, test coverage, and build

### Running Individual Tests

To run a single test file:

```bash
pnpm vitest run src/user/getUserProfile.test.ts
```

To run tests matching a pattern:

```bash
pnpm vitest run -t "getUserProfile"
```

## Architecture

This is a TypeScript library for the RetroAchievements API with a modular, domain-driven structure. Each API domain (user, game, achievement, etc.) is organized as a separate module with consistent patterns.

### Key Architectural Patterns

1. **Function Structure**: Every API function follows this exact pattern:

```typescript
export const getFunctionName = async (
  authorization: AuthObject,
  payload: {
    /* typed parameters */
  }
): Promise<ReturnType> => {
  const url = buildRequestUrl(/* endpoint details */);
  const rawResponse = await call({ url });
  return serializeProperties(rawResponse);
};
```

2. **Module Organization**: Each domain directory contains:

   - Function implementations (e.g., `getUserProfile.ts`)
   - Tests with MSW mocks (e.g., `getUserProfile.test.ts`)
   - TypeScript models in `models/` subdirectory
   - Index file with barrel exports

3. **Core Utilities** (in `src/utils/internal/`):

   - `call()` - HTTP client wrapper with error handling
   - `buildRequestUrl()` - Constructs API URLs with auth params
   - `serializeProperties()` - Transforms API responses (snake_case to camelCase, type coercion)

4. **Testing Approach**:
   - All API calls are mocked using MSW (Mock Service Worker)
   - Tests verify both successful responses and error handling
   - Coverage requirements: 95% statements and lines

### Important Conventions

- All API functions require an `AuthObject` as the first parameter
- Response properties are automatically converted from snake_case to camelCase
- Numeric strings in responses are converted to numbers
- ISO date strings are converted to Date objects
- Every function must have comprehensive JSDoc comments with examples
- Commit messages follow conventional commits format
