const http = require('http');

function displayMessageBlock () {
  console.log('----------------------------------------');
  console.log(new Date().toLocaleString());
  [...arguments].forEach((arg) => console.log(arg));
  console.log('----------------------------------------');
}

http.createServer((req, res) => {
  let payload = undefined;

  req.on('data', (chunk) => {
    payload = Buffer.from(chunk).toString();
  })

  req.on('end', () => {
    displayMessageBlock(
      {
        socket: {
          localAddress: req.socket.localAddress,
          localPort: req.socket.localPort,
          remoteAddress: req.socket.remoteAddress,
          remotePort: req.socket.remotePort
        },
        method: req.method,
        url: req.url,
        httpVersion: req.httpVersion,
        headers: req.headers,
        payload: payload
      }
    )

    res.statusCode = 200;
    res.end('OK');
  });
}).listen(3000, () => displayMessageBlock('Server is listening on port 3000'));
