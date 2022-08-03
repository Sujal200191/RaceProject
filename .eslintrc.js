module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
      es6: true,
      jest: true,
    },
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "react/jsx-props-no-spreading": 0,
      "no-console": 1,
      "react/prop-types": 0,
      "spaced-comment": 1,    
      "jsx-quotes": "prefer-single",
      "no-unused-vars": "all"
    },
};
  