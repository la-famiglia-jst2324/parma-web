import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  testMatch: [
    "**/tests/**/*.test.ts",
    "**/tests/**/*.test.tsx"
  ],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    // the following elements are excluded from coverage
    "!src/app/**/*.{js,jsx,ts,tsx}",
    "!src/components/**/*.{js,jsx,ts,tsx}",
    "!src/api/db/prisma/**/*",
    // "!src/pages/api/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      "functions": 0,  // we don't enforce coverage on lines currently
      "lines": 45
    }
  },
  coverageReporters: ["json-summary", 'html']
}

export default createJestConfig(config)
