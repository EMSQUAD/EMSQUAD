import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3000");
// import * as FileSystem from 'expo-file-system';
// const socket = io.connect("https://server-ems-74rn.onrender.com");

// import { Audio } from "expo-av";

socket.on("connect", () => {
    console.log("connected to server", socket.id);
});

socket.on("disconnect", () => {
    console.log("disconnected from server");
});

// socket.on('smessage', async (msg) => {
//     console.log('smessage length:', msg.length);
//     const audioBase64 = msg;
//     // Create a data URL
//     const audioUri = `data:audio/m4a;base64,${audioBase64}`;

//     try {
//         const { sound } = await Audio.Sound.createAsync(
//             { uri: audioUri },
//             { shouldPlay: false }
//         );
//         await sound.setVolumeAsync(1.0);
//         sound.setOnPlaybackStatusUpdate(status => {
//             if (status.isLoaded && status.isBuffering) {
//                 sound.playAsync();
//             }
//         });
//     }
//     catch (err) {
//         console.error('Failed to play the recording:', err);
//     }
// });

export default socket;
