export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  roots: ['<rootDir>/tests'],
  testMatch: ['**/?(*.)+(unit|integration|test).[tj]s'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
