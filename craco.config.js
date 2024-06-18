/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.paths.json');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  jest: {
    configure: (jestConfig) => {
      jestConfig.preset = 'ts-jest';
      jestConfig.testEnvironment = 'jsdom';
      jestConfig.moduleNameMapper = {
        '^.+\\.(css|less|gif|jpg|jpeg|svg|png)$': 'identity-obj-proxy',
        '@/(.*)': '<rootDir>/src/$1',
        ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
      };
      jestConfig.transform = {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
      };
      jestConfig.moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
      jestConfig.setupFilesAfterEnv = ['<rootDir>/src/setupTests.ts'];
      return jestConfig;
    },
  },
};
