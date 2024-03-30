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
  ...jest.requireActual('react-native'), // Use most of the original implementations
  Alert: { alert: jest.fn() },
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      data: [
        { id_use: '1', message: 'Test Message' },
        // Add more mock users as needed
      ],
    }),
  })
);

// Mock Dimensions if necessary
jest.mock('Dimensions');
it('renders correctly and displays initial UI elements', () => {
    const route = { params: { userDetails: { id: '1', image: 'test-image-url' } } };
    const { getByText } = render(<Home route={route} />);
    
    expect(getByText('סטטוס')).toBeTruthy();
    // Continue with other assertions to validate initial rendering
  });
  it('starts and stops the alarm correctly', async () => {
    const route = { params: { userDetails: { id: '1', image: 'test-image-url' } } };
    const { getByText } = render(<Home route={route} />);
    
    // Simulate alarm start
    await act(async () => {
      fireEvent.press(getByText('Start Alarm'));
    });
    
    expect(SoundUtils.loadSound).toHaveBeenCalled();
    expect(SoundUtils.playSound).toHaveBeenCalled();
    
    // Simulate alarm stop
    await act(async () => {
      fireEvent.press(getByText('Stop Alarm'));
    });
    
    expect(SoundUtils.stopSound).toHaveBeenCalled();
  });
  it('shows and hides the modal correctly', async () => {
    const route = { params: { userDetails: { id: '1' } } };
    const { getByText, queryByText } = render(<Home route={route} />);
    
    // Simulate conditions to show modal
    await act(async () => {
      // Your logic here to trigger modal, e.g., pressing a button
    });
    
    expect(getByText('Emergency Alert')).toBeTruthy(); // Assuming this text is in the modal
    
    // Close modal
    fireEvent.press(getByText('אישור'));
    
    expect(queryByText('Emergency Alert')).toBeNull();
  });
  it('fetches data and triggers an alert upon receiving a new message', async () => {
    // Assuming fetchData is called on component mount and fetches data correctly
    await act(async () => {
      jest.advanceTimersByTime(5000); // Fast-forward to when the fetch occurs
    });
    
    expect(fetch).toHaveBeenCalledWith("https://server-ems-rzdd.onrender.com/user");
    expect(Alert.alert).toHaveBeenCalledWith(
      "Emergency Alert",
      expect.any(String),
      expect.anything() // You can get more specific here if needed
    );
  });
  