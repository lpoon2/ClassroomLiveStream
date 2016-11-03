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
const url = require('url');
//var transform = require('sdp-transform');

var rtsp = require('rtsp-server');

function requestHandler(req, res){
  //  console.log(req);
    console.log(res);
     var url_obj = url.parse(req.uri);
  //var url_obj  = transform.parse(sdpStr);

  console.log(req.method, url_obj);
    url_obj.session = {
        //TODO: put session information
    };
    switch (req.method) {
      case 'OPTIONS':
        res.setHeader('Public', ['DESCRIBE','SETUP','TEARDOWN','PLAY','PAUSE']);
        res.statusCode = 200;
        break;
      case 'ANNOUNCE':
        res.statusCode = 200;
        console.log("announce!");
      default:
        res.statusCode = 501 // Not implemented 
    }
   // res.end('hi there'); // will echo the CSeq header used in the request 
    res.end();
}
var server = rtsp.createServer(requestHandler);
 
server.listen(5000,function () {
  var port = server.address().port
  console.log('RTSP server is running on port:', port)
})
