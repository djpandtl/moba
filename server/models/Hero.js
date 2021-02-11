const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  // parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
  title: { type: String }, // 称号
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],

  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  // 出装 1顺风 2逆风
  items1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  

  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },

  partners: [{
    hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero'},
    description: { type: String }
  }] 
})

module.exports = mongoose.model('Hero', schema)