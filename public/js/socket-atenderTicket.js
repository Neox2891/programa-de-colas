var socket = io();

var searchParams = new URLSearchParams(window.location.search);

var label = $('small');
var labelH3 = $('h3');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario!');
}

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

socket.on('estadoActual', function(data) {
    labelH3.text('ultimo atendido: Ticket ' + data.ultimos4[0].numero + ' Escritorio ' + data.ultimos4[0].escritorio);
});

$('button').on('click', function() {

    console.log('click');

    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {

        if (res === 'No hay mas tickets disponibles') {
            alert(res);
            return;
        }

        label.text('Ticket: ' + res.numero);
        console.log(res);

    });

});