const env = process.env.NODE_ENV  // 环境参数

// 配置

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

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'blog-simple'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        hsot: '127.0.0.1'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'blog-simple'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        hsot: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}