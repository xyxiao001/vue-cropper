var path = require('path')

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      Object.assign(config, {
      })
    } else {
      // 为开发环境修改配置...
      Object.assign(config, {
        // 运行时的端口号
        devServer: {
          port: 8888,
          host: '0.0.0.0',
          // 用于nginx配置 不检查host
          disableHostCheck: true
        },
      })
    }
  },
};
