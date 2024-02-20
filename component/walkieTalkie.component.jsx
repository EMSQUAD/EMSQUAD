import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Platform } from 'react-native';
import { Audio } from 'expo-av';

const WalkieTalkiePTT = () => {
    const [recording, setRecording] = useState(null);
    const [recordings, setRecordings] = useState([]);
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
                const recordingOptions = {
                    android: {
                        extension: '.mp3',
                        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
                        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
                        sampleRate: 44100,
                        numberOfChannels: 2,
                        bitRate: 128000,
                    },
                    ios: {
                        extension: '.mp4',
                        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
                        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
                        sampleRate: 44100,
                        numberOfChannels: 1,
                        bitRate: 128000,
                        linearPCMBitDepth: 16,
                        linearPCMIsBigEndian: false,
                        linearPCMIsFloat: false,
                    },
                };
                await recordingObject.prepareToRecordAsync(recordingOptions);
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
            let allRecordings = [...recordings];
            const { sound, status } = await recording.createNewLoadedSoundAsync();
            await sound.setVolumeAsync(1.0);
            allRecordings.push({
                sound: sound,
                duration: getDurationFormatted(status.durationMillis),
                file: recording.getURI()
            });
            setRecordings(allRecordings);
        } catch (err) {
            console.error('Failed to stop recording:', err);
        } finally {
            setRecording(null);
        }
    }

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

    const playRecording = async () => {
        if (recordings.length > 0) {
            const sound = new Audio.Sound();
            await sound.loadAsync({ uri: recordings[recordings.length - 1].file });
            await sound.setVolumeAsync(1.0);
            await sound.playAsync();
        }
    };

    function getDurationFormatted(milliseconds) {
        const minutes = milliseconds / 1000 / 60;
        const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
        return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`;
    }

    function getRecordingLines() {
        return recordings.map((recordingLine, index) => {
            return (
                <View key={index} style={styles.row}>
                    <Text style={styles.fill}>
                        Recording #{index + 1} | {recordingLine.duration}
                    </Text>
                    <TouchableOpacity onPress={playRecording}>
                        <Text style={styles.playButton}>Play</Text>
                    </TouchableOpacity>
                </View>
            );
        });
    }

    function clearRecording() {
        setRecordings([])
    }

    return (
        <View>
            <Text style={styles.title}>Walkie-Talkie PTT</Text>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{recording ? 'Recording...' : 'Press and Hold'}</Text>
            </TouchableOpacity>
            {getRecordingLines()}
            <Button title={recordings.length > 0 ? 'Clear Recordings' : ''} onPress={clearRecording} />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        height: 250,
        width: 250,
        // paddingVertical: 20,
        // paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 20,
        borderRadius: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -50,
        marginRight: 0
    },
    fill: {
        flex: 1,
        margin: 15,
        color: 'white'
    },
    title: {
        position: 'absolute',
        top: -190,
        left: -20,
        color: 'white',
        fontSize: 40,
    },
    playButton: {
        fontSize: 30,
        color: 'white',
        padding: 10,
        backgroundColor: 'gray',
    }

})

export default WalkieTalkiePTT;

