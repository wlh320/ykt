// console.save
// modified from https://github.com/Decad/Console.save
(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            // data = JSON.stringify(data, undefined, 4);
            // 防止跨域,把json当js引入了
            data = "data={'data':"+JSON.stringify(data, undefined, 4)+"}";
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

// 开始时间
var sdate = "2014-09-01";
// 结束时间
var edate = "2017-06-30";
// 你的编号,获取方法看readme
var account = "123456";
// 查询多少条记录
var rows = "15";

$.ajax({
    url: 'http://yikatong.tongji.edu.cn/Report/GetPersonTrjn',
    type: 'POST',
    dataType: 'json',
    data : {
        "sdate": sdate,
        "edate": edate,
        "account": account,
        "page"	: "1", // 不用改
        "rows"	: rows
    },
    success: function(res) {
        console.save(res.rows, 'ykt.json');
    },
    error: function(error) {
        alert('error');
    }
});
