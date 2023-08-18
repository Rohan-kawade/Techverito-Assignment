export {};
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {

      // if your using tsconfig.paths thers is no harm in telling jest
    '@components/(.*)$': '<rootDir>/src/Components/$1',
    '@/(.*)$': '<rootDir>/src/$1',
      
      // mocking assests and styling
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/test/mocks/fileMock.ts',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/src/test/mocks/styleMock.ts',
    /* mock models and services folder */
    '(assets|models|services)': '<rootDir>/src/test/mocks/fileMock.ts',
  },
   // to obtain access to the matchers.
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
      
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
  transformIgnorePattern: [
 '<rootDir>/node_modules/(?!axios)/'
],transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
};