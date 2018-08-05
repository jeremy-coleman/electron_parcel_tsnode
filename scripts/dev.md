
```js
const Bundler = require("parcel-bundler");
const Path = require("path");
const { spawn } = require("child_process");

// Entrypoint file location, relative to project root / cwd when u spawn the process, not this folder
//TODO make it better with jetpack
const INDEX_FILE = "./src/client/index.html";

const options = {
  cache: false // Enabled or disables caching, defaults to true
};

async function runServe() {
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(INDEX_FILE, options);
  
  // #listener hooks 
  //
  // bundler.on("bundled", bundle => {
  //   // bundler contains all assets and bundles, see documentation for details
  //   // gets called after each bundle
  // });

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  await bundler.serve().then(server => {
    // initial build ready, start electron now
    const child = spawn("npm", ["run tsnode:electron"], {
      stdio: "inherit",
      shell: true
    });
    child.on("close", function(code, signal) {
      // exit serve if electron exits
      // console.log("child process exited with " + `code ${code} and signal ${signal}`);
      return process.exit();
    });
  });
}

runServe();
```