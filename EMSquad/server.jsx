const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const port = 3000;
const wsPort = 8000;

app.use(bodyParser.json());

// WebSocket server setup
const wss = new WebSocket.Server({ port: wsPort });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`WebSocket server is running at ws://localhost:${wsPort}`);
});
