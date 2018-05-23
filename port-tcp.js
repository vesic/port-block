const net = require('net');

const port = process.argv[2]

net.createServer(() => { })
  .on('error', (err) => {
    console.log(`error TCP ${port} in use`)
    throw err;
  }).listen(port, () => {
    console.log(`TCP ${port} open`)
  })