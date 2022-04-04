// TODO: remove this when UI code is more finished
const a11yOff = Object.keys(require("eslint-plugin-jsx-a11y").rules).reduce(
  (acc, rule) => {
    acc[`jsx-a11y/${rule}`] = "off";
    return acc;
  },
  {}
);

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    ...a11yOff,
    quotes: ["warn", "double"],
    "arrow-body-style": 1,
    "import/extensions": 0,
    "no-use-before-define": 0,
    "comma-dangle": 0,
    "import/prefer-default-export": 0,
    "prefer-template": 0,
    "operator-linebreak": 0,

    "react/function-component-definition": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "@typescript-eslint/no-empty-function": 0,
  },
};
