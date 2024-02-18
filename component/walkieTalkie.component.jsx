import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Audio } from 'expo-av';

const WalkieTalkiePTT = () => {
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);

    async function startRecording() {
        console.log('startRecording called');
        try {
            const perm = await Audio.requestPermissionsAsync();
            if(perm.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });
                const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTION_PRESET_HIGH_QUALITY);
                setRecording(recording);
                await recording.startAsync();
                console.log('Recording started');
            }
        } catch(err) {
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
        } catch(err) {
            console.error('Failed to stop recording:', err);
        } finally {
            setRecording(undefined);
        }
    }

    const handlePressIn = async () => {
        console.log('handlePressIn called');
        await startRecording();
    };

    const handlePressOut = async () => {
        console.log('handlePressOut called');
        await stopRecording();
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
                    <TouchableOpacity onPress={() => { 
                        recordingLine.sound.setVolumeAsync(1.0);
                        recordingLine.sound.replayAsync();
                        }}>
                        <Text style={{color: 'blue', textDecorationLine: 'underline'}}>Play</Text>
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
            <TouchableOpacity 
                onPressIn={handlePressIn} 
                onPressOut={handlePressOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{recording ? 'Recording...' : 'Press and Hold to Record'}</Text>
            </TouchableOpacity>
            {getRecordingLines()}
            <Button title={recordings.length > 0 ? 'Clear Recordings' : ''} onPress={clearRecording} />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'lightgray',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
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
        margin: 15
    }
})

export default WalkieTalkiePTT;
