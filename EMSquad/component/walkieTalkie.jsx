import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { w3cwebsocket as WebSocket } from 'websocket';

const WalkieTalkie = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const [recordStartTime, setRecordStartTime] = useState(null);
  const [recordDuration, setRecordDuration] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState([]);

  // WebSocket endpoint (you can replace it with your own WebSocket server URL)
  const wsEndpoint = 'wss://echo.websocket.org/';

  // Create a new WebSocket client
  const client = new WebSocket(wsEndpoint);

  // Function to handle start of audio streaming
  const startRecording = () => {
    // Start recording audio and send it to the server
    setIsRecording(true);
    setRecordStartTime(Date.now()); // Set start time of recording
    // Send a message to the server to indicate start of recording
    client.send(JSON.stringify({ type: 'start' }));
  };

  // Function to handle end of audio streaming
  const stopRecording = () => {
    // Stop recording audio and streaming
    setIsRecording(false);
    // Send a message to the server to indicate end of recording
    client.send(JSON.stringify({ type: 'stop' }));
  };

  // Function to handle playback of recorded audio
  const playRecordedAudio = () => {
    // Play the recorded audio (you can implement this functionality)
    console.log('Playing recorded audio');
  };

  // Format duration to HH:MM:SS
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Update record duration every second while recording
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordDuration(Math.floor((Date.now() - recordStartTime) / 1000));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, recordStartTime]);

  // Handle WebSocket events
  client.onopen = () => {
    console.log('WebSocket Client Connected');
  };

  client.onerror = (error) => {
    console.error('Connection Error: ', error);
    setError('Failed to connect to server. Please try again.');
  };

  return (
    <View>
      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
        disabled={isRecording} // Disable button while recording
        style={{ padding: 10, backgroundColor: isRecording ? 'red' : 'green', borderRadius: 5 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{isRecording ? 'Recording...' : 'Press and hold to talk'}</Text>
      </TouchableOpacity>

      {/* Display record duration */}
      <Text style={{ marginTop: 10 }}>{`Recorded: ${formatDuration(recordDuration)}`}</Text>

      {/* Button to play recorded audio */}
      <Button title="Play Recorded Audio" onPress={playRecordedAudio} disabled={!recordedAudio.length} />
      
      {/* Display error messages if any */}
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </View>
  );
};

export default WalkieTalkie;
