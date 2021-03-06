/**
 * 该文件是对 index.js 的复制，保存在通用 CRUD 操作之前的代码，无实际意义
 */


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

  // 删除分类
  router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)

    console.log('delete----')
    res.send({
      status: true
    })
  })

  // 获取分类列表
  router.get('/categories', async (req, res) => {
    // 草了 顺序错了 先 find 后 populate
    const items = await Category.find().populate('parent').limit(10)
    res.send(items)
  })

  // 获取单个分类
  router.get('/categories/:id', async (req, res) => {
    const item = await Category.findById(req.params.id)
    res.send(item)
  })

  app.use('/admin/api', router)
}