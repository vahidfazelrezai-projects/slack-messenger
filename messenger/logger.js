// logger relays all received messages into thread with id LOG_ID (except messages in log thread)
module.exports = function (api) {
    return function (err, message) {
        if (message.threadID != process.env['LOG_ID']) {
            api.sendMessage('[' + message.senderName + '] ' + message.body, process.env['LOG_ID']);
        }
    }
};
