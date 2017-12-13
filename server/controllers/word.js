var express = require('express');
var router = express.Router();
var wordDao = require('../data/dao/word.js');
var wordAudit = require('../data/dao/wordAudit.js');
router.get('/:id', function(req, res, next) {
    wordDao.get('id', req.params.id).then((data) => {
        res.success(data);
    });
});
//添加词汇
router.post('/', function(req, res, next) {
    console.log(req.token_data)
    var user = req.token_data;
    req.body.userId = user.id;
    req.body.userName = user.username;
    req.body.auditLevel = user.level;
    req.body.createTime = new Date().getTime();
    req.body.updateTime = new Date().getTime();
    wordAudit.insert(req.body).then(() => {
        res.success('success');
    });
});
//修改词汇
router.put('/', function(req, res, next) {
    var user = req.token_data;
    req.body.userId = user.id;
    req.body.userName = user.username;
    req.body.auditLevel = user.level;
    req.body.createTime = new Date().getTime();
    req.body.updateTime = new Date().getTime();
    req.body.wordId=req.body.id;
    console.log(req.body);
    wordAudit.insert(req.body).then(() => {
        res.success('success');
    });
});

module.exports = router;