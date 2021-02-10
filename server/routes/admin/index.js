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
}