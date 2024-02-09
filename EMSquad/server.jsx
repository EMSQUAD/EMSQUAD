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
    console.log('WebSocket Client Connected');
  
    ws.on('message', function incoming(message) {
        console.log('Received message:', message);
        try {
            const data = JSON.parse(message);
            if (data.type === 'start') {
                // Start recording audio stream
                audioStream = [];
                console.log('Recording started...');
            } else if (data.type === 'stop') {
                // Stop recording audio stream and broadcast to clients
                if (audioStream) {
                    wss.clients.forEach(function each(client) {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({ type: 'audio', data: audioStream }));
                        }
                    });
                    audioStream = null;
                    console.log('Recording stopped.');
                }
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            // Handle non-JSON messages gracefully
            console.log('Non-JSON message received:', message);
        }
    });
  
    ws.on('error', function(error) {
        console.error('WebSocket error:', error);
    });
  
    ws.on('close', function() {
        console.log('WebSocket connection closed');
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`WebSocket server is running at ws://localhost:${wsPort}`);
});
