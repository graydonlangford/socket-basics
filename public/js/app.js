var name = getQueryVariable('name') || 'Anonymous'
var room = getQueryVariable('room')
var socket = io()

socket.on('connect', function () {
  console.log('connected to socket.io server')
})

socket.on('message', function (message) {
  console.log('new message:')
  console.log(message.text)

  var $message = jQuery('.messages')
  var timestamp = moment.utc(message.timestamp).local().format('h:mm a')

  $message.append('<p><strong>' + message.name + ' ' + timestamp + '</strong>:</p>')
  $message.append('<p>' + message.text + '</p>')
})

//handles submitting of new message
var $form = jQuery('#message-form')

$form.on('submit', function (event) {
  event.preventDefault()

  var $message = $form.find('input[name=message]')

  socket.emit('message',{
    name: name,
    timestamp: moment().valueOf(),
    text: $message.val()
  })

  $message.val('')
})