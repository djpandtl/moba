const express = require('express')

const app = express()

app.set('secret', 'ow9eurijijsoifujq09')

app.use(require('cors')())
app.use(express.json())

// 图片 src 路由
app.use('/uploads', express.static(__dirname + '/uploads'))

// 托管admin web 打包文件
// app.use('/', express.static(__dirname + '/admin'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))

// 引入后台 admin 的路由
require('./routes/admin')(app)
require('./plugins/db.js')(app)

require('./routes/web')(app)

app.listen(8585, () => {
  console.log('server running on: http://127.0.0.1:8585')
})