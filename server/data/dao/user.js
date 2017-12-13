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
    getList: function(attr, value) {

        return connect('select * from user where ' + attr + ' <= "' + value + '";');
    },
    get: function(attr, value) {

        return connect('select * from user where ' + attr + ' = "' + value + '";');
    },
    insert: function(data) {
        console.log('insert into user values(null,"' + data.username + '","' + data.password + '","' + data.level + '");');
        return connect('insert into user values(null,"' + data.username + '","' + data.password + '","' + data.level + '");');

    },

    edit: function(data) {
        console.log(data);
        return connect('update user set username="' + data.username + '",level="' + data.level + '" where id=' + data.id + ';');
    }
}