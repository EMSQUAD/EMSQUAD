const express = require('express');
const bodyParser = require('body-parser');
const { PTChannelManager } = require('ptt-framework'); // Replace 'ptt-framework' with the actual name of the PTT framework package

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialize the channel manager
let channelManager;

async function initializeChannelManager() {
    try {
        channelManager = await PTChannelManager.channelManager({ delegate: null, restorationDelegate: null });
        console.log('Channel manager initialized successfully');
    } catch (error) {
        console.error('Error initializing channel manager:', error);
    }
}

initializeChannelManager();

// Handle POST request to join a channel
app.post('/join-channel', async (req, res) => {
    const { channelUUID, channelDescriptor } = req.body;

    try {
        await channelManager.requestJoinChannel(channelUUID, channelDescriptor);
        res.json({ success: true, message: 'Joined channel successfully' });
    } catch (error) {
        console.error('Error joining channel:', error);
        res.status(500).json({ success: false, message: 'Failed to join channel' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
