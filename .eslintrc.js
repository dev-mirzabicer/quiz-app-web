module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "prefer-destructuring": ["error", { object: true, array: false }],
    "no-unused-vars": ["warn", { argsIgnorePattern: "next|req|res|val|err" }],
  },
};
