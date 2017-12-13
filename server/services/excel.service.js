var xlsx = require('node-xlsx');
var fs = require('fs');
module.exports = {
    read(path) {
        var sheetArray = xlsx.parse(path);
        var formatedData = [];
        for (var s = 0; s < sheetArray.length; s++) {
            var d = sheetArray[s].data;
            if (d.length) {
                for (var r = 0; r < d.length; r++) {
                    if (r) {
                        formatedData.push({
                            en: d[r][0],
                            zh: d[r][1],
                            ex_en: d[r][2]&&d[r][2].replace(',','\,'),
                            ex_zh: d[r][3]&&d[r][3].replace(',','\,')
                        });
                    }
                }
            } else {
                console.log(sheetArray[s].data.name+ ' has no data');
            }

        }
        
        return formatedData;
    }
}