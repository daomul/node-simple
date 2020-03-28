const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
    constructor() {
        // 存放中间件的列表
        this.routes = {
            all: [],    // app.use(...)
            get: [],    // app.get(...)
            post: []    // app.post(...)
        }
    }
    register(path) {
        const info = {}

        // 路由的处理
        if (typeof path === 'string') {
            info.path = path
            // 从第二个参数开始转化为数组，存入 stack
            info.stack = slice.call(arguments, 1)
        } else {
            info.path = '/'
            // 从第一个参数开始转化为数组，存入 stack
            info.stack = slice.call(arguments, 1)
        }
        return info
    }

    use() {
        // 把当前传入的所有参数传入到 register 当中
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }
    
    get() {
        // 把当前传入的所有参数传入到 register 当中
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }

    post() {
        // 把当前传入的所有参数传入到 register 当中
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }

    // 处理匹配到的 path, 核心 next 机制
    handle(req, res, stack) {
        const next = () => {
            // 拿到第一个匹配的中间件
            const middleware = stack.shift()
            if (middleware) {
                // 执行中间件函数
                middleware(req, res, next)
            }
        }
        next()
    }

    // 匹配path是否符合 api url 
    match(method, url) {
        let stack = []
        if (url === '/favicon.ico')  {
            return stack
        }

        // 获取 routes
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all)
        curRoutes = curRoutes.concat(this.routes[method])

        curRoutes.forEach(routeInfo => {
            // url 和 roouteInfo.path 的匹配
            if (url.indexOf(routeInfo.path) === 0) {
                stack = stack.concat(routeInfo.stack)
            }
        })
        return stack
    }

    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(JSON.stringify(data))
            }

            const url = req.url
            const method = req.method.toLowerCase()

            const resultList = this.match(method, url)
            this.handle(req, res, resultList)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}



module.exports = LikeExpress