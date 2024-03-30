import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Axios from 'axios';
import StatusSwitch from '../component/Status'; 

jest.mock('axios');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(() => ({
    params: { userDetails: { id: '1' } },
  })),
}));

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
    Axios.put.mockResolvedValue({}); 
  
    const { getByText, getByTestId } = render(<StatusSwitch />);
  
    await act(async () => {
      fireEvent(getByTestId('switch'), 'onValueChange', false); 
    });
  
    expect(Axios.put).toHaveBeenCalledWith(
      `https://server-ems-rzdd.onrender.com/user/1`,
      { status_ability: 'unavailable' }
    );
    await expect(getByText('לא זמין')).toBeTruthy();
  });
  