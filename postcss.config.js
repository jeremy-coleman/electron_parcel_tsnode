var purgecss = require('@fullhuman/postcss-purgecss')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    plugins: [
        require('postcss-easy-import')(),
        require('postcss-url')(),
        require('postcss-preset-env')({ browsers: 'last 2 Chrome versions' }),
        require('postcss-inline-svg')(),
        require('postcss-svgo')(),
        purgecss({content: ['src/**/*.html', 'src/**/*.tsx', 'src/**/*.ts', 'src/**/*.hbs', 'src/**/*.js']}),
        require('postcss-discard-duplicates'),
        require('postcss-reporter')(),
        require('postcss-browser-reporter')({disabled: isProduction})
        //require('postcss-csso')({ restructure: false }),
    ]
};