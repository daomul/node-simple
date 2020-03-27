/**
 * @authro zeroZheng
 * @description 启动服务
 * @createtime 2020-02-01
*/

const http = require('http')
const port = 8000
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(port)
console.log('localhost:8000')


