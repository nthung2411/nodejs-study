// function sayHello(name) {
//     console.log(`Hello ${name}`);
// }
// const Logger = require('./logger');
// const logger = new Logger();
// logger.on('messageLogged', (data) => {
//     sayHello(data);
// });
// logger.log('Robert');
// logger.log('Robert Hung Nguyen');

const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3, 4]));
        res.end();
    }
});
server.listen(3000);
console.log(`Listening on port 3000...`);