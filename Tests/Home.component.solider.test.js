import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Home from '../component/Home.component.solider';
import { Alert } from 'react-native';
import * as SoundUtils from '../component/SoundUtils';
import axios from 'axios';

jest.mock('axios');
jest.mock('./SoundUtils', () => ({
  loadSound: jest.fn(),
  playSound: jest.fn(),
  stopSound: jest.fn(),
}));
jest.mock('@expo/vector-icons', () => ({
  AntDesign: 'AntDesignIcon',
  Feather: 'FeatherIcon',
}));
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'), 
  Alert: { alert: jest.fn() },
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      data: [
        { id_use: '1', message: 'Test Message' },
      ],
    }),
  })
);

jest.mock('Dimensions');
it('renders correctly and displays initial UI elements', () => {
    const route = { params: { userDetails: { id: '1', image: 'test-image-url' } } };
    const { getByText } = render(<Home route={route} />);
    
    expect(getByText('סטטוס')).toBeTruthy();
  });
  it('starts and stops the alarm correctly', async () => {
    const route = { params: { userDetails: { id: '1', image: 'test-image-url' } } };
    const { getByText } = render(<Home route={route} />);
    
    await act(async () => {
      fireEvent.press(getByText('Start Alarm'));
    });
    
    expect(SoundUtils.loadSound).toHaveBeenCalled();
    expect(SoundUtils.playSound).toHaveBeenCalled();
    
    await act(async () => {
      fireEvent.press(getByText('Stop Alarm'));
    });
    
    expect(SoundUtils.stopSound).toHaveBeenCalled();
  });
  it('shows and hides the modal correctly', async () => {
    const route = { params: { userDetails: { id: '1' } } };
    const { getByText, queryByText } = render(<Home route={route} />);
    
    await act(async () => {
    });
    
    expect(getByText('Emergency Alert')).toBeTruthy(); 
    
    fireEvent.press(getByText('אישור'));
    
    expect(queryByText('Emergency Alert')).toBeNull();
  });
  it('fetches data and triggers an alert upon receiving a new message', async () => {
    await act(async () => {
      jest.advanceTimersByTime(5000); 
    });
    
    expect(fetch).toHaveBeenCalledWith("https://server-ems-rzdd.onrender.com/user");
    expect(Alert.alert).toHaveBeenCalledWith(
      "Emergency Alert",
      expect.any(String),
      expect.anything() 
    );
  });
  