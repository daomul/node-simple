/**
 * @authro zeroZheng
 * @description demo用户模块：统一路由处理
 * @createtime 2020-02-01
*/

const {loginByPassword} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')


const handleUserRouter = (request, response) => {

  const method = request.method

  // 登陆
  if (method === 'POST' && request.path === '/api/user/login') {
    const { username, password } = request.body
    const result = loginByPassword(username, password)
    return result.then(data => {
      if (data.username)  {
        request.session.username = data.username
        request.session.realname = data.realname
        console.log('req.session =', request.session)
        return new SuccessModel()
      } else {
        return new ErrorModel('登陆失败')
      }
    })
  }

  // 测试
  if (method === 'GET' && request.path === '/api/user/login-test') {
    if (request.session.username)  {
      return Promise.resolve(new SuccessModel({
        session: request.session
      }))
    } else {
      return Promise.resolve(new ErrorModel('登陆失败'))
    }
  }
}

module.exports = handleUserRouter
