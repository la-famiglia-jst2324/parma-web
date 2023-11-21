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
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      "functions": 50,
      "lines": 50
    }
  },
  coverageReporters: ["json-summary"]
}

export default createJestConfig(config)
