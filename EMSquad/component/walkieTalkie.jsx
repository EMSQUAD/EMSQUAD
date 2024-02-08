import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { w3cwebsocket as WebSocket } from 'websocket';

const WalkieTalkie = () => {
  const [channelName, setChannelName] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);

  const client = new WebSocket('ws://localhost:8000');

  // Function to handle start of audio streaming
  const startRecording = () => {
    // Start recording audio and send it to the server
    setIsRecording(true);
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

      {/* Display error messages if any */}
      {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
    </View>
  );
};

export default WalkieTalkie;
