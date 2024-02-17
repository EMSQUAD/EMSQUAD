const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('WebSocket client connected');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'join':
        socket.send(JSON.stringify({ type: 'user-joined', user: { id: 1, name: 'John Doe' } }));
        break;
      case 'leave':
        socket.send(JSON.stringify({ type: 'user-left', user: { id: 1, name: 'John Doe' } }));
        break;
    }
  };

  socket.onclose = () => {
    console.log('WebSocket client disconnected');
  };
});

