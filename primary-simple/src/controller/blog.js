/**
 * @authro zeroZheng
 * @description demo博客模块：代码逻辑控制
 * @createtime 2020-02-01
*/

const xss = require('xss')
const {exec} = require('../db/mysql')


// 查询博客列表
const getList = (author, keyword) => {
  author = xss(author)
  keyword = xss(keyword)

  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  return exec(sql)
}

// 获取博客详情
const getDetail = (id) => {
  id = xss(id)
  const sql = `select * from blogs where id=${id}`
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

// 新建博客
const newBlog = (blogBody = {}) => {
  const title = xss(blogBody.title)
  const content = xss(blogBody.content)
  const author = xss(blogBody.author)
  const createtime = Date.now()
  const sql = `insert into blogs (title, content, createtime, author)
               values (${title}, ${content}, ${createtime}, ${author})`
   return exec(sql).then(data => {
     console.log(data)
     return {
       id: data.insertId
     }
   })
}

// 更新博客
const updateBlog = (id, blogBody = {}) => {
  const title = xss(blogBody.title)
  const content = xss(blogBody.content)
  const sql = `update blogs set title=${title}, content=${content} where id=${id}`
  return exec(sql).then(result => {
    console.log(result)
    return (result.affectedRows > 0)
  })
}

// 删除博客
const delBlog = (id, author) => {
  id = xss(id)
  const sql = `delete from blogs where id=${id}`
  return exec(sql).then(result => {
    return (result.affectedRows > 0)
  })
}


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
