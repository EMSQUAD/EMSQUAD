import React, { useState } from 'react';
import { Button, PermissionsAndroid } from 'react-native';
import { RTCPeerConnection, mediaDevices } from 'react-native-webrtc';

const App = () => {
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [peerConnection, setPeerConnection] = useState(null);

  const startRecording = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Recording Permission',
          message: 'App needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const audioStream = await mediaDevices.getUserMedia({ audio: true });
        setStream(audioStream);
        const pc = new RTCPeerConnection();
        pc.addStream(audioStream);
        setPeerConnection(pc);
        setIsRecording(true);
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (peerConnection) {
      peerConnection.close();
    }
    setStream(null);
    setPeerConnection(null);
    setIsRecording(false);
  };

  const handleRecordButtonPress = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <Button
      title={isRecording ? 'Stop Recording' : 'Start Recording'}
      onPress={handleRecordButtonPress}
    />
  );
};

export default App;
