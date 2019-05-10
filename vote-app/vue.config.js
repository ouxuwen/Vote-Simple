module.exports = {
    devServer: {
      proxy: {
        '/share_vote': {
          target: 'http://127.0.0.1:3000',
          ws: false,
          changeOrigin: true,
          pathRewrite: {
            '^/share_vote': ''
          }
        }
      }
    },
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
  }