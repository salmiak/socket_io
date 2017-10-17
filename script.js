var scale = chroma.scale(['#4488DD', '#FFA900', '#F52']);

function random(m, s) {
  return m + 2.0 * s * (Math.random() + Math.random() + Math.random() - 1.5);
}

$(function () {

  var socket = io();

  socket.emit('set value', 10);
  var value = 10;

  $('#up').on('click',function(){
    socket.emit('value up');
  })
  $('#down').on('click',function(){
    socket.emit('value down');
  })
  $(document).keydown(function(e){
    if(e.which == 40)
      socket.emit('value down');
    if(e.which == 38)
      socket.emit('value up');
  })

  socket.on('value updated', function(newValue) {
    value = newValue;
    $('#value').html(newValue)
  })

  setInterval(function(){
    var output = value + Math.random()*6 - 3;
    output = random(value, .5);
    output = Math.max(0,output)
    output = Math.min(50, output)

    $('#scale').css('background',scale(output/50))
    $('#marker').css('bottom', output / 50 * ( $('#scale').height() - $('#marker').height() ) )

    $('#markerNbr').html(Math.round(output))
    $('#markerNbr').css('bottom', output / 50 * ( $('#scale').height() - $('#markerNbr').height() ) )
  },500);

});
