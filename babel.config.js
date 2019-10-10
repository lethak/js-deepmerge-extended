/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = function (api) {
    api.cache(true)
    return {
        presets: [
            [
                // '@babel/preset-flow',
                '@babel/preset-typescript', {},
                '@babel/preset-env',
                {
                    'useBuiltIns': false,
                },
            ],
        ],
        env: {
            development: {},
            production: {},
            test: {},
        },
    }
}
