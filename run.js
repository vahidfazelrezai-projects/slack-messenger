var http = require('http');
var url = require('url');

// create echo server
http.createServer(function (req, res) {
	var suffix = url.parse(req.url).pathname.substring(1);
	res.end("Hello " + suffix);
}).listen(process.env.PORT || 5000);

// run beaverbot
require('./beaverbot');
