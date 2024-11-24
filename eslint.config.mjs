module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // Use TypeScript parser
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'], // Add TypeScript plugin
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Use recommended TypeScript rules
  ],
  rules: {
    // Customize your rules here
    'no-unused-vars': 'off', // Turn off base rule for unused vars
    '@typescript-eslint/no-unused-vars': ['error'], // Enable TypeScript rule
  },
};
