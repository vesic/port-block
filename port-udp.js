var dgram = require('dgram');

const port = process.argv[2]

dgram.createSocket('udp4')
  .on('listening', () => {
    console.log(`UDP ${port} open`)
  })
  .on('error', () => {
    console.log(`error UDP ${port} in use`)
  })
  .bind(port);
