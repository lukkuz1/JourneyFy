module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(expo|@expo|expo-font|expo-constants|expo-asset|expo-modules-core|react-native|@react-native|@react-navigation|@unimodules|@expo/vector-icons|@rneui)/)',
  ],
  moduleNameMapper: {
    '^expo-font$': '<rootDir>/__mocks__/expo-font.js',
    '^@expo/vector-icons$': '<rootDir>/__mocks__/@expo/vector-icons.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts", 
    "!src/**/index.{ts,tsx,js,jsx}"
  ],
  coverageReporters: ["text", "lcov"],
};