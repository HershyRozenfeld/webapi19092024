const http = require('http');
const app = require('./app');
const port = 5050;
const srv = http.createServer(app)
srv.listen(port, () => {
    console.log("Server Is Up")
});