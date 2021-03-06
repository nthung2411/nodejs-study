# Getting Started 02/03/2021
## What is Node
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
## Http module
- use http module to create Server on port 3000
```javascript
const http= require('http');
const server = http.createServer();
server.listen(3000);
```
- extend for specific API endpoints
```javascript
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
```
NOTE: this is basic usage on how to create APIs using nodejs, 
but it is not recommended since the more endpoints written, the more complicated your code will be.
Using `Express` will give more structure sense to maintain.

## Node Package Manager, aka npm
- `npm i -g npm` install the latest npm globally.
## Package.json
- `npm init` add package.json
- walkthrough all the questions
## Installing a Node package
- `npm i underscore`
- `underscore` will appear inside `dependencies`
- understand what inside `node_modules`
- `npm i underscore --save` is the same `npm i underscore`
- using the installed package
```javascript
var _ = require('underscore'); // getting underscore package
var _ = require('./underscore'); // getting file underscore.js or underscore/index.js
```
## Package dependencies
- `npm i mongoose`
- in package.json
```javascript
"dependencies": {
    "mongoose": "^5.11.19",
    "underscore": "^1.12.0"
}
```
- in `node_modules`, alot of files, which are required dependencies of `mongoose`
- in term of dependency conflict, then the required dependencies that are under conflict will be stored locally inside the installed package.
e.g. Application required `underscore` version 1.0 but `mongoose` requires `underscore` version 2.0,
in order to solve this conflict, `underscore` version 2.0, will be installed locally inside the `mongoose` package.

## NPM packages and Source control
- for each dependencies store inside `package.json`, so `node_modules` should not be included
- just run `npm i` then every dependencies will be installed accordingly.

## Semantic versioning, aka SemVer
- `x.y.z` format is stand for Major.Minor.Patch
- Patch is for bugfixes, the more bugfixes are released, the higher number will be.
- Minor is for features.
- Major is Breaking Change features.
- `^` keep the minor version up to date.
- `~` keep the app update to latest.
- safe recommendation is to keep its version fixed.

## Listing the Installed Packages
- by manually, you can check installed version by going to `node_modules/{package-to-check}/package.json`, look for its version.
- But checking it manually is tedious, so use `npm ls` instead.
- For reducing depth level, specify the level you want to check `npm ls --depth={number}`
e.g `npm ls --depth=0`
output:
+-- mongoose@5.11.19
`-- underscore@1.12.0
## View Registry Info For a Package
- `npm view mongoose` => open `package.json` of mongoose library.
- `npm view mongoose dependencies` => view only dependencies of mongoose library.

## Installing a Specific version of a Package
- `npm install underscore@1.4.0`

## update local Packages
- `npm outdated`
- `npm i -g npm-check-updates`
- `ncu` to view all outdated libraries.
- `ncu -u`

## Dev Dependencies
- `npm i jshint --save-dev`
- it wont build in production mode

## Uninstalling a package
- `npm un mongoose` or `npm uninstall mongoose`

## Working with Global Packages
- `npm i -g npm`
- `npm -g outdated` to check outdated global package

## Publish a package to NPM registers
- `mkdir lion-lib` create a folder
- `cd lion-lib`
- `npm init --yes`
- if you don't have account on npmjs, use `npm adduser`
- else use `npm login`
- to publish the package, use `npm publish`, make sure your lib name is unique.

## Updating a publised package
- add index.js
- `npm publish` see forbidden error
- `npm version major` | `npm version minor` | `npm version patch`, to update version
- try publish again, boom!

================================================================
# Build RESTful API's using Express
## What is REST
- REST or REpresentational State Transfer, is an architectural style for providing standards between computer systems on the web, 
- making it easier for systems to communicate with each other. 
- REST-compliant systems, often called RESTful systems, are characterized by how they are stateless and separate the concerns of client and server.
- reference: https://www.codecademy.com/articles/what-is-rest

## Introducing Express
- view through `express` library
- create `express-demo`
- `npm init --yes`
- `npm i express`

## Building first web server
- add index.js
- use `express`
```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) =>{
    res.send('Hello World');
});
```
- reference: http://expressjs.com/en/4x/api.html#req

## Nodemon
- node monitor
- `npm i -g nodemon`
- `nodemon index.js`
- nodemon help restart server automatically due to changes.

## Enviroment Variables
- in global object `process`, we will access PORT.
```javascript
process.env.PORT
```
- PORT enviroment can be set outside application, `export PORT=5000`
- start server
- observe changes, the listening port will be updated correspondingly.

## Route parameters
- how to create a route
- how to get path params and query params
```javascript
const params = req.params;
const query = req.query;
const allParams = { ...params, ...query };
```
- `http://localhost:3000/api/courses/2020/8?sortBy=name&order=asc` => `{"year":"2020","month":"8","sortBy":"name","order":"asc"}`

## Handling HTTP GET requests

## Handling HTTP POST requests, #Calling Endpoints Using Postman
- to handle json requests, add `app.use(express.json())`
- lesson learnt
- always make sure to have `res.send()` at the end of any APIs, or else client request cannot be completed.
- side note, aside POSTMAN, we can use `curl` in order to make requests to server.
### CURL
- GET `curl http://localhost:3000/api/courses`
- POST `curl --header "Content-Type: application/json" --request POST --data "{\"name\":\"Hello, I am Robert.\"}" http://localhost:3000/api/courses`

## Input Validation
- return 400 if name is null or less than 3
- try applying `joi`
```javascript
const schema = Joi.object({
    name: Joi.string().min(3).max(30).required()
});
const requestData = {};
const result = schema.validate(requestData);
if(result.error){
    console.log(result.error)
}
```

## Handling HTTP PUT requests
- add PUT api
- handle 404
- handle 400
- update corresponding data
- return updated course

## Handling HTTP DELETE requests
- add DELETE api
- handle 404
- delete corresponding id
- return deleted course

================================================================
# Express- Advanced Topics
## Introduction
- Middleware
- Configuration
- Debugging
- Templating Engines
## Middleware
- middleware functions take request object, and either return a response to the client or passes control to another middleware function.
- every route handler function is a middleware function
#### Example: 
- in block code below
```javascript
app.get('/', (req, res) =>{
    res.send('hello world');
});
```
- this block code
```javascript
(req, res) => {
    ...
}
```
is a middleware function.
- another form of middleware function
```javascript
express.json()
```
- whenever a request object contains a json object in the body of the request,
it will parse the request object into json object and return it inside `req.body`

## Creating custom middleware
- creating custom middleware by `app.use((req, res, next) => {})`
- any custom middleware are recommended to be separated in corresponding modules.

## built-in middleware
- `express.json()`, parse request into a JSON object in the `req.body`
- `express.urlencoded()`, to parse form urlencoded into key/value pairs in `req.body`
NOTE: `express.urlencoded({ extended: true })` will be capable of parsing arrays data.
- `express.static('public')`, this will publish all the resources/file inside `public` folder to public.
e.g: publish file `readme.txt` inside `public` folder, accessible via `http://localhost:3000/readme.txt`

## Third party middleware
- `expressjs.com`, look up `middle`
- `helmet` is recommended, to secure HTTPS
- `morgan` for logger

## Environments
- to access env, use `app.get('env')`

## Configuration
- npm `config` package
- introduce `config` folder
- add `development.json`
- add `production.json`
- in term of security, it is not safe to directly store password in source file,
- introduce `custom-environment-variables.json`
- introduce global variables
in MAC
- `export app_password=1234`
in Windows
- `SET app_password=1234`
in `custom-environment-variables.json`
```javascript
"mail":{
    "password": "app_password"
}
```

## Debugging
- using config to disable and enable `console.log`
- `set DEBUG=app:startup`
- observe
- `set DEBUG=`
- observe
- `set DEBUG=app:db`

## Templating engines
- There are 3 templating Engines
-- Pug
-- Mustache
-- EJS
- in this practice, we choose `pug`
- create `views` folder, add `index.pug`