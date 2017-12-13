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
    search(keyword) {
        //return connect('select * from source where match(en,zh,ex_en,ex_zh) against("*'+ keyword +'*" in boolean mode);');
        return connect('select * from source where concat(en,zh,ex_en,ex_zh) like "%' + keyword + '%"');
    },
    get: function(attr, value) {
        return connect('select * from source where ' + attr + ' =' + value + ';');
    },
    insert: function(data, isBatch) {
        console.log('insert');
        console.log(data);
        if (!isBatch) {
            console.log('insert into source values(null,"' + data.en + '","' + data.zh + '","' + data.ex_en + '","' + data.ex_zh + '");');
            return connect('insert into source values(null,"' + data.en + '","' + data.zh + '","' + data.ex_en + '","' + data.ex_zh + '");');
        } else {
            var str = [];
            if (typeof data == 'Array') {
                throw new Error('batch insert need array data');
            }
            for (var i = 0; i < data.length; i++) {
                console.log('insert data:"' + data[i].en + '","' + data[i].zh + '","' + data[i].ex_en + '","' + data[i].ex_zh + '"');
                str.push('(null,"' + data[i].en + '","' + data[i].zh + '","' + data[i].ex_en + '","' + data[i].ex_zh + '")');

            }
            return connect('insert into source values ' + str.join(',') + ';');
        }
    },

    edit: function(data) {
        console.log('edit');
        console.log(data);
        return connect('update source set en="' + data.en + '",zh="' + data.zh + '",ex_en="' + data.ex_en + '",ex_zh="' + data.ex_zh + '" where id=' + data.id + ';');
    },
    remove: function(id) {
        return connect('delete from source where id=' + id + ';');
    }
}