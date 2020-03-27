
/**
 * @authro zeroZheng
 * @description 使用 stream 日志记录
 * @createtime 2020-02-01
*/

const fs = require('fs')
const path = require('path')


// 写访问日志
const accessWriteStream = createWriteStream('access.log')
// const errorWriteStream = createWriteStream('error.log')
// const eventWriteStream = createWriteStream('event.log')

/**
 * 生成 项目自身的 writeStream
 * @param fileName 文件名
 * @returns writeStream 写入流
 * */ 
function createWriteStream(fileName) {
    // __dirname 当前JS的目录
    // flags: 'a' 累加，不会在重启后清空
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

/**
 * 写日志
 * @param writeStream 写入流
 * @param log 写入的日志数据信息
 * */ 
function writeLog (writeStream, log) {
    writeStream.write(log + '\n')
}


/**
 * 写访问日志
 * @param log 日志信息
*/
function access (log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}

// 异步读取文件内容
// 文件IO，网络IO