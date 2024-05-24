const http = require('http');
const httpProxy = require('http-proxy');

const proxiedAuth = process.env.PROXIED_AUTH || 'localhost';
const proxiedBackend = process.env.PROXIED_BACKEND || 'localhost';

// Create a proxy server instance for port 3000
const proxy1 = httpProxy.createProxyServer({ target: `http://${proxiedAuth}:3000` });

// Create a proxy server instance for port 4000
const proxy2 = httpProxy.createProxyServer({ target: `http://${proxiedBackend}:4000` });

// Create a server to listen on port 8000 and proxy requests to port 3000
http.createServer(function (req, res) {
    proxy1.web(req, res, function (err) {
        console.error('Error proxying to port 3000:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Something went wrong');
    });
}).listen(8000);

// Create a server to listen on port 9000 and proxy requests to port 4000
http.createServer(function (req, res) {
    proxy2.web(req, res, function (err) {
        console.error('Error proxying to port 4000:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Something went wrong');
    });
}).listen(9000);

console.log('Proxy server running: 8000 -> 3000, 9000 -> 4000');
