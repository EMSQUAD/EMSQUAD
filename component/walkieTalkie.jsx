import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput } from 'react-native';
import { Audio } from 'expo-av';

const WalkieTalkie = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [channelId, setChannelId] = useState('');
  const [authToken, setAuthToken] = useState('');

  const startRecording = async () => {
    console.log('Starting recording...');
    setIsRecording(true);

    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecordedAudio(recording);
    } catch (error) {
      console.error('Failed to start recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording...');
    setIsRecording(false);
    try {
      if (recordedAudio) {
        await recordedAudio.stopAndUnloadAsync();
        const uri = recordedAudio.getURI();
        const audioData = await fetch(uri);
        const blob = await audioData.blob();
        setRecordedAudio(null);
        sendAudioMessage(blob);
      } else {
        console.error('No recorded audio to stop.');
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const sendAudioMessage = async (audioData) => {
    console.log('Sending audio message...');
    if (!channelId || !authToken) {
      console.error('Channel ID or auth token is missing.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('channelId', channelId);
      formData.append('authToken', authToken);
      formData.append('audioData', audioData);

      const response = await fetch('http://localhost:3000/sendAudioMessage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Audio message sent successfully.');
      } else {
        console.error('Failed to send audio message:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to send audio message:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Channel ID"
        value={channelId}
        onChangeText={text => setChannelId(text)}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
      />

      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
        disabled={isRecording}
        style={{ padding: 10, backgroundColor: isRecording ? 'red' : 'green', borderRadius: 5 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {isRecording ? 'Recording...' : 'Press and hold to talk'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalkieTalkie;
