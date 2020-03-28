/**
 * @authro zeroZheng
 * @description 封装 mysql 数据库链接和访问工具方法、统一执行函数;
 *              利用 mysql的 escape 预防SLQ注入
 * @createtime 2020-02-01
*/

const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建链接对象
const connection = mysql.createConnection(MYSQL_CONF)

// 开始链接
connection.connect()

// 统一执行SQL函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            } else {
                resolve(result)
            }
        })
    })
    return promise
}

module.exports = { 
    exec,
    escape: mysql.escape
}