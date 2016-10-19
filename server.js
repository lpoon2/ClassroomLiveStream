var express = require('express');
var app = express();
var rcow = require('cowsay');
var morgan = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080;
var session      = require('express-session');
var fs = require('fs');
// var readableStream = fs.createReadStream('');
// var writeStream = fs.createWriteStream('');
// readableStream.setEncoding('utf8'); // input data encode type is unknonw yet
server = http.createServer( function(request, response) {
  var params = request.url.substr(1).split('/');
  	if( params[0] == STREAM_SECRET ) {
  		width = (params[1] || 320)|0;
  		height = (params[2] || 240)|0;
          // broadcast data in base64 format
          if('base64' == STREAM_FORMAT) {
              var data = [], dataLen = 0;
              request.on('data', function (chunk) {
                  data.push(chunk);
                  dataLen += chunk.length;
              });
              request.on('end', function (chunk) {
                  var buf = new Buffer(dataLen);
                  for (var i = 0, len = data.length, pos = 0; i < len; i++) {
                      data[i].copy(buf, pos);
                      pos += data[i].length;
                  }
                  socketServer.broadcast(buf, {binary: false});
              });
          // broadcast data in binary format
          }else{
              console.log(
                      'Stream Connected: ' + request.socket.remoteAddress +
                      ':' + request.socket.remotePort + ' size: ' + width + 'x' + height
              );
              request.on('data', function(date) {
                  socketServer.broadcast(date, {binary: true});
              });
          }
  	}else {
  		console.log(
  			'Failed Stream Connection: '+ request.socket.remoteAddress +
  			request.socket.remotePort + ' - wrong secret.'
  		);
  		response.end();
  	}

  }).listen(STREAM_PORT);
host = '127.0.0.1';
//server.listen(port, host);
//console.log('Listening at http://' + host + ':' + port);
app.set('json spaces', 4);
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));
console.log('Listening for MPEG Stream on http://127.0.0.1:'+STREAM_PORT+'/<secret>/<width>/<height>');
console.log('Awaiting WebSocket connections on ws://127.0.0.1:'+WEBSOCKET_PORT+'/');
// app.listen(port);
// console.log("App listening on port" + port);
//console.log("Linkedin URL:" + proxyhost);
