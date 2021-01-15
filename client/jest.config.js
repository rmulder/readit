module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/src/__tests__/**',
    '!**/coverage/**',
    '!jest.config.js',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFiles: ['<rootDir>/src/__tests__/setup.js'],
  setupFilesAfterEnv:['<rootDir>/src/__tests__/setup-after-env.js'],
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/.next/', '/node_modules/', '/lib/', '/src/__tests__/setup.js','/src/__tests__/setup-after-env.js', '/coverage/', '/.storybook/'],
  testRegex: '(__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '.(ts|tsx)': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};