var gulp = require('gulp')
var rollup = require('gulp-rollup')

var electron = require('electron')

const Bundler = require("parcel-bundler");

var cp = require('child_process')
var path = require('path')

const {spawn} = cp

const tsc = require('gulp-typescript').createProject('tsconfig.json', {
     module: "esnext",
     isolatedModules: true
});




const BASE_PATH = __dirname

const spawnBin = (binCommand, args) => {
  const getCommandPath = binCommand => {
    const cmd = process.platform === 'win32' ? `${binCommand}.cmd` : binCommand;
    return path.resolve(__dirname, 'node_modules', '.bin', cmd)
  }

  return cp.spawn(getCommandPath(binCommand), args, { 
    cwd: path.resolve(BASE_PATH),
    stdio: 'inherit' //['pipe', terminalStream, process.stderr]
  })
}

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

const parcelProduction = {
  cache: false,
  outDir: 'dist/client',
  minify: true,
  //scopeHoist: true,
  publicUrl: ".",
  watch: false,
  hmr: false,
  //target: 'electron'
};

async function runProduction() {
  const bundler = new Bundler(INDEX_FILE, parcelProduction);
  await bundler.bundle().then(server => {
    const child = spawn(electron, ["."], {stdio: "inherit", shell: true});
    child.on("close", function(code, signal) {
       console.log("child process exited with " + `code ${code} and signal ${signal}`);
      return process.exit();
    });
  })
}



gulp.task('1run-serve', runServe)

gulp.task("run-serve", async function() {
  spawnBin('parcel', ['src/client/index.html'])
})

gulp.task('start', gulp.parallel(['tsc:desktop', 'run-serve']))

gulp.task('dist', gulp.parallel(['tsc:desktop', runProduction]))