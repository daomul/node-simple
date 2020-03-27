const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { access } =require('./src/utils/log')


//  session 数据
const SESSION_DATA = {}

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  let _date = new Date()
  _date.setTime(_date.getTime() + (24* 60 * 60 * 1000))
  return _date.toGMTString()
}

// 用户处理 post data 
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if(req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if(!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}

const serverHandle = (req, res) => {

  // 记录 access log 日志
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  // 设置返回格式为JSON
  res.setHeader('Content-type', 'application/json')


  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析query
  req.query = querystring.parse(url.split('?')[1])

  // 解析 cookie
  req.cookie = {}
  const cookiestr = req.headers.cookie || ''
  cookiestr.split(';').forEach(item => {
    if(!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const value = arr[1].trim   ()
    req.cookie[key] = value
  });
  
  // 解析 session 
  let needSetCookie = false
  let userId = req.cookie.userId
  if(userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]
  

  // 处理 post data
  getPostData(req).then(postData => {
    req.body = postData

    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if(needSetCookie) {
        // 操作 cookie ,path 设置为根路由
        // httpOnly： 只允许服务端修改不允许客户端修改
        // expires: 设置过期时间
        res.setHeader('Set-cookie', `userId=${userId};path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(blogData))
      })
      return
    }

    // 处理 user 路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if(needSetCookie) {
          res.setHeader('Set-cookie', `userId=${userId};path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 未命中路由
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 not found")
    res.end()
  })
}

module.exports = serverHandle
