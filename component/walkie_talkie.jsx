import { Audio } from 'expo-av';
import io from 'socket.io-client';
import WalkieTalkie from './walkieTalkie';

// Initialize socket connection
const socket = io('http://localhost:3000');

// Prepare the recorder
const recording = new Audio.Recording();

async function startRecording() {
    try {
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();
    } catch (error) {
        console.error('Failed to start recording', error);
    }
}

async function stopRecording() {
    try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        // Send audio file to server
        // You need to implement this part based on your server API

    } catch (error) {
        console.error('Failed to stop recording', error);
    }
}

// Listen for incoming audio
socket.on('audio', async audio => {
    // Play audio
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync({ uri: audio.data });
        await soundObject.playAsync();
    } catch (error) {
        console.log('Error with playback', error);
    }
});



export default WalkieTalkie;