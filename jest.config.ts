module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': '@babel/preset-env',
  },
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
  verbose: true,
  silent: false,
  setupFiles: ['./jest.setup.ts'],
  testRunner: 'jest-jasmine2',
};
