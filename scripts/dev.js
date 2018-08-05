const Bundler = require("parcel-bundler");
const Path = require("path");
const { spawn } = require("child_process");


const INDEX_FILE = "./src/client/index.html";

const options = {
  cache: false
};

async function runServe() {
  const bundler = new Bundler(INDEX_FILE, options);

  await bundler.serve().then(server => {
    const child = spawn("npm", ["run tsnode:electron"], {
      stdio: "inherit",
      shell: true
    });
    child.on("close", function(code, signal) {
       console.log("child process exited with " + `code ${code} and signal ${signal}`);
      return process.exit();
    });
  });
}

runServe();
