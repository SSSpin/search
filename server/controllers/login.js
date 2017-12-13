var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var userDao = require('../data/dao/user.js');
//登陆
router.post('/', function(req, res, next) {
    var body = req.body;
    userDao.get('username', body.username).then((record) => {

        if (!record.length) {
            res.error('认证失败，用户名找不到');
        }
        if (record[0].password !== body.password) {
            res.error('认证失败，密码错误');
        } else {
            var token = jwt.sign({
                username:record[0].username,
                id:record[0].id,
                level:record[0].level
            }, 'app.get(superSecret)'/*, {
                'expiresInMinutes': 1440 // 设置过期时间
            }*/);
            res.success({
                token: token
            });
        }
    });
});

module.exports = router;