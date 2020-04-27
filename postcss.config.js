module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({ // Подключение cssnano
            preset: 'default', // выбор настроек по умолчанию
        })
    ]
}