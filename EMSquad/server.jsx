const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const port = 3000;
const wsPort = 8000;

app.use(bodyParser.json());

// WebSocket server setup
const wss = new WebSocket.Server({ port: wsPort });

let audioStream = null;

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        const data = JSON.parse(message);
        if (data.type === 'start') {
            // Start recording audio stream
            audioStream = [];
        } else if (data.type === 'stop') {
            // Stop recording audio stream and broadcast to clients
            if (audioStream) {
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'audio', data: audioStream }));
                    }
                });
                audioStream = null;
            }
        }
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`WebSocket server is running at ws://localhost:${wsPort}`);
});
