(function(){
    var express = require('express')
    var bodyParser = require('body-parser')
    var fetch = require('./fetch')
    
    var app = express()
    
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    app.use(express.static(__dirname + '/static'));
    
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
       
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/static/index.html')
    });
    
    app.post('/analyse', function(req, res) {
    
        var form = req.body;
        fetch(form.cookie, form.sdate, form.edate, res);
    
    });
    
    app.listen(3000, function() {
        console.log('server is listening...')
    });
    
    module.exports = app;

}()); 

