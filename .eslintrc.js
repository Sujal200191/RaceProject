module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
      es6: true,
      jest: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
      "react/jsx-props-no-spreading": 0,
      "no-console": 1,
      "react/prop-types": 0,
      "spaced-comment": 1,    
      "jsx-quotes": "prefer-single"
    },
};
  