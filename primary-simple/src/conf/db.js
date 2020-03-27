/**
 * @authro zeroZheng
 * @description 封装环境变量参数以及基本配置
 * @createtime 2020-02-01
*/

// 环境变量参数
const env = process.env.NODE_ENV    

// mysql配置
let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blog-simple'
}

// redis 配置
let REDIS_CONF = {
    port: 6379,
    hsot: '127.0.0.1'
}

// if (env === 'dev') {
//     MYSQL_CONF = {
//         host: 'localhost',
//         user: 'root',
//         password: '123456',
//         port: '3306',
//         database: 'blog-simple'
//     },
//     REDIS_CONF = {
//         port: 6379,
//         hsot: '127.0.0.1'
//     }
// }

// if (env === 'production') {
//     MYSQL_CONF = {
//         host: 'localhost',
//         user: 'root',
//         password: '123456',
//         port: '3306',
//         database: 'blog-simple'
//     },
//     REDIS_CONF = {
//         port: 6379,
//         hsot: '127.0.0.1'
//     }
// }

module.exports = {  MYSQL_CONF  }