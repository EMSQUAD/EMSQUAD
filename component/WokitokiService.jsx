import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('ws://localhost:3000');

const WokitokiService = () => {
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('message', (data) => {
      console.log('Received message:', data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  const init = () => {
    // ...
  };

  const startRecording = (user) => {
    console.log('Start recording for user:', user);
    socket.emit('startRecording', user);
    setIsRecording(true);
  };

  const stopRecording = () => {
    console.log('Stop recording');
    socket.emit('stopRecording');
    setIsRecording(false);
  };

  return {
    init,
    isRecording,
    startRecording,
    stopRecording,
  };
};

export default WokitokiService;
