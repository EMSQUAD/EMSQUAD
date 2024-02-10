const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let recordedAudioPath = null;

app.post('/startRecording', (req, res) => {
    console.log('Recording started...');
    res.sendStatus(200);
});

app.post('/stopRecording', (req, res) => {
    console.log('Recording stopped.');
    // Save recorded audio data to a file
    const audioData = req.body.audioData;
    if (audioData) {
        fs.writeFile('recorded_audio.wav', audioData, 'base64', (err) => {
            if (err) {
                console.error('Failed to save recorded audio:', err);
                res.status(500).send('Failed to save recorded audio');
            } else {
                recordedAudioPath = 'recorded_audio.wav';
                res.sendStatus(200);
            }
        });
    } else {
        res.status(400).send('No audio data received');
    }
});

app.get('/getRecordedAudio', (req, res) => {
    if (recordedAudioPath) {
        // Serve the recorded audio file
        res.sendFile(recordedAudioPath, { root: __dirname });
    } else {
        res.status(404).send('No recorded audio available');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
