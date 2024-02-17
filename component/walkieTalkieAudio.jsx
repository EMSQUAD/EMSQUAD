import { Audio } from 'expo-av';

const WokitokiAudio = {
  startRecording() {
    console.log('Starting recording...');
    return Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
  },

  stopRecording() {
    console.log('Stopping recording...');
    return Audio.Recording.stopAndUnloadAsync();
  },

  startPlaying: async (audioData) => {
    console.log('Starting playback...');
    try {
      const { sound } = await Audio.Sound.createAsync(audioData);
      await sound.playAsync();
      console.log('Playback started');
    } catch (error) {
      console.error('Failed to start playback', error);
    }
  },

  stopPlaying() {
    console.log('Stopping playback...');
    // Stop playback
  },
};

export default WokitokiAudio;
