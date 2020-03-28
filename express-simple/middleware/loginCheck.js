/**
 * @authro zeroZheng
 * @description 登陆校验中间件
 * @createtime 2020-02-01
*/
const { ErrorModel} =require('../model/resModel')

module.exports = (req, res, next) => {
    if (req.session.username) {
        next()
        return
    }
    res.json(
        new ErrorModel('未登录')
    )
}