require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uuid = require('uuid');
const { default: UserList } = require('./component/UserList');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// app.get('/', (req, res) => {
//     res.send('Welcome to the EMSQUAD API');
//   })

const {userRouter} = require('./router/user.router');
app.use('/user', userRouter);

const{eventRouter}=require('./router/event.router');
app.use('/event',eventRouter);


app.use(bodyParser.json());
let recordedAudio = null;

app.post('/startRecording', (req, res) => {
    console.log('Recording started...');
    res.sendStatus(200);
});

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

// Route to get the list of users
app.get('/users', async (req, res) => {
    try {
        // Fetch the list of users from the MongoDB collection
        const users = await UserList.find({}, 'name'); // Assuming 'User' is your Mongoose model for users
        res.status(200).json(users);
    } catch (error) {
        console.error('Failed to fetch user list:', error);
        res.status(500).send('Failed to fetch user list');
    }
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
