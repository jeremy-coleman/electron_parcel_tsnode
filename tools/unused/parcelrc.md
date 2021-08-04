https://v2.parceljs.org/configuration/plugin-configuration/

simple
module.exports = {
  extends: ["@parcel/config-default"],
  transformers: {
    "*.svg": ["@parcel/transformer-svg-react"]
  }
}

full
{
  "bundler": "@parcel/bundler-default",
  "transformers": {
    "*.{js,jsx,ts,tsx}": [
      "@parcel/transformer-babel",
      "@parcel/transformer-js"
    ],
    "url:*": ["@parcel/transformer-raw"]
  },
  "namers": ["@parcel/namer-default"],
  "runtimes": {
    "browser": ["@parcel/runtime-js", "@parcel/runtime-browser-hmr"],
    "service-worker": ["@parcel/runtime-js"],
    "web-worker": ["@parcel/runtime-js"],
    "node": ["@parcel/runtime-js"]
  },
  "optimizers": {
    "*.js": ["@parcel/optimizer-terser"]
  },
  "packagers": {
    "*.html": "@parcel/packager-html",
    "*": "@parcel/packager-raw"
  },
  "resolvers": ["@parcel/resolver-default"],
  "reporters": ["@parcel/reporter-cli"]
}