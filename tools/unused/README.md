#what this is
-some good boilerplate
-parcel on the front for hmr ease

#some notes
1) react hmr docs lie - it doesn't remove itself when NODE_ENV=production
2) I removed react-hot-loader imports(IE: import {hot} from 'react-hot-loader', yet hmr still works(wtf?thanks parcel i guess), however the PRODUCTION bundle size dropped ~50kb
3) I added production/dev setting to the babel config and put the react-hot-loader/babel plugin in dev, which
reduced bundle size by 30kb maybe? which was in addition to the savings from removing react-hot-loader
4) non gzip bundle ~190kb including mobx , not so bad

#why 2 transpilers?
u may notice the electron bundle is being bundled by gulp-typescript and rollup, couple notes here:
1) if you inspect the output bundles u'll see the library variable names are intact, for example electron remains electron not electron_1
like the normal typescript output
2) there is no Object.defineProperty(__esModule: true) bullshit in the output either
3) it transpiles in about 200ms - gulp-typescript will eat errors when you use isolatedModules (which automatically disables type checking)

4) you're able to pipe from tsc to rollup using gulp-rollup - which is just a little tricky because the docs suck ,but basically you just
pipe the post-transpiled filename and its new extension (which is just an in-memory vinyl file) while using the original location on the filesystem
for ex: 
```js

var gulp = require('gulp')
var rollup = require('gulp-rollup')

const tsc = require('gulp-typescript').createProject('tsconfig.json', {
     /* tsc overrides in these brackets*/
     module: "esnext",
     isolatedModules: true
});

//using module: "esnext" has 2 benefits 1) no typescript bullshit in your output 2) u have to to pipe to rollup - which will then handle formatting as cjs


gulp.task('compile-my-file', () => {
 return gulp.src('src/myfile.ts').pipe(tsc()).pipe(rollup(input:'./src/myfile.js')).pipe(gulp.dest('dist_directory'))
})
```
#also
there's a preact branch that works with proper aliases in package.json set up, hmr doesnt work though 
