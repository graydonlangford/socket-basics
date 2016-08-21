var express = require('express')
var moment = require('moment')
var PORT = process.env.PORT || 3000

var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))

io.on('connection', function (socket) {
  console.log('user connected via socket.io')

  socket.on('message', function (message) {
    console.log('message received: ' + message.text)
    io.emit('message', message)
  })

  socket.emit('message', {
    timestamp: moment().valueOf(),
    text: 'Welcome to the chat application'
  })
})

http.listen(PORT, function () {
  console.log('server started on ' + PORT)
})