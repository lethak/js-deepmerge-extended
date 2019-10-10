/* eslint-disable @typescript-eslint/no-var-requires */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = {
    mode: 'development',
    watch: false,
    plugins: [
        new UglifyJsPlugin({
            // cache: true,
            parallel: true,
            sourceMap: false,
            warningsFilter: () => false,
            uglifyOptions: {
                ecma: 5,
                warnings: false,
                output: {
                    comments: /@license/i,
                },
            },
        }),
    ],
}

module.exports = webpackConfig
