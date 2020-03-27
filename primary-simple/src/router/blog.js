/**
 * @authro zeroZheng
 * @description demo博客模块：统一路由处理
 * @createtime 2020-02-01
*/

const { getList, getDetail, newBlog, updateBlog,delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel} = require('../model/resModel')

// 统一的登陆验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登陆！')
    )
  }
}

const handleBlogRouter = (request, response) => {

  const method = request.method
  const id = request.query.id

  // 获取博客列表
  if (method === 'GET' && request.path === '/api/blog/list'){
    let author = request.query.author || ''
    const keyword = request.query.keyword || ''
    const isadmin = request.query.isadmin

    // 必须只能查询到自己的博客管理界面
    if (isadmin) {
      const loginCheckResult = loginCheck(request)
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult
      }
      author = request.session.username
    }

    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if (method === 'GET' && request.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  //新建博客
  if (method === 'POST' && request.path === '/api/blog/new') {
    const loginCheckResult = loginCheck(request)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    request.body.author = request.session.username
    const result = newBlog(request.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  //更新博客
  if (method === 'POST' && request.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(request)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }

    const result = updateBlog(id, request.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  //删除博客
  if (method === 'POST' && request.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(request)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    const author = request.session.username
    const result = delBlog(id, author)
    return result.then(data => {
      if (data) {
        return new SuccessModel(result)
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
    
  }
}

module.exports = handleBlogRouter
