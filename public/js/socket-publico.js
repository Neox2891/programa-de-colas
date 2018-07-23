// Front-end
// Comando para establecer conexion 
var socket = io();

var labelsTickets = [$('#lblTicket1'), $('#lblTicket2'), $('#lblTicket3'), $('#lblTicket4')];
var labelsEscritorio = [$('#lblEscritorio1'), $('#lblEscritorio2'), $('#lblEscritorio3'), $('#lblEscritorio4')];

socket.on('connect', function() {
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(data, callback) {
    console.log(data);
    actualizarHtml(data.ultimos4);
});

socket.on('ultimos4', function(data) {

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHtml(data.ultimos4);
});

function actualizarHtml(ultimos4) {

    for (i = 0; i <= ultimos4.length - 1; i++) {
        labelsTickets[i].text('Ticket ' + ultimos4[i].numero);
        labelsEscritorio[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}