const http = require('http');
const httpProxy = require('http-proxy');

const os = require('os');
const interfaces = os.networkInterfaces();

const proxy = httpProxy.createProxyServer();

let hostIP;
for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            hostIP = alias.address;
        }
    }
}

http.createServer((req, res) => {
    proxy.web(req, res, { target: 'http://...' } ); // target是你需要被代理的网址
}).listen(8800, () => {
    console.log(`Proxy server is running at http://${hostIP}:8800`);
})