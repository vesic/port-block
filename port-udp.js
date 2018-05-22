var dgram = require('dgram');

const port = process.argv[2]

dgram.createSocket('udp4')
  .on('listening', () => {
    console.log('udp-port open on ' + port)
  })
  .on('error', () => {
    console.log('error udp-port in use ' + port)
  })
  .bind(port);