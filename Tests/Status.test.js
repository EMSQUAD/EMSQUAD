import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import StatusSwitch from './StatusSwitch'; // Adjust the import path as necessary

jest.mock('axios');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(() => ({
    params: { userDetails: { id: '1' } },
  })),
}));

// Mock additional components if necessary
it('fetches and displays the initial status correctly', async () => {
    Axios.get.mockResolvedValue({ data: { status_ability: 'available' } });
  
    const { findByText } = render(<StatusSwitch />);
  
    expect(Axios.get).toHaveBeenCalledWith(
      `https://server-ems-rzdd.onrender.com/user/1`
    );
    await expect(findByText('זמין')).toBeTruthy();
  });
  it('toggles status correctly', async () => {
    Axios.get.mockResolvedValue({ data: { status_ability: 'available' } });
    Axios.put.mockResolvedValue({}); // Assume a successful status update
  
    const { getByText, getByTestId } = render(<StatusSwitch />);
  
    await act(async () => {
      fireEvent(getByTestId('switch'), 'onValueChange', false); // Assuming 'switch' is the testID for the Switch component
    });
  
    expect(Axios.put).toHaveBeenCalledWith(
      `https://server-ems-rzdd.onrender.com/user/1`,
      { status_ability: 'unavailable' }
    );
    await expect(getByText('לא זמין')).toBeTruthy();
  });
  