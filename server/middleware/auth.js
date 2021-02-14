module.exports = options => {
  // 加上 options 参数，提高可扩展性
  return async (req, res, next) => {

    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')

    // token 验证，只有登录的人才可以访问
    const token = req.headers.authorization
    assert(token, 401, "请先登录")
    const tokenData = String(token || '').split(" ").pop()

    // 若没有 token， jwt会抛出错误
    // 为什么 req.app 会是 express 的实例
    const { id } = jwt.verify(tokenData, req.app.get('secret')) 
    assert(id, 401, "id错误了！！")

    req.user = await AdminUser.findById(id)
    assert(req.user, 401, "没有该用户！")

    await next()
  }
}