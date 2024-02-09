import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { w3cwebsocket as WebSocket } from 'websocket';

const WalkieTalkie = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const [recordStartTime, setRecordStartTime] = useState(null);
  const [recordDuration, setRecordDuration] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [webSocketOpen, setWebSocketOpen] = useState(false);
  const [client, setClient] = useState(null);

  // WebSocket endpoint (you can replace it with your own WebSocket server URL)
  const wsEndpoint = 'wss://echo.websocket.org/';

  useEffect(() => {
    // Create a new WebSocket client when the component mounts
    const newClient = new WebSocket(wsEndpoint);

    // Handle WebSocket events
    newClient.onopen = () => {
      console.log('WebSocket Client Connected');
      setWebSocketOpen(true);
      setClient(newClient);
    };

    newClient.onerror = (error) => {
      console.error('Connection Error: ', error);
      setError('Failed to connect to server. Please try again.');
    };

    newClient.onclose = () => {
      console.log('WebSocket Connection Closed');
      setWebSocketOpen(false);
    };

    newClient.onmessage = (message) => {
      // Log the received message data
      console.log('Received message:', message.data);
      
      // Check if the message is valid JSON
      if (message.data.startsWith('{')) {
        // Handle incoming messages
        try {
          const data = JSON.parse(message.data);
          if (data.type === 'audio') {
            setRecordedAudio(data.data);
            console.log('Recorded audio set:', data.data);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
          // Handle JSON parse error gracefully
          console.log('Invalid JSON message received:', message.data);
        }
      } else {
        // Handle non-JSON messages gracefully
        console.log('Non-JSON message received:', message.data);
      }
    };
    
    // Clean up function to close WebSocket connection when component unmounts
    return () => {
      if (newClient && newClient.readyState === WebSocket.OPEN) {
        newClient.close();
      }
      // Clean up audio player
      if (audioPlayer) {
        audioPlayer.stop();
        audioPlayer.release();
      }
    };
  }, []); // Empty dependency array to ensure effect runs only once

  const startRecording = () => {
    console.log('Starting recording...');
    setIsRecording(true);
    setRecordStartTime(Date.now());
  
    // Check if client is initialized before sending message
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ action: 'start' }));
      console.log('Sent start recording message to server.');
    } else {
      console.log('WebSocket client is not ready.');
    }
  };
  
  const stopRecording = () => {
    console.log('Stopping recording...');
    setIsRecording(false);
  
    // Calculate recording duration
    const recordingDuration = Date.now() - recordStartTime;
    console.log('Recording duration:', recordingDuration);
  
    // Check if client is initialized before sending message
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ action: 'stop', duration: recordingDuration }));
      console.log('Sent stop recording message to server.');
    } else {
      console.log('WebSocket client is not ready.');
    }
  };
  

  const playRecordedAudio = () => {
    console.log('Playing recorded audio...');
    console.log('Recorded audio:', recordedAudio);
    if (recordedAudio) {
      const player = new Audio();
      player.src = `data:audio/wav;base64,${recordedAudio}`;
      player.play();
      setAudioPlayer(player);
    } else {
      console.log('No recorded audio available.');
    }
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    const milliseconds = Math.floor((duration % 1000) / 10);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}:${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
  };

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordDuration(Date.now() - recordStartTime);
      }, 10); // Update every 10 milliseconds for accurate duration
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, recordStartTime]);

  return (
    <View>
      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
        disabled={isRecording || !webSocketOpen}
        style={{ padding: 10, backgroundColor: isRecording ? 'red' : 'green', borderRadius: 5 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{isRecording ? 'Recording...' : 'Press and hold to talk'}</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 10 }}>{`Recorded: ${formatDuration(recordDuration)}`}</Text>

      <Button title="Play Recorded Audio" onPress={playRecordedAudio} disabled={!recordedAudio} />

      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </View>
  );
};

export default WalkieTalkie;
