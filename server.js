const express = require('express')
const app = express()
const { spawn } = require('child_process');

let tcpPorts = {}
let udpPorts = {}

// app.use(express.static('public'))
app.use(express.static('build'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'build/index.html'));
});

app.get('/bind/:port', (req, res) => {
  const port = req.params.port;
  let proc = spawn('node', ['./port-tcp.js', port])

  proc.stdout.on('data', (data) => {
    tcpPorts[port] = proc
    res.send({ 
      data: data.toString().trim(),
      ports: Object.keys(tcpPorts).length
    })
  })

});

app.get('/kill-tcp/:port', (req, res) => {
  const port = req.params.port;

  if (tcpPorts[port]) {
    tcpPorts[port].kill('SIGKILL')
    delete tcpPorts[port]
    res.send({ 
      msg: `port ${port} closed`,
      ports: Object.keys(tcpPorts).length
   })
  }

  res.send({
    msg: `Port ${port} not in use`
  })
})

app.get('/bind-udp/:port', (req, res) => {
  const port = req.params.port;
  let proc = spawn('node', ['./port-udp.js', port])

  proc.stdout.on('data', (data) => {
    udpPorts[port] = proc
    console.log(Object.keys(udpPorts))
    res.send({
      data: data.toString().trim(),
      ports: Object.keys(udpPorts).length
    })
  })
})


app.get('/kill-udp/:port', (req, res) => {
  const port = req.params.port;

  if (udpPorts[port]) {
    udpPorts[port].kill('SIGKILL')
    delete udpPorts[port]
    res.send({ 
      msg: `port ${port} closed`,
      ports: Object.keys(tcpPorts).length
   })
  }

  res.send({
    msg: `Port ${port} not in use`
  })
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))
