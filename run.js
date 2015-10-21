var login = require('facebook-chat-api');
var config = require('./config')

// Create simple echo bot
login({email: config.FB_EMAIL, password: config.FB_PASSWORD}, function callback (err, api) {
    if(err) return console.error(err);

    api.listen(function callback(err, message) {
        api.sendMessage(message.body, config.id.faz);
    });
});
