module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    setupFiles: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|expo(nent)?|@unimodules/.*|unimodules|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@babel/core)',
    ],
};
