import React, { useState, useEffect } from 'react';
import TalkButton from './component/TalkButton';
import UserList from './component/UserList';
import WokitokiService from './component/WokitokiService';
import RecordRTC from 'recordrtc';

const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    WokitokiService.init();
  }, []);

  const onStartRecording = () => {
    console.log('Start recording');
    setIsRecording(true);

    const recorder = new RecordRTC({
      type: 'audio',
      recorderType: StereoAudioRecorder,
      numberOfAudioChannels: 2,
      sampleRate: 44100,
    });

    recorder.startRecording();
    setRecorder(recorder);
  };

  const onStopRecording = () => {
    console.log('Stop recording');
    setIsRecording(false);

    recorder.stopRecording(() => {
      const blob = recorder.getBlob();
      setAudioBlob(blob);

      // ... (שמירת הקובץ בשרת, שליחה למשתמש אחר וכו')
    });
  };

  const onPlayRecording = () => {
    console.log('Play recording');

    const audio = new Audio(audioBlob);
    audio.play();
  };

  const onUserSelect = (user) => {
    console.log('User selected:', user);
    setSelectedUser(user);
  };

  return (
    <div>
      <TalkButton
        isRecording={isRecording}
        onRecordStart={onStartRecording}
        onRecordStop={onStopRecording}
      />
      <UserList onUserSelect={onUserSelect} />
      <View style={styles.container}>
        <Button title="הקלט" onPress={onStartRecording} />
        <Button title="עצור" onPress={onStopRecording} />
        <Button title="נגן" onPress={onPlayRecording} />
      </View>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
