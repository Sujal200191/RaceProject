module.exports = {
    env: {
      commonjs: true,
      node: true,
      browser: true,
      es6: true,
      jest: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    globals: {},
    parser: "@babel/eslint-parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: "module",
    },
    plugins: ["react", "import", "react-hooks"],
    ignorePatterns: ["node_modules/"],
    rules: {
      // "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
      "react/jsx-props-no-spreading" : 0,
      "react/jsx-curly-newline": 1,
      "no-console": 1,
      "react/prop-types": 0,
    },
    settings: {
      react: {
        version: "latest", // "detect" automatically picks the version you have installed.
      },
    },
  };