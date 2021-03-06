module.exports = {
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/index.ts',
        '!src/**/*.test.{ts, tsx}',
        '!src/**/types.ts',
        '!**/node_modules/**'
    ],
    coverageDirectory: '.temp',
    // coverageThreshold: {
    //     global: {
    //         branches: 50,
    //         functions: 70,
    //         lines: 70,
    //         statements: 70
    //     },
    // },
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    preset: 'jest-expo',
    setupFiles: [
        'raf/polyfill'
    ],
    testMatch: ['**/__tests__/*.(ts|tsx|js)'],
    testPathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/'
    ],
    transform: {
        '.(js|jsx)': '<rootDir>/node_modules/babel-jest',
        '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    transformIgnorePatterns: [
        'node_modules/(?!(react-native)/)'
    ]
}
