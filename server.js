var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080;
var session      = require('express-session');
var fs = require('fs');
// var readableStream = fs.createReadStream('');
// var writeStream = fs.createWriteStream('');
// readableStream.setEncoding('utf8'); // input data encode type is unknonw yet
app.set('json spaces', 4);
app.use(exprezss.static(__dirname));
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

app.listen(port);
console.log("App listening on port" + port);
//console.log("Linkedin URL:" + proxyhost);
