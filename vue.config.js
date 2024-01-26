// vue.config.js
module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'Wortgut'
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API_ENDPOINT,
                pathRewrite: {'^/api': ''},
            },
        },
    },
}