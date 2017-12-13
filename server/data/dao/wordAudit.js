function connect(queryString) {

    return new Promise((resolve, reject) => {
        global.pool.getConnection((err, con) => {
            if (err) {
                throw new Error(err);
            } else {
                con.query(queryString, (err, res, fields) => {
                    con.release();
                    resolve(res);
                    if (err) {
                        reject(err);
                        throw err;
                    }
                });
            }
        });
    });
};

module.exports = {

    get: function(attr, value) {
        return connect('select * from source_audit where ' + attr + ' =' + value + ';');
    },
    /*
    en zh ex_en ex_zh userId userName auditLevel
     */
    insert: function(data, isBatch) {
        console.log('insert into source_audit values(null,"' + data.en + '","' + data.zh + '","' + data.createTime + '","' + data.updateTime + '","' + data.ex_en + '","' + data.ex_zh + '","' + data.userId + '","' + data.userName + '","' + data.auditLevel + '",' + (data.wordId == undefined ? 'null' : ('"' + data.wordId + '"')) + ');');
        return connect('insert into source_audit values(null,"' + data.en + '","' + data.zh + '","' + data.createTime + '","' + data.updateTime + '","' + data.ex_en + '","' + data.ex_zh + '","' + data.userId + '","' + data.userName + '","' + data.auditLevel + '",' + (data.wordId == undefined ? 'null' : ('"' + data.wordId + '"')) + ');');
    },
    edit: function(data) {
        data.updateTime = new Date().getTime();

        return connect('update source_audit set en="' + data.en + '",zh="' + data.zh + '",createTime="' + data.createTime + '",updateTime="' + data.updateTime + '",ex_en="' + data.ex_en + '",ex_zh="' + data.ex_zh + '",userName="' + data.userName + '",userId="' + data.userId + '",auditLevel="' + data.auditLevel + (data.wordId == undefined ? '",wordId="' + data.wordId : '') + '" where id=' + data.id + ';');
    },
    remove: function(id) {
        return connect('delete from source_audit where id=' + id + ';');
    }
}