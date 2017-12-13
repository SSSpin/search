var express = require('express');
var router = express.Router();
var wordDao = require('../data/dao/word.js');
var wordAuditDao = require('../data/dao/wordAudit.js');
var CONSTANT = require('../common/constants.js');
router.get('/', function(req, res, next) {
    var level = req.token_data.level;
    wordAuditDao.get('auditLevel', Math.max(level - 1, CONSTANT.AUDIT_LEVEL.LOW)).then((data) => {
        res.success(data);
    });
})
router.get('/:id', function(req, res, next) {
    wordDao.get('id', req.params.id).then((data) => {
        res.success(data);
    });
});
//审核词汇
router.put('/', function(req, res, next) {
    var body = req.body;
    var isAccept = body.isAccept;
    var auditId = body.id;
    var tokenData = req.token_data;
    wordAuditDao.get('id', auditId).then((auditRecords) => {
        let auditRecord = {};
        if (!auditRecords.length) {
            res.error({ code: 1, message: '没有该词汇' });
            return;
        } else {
            auditRecord = auditRecords[0];
        }
        if (tokenData.level <= auditRecord.auditLevel) {
            res.error({ code: 2, message: '没有权限审核该词条' });
            return;
        }
        if (isAccept) {
            //接受，升级
            if (auditRecord.auditLevel >= CONSTANT.AUDIT_LEVEL.MEDIUM) {
                //最高级审核通过
                if (auditRecord.wordId) {
                    //修改词汇
                    wordDao.edit(auditRecord).then(() => {
                        wordAuditDao.remove(auditRecord.id);
                        res.success('success');
                    });
                } else {
                    //添加词汇
                    wordDao.insert(auditRecord).then(() => {
                        wordAuditDao.remove(auditRecord.id);
                        res.success('success');
                    });
                }

            } else {
                auditRecord.auditLevel = CONSTANT.AUDIT_LEVEL.MEDIUM;
                //中级审核通过
                wordAuditDao.edit(auditRecord).then(() => {
                    res.success('success');
                });
            }
        } else {
            //拒绝， 降级
            auditRecord.auditLevel = CONSTANT.AUDIT_LEVEL.LOW;
            wordAuditDao.edit(auditRecord).then(() => {
                res.success('success');
            });
        }
    });
});

module.exports = router;