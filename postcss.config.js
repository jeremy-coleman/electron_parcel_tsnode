module.exports = {
    plugins: [
        require('postcss-easy-import')(),
        require('postcss-preset-env')({ browsers: 'last 2 Chrome versions' }),
        require('@fullhuman/postcss-purgecss')({
           content: ['./**/*.html', './**/*.tsx', './**/*.ts','./**/*.js', './**/*.jsx']}),
        require('postcss-discard-duplicates'),
        //require('postcss-csso')({ restructure: false }),
    ]
};