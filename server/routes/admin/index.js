const { model } = require('mongoose')

module.exports = app => {
  const express = require('express')
  const router = express.Router()

  // 添加分类列表
  router.post('/', async (req, res) => {
    const model = await req.Modle.create(req.body)
    res.send(model)
  })

  // 更新分类
  router.put('/:id', async (req, res) => {
    const model = await req.Modle.findByIdAndUpdate(req.params.id, req.body)

    console.log('put----', model)
    res.send(model)
  })

  // 删除分类
  router.delete('/:id', async (req, res) => {
    await req.Modle.findByIdAndDelete(req.params.id)

    console.log('delete----')
    res.send({
      status: true
    })
  })

  // 获取分类列表
  router.get('/', async (req, res) => {
    // 草了 顺序错了 先 find 后 populate
    // const items = await req.Modle.find().populate('parent').limit(10)
    const queryOptions = {}
    
    if (req.Modle.modelName === "Category") {
      queryOptions.populate = 'parent'
    }

    const items = await req.Modle.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  // 获取单个分类
  router.get('/:id', async (req, res) => {
    const item = await req.Modle.findById(req.params.id)
    res.send(item)
  })

  // 使用通用接口 -- 路由和模型一一对应，如 categories -- Category
  // 对于通用的内容，放到中间件中处理
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const inflection = require('inflection')
    // 根据路由找模型
    const modelName = inflection.classify(req.params.resource)
    req.Modle = require(`../../models/${modelName}.js`)

    next()
  } , router)

  // 图片上传路由
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })

  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file // req 中的 file 来自于中间件的处理
    file.url = `http://127.0.0.1:8585/uploads/${file.filename}`
    res.send(file)
  })

  // 登录路由
  app.post('/admin/api/login', async (req, res) => {
    const AdminUser = require(`../../models/AdminUser.js`)

    const { username, password }  = req.body
    const user = await AdminUser.findOne({username}).select('+password')

    if (!user) { // 不存在当前 user 
      return res.status(422).send({
        message: "用户不存在！"
      })
    }
    console.log('user', user)
    // 用户存在则验证密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误！'
      })
    }

    // 用户名和密码都对是发送 jwt
    const token = require('jsonwebtoken').sign({ id: user._id }, app.get('secret'))
    res.send({
      token
    })
  })

  app.get('/admin/api/login', async (req, res) => {
    const AdminUser = require(`../../models/AdminUser.js`)
    res.send(await AdminUser.find())
  })
}