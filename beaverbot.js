var login = require('facebook-chat-api');

// set environment variables from hidden local file if not existing
if (process.env['ENV_VERSION'] != '0') {
    var env_vars = require('./env_vars');
    for (var env_var in env_vars) {
        if (env_vars.hasOwnProperty(env_var)) {
            process.env[env_var] = env_vars[env_var];
        }
    }
}

// login and get api object
login({email: process.env['FB_EMAIL'], password: process.env['FB_PASSWORD']}, function callback (err, api) {
    if(err) return console.error(err);

    // logger
    api.listen(function callback(err, message) {
        if (message.threadId != process.env['LOG_ID']) {
            api.sendMessage('[' + message.senderName + '] ' + message.body, process.env['LOG_ID']);
        }
    });
});
