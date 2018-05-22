const net = require('net');

const port = process.argv[2]

net.createServer(() => { })
  .on('error', (err) => {
    console.log('error tcp-port in use ', port)
  }).listen(port, () => {
    console.log('tcp-port open on ', port)
  })