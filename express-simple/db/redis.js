/**
 * @authro zeroZheng
 * @description 封装 redis 处理工具函数
 * @createtime 2020-02-01
*/

const redis = require('redis')
const REDIS_CONF = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error('err')
})

module.exports = redisClient