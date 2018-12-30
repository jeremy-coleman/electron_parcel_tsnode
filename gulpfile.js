var gulp = require('gulp')
var rollup = require('gulp-rollup')

var electron = require('electron')

const Bundler = require("parcel-bundler");
const {spawn} = require("child_process");


var gulp = require('gulp');
var replace = require('gulp-batch-replace');
var rename = require('gulp-rename')

let t1 = "= preact"
let r1 = "= React"

let t2 = "namespace preact"
let r2 = "namespace React"

let t3 = "declare namespace React {"
let r3 = "declare namespace React { type PureComponent = AnyComponent"

var replacements = [
	  [ t1, r1 ],
    [ t2, r2],
    [ t3, r3]
]

gulp.task('setup', () => {
        return gulp.src('node_modules/preact/src/preact.d.ts')
        .pipe(replace(replacements))
        .pipe(rename('index.d.ts'))
        .pipe(gulp.dest('node_modules/@types/react'))
});



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


const parcelProduction = {
  cache: false,
  outDir: 'dist/client',
  minify: true,
  //scopeHoist: true,
  watch: false,
  hmr: false,
  target: 'electron'
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

gulp.task('run-serve', runServe)

gulp.task('start', gulp.parallel(['tsc:desktop', 'run-serve']))

gulp.task('dist', gulp.parallel(['tsc:desktop', runProduction]))