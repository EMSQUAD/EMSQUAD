const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const uuid = require('uuid');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

let recordedAudio = null;

// app.post('/startRecording', (req, res) => {
//     console.log('Recording started...');
//     res.sendStatus(200);
// });

// const connectionUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// mongoose.connect(connectionUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });






app.post('/startRecording', (req, res) => {
    console.log('Recording started...');
    res.sendStatus(200);
});

app.post('/stopRecording', (req, res) => {
    console.log('Recording stopped.');
    recordedAudio = req.body.audioData;
    res.sendStatus(200);
});

app.get('/getRecordedAudio', (req, res) => {
    if (recordedAudio) {
        res.send({ audioData: recordedAudio });
    } else {
        res.status(404).send('No recorded audio available');
    }
});

app.post('/sendAudioMessage', async (req, res) => {
    const { channelId, authToken } = req.body;
    const audioData = recordedAudio; // Get recorded audio data from the previous requests

    if (!channelId || !authToken || !audioData) {
        return res.status(400).send('Missing channelId, authToken, or audioData');
    }

    try {
        const response = await fetch('https://api.zellowork.com/v1/channels/' + channelId + '/audio_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'audio/x-wav',
                'Authorization': 'Bearer ' + authToken
            },
            body: audioData
        });
        
        if (response.ok) {
            res.sendStatus(200);
        } else {
            const data = await response.json();
            res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Failed to send audio message:', error);
        res.status(500).send('Failed to send audio message');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
