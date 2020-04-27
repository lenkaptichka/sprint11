const path = require('path'); // Утилита, которая превращает относительный путь в абсолютный
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключение плагина для чтения CSS внутри JS-кода
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Подключение плагина для работы с HTML
const WebpackMd5Hash = require('webpack-md5-hash'); // Подключение пакета, отслеживающего и обновляющего хеши
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // Подклбчение плагина для дополнительной оптимизации CSS
const isDev = process.env.NODE_ENV === 'development'; // Переменная для сборки development

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // Путь к точке выхода
        filename: '[name].[chunkhash].js' // Имя файла, куда вебпак положит код
    },
    module: {
        rules: [{
            test: /\.js$/, // Регулярное выражение, которое ищет все JS-файлы
            use: {
                loader: "babel-loader" // Весь JS обрабатывается пакетом babel-loader
            }, 
            exclude: /node_modules/ // Исключает папку node_modules
        },
        {
            test: /\.css$/, // Применять это правило только к CSS-файлам
            use: [
                (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                'css-loader',
                'postcss-loader'
            ]
        },
        {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: [
                'file-loader?name=./images/[name].[ext]', // Указали папку, куда складывать изображения
                {
                    loader: 'image-webpack-loader',
                    options: {}
                }
            ]
        }, 
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
        }]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.[contenthash].css'
        }),
        new HtmlWebpackPlugin ({
            inject: false, // Cтили НЕ нужно прописывать внутри тегов
            template: './src/index.html', // Откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html' // Имя выходного файла, то есть того, что окажется в папке dist после 
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new WebpackMd5Hash(),
        new OptimizeCssAssetsPlugin()
    ]
};