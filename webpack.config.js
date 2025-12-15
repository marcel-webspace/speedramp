const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    devtool: 'eval-cheap-source-map',
    externals: {
        uxp: 'commonjs2 uxp',
        premierepro: 'commonjs2 premierepro',
        os: 'commonjs2 os'
    },
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    plugins: [
                        "@babel/proposal-object-rest-spread",
                        "@babel/plugin-syntax-class-properties",
                    ]
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin(['plugin'], {
            copyUnmodified: true
        })
    ]
};
