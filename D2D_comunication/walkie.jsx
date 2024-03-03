import dgram from 'react-native-udp';
import { Audio } from "expo-av";


// Create a socket
const socket = dgram.createSocket('udp4');
const port = 3001;
// Convert your audio data to a Buffer
// This will depend on how your audio data is currently formatted
// For this example, let's assume you have a Uint8Array of raw PCM data
const audioData = new Uint8Array(); // replace this with your actual audio data
const buffer = Buffer.from(audioData.buffer);

// Send the audio data
// Replace 'localhost' and 12345 with your actual target IP and port
socket.send(buffer, 0, buffer.length, port, 'localhost', (err) => {
    if (err) {
        console.error(`Error sending audio data: ${err}`);
    } else {
        console.log('Audio data sent successfully');
    }
});

// Listen for incoming audio data
socket.on('message', (message, remote) => {
    console.log(`Received audio data from ${remote.address}:${remote.port}`);
    // Convert the message to a Uint8Array
    const audioData = new Uint8Array(message.buffer);
    // Do something with the audio data
    // For example, play it using the Web Audio API
    audioData
});
