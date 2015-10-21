var login = require('facebook-chat-api');

// set environment variables from hidden local file if not existing
if (process.env['SET_ENV'] != 'true') {
    var env_vars = require('./env_vars');
    process.env['SET_ENV'] = env_vars.SET_ENV;
    process.env['FB_EMAIL'] = env_vars.FB_EMAIL;
    process.env['FB_PASSWORD'] = env_vars.FB_PASSWORD;
    process.env['FAZ_ID'] = env_vars.FAZ_ID;
}

// Create simple echo bot
login({email: process.env['FB_EMAIL'], password: process.env['FB_PASSWORD']}, function callback (err, api) {
    if(err) return console.error(err);

    api.listen(function callback(err, message) {
        api.sendMessage('[' + message.senderName + '] ' + message.body, process.env['FAZ_ID']);
    });
});



var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
	var suffix = url.parse(req.url).pathname.substring(1);
	res.end("Hello " + suffix);
}).listen(process.env.PORT || 5000);
