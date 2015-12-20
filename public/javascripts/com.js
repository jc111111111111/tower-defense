var socket = io();
$('form').submit(function(){
socket.emit('msg', $('#m').val());
$('#m').val('');
return false;
});
socket.on('msg', function(msg){
$('#messages').append($('<li>').text(msg));
});
</script>
