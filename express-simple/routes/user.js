var express = require('express');
var router = express.Router();

const { loginByPassword } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET users listing. */
router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  const result = loginByPassword(username, password)
  return result.then(data => {
    if (data.username) {
      req.session.username = data.username
      req.session.realname = data.realname
      res.json(new SuccessModel())
      return
    } else {
      res.json(new ErrorModel('登陆失败'))
    }
  })
});

// test
router.get('/logintest', (req, res, next) => {
  if (req.session.username) {
    res.json({success: true})
  } else {
    res.json({success: false})
  }

})

module.exports = router;
