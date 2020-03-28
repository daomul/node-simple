/**
 * @authro zeroZheng
 * @description demo用户模块：代码逻辑控制
 * @createtime 2020-02-01
*/

const { exec, escape } = require('../db/mysql')
const { getPassword } = require('../utils/cryp')

const loginByPassword = (username, password) => {
    username = escape(username)
    password = getPassword(password)
    password = escape(password)
    const sql = `select username, realname from users where username=${username} and password=${password}`
    console.log(sql)
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    loginByPassword
}