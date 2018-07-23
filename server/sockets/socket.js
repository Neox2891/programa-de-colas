// Back-end
const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let nextTicket = ticketControl.siguienteTicket();

        callback(nextTicket);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            callback({
                err: true,
                mensaje: 'El escritorio es necesario!'
            });
        }

        let escritorio = ticketControl.atenderTicket(data.escritorio);

        // actualizar / notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() });

        callback(escritorio);
    });

});