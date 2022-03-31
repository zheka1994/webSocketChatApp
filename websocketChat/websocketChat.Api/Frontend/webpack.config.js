const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const path = require('path');
const HandlebarsWebpackPlugin = require('./plugins/handlebarsPlugin');
const CopyPlugin = require('./plugins/copyPlugin');

const outputPath = path.join(__dirname, 'dist');
const config = require('./configurations/config.json');

let appAssets;

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
            directory: outputPath
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
            removeFullPathAutoPrefix: true,
            processOutput: function (assets) {
                appAssets = assets;
                return JSON.stringify(assets)
            }
        }),
        new HandlebarsWebpackPlugin({
            templateFileName: path.join(__dirname, 'src', 'views', 'widget.hbs'),
            outputFileName: path.join(outputPath, 'widget.js'),
            getTemplateModel: () => appAssets
        }),
        new CopyPlugin({
            inputDirectory: outputPath,
            outputDirectory: path.join(__dirname, '../Static')
        })
    ],
    devtool: 'source-map'
};

module.exports = buildConfig;