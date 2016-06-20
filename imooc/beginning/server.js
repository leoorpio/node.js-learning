var http = require('http');
var server = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-type': 'text/plain'});
	res.end('Hello server.js \n');
});

server.listen(1377, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1377/');