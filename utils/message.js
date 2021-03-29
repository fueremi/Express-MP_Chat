const moment = require('moment');

function formatMessage(username, text){
    return {
        username,
        text,
        time: moment().zone('+07:00').format('h:mm a')
    }

}

module.exports = formatMessage;