const Category = require('../../models/Category.js')

module.exports = app => {
  const express = require('express')
  const router = express.Router()

  // 添加分类列表
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })

  // 更新分类
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)

    console.log('put----', model)
    res.send(model)
  })

  // 获取分类列表
  router.get('/categories', async (req, res) => {
    const items = await Category.find().limit(10)
    res.send(items)
  })

  // 获取单个分类
  router.get('/category/:id', async (req, res) => {
    const item = await Category.findById(req.params.id)
    res.send(item)
  })

  app.use('/admin/api', router)
}