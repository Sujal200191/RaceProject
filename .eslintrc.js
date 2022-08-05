module.exports = {
    env: {
      browser: true,
      es2021: false,
      node: true,
      es6: false,
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
      // "jsx-quotes": "2",
      // "no-unused-vars": 2
    },
};
  