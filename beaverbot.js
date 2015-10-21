var login = require('facebook-chat-api');

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

// login and get api object
login({email: process.env['FB_EMAIL'], password: process.env['FB_PASSWORD']}, function callback (err, api) {
    if(err) return console.error(err);

    // logger relays all received messages into thread with id LOG_ID (except messages in log thread)
    api.listen(function callback(err, message) {
        if (message.threadID != process.env['LOG_ID']) {
            api.sendMessage('[' + message.senderName + '] ' + message.body, process.env['LOG_ID']);
        }
    });
});
