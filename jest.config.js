/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node'
}
