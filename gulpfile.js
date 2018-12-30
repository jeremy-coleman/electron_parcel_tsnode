var gulp = require('gulp')
var rollup = require('gulp-rollup')

var electron = require('electron')

const Bundler = require("parcel-bundler");
const {spawn} = require("child_process");

const tsc = require('gulp-typescript').createProject('tsconfig.json', {
     module: "esnext",
     isolatedModules: true
});

gulp.task('tsc:desktop', () => {
    return gulp.src('src/desktop/*.{ts,tsx}')
        .pipe(tsc())
        .pipe(rollup({
            input: "src/desktop/main.js",
            output: {format: 'cjs'},
            external: ["electron"],
            plugins:[
                require('rollup-plugin-auto-external')()
            ]
        }))
        .pipe(gulp.dest('dist/desktop'))
})

const INDEX_FILE = "./src/client/index.html";

const parcelOptions = {
  cache: false,
  outDir: 'dist/client'
};

async function runServe() {
  const bundler = new Bundler(INDEX_FILE, parcelOptions);
  await bundler.serve().then(server => {
    const child = spawn(electron, [".", "--dev"], {stdio: "inherit", shell: true});
    child.on("close", function(code, signal) {
       console.log("child process exited with " + `code ${code} and signal ${signal}`);
      return process.exit();
    });
  })

}


gulp.task('run-serve', runServe)

gulp.task('start', gulp.parallel(['tsc:desktop', 'run-serve']))