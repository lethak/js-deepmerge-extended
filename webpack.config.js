/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require('./tsconfig')
const path = require('path')
const fs = require('fs')
const webpackMerge = require('webpack-merge')

let finalWebpackConfig = {}
const commonWebpackConfig = {
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: ['node_modules'],
        aggregateTimeout: 300,
        poll: 1000,
    },
    entry: './src/index.ts',
    output: {
        path: path.resolve(path.join(__dirname, tsconfig.compilerOptions.outDir)),
        filename: 'index.js',
    },

    // Enable sourcemaps for debugging webpack's output. [source-map|inline-source-map]
    devtool: 'source-map',

    resolve: {
    // Add '.ts' as resolvable extensions.
        extensions: ['.ts', '.js'],
    },

    module: {
        // loaders: [
        //     // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        //     { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        // ],

        // preLoaders: [
        //     // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        //     { test: /\.js$/, loader: 'source-map-loader' },
        // ],

        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve(path.join(__dirname, './babel.config.json')),
                    babelrc: true,
                },
            },
        ],
    },

    plugins: [],
}


// Quick and dirty 'env' detection ...
const env = process.env.NODE_ENV || 'production'
// Convert to short env
let shortEnv = env
switch (env) {
    case 'development':
        shortEnv = 'dev'
        break
    case 'production':
        shortEnv = 'prod'
        break
}

// Merge env config
const envConfigPath = `./webpack.config.${shortEnv}.js`
if (fs.existsSync(envConfigPath)) {
    // Get env config
    const envSpecificWebpackConfig = require(envConfigPath)

    // Merge configureWebpack
    if (commonWebpackConfig && envSpecificWebpackConfig) {
        finalWebpackConfig = webpackMerge(
            commonWebpackConfig,
            envSpecificWebpackConfig
        )
    } else {
        finalWebpackConfig = commonWebpackConfig
    }
}
else {
    console.warn(`Impossible to find ${envConfigPath}`)
}

module.exports = finalWebpackConfig
