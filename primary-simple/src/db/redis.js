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

// set handler
function set (key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, reddis.print)
}

// 异步 get handler 
function get (key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            // 主要是针对格式的处理，catch处理格式异常情况
            try {
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(val)
            }
            
        })
    })
    return promise
}