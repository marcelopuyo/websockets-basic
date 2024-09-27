import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

  console.log('Cliente conectado');

  ws.on('error', console.error);

  ws.on('message', function message(data) {

    const payload = {
      type: 'custom-message',
      payload: data.toString()
    }

    //ws.send(JSON.stringify(payload));

    //envio a todos incluido el que manda
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(JSON.stringify(payload), { binary: false });
    //   }
    // });

    //envio a todos menos al que manda
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload), { binary: false });
      }
    });
  });

  //ws.send('Hola desde el servidor!!!');

  ws.on('close', () => {
    console.log('Cliente desconectado');
  })

});

console.log('Servidor corriendo en http://localhost:3000');
