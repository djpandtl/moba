const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  // 新增 parent 关联
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Category', schema)