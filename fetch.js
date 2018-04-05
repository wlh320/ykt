// fetch ykt data from yikatong.tongji.edu.cn
const request = require("request");
const analyse = require("./analyse");

/* input: cookie - cookie of yikatong.tongji.edu.cn
          sdate  - start date
          edate  - end date
*/

var fetch = function(cookie, sdate, edate, callback) {
  const accUrl = "http://192.168.40.15/User/GetCardInfoByAccountNoParm";
  const dataUrl = "http://192.168.40.15/Report/GetPersonTrjn";

  var headers = {
    Host: "192.168.40.15",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64; rv:59.0) Gecko/20100101 Firefox/59.0",
    "Accept-Language": "zh-CN,en-US;q=0.7,en;q=0.3",
    "Accept-Encoding": "gzip, deflate",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    Cookie: "hallticket=" + cookie
  };
  var accOption = {
    url: accUrl,
    method: "POST",
    json: true,
    headers: headers
  };

  // fetch data
  request(accOption, function(err, res, data) {
    if (err || res.statusCode != 200) {
      callback.send("fetch-success", { code: 404, msg: "error" });
      return;
    }
    var acc = JSON.parse(data.Msg).query_card.card[0].account;
    if (acc) {
      var param = {
        sdate: sdate,
        edate: edate,
        account: acc,
        page: "1",
        rows: 30000
      };
      var dataOption = {
        url: dataUrl,
        method: "POST",
        json: true,
        headers: headers,
        formData: param
      };
      request(dataOption, function(err, res, data) {
        if (err || res.statusCode != 200) {
          callback.send("fetch-success", { code: 404, msg: "error" });
          return;
        }
        var res = analyse(data);
        callback.send("fetch-success", { code: 200, msg: res });
      });
    }
  });
};

module.exports = fetch;
