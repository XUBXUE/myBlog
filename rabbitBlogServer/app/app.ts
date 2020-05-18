import express = require('express');
import Scanner from './utils/scanner';

const app:express.Application = express();
new Scanner().buildRouter('./app/controller');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
app.use(cookieParser());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 跨域配置 本地调试使用
// app.use(function(req, res, next) {
//   // console.log(req.headers);
//   res.header("Access-Control-Allow-Origin", 'http://localhost:8080');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, wec-access-token, Set-Cookie");
//   res.header("Access-Control-Allow-Credentials", "true");

//   next();
// });
app.listen(8088,function() {
  console.log('Example app listening on port 8088!');
});
global.app = app; //声明为全局