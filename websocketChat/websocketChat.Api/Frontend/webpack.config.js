const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const path = require('path');

const outputPath = path.join(__dirname, '../Static/dist');

const config = {
    context: path.join(__dirname, 'src'),
    mode: "development",
    entry: {
        app: './app.jsx'
    },
    output: {
        filename: '[name][contenthash].js',
        path: outputPath,
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', {"runtime": "automatic"}]
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: outputPath,
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpeg|gif|svg|ttf)$/i,
                type:  'assets/resource'
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.scss']
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "../Static")
        },
        historyApiFallback: true,
        compress: true,
        port: 9000,
        hot: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][contenthash].css'
        }),
        new AssetsWebpackPlugin({
            filename: 'assets.json',
            fileTypes: ['js', 'css'],
            includeAllFileTypes: false,
            removeFullPathAutoPrefix: true
            // path: path.join(__dirname, '../Static')
        }),
        new CopyPlugin({
            patterns: [
                { from: __dirname + '/src/img/', to: path.join(outputPath, 'img') },
                { from: __dirname + '/assets.json', to: outputPath }
            ]
        }),
    ],
    devtool: "source-map"
};

module.exports = config;