import { React, useState, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    Dimensions,
    Modal,
    Platform,
    Button,
} from 'react-native';
import { Audio } from 'expo-av';
import socket from "../utils/socket";
import * as FileSystem from 'expo-file-system';



const WalkieTalkiePTT = () => {
    const [recording, setRecording] = useState(null);
    // const [recordings, setRecordings] = useState([]);
    const [allowsRecordingIOS, setAllowsRecordingIOS] = useState(true);
    useEffect(() => {

        async function setAudioMode() {
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: allowsRecordingIOS,
                    playsInSilentModeIOS: true
                });
            } catch (error) {
                console.error('Failed to set audio mode:', error);
            }
        }

        setAudioMode();
    }, [allowsRecordingIOS]);

    async function startRecording() {
        console.log('startRecording called');
        try {
            const perm = await Audio.requestPermissionsAsync();
            if (perm.status === "granted") {
                const recordingObject = new Audio.Recording();
                // const recordingOptions = {
                //     android: {
                //         extension: '.mp3',
                //         outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
                //         audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
                //         sampleRate: 44100,
                //         numberOfChannels: 2,
                //         bitRate: 128000,
                //     },
                //     ios: {
                //         extension: '.mp4',
                //         outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
                //         audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
                //         sampleRate: 44100,
                //         numberOfChannels: 1,
                //         bitRate: 128000,
                //         linearPCMBitDepth: 16,
                //         linearPCMIsBigEndian: false,
                //         linearPCMIsFloat: false,
                //     },
                // };
                await recordingObject.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
                setRecording(recordingObject);
                await recordingObject.startAsync();
                console.log('Recording started');
            } else {
                throw new Error('Permission not granted');
            }
        } catch (err) {
            console.error('Failed to start recording:', err);
        }
    }

    async function stopRecording() {
        console.log('stopRecording called');
        try {
            await recording.stopAndUnloadAsync();
            const { sound: soundObject, status } = await recording.createNewLoadedSoundAsync();
            await soundObject.setVolumeAsync(1.0);
            // let record = {
            //     duration: getDurationFormatted(status.durationMillis),
            // };
            const audioUri = recording.getURI();
            const audioData = await FileSystem.readAsStringAsync(audioUri, { encoding: FileSystem.EncodingType.Base64 });
            // const audioArrayBuffer = Base64.from(audioData, c => c.charCodeAt(0));
            await socket.emit('cmessage', audioData);
            console.log('Recording stopped and stored length:', audioData.length);
        } catch (err) {
            console.error('Failed to stop recording:', err);
        } finally {
            setRecording(null);
        }
    }

    socket.on('smessage', async (msg) => {
        console.log('smessage length:', msg.length);
        const audioBase64 = msg;
        // Create a data URL
        const audioUri = `data:audio/m4a;base64,${audioBase64}`;

        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: audioUri },
                { shouldPlay: true }
            );
            await sound.setVolumeAsync(1.0);
            sound.setOnPlaybackStatusUpdate(status => {
                if (status.isLoaded && status.isBuffering) {
                    sound.playAsync();
                }
            });
        }
        catch (err) {
            console.error('Failed to play the recording:', err);
        }
    });
    // async function stopRecording() {
    //     console.log('stopRecording called');
    //     try {
    //         await recording.stopAndUnloadAsync();
    //         // let allRecordings = [...recordings];
    //         const { sound: soundObject, status } = await recording.createNewLoadedSoundAsync();
    //         await soundObject.setVolumeAsync(1.0);
    //         // allRecordings.push({
    //         //     sound: soundObject,
    //         //     duration: getDurationFormatted(status.durationMillis),
    //         //     file: recording.getURI()
    //         // });
    //         // setRecordings(allRecordings);
    //         let record = {
    //             file: recording.getURI(),
    //             duration: getDurationFormatted(status.durationMillis),
    //             // sound: soundObject,
    //         };
    //         await socket.emit('cmessage', record);
    //         console.log('Recording stopped and stored');
    //     } catch (err) {
    //         console.error('Failed to stop recording:', err);
    //     } finally {
    //         setRecording(null);
    //         // clearRecording();
    //     }
    // }

    // socket.on('smessage', async (msg) => {
    //     let message = JSON.parse(msg);
    //     console.log('smessage', msg);
    //     const audioUri = message.file;
    //     console.log('audioUri', audioUri);
    //     try {
    //         const { sound } = await Audio.Sound.createAsync(
    //             { uri: audioUri },
    //             { shouldPlay: true }
    //         );
    //         await sound.setVolumeAsync(1.0);
    //         // await sound.playAsync();
    //         // await sound.unloadAsync();
    //     }
    //     catch (err) {
    //         console.error('Failed to play the recording:', err);
    //     }
    //     finally {
    //         // clearRecording();
    //     }
    //     // let allRecordings = [...recordings];
    //     // allRecordings.push(msg);
    //     // setRecordings(allRecordings);
    //     // playRecording();
    // });

    const handlePressIn = async () => {
        console.log('handlePressIn called');
        if (Platform.OS === 'ios') {
            setAllowsRecordingIOS(true);
        }
        await startRecording();
    };

    const handlePressOut = async () => {
        console.log('handlePressOut called');
        await stopRecording();
        if (Platform.OS === 'ios') {
            setAllowsRecordingIOS(false);
        }
    };

    // const playRecording = async () => {
    //     try {
    //         if (recordings.length > 0) {
    //             const sound = new Audio.Sound();
    //             await sound.loadAsync(recordings[recordings.length - 1].sound);
    //             await sound.setVolumeAsync(1.0);
    //             await sound.playAsync();
    //             await sound.unloadAsync();
    //         }
    //     }
    //     catch (err) {
    //         console.error('Failed to play the recording:', err);
    //     } finally {
    //         clearRecording();
    //     }
    // };

    function getDurationFormatted(milliseconds) {
        const minutes = milliseconds / 1000 / 60;
        const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
        return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`;
    }

    // function getRecordingLines() {
    //     return recordings.map((recordingLine, index) => {
    //         return (
    //             <View key={index} style={styles.row}>
    //                 <Text style={styles.fill}>
    //                     Recording #{index + 1} | {recordingLine.duration}
    //                 </Text>
    //                 <TouchableOpacity onPress={playRecording}>
    //                     <Text style={styles.playButton}>Play</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         );
    //     });
    // }

    // function clearRecording() {
    //     setRecordings([])
    // }

    return (
        <View>
            {/* <Text style={styles.title}>Walkie-Talkie PTT</Text> */}
            <TouchableOpacity
                style={styles.button}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Image
                    source={require("../assets/images/symbol_solider_w.png")}
                    style={[styles.backgroundImage, { width: 200, height: 200 }]}

                />
                {/* <Text style={styles.buttonText}>{recording ? 'Recording...' : 'Press and Hold'}</Text> */}
            </TouchableOpacity>
            {/* {getRecordingLines()}
            <Button title={recordings.length > 0 ? 'Clear Recordings' : ''} onPress={clearRecording} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    // button: {
    //     backgroundColor: 'red',
    //     height: 250,
    //     width: 250,
    //     // paddingVertical: 20,
    //     // paddingHorizontal: 40,
    //     borderRadius: 10,
    //     marginBottom: 20,
    //     borderRadius: 250,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // buttonText: {
    //     fontSize: 30,
    //     fontWeight: 'bold',
    //     color: 'white'
    // },
    // row: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginLeft: -50,
    //     marginRight: 0
    // },
    // fill: {
    //     flex: 1,
    //     margin: 15,
    //     color: 'white'
    // },
    // title: {
    //     position: 'absolute',
    //     top: -190,
    //     left: -20,
    //     color: 'white',
    //     fontSize: 40,
    // },
    // playButton: {
    //     fontSize: 30,
    //     color: 'white',
    //     padding: 10,
    //     backgroundColor: 'gray',
    // }
    container: {
        flex: 1,
        backgroundColor: "#242424",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        position: "flex",
        width: 250,
        height: 200,
        // top: 200,
        // left: 90,
        borderWidth: 0,
        // borderRadius: 40,
        borderColor: "pink",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    // button: {
    //     backgroundColor: 'red',
    //     height: 250,
    //     width: 250,
    //     borderRadius: 250,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // buttonText: {
    //     fontSize: 30,
    //     fontWeight: 'bold',
    //     color: 'white',
    // },
    // title: {
    //     color: 'white',
    //     fontSize: 40,
    // },

})

export default WalkieTalkiePTT;

