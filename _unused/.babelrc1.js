module.exports = {
  plugins: [
    [
      "@babel/plugin-transform-typescript",
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    ["@babel/plugin-syntax-object-rest-spread"],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/transform-react-jsx", { isTSX: true, allExtensions: true }],
    [
      "module-resolver",
      { extensions: [".js", ".jsx", ".ts", ".tsx"], root: ["."] },
    ],
  ],
  ignore: ["src/vendor/*.js"],
  env: {
    development: { plugins: ["react-hot-loader/babel"] },
    production: {},
  },
};
