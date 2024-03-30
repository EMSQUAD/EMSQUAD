import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WalkieTalkiePTT from './WalkieTalkiePTT';
import { Audio } from 'expo-av';

jest.mock('expo-av', () => ({
  Audio: {
    setAudioModeAsync: jest.fn(),
    requestPermissionsAsync: jest.fn(),
    Recording: jest.fn(() => ({
      prepareToRecordAsync: jest.fn(),
      startAsync: jest.fn(),
      stopAndUnloadAsync: jest.fn(),
      createNewLoadedSoundAsync: jest.fn(),
      getURI: jest.fn(),
    })),
    Sound: jest.fn(() => ({
      loadAsync: jest.fn(),
      setVolumeAsync: jest.fn(),
      playAsync: jest.fn(),
    })),
  },
}));
it('requests audio permissions on render', async () => {
    Audio.requestPermissionsAsync.mockResolvedValue({ status: 'granted' });
  
    render(<WalkieTalkiePTT />);
  
    expect(Audio.requestPermissionsAsync).toHaveBeenCalled();
  });
  it('starts and stops recording on button press', async () => {
    Audio.requestPermissionsAsync.mockResolvedValue({ status: 'granted' });
    const { getByText } = render(<WalkieTalkiePTT />);
    const recordButton = getByText('Press and Hold');
  
    fireEvent.pressIn(recordButton);
    expect(Audio.Recording.prototype.startAsync).toHaveBeenCalled();
  
    fireEvent.pressOut(recordButton);
    expect(Audio.Recording.prototype.stopAndUnloadAsync).toHaveBeenCalled();
  });
  it('plays the last recording', async () => {
    Audio.requestPermissionsAsync.mockResolvedValue({ status: 'granted' });
    // Mock a URI for the recording to simulate a successful recording
    Audio.Recording.prototype.getURI.mockReturnValue('file://recording.mp3');
    const { getByText, findAllByText } = render(<WalkieTalkiePTT />);
  
    // Simulate recording
    fireEvent.pressIn(getByText('Press and Hold'));
    fireEvent.pressOut(getByText('Press and Hold'));
  
    // Find and press the Play button of the last recording
    const playButtons = await findAllByText('Play');
    fireEvent.press(playButtons[playButtons.length - 1]);
  
    expect(Audio.Sound.prototype.loadAsync).toHaveBeenCalledWith({ uri: 'file://recording.mp3' });
    expect(Audio.Sound.prototype.playAsync).toHaveBeenCalled();
  });
  it('clears recordings', async () => {
    const { getByText, queryByText } = render(<WalkieTalkiePTT />);
  
    // Assume recordings have been made and "Clear Recordings" button is visible
    fireEvent.press(getByText('Clear Recordings'));
    
    expect(queryByText('Recording #1')).toBeNull(); // Assuming "Recording #1" was a text on a rendered recording item
  });
     