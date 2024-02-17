const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uuid = require('uuid');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB connection setup
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri).then(() => {
    console.info("Connected to the DB");
}).catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if database connection fails
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Mongoose schema for the audio message
const AudioMessageSchema = new mongoose.Schema({
    messageId: { type: String, required: true },
    channelId: { type: String, required: true },
    audioData: { type: Buffer, required: true }, // Store audio data as Buffer
    createdAt: { type: Date, default: Date.now }
});

// Create Mongoose model for the audio message
const AudioMessage = mongoose.model('AudioMessage', AudioMessageSchema);

// Route to start recording audio (if needed)
app.post('/startRecording', (req, res) => {
    console.log('Recording started...');
    res.sendStatus(200);
});

// Route to stop recording audio (if needed)
app.post('/stopRecording', (req, res) => {
    console.log('Recording stopped.');
    // Handle stopping recording if needed
    res.sendStatus(200);
});

// Route to send audio message
app.post('/sendAudioMessage', async (req, res) => {
    const { channelId, audioData } = req.body;

    if (!channelId || !audioData) {
        return res.status(400).send('Missing channelId or audioData');
    }

    try {
        // Save the audio message to MongoDB
        const messageId = uuid.v4(); // Generate a unique ID for the message
        await AudioMessage.create({ messageId, channelId, audioData });

        // Optionally, you can notify other users in the same channel about the new message
        // Implement real-time communication (e.g., WebSockets) to notify users

        res.status(200).json({ messageId }); // Respond with the ID of the saved message
    } catch (error) {
        console.error('Failed to send audio message:', error);
        res.status(500).send('Failed to send audio message');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
