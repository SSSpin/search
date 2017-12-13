var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var userDao = require('../data/dao/user.js');
//注册
router.post('/', function(req, res, next) {
    var body = req.body;
    userDao.get('username', body.username).then((record) => {
        
        if (record.length) {
            res.error('用户名已存在！');
        } else {
            userDao.insert(body).then(() => {
                console.log('注册成功')
                res.success('注册成功');
            }, (err) => {
                res.error(err);
            });
        }
    });
});

module.exports = router;