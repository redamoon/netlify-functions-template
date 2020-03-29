// webpack.functions.js
module.exports = {
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
