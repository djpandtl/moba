module.exports = async (req, res, next) => {
  const inflection = require('inflection')
  // 根据路由找模型
  const modelName = inflection.classify(req.params.resource)
  req.Modle = require(`../models/${modelName}.js`)

  next()
}