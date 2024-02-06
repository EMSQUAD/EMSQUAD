import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { io } from 'socket.io-client';

const WalkieTalkie = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setupSocket();
    setupAudio();
    return cleanup;
  }, []);

  const setupSocket = () => {
    const socket = io('http://your-server-ip:3000');
    setSocket(socket);

    socket.on('audioStream', (audioData) => {
      // Handle received audio stream
    });
  };

  const setupAudio = async () => {
    await Audio.requestPermissionsAsync();
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
  };

  const startRecording = async () => {
    if (Platform.OS === 'ios') {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true, // Allow recording in the background
      });
    }
  
    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
  
      // Start streaming audio to the server
      recording.setOnRecordingStatusUpdate(async (status) => {
        if (status.canRecord) {
          const uri = recording.getURI();
          try {
            const response = await fetch(uri);
            if (!response.ok) {
              throw new Error('Failed to fetch audio data');
            }
            const blob = await response.blob();
            const audioData = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            socket.emit('audioStream', audioData); 
          } catch (error) {
            console.error('Error sending audio data to server', error);
          }
        }
      });
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };
  
  

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      // Send audio file to server
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const cleanup = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
    }
  };

  return (
    <View>
      <Pressable
        onPressIn={startRecording}
        onPressOut={stopRecording}
        style={({ pressed }) => ({
          backgroundColor: pressed ? 'gray' : 'blue',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          borderRadius: 5,
          margin: 10,
        })}
      >
        <Text style={{ color: 'white' }}>
          {isRecording ? 'Release to stop recording' : 'Press and hold to record'}
        </Text>
      </Pressable>
    </View>
  );
};

export default WalkieTalkie;
