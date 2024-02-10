// walkietalkie.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Audio } from 'expo-av';

const WalkieTalkie = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [channelId, setChannelId] = useState('');
  const [authToken, setAuthToken] = useState('');

  const startRecording = async () => {
    console.log('Starting recording...');
    setIsRecording(true);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    });

    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecordedAudio(recording);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording...');
    setIsRecording(false);
    try {
      await recordedAudio.stopAndUnloadAsync();
      const uri = recordedAudio.getURI();
      const audioData = await fetch(uri);
      const blob = await audioData.blob();
      setRecordedAudio(null);
      sendAudioMessage(blob);
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

  const playRecordedAudio = async () => {
    console.log('Playing recorded audio...');
    setIsPlaying(true);

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: recordedAudio.getURI() },
        { shouldPlay: true }
      );
      setSound(sound);
    } catch (error) {
      console.error('Failed to play recorded audio:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

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

      <Button title="Play Recorded Audio" onPress={playRecordedAudio} disabled={isRecording || isPlaying} />

    </View>
  );
};

export default WalkieTalkie;
