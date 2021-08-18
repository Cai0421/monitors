
const express = require('express')
const app = express()
var apiRoutes = express.Router()
app.use('/api', apiRoutes)

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/proxy': {
        target: 'https://whois.pconline.com.cn', // 
        changeOrigin: true,  // needed for virtual hosted sites
        pathRewrite: {
          '^/proxy': '/ipJson.jsp'
        }
      },
      '/api': {
        target: 'http://hdy.wlsp.org.cn/hdytesthhy/ashx/', // 
        changeOrigin: true,  // needed for virtual hosted sites
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}