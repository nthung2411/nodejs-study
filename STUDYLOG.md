# 02/03/2021
- There is no `window` object in Node
- There is `global` object in Node, which is global.
- Unlike browser application, defined variables are not added to `global` object.
- Every file in a Node application is a module. Node automatically wraps the code
in each file with an IIFE (Immediately-invoked Function Expression) to create
scope. So, variables and functions defined in one file are only scoped to that file
and not visible to other files unless explicitly exported.
- To export a variable or function from a module, you need to add them to module.exports:
```javascript
const sayHello = () => { console.log('Hello') };
module.exports.sayHello = sayHello; // export object { sayHello: function }
module.exports = sayHello; // export function
```
To load a module, use the `require` function. This function returns the
module.exports object exported from the target module:
```javascript
const logger = require("./logger");
```
- Node has a few built-in modules that enable us to work with the file system, path
objects, network, operating system, etc.
- EventEmitter is one of the core classes in Node that allows us to raise (emit) and
handle events. Several built-in classes in Node derive from EventEmitter.
```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();
```
- To create a class with the ability to raise events, we should extend EventEmitter:
```javascript
class Logger extends EventEmitter { }
```