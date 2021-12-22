module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    // ProxyTable: {
    //     '/api': {
    //         tarfget: 'http://localhost:8080'
    //     }
    // }
    devServer: {
        inline: false,
        open: true,
        hot: false,
        hotOnly: true, // 热更新

    }
}