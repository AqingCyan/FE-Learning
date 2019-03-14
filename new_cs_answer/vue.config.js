module.exports = {
    devServer: {
        open: true,
        proxy: {
            // '/api': {
            //     target: 'http://47.104.189.19:8080/',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // }
        }
    }
}