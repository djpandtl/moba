module.exports = app => {
  const mongoose = require("mongoose")
  
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  
  const conn = mongoose.connection

  conn.on('error', () => { // 失败监听
    console.log("数据库连接失败~")
  })

  // 1.4 绑定连接完成的监听
  conn.on('connected', () => { // 连接成功回调
    console.log("数据库连接成功~")
  })

  require('require-all')(__dirname + '/../models')
  console.log('__dirname', __dirname + '/../models')
}