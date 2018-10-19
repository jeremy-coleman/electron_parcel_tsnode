const Bundler = require("parcel-bundler");
const Path = require("path");
const {spawn, exec} = require("child_process");
//const gulp = require('gulp')

const INDEX_FILE = "./src/client/index.html";

const parcelOptions = {
  cache: false
};

//let runPostcss = async () => exec("npm run styles");

// async function runPostcss(done) {
//   return exec("npm run styles"),
//   done()
// }


async function runServe() {
  const bundler = new Bundler(INDEX_FILE, parcelOptions);
  
  await bundler.serve().then(server => {
    const child = spawn("npm", ["run tse"], {stdio: "inherit", shell: true});
    child.on("close", function(code, signal) {
       console.log("child process exited with " + `code ${code} and signal ${signal}`);
      return process.exit();
    });
  })

}

runServe()

//gulp.task('build', gulp.series(runPostcss, runServe))