module.exports = app => {
  const express  = require('express')
  const router = express.Router()

  const mongoose = require('mongoose')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  const Hero = mongoose.model('Hero')

  // 难得手动添加  初始化数据
  router.get('/news/init', async (req, res) => {

    // 找到新闻分类下面的所有子类
    const parent = await Category.findOne({ name: '新闻分类' })

    const cats = await Category.find().where({ parent }).lean()

    const newsTitles =  ["致一起峡谷过年的你！", "初一看电影，新春来峡谷！", "金牛贺岁，欢乐祥瑞~企鹅电竞王者明星主播陪您过大年啦！", "开年开好局，王者人生新春福利强势来袭", "公孙离惊鸿舞表演来了！不夜长安上元夺魁时，一起欣赏阿离姐姐绝美舞姿！", "2月11日游戏内商城异常消耗点券补发说明", "2月11日魔法球维护完成公告", "【瑞象送福】活动道具补发说明", "2月11日王者荣耀客服系统提单异常恢复公告", "2月11日游戏内道具购买及魔法球玩法维护异常说明", "新春暖意正融融，多重福利享不停", "【微信用户专属】微信小程序游戏礼品站购买兰陵王、花木兰“默契交锋”皮肤抽免单活动", "峡谷礼遇，温馨甜蜜，情人节好礼浪漫来袭", "神秘商店抢先服开启公告", "恭贺新禧！团聚有王者，福利享不停", "2021年KPL春季转会期俱乐部挂牌名单", "2021KPL春季转会期挂牌期第三阶段追加公告", "关于2021年KPL春季赛临时参赛资格评审结果的通知", "2021年KPL王者荣耀职业联赛赛制升级，全新对抗一触即发！", "英雄归来，共度荣耀！2020王者荣耀冬季冠军杯暨年度颁奖典礼圆满落幕"]
    const newsList = newsTitles.map( title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)

      return {
        categories: randomCats.slice(0, 2),
        title
      }
    })

    // 处理文章... 批量添加
    await Article.deleteMany({})
    await Article.insertMany(newsList)

    res.send(newsList)
  })

  // 英雄初始化
 /*  $$('.hero-nav > li > a').map(a => {
    return { // 控制台代码
      name: a.innerText,
      heroes: $$('.hero-list > li > a > h3').map(el => (
        {name: el.innerHTML, avatar:  el.previousElementSibling.src}
        ))
    }
  }) */
  router.get('/heroes/init', async (req, res) => {
    const rawHeroes = require('./rawHeroes')

    // 把全部数据写进 Hero 模型中去
    for (let cat of rawHeroes) {
      if (cat.name === '热门') {
        continue;
      }

      // 找到英雄分类
      const category = await Category.findOne({name: cat.name})

      cat.heroes = cat.heroes.map( hero => {
        hero.categories = [category]
        return hero
      })

      await Hero.deleteMany()
      await Hero.insertMany(cat.heroes)
    }
    res.send(await Hero.find())
  })

  router.get('/news/list', async (req, res) => {
    // 使用聚合查询 返回数据
    const parent = await Category.findOne({ name: '新闻分类'})

    const cats = await Category.aggregate([
      { $match: { parent: parent._id }},
      { $lookup:
        {
          from: 'articles', // Article model
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])

    // 添加热门
    const subCats = cats.map( cat => cat._id)
    
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
         categories: {$in: subCats} 
      }).populate('categories').limit(5).lean()
    })

    // 添加 分类名称如 公告/赛事等
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === "热门"
          ? news.categories[0].name
          : cat.name 

        return news
      })

      return cat
    })

    res.send(cats)
  })

  app.use('/web/api', router)
}