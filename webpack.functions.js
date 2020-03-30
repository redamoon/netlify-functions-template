// webpack.functions.js
module.exports = {
    devtool: "source-map",
    optimization: { minimize: false },
    module: {
        rules: [
            {
                test: /\.html$/i,
                exclude: /node_modules/,
                use: 'raw-loader'
            }
        ],
    }
};
