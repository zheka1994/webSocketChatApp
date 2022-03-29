const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const path = require('path');
const HandlebarsPlugin = require('handlebars-webpack-plugin');

const outputPath = path.join(__dirname, '../Static');
const config = require('./configurations/config.json');

const buildConfig = {
    context: path.join(__dirname, 'src'),
    mode: 'development',
    entry: {
        app: './app.jsx'
    },
    output: {
        filename: '[name][contenthash].js',
        path: outputPath,
        publicPath: config.build.publicPath,
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
                            ['@babel/preset-react', {'runtime': 'automatic'}]
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
            directory: path.resolve(__dirname, '../Static')
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
        }),
        new HandlebarsPlugin({
            entry: path.join(__dirname, 'src', 'views', 'widget.hbs'),
            output: path.join(outputPath, 'widget.js'),
            data: path.join(__dirname, 'assets.json')
        })
    ],
    devtool: 'source-map'
};

module.exports = buildConfig;