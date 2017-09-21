// fetch ykt data from yikatong.tongji.edu.cn

const request = require('request')
const analyse = require('./analyse')


/* input: cookie - cookie of yikatong.tongji.edu.cn
          sdate  - start date
          edate  - end date
*/ 
var fetch = function(cookie, sdate, edate, callback) {

    const accUrl = 'http://192.168.40.15/User/GetCardInfoByAccountNoParm'
    const dataUrl = 'http://192.168.40.15/Report/GetPersonTrjn' 
    
    var headers= { 'Cookie': 'hallticket='+cookie };
    var accOption = {
        'url': accUrl,
        'method': 'POST',
        'json': true,
        'headers': headers
    };
    
    // fetch data
    request(accOption, function(err, res, data) {
        if (err || res.statusCode != 200) {
            // console.log('Network Error!');
            callback.send({'code':404, msg:'error'})
            return ;
        }
        var acc = JSON.parse(data.Msg).query_card.card[0].account
        if (acc) {
            var param = {
                "sdate": sdate,
                "edate": edate,
                "account": acc,
                "page"	: "1", // 不用改
                "rows"	: 30000
            };
            var dataOption = {
                'url': dataUrl,
                'method': 'POST',
                'json': true,
                'headers': headers,
                'formData': param
            };
            request(dataOption, function(err, res, data) {
                if (err || res.statusCode != 200) {
                    // console.log('Network Error!');
                    callback.send({'code':404, msg:'error'})
                    return ;
                }
                var res = analyse(data);
                // console.log(res)
                callback.send({'code':200, 'msg':res})
                
            })
        }
    });
}

module.exports = fetch;
