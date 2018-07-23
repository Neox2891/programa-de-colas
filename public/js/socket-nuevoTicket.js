// Front-end
// Comando para establecer conexion 
var socket = io();

var label = $('#lblNuevoTicket');

let c = (a) => {
    console.log(a);
};

socket.on('connect', function() {
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(data) {
    label.text(data.actual);
    console.log(data);
});

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(res = "") {
        label.text(res);
    });

    c('click');

});