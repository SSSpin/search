module.exports = function(req, res, next) {
    //cors
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.success = function(data) { //结果成功方法
        res.json({
            status: '200',
            content: data
        });
    };
    res.error = function(err) { //结果失败方法
        res.json({
            code: err.code || 'UNKONW',
            message: err.message || ''
        });
    };
    next();
};