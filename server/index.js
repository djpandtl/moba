const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())

// 引入后台 admin 的路由
require('./routes/admin')(app)
require('./plugins/db.js')(app)

app.listen(8585, () => {
  console.log('server running on: http://127.0.0.1:8585')
})