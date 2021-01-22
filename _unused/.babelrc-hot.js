module.exports = {
  plugins: [
    ["react-hot-loader/babel"],
    [
      "module-resolver",
      { extensions: [".js", ".jsx", ".ts", ".tsx"], root: ["."] },
    ],
  ]
};
