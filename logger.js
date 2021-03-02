const EventEmitter = require('events');
class Logger extends EventEmitter {
    log(message) {
        // this.emit('messageLogged', { id: 1, url: 'http://' });
        this.emit('messageLogged', message);
    }
}

module.exports = Logger;