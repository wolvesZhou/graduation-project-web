/**
 * Created by Administrator on 2017/1/18.
 */

var express = require('express');
var path = require('path');
var petData = require('./server/petDataBase');
var bodyParser = require('body-parser');
//var ejs = require('ejs')

var app = express();
app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Cache-Control");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By",' 3.2.1');
    next()
})

app.use('/petTest',petData);


// app.get('/', function (req, res) {
//     res.render('index');
// });
//
// // 设置views路径和模板
// app.set('views', './src/view');
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);
//
// // 静态文件配置
// app.use('/src/static', express.static(path.join(__dirname, 'src/static')));

// 启动一个服务，监听从8888端口进入的所有连接请求
// var server = app.listen(8888, function(){
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log('Listening at http://%s:%s', host, port);
// });

app.get('/', function (req, res) {
    res.send('Hello world!');
    res.json(req.body);
});
app.listen(3000);