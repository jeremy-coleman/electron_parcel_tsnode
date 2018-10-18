//var purgecss = require('@fullhuman/postcss-purgecss')
//const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    plugins: [
        require('postcss-preset-env')({ browsers: 'last 2 Chrome versions' }),
        require('postcss-easy-import'),
        require('postcss-url')({url: "inline"}),
        require('postcss-svgo')(),
        require('postcss-csso')({ restructure: true })
    ]
};