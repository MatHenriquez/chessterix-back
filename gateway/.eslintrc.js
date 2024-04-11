module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js', './data/migrations/*.ts'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  jest: {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    moduleNameMapper: {
      '@modules/(.*)$': '<rootDir>/modules/$1',
      '@common/(.*)$': '<rootDir>/common/$1',
      '^@root/(.*)$': '<rootDir>/../$1',
      '^@data/(.*)$': '<rootDir>/../data/$1',
      '^@/(.*)$': '<rootDir>/../src/$1',
      '@configuration/(.*)$': '<rootDir>/configuration/$1'
    },
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest'
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    testResultsProcessor: 'jest-sonar-reporter'
  },
  jestSonar: {
    reportPath: 'coverage',
    reportFile: 'test-reporter.xml',
    indent: 4
  }
};
