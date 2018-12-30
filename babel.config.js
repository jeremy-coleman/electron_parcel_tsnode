

var config = {
  presets: [
    ["@babel/preset-typescript", {isTSX: true,allExtensions: true}],
    //["@babel/preset-react"],
  ],
  plugins: [
    ["@babel/plugin-transform-typescript", {
      isTSX: true,
      allExtensions: true,
      pragma: "h"
    }],
    ["@babel/plugin-proposal-decorators", {decoratorsBeforeExport: true}],
    ["@babel/plugin-syntax-object-rest-spread"],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/transform-react-jsx" , {isTSX: true, allExtensions: true, pragma: "h"}],
    ["module-resolver", 
      {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
        root: ["."]
      }
    ],
    //["@babel/plugin-transform-modules-commonjs"]
  ],
  ignore: ["src/vendor/*.js"],
}

if(process.env.NODE_ENV !== 'production') config.plugins.push("react-hot-loader/babel")

module.exports = config