function sayHello(name) {
    console.log(`Hello ${name}`);
}
const Logger = require('./logger');
const logger = new Logger();
logger.on('messageLogged', (data) => {
    sayHello(data);
});
logger.log('Robert');
logger.log('Robert Hung Nguyen');