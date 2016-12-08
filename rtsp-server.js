var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080;
var session      = require('express-session');
var fs = require('fs');
const url = require('url');
const dgram = require('dgram');
const RTPsocket; // udp packet
const RTCPsocket;
const RTCP_RCV_PORT = 19001 ; // port for client to receive RTP packet
var rtsp = require('rtsp-server');
var state = 0;
function requestHandler(req, res){
     var url_obj = url.parse(req.uri);
    console.log(req.method);
    switch (req.method) {
      case 'OPTIONS':
        res.setHeader('Public', ['DESCRIBE','SETUP','TEARDOWN','PLAY','PAUSE']);
        res.statusCode = 200;
        break;
      case 'ANNOUNCE':
        res.statusCode = 200;
        res.setHeader('CSeq', ['90']);
      case 'SETUP':
      //console.log(req);
      state = 1;

      var uri = req.uri;
      var trackId = uri.substring(uri.lastIndexOf('=')+1,uri.length);
      res.setHeader('Session', ['12345678']);
      res.setHeader('Transport',['RTP/AVP','unicast','client_port=5000-5001','ssrc=1234ABCD']);
      res.statusCode = 200;
//TODO set up video stream
      // RTPsocket = dgram.createSocket('udp4');
      // RTCPsocket =dgram.createSocket('udp4');
      // RTCPsocket.bind(RTCP_RCV_PORT);
      case 'RECORD':
      res.setHeader('Session', ['12345678']);
      res.statusCode = 200;
      default:
        res.statusCode = 501 // Not implemented 
    }

    res.end();
}
var server = rtsp.createServer(requestHandler);


 
server.listen(5000,function () {
  var port = server.address().port  // port = RTSPport
  console.log('RTSP server is running on port:', port)
})
