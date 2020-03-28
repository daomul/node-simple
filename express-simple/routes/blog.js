var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

// 获取博客列表
router.get('/list', (req, res, next) => {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  const isadmin = req.query.isadmin

  // 必须只能查询到自己的博客管理界面
  if (isadmin) {
    if (!req.session.username) {
      res.json(new ErrorModel('未登录'))
      return
    }
    author = req.session.username
  }
  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});

// 获取博客详情
router.get('/detail', (req, res, next) => {
  const id = req.query.id
  if (id) {
    const result = getDetail(req.query.id)
    return result.then(data => {
      res.json(new SuccessModel(data))
    })
  } else {
    res.json(new ErrorModel('ID无效'))
  }
})

//新建博客
router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
})

//更新博客
router.patch('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  return result.then(val => {
    if (val) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
})

// 删除博客
router.patch('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
    const result = delBlog(req.query.id, author)
    return result.then(data => {
      if (data) {
        res.json(new SuccessModel())
      } else {
        res.json(new ErrorModel('更新博客失败'))
      }
    })
})

module.exports = router;
