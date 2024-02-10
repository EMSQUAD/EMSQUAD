import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Audio } from 'expo-av';

const WalkieTalkie = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);

    const serverUrl = 'http://172.20.10.6:3000'; // Replace with your server URL

    const startRecording = async () => {
        console.log('Starting recording...');
        setIsRecording(true);
        // Implement your logic to start recording
    };

    const stopRecording = async () => {
        console.log('Stopping recording...');
        setIsRecording(false);
        // Implement your logic to stop recording
    };

    const playRecordedAudio = async () => {
        console.log('Playing recorded audio...');
        setIsPlaying(true);
        
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: `${serverUrl}/getRecordedAudio` },
                { shouldPlay: true }
            );
            setSound(sound);
        } catch (error) {
            console.error('Failed to play recorded audio:', error);
        } finally {
            setIsPlaying(false);
        }
    };

    const stopPlayback = async () => {
        console.log('Stopping playback...');
        setIsPlaying(false);
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
        }
    };

    return (
        <View>
            <TouchableOpacity
                onPressIn={startRecording}
                onPressOut={stopRecording}
                disabled={isRecording || isPlaying}
                style={{ padding: 10, backgroundColor: isRecording ? 'red' : 'green', borderRadius: 5 }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{isRecording ? 'Recording...' : 'Press and hold to talk'}</Text>
            </TouchableOpacity>

            <Button
                title={isPlaying ? 'Stop Playback' : 'Play Recorded Audio'}
                onPress={isPlaying ? stopPlayback : playRecordedAudio}
                disabled={isRecording || (isPlaying && !sound)}
            />
        </View>
    );
};

export default WalkieTalkie;
