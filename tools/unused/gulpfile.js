var gulp = require('gulp')
var rollup = require('gulp-rollup')

//var electron = require('electron')


var cp = require('child_process')
var path = require('path')


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

gulp.task('desktop:bundle', () => {
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

async function spawnElectron() {
    const child = cp.spawn("electron", [".", "--dev"], {stdio: "inherit", shell: true});
    child.on("close", function(code, signal) {
       console.log("child process exited with " + `code ${code} and signal ${signal}`);
      return process.exit();
    });
}

gulp.task('desktop:open', async () => {
  const child = cp.spawn("electron", [".", "--dev"], {stdio: "inherit", shell: true});
  child.on("close", function(code, signal) {
     console.log("child process exited with " + `code ${code} and signal ${signal}`);
    return process.exit();
  });
})

gulp.task('desktop:start', gulp.series("desktop:bundle", "desktop:open"))


gulp.task("run-serve", async function() {
  spawnBin('parcel', ['src/client/index.html', "--dist-dir", "dist/app"])
})

gulp.task('start', gulp.parallel(['desktop:start', 'run-serve']))

//gulp.task('dist', gulp.parallel(['tsc:desktop', runProduction]))