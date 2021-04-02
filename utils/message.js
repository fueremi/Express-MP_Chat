const moment = require('moment');

function formatMessage(username, text){
    return {
        // Username of message came from
        username,
        // Message that user send 
        text,
        // Formatted timezone to Jakarta/Indonesia timezone
        time: moment().zone('+07:00').format('h:mm a')
    }

}

module.exports = formatMessage;