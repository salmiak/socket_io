var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var value = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/admin', function(req, res){
  res.sendFile(__dirname + '/admin.html');
});
app.get('/chroma.min.js', function(req, res){
  res.sendFile(__dirname + '/node_modules/chroma-js/chroma.min.js')
})
app.get('/script.js', function(req, res){
  res.sendFile(__dirname + '/script.js')
})
app.get('/style.css', function(req, res){
  res.sendFile(__dirname + '/style.css')
})
app.get('/manifest.json', function(req, res){
  res.sendFile(__dirname + '/manifest.json')
})
app.get('/launcher-icon.png', function(req, res){
  res.sendFile(__dirname + '/launcher-icon.png')
})

console.log(value);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('set value', function(val){
    value = val
    io.emit('value updated', value);
    console.log(value);
  });
  socket.on('value up', function(){
    if (value < 49){
      value++
      io.emit('value updated', value);
      console.log(value);
    }
  });
  socket.on('value down', function(){
    if (value > 1) {
      value--
      io.emit('value updated', value);
      console.log(value);
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
