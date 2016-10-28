var express = require('express');
var app = express();
var rcow = require('cowsay');
var morgan = require('morgan');
//var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080;
var session      = require('express-session');
var fs = require('fs');

var rtsp = require('rtsp-server')

function requestHandler(req, res){
  console.log(req.method, req.url)
   
    switch (req.method) {
      case 'OPTIONS':
        res.setHeader('Public', 'OPTIONS')
        break
      default:
        res.statusCode = 501 // Not implemented 
    }
    res.end('hi there'); // will echo the CSeq header used in the request 
}
var server = rtsp.createServer(requestHandler);
 
server.listen(5000,function () {
  var port = server.address().port
  console.log('RTSP server is running on port:', port)
})
