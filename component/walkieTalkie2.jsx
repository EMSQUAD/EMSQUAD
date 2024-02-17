import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { WebSocket } from 'expo';

const Wokitoki = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const initSocket = async () => {
      const ws = new WebSocket('ws://localhost:8080');
      ws.onopen = () => {
        console.log('WebSocket connected');
        setSocket(ws);
        ws.send(JSON.stringify({ type: 'join' }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Message received:', data);
        switch (data.type) {
          case 'user-joined':
            console.log('User joined:', data.user);
            setUsers(prevUsers => [...prevUsers, data.user]);
            break;
          case 'user-left':
            console.log('User left:', data.user);
            setUsers(prevUsers => prevUsers.filter(u => u.id !== data.user.id));
            break;
          case 'user-speaking':
            console.log('User speaking:', data.user);
            setActiveUser(data.user);
            break;
        }
      };

      ws.onclose = () => {
        console.log('WebSocket client disconnected');
      };
    };

    initSocket();

    return () => {
      if (socket) {
        socket.send(JSON.stringify({ type: 'leave' }));
        socket.close();
        console.log('WebSocket connection closed');
      }
    };
  }, []);

  useEffect(() => {
    const prepareAudio = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to record audio was denied');
          return;
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      } catch (error) {
        console.error('Failed to set audio mode', error);
      }
    };

    prepareAudio();

    return () => {
      if (!isCalling) {
        Audio.setAudioModeAsync({ allowsRecordingIOS: false });
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      console.log('Recording started');
      setRecording(recording);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        console.log('Recording stopped');
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const handleStartCall = () => {
    setIsCalling(true);
    console.log('Starting call...');
    startRecording();
  };

  const handleEndCall = async () => {
    setIsCalling(false);
    console.log('Ending call...');
    stopRecording();
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    if (socket) {
      socket.send(JSON.stringify({ type: 'leave' }));
    }
  };

  const handlePlayRecording = async () => {
    if (recording) {
      const { sound } = await recording.createNewLoadedSoundAsync();
      setSound(sound);
      await sound.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      {isCalling && (
        <>
          <Button title="סיים שיחה" onPress={handleEndCall} />
          <Button title="השמע הקלטה" onPress={handlePlayRecording} />
        </>
      )}
      {!isCalling && <Button title="התחל שיחה" onPress={handleStartCall} />}
      {isCalling && <Text style={styles.text}>משתמש פעיל: {activeUser?.name}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
  },
});

export default Wokitoki;
