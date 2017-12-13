var express = require('express');
var router = express.Router();
var userDao = require('../data/dao/user.js');
var CONSTANT = require('../common/constants.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
    var tokenData = req.token_data;
    var userLevel = tokenData.level;
    var level = userLevel;
    if (userLevel == CONSTANT.AUDIT_LEVEL.LOW) {
        res.success([]);
        return;
    } else
    if (userLevel == CONSTANT.AUDIT_LEVEL.MEDIUM) {
        level = CONSTANT.AUDIT_LEVEL.LOW;

    } else {
        level = CONSTANT.AUDIT_LEVEL.MEDIUM;
    }
    userDao.getList('level', level).then((result) => {
        let r = [];
        result.forEach((c) => {
            r.push(Object.assign(c, {
                password: ''
            }));
        })
        res.success(r);
    });
});

//审核词汇
router.put('/', function(req, res, next) {
    var body = req.body;
    var isUpgrade = body.isUpgrade;
    var userId = body.userId;
    var tokenData = req.token_data;
    userDao.get('id', userId).then((userRecords) => {
        let userRecord = {};
        if (!userRecords.length) {
            res.error({ code: 3, message: '没有该用户' });
            return;
        } else {
            userRecord = userRecords[0];
        }
        console.log(tokenData.level);
        console.log(userRecords);
        if (tokenData.level <= userRecord.level) {
            res.error({ code: 4, message: '没有权限修改用户权限' });
            return;
        }

        if (isUpgrade) {
            console.log(CONSTANT.AUDIT_LEVEL.HIGH)
            //接受，升级
            userRecord.level = Math.min(userRecord.level + 1, CONSTANT.AUDIT_LEVEL.HIGH);
            //中级审核通过
            userDao.edit(userRecord).then(() => {
                res.success('success');
            });

        } else {
            //拒绝， 降级
            userRecord.level = Math.max(userRecord.level - 1, CONSTANT.AUDIT_LEVEL.LOW);
            userDao.edit(userRecord).then(() => {
                res.success('success');
            });
        }
    });
});
module.exports = router;