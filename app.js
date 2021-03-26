/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(80, () => {
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);
app.set('io', io);
/* criar a conexão do websocket */
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    
  });

  socket.on('msgParaServidor', (data) => {
    socket.emit('msgParaCliente', 
        {
            apelido: data.apelido,
            mensagem: data.mensagem
        });
    socket.broadcast.emit('msgParaCliente', 
        {
            apelido: data.apelido,
            mensagem: data.mensagem
        });

    /** participantes */
    if(parseInt(data.apelido_atualizado_nos_clientes) === 0) {
        socket.emit('participantesParaCliente', 
            {apelido: data.apelido});
        socket.broadcast.emit('participantesParaCliente', 
            {apelido: data.apelido});
    }

  })
});