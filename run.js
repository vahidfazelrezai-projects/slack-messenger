var http = require('http');
var url = require('url');
var facebookChatAPI = require('facebook-chat-api');

// set environment variables from hidden 'env_vars.js' local file if possible
try{
    var env_vars = require('./env_vars');
    Object.keys(env_vars).forEach(function (env_var) {
        if (env_vars.hasOwnProperty(env_var)) {
            process.env[env_var] = env_vars[env_var];
        }
    });
    console.log('Using local env_vars file...')
} catch(err){
    if(err.code === 'MODULE_NOT_FOUND'){
        console.log("Couldn't find local env_vars file, assuming environment already configured...")
    }
    console.log(err);
}

// login, get api object, and set up messenger functionality
facebookChatAPI({email: process.env['FB_EMAIL'], password: process.env['FB_PASSWORD']}, function callback (err, api) {
    if(err) return console.error(err);

    var logger = require('./messenger/logger')(api);
    api.listen(logger);
});

// create echo server
http.createServer(function (req, res) {
	var suffix = url.parse(req.url).pathname.substring(1);
	res.end("Hello " + suffix);
}).listen(process.env.PORT || 5000);
