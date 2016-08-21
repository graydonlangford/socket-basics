var socket = io()

socket.on('connect', function () {
  console.log('connected to socket.io server')
})

socket.on('message', function (message) {
  console.log('new message:')
  console.log(message.text)

  jQuery('.messages').append('<p><strong>' + moment.utc(message.timestamp).local().format('h:mm a') + '</strong>: ' + message.text + '</p>')
})

//handles submitting of new message
var $form = jQuery('#message-form')

$form.on('submit', function (event) {
  event.preventDefault()

  var $message = $form.find('input[name=message]')

  socket.emit('message',{
    timestamp: moment().valueOf(),
    text: $message.val()
  })

  $message.val('')
})