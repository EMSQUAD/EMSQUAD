import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Home from '../component/Home.component';
import axios from 'axios';

jest.mock('axios');
jest.mock('../component/SoundUtils', () => ({
  loadSound: jest.fn(),
  playSound: jest.fn(),
  stopSound: jest.fn(),
}));

global.fetch = jest.fn();

jest.mock('../server/db/message.json', () => ([
  { name: 'Message 1', description: 'Description 1' },
  { name: 'Message 2', description: 'Description 2' },
]));
it('renders correctly', () => {
    const route = { params: { userDetails: { id: '1', image: 'test-image-url' } } };
    const { getByText, getByTestId } = render(<Home route={route} />);
    
    expect(getByText('אירוע אמת')).toBeTruthy();
  });
  it('toggles modal visibility on long press and button click', async () => {
    const route = { params: { userDetails: { id: '1', image: 'test-image-url' } } };
    const { getByText, queryByText } = render(<Home route={route} />);
  
    fireEvent(getByText('אירוע אמת'), 'pressIn');
    await act(async () => {
      jest.advanceTimersByTime(800); 
    });
    
    expect(queryByText('בטל')).toBeTruthy(); 
  
    fireEvent.press(getByText('בטל'));
    expect(queryByText('בטל')).toBeNull();
  });
  it('sends selected message on pressing send', async () => {
    axios.put.mockResolvedValue({ data: 'Response data' }); 
    
    const route = { params: { userDetails: { id: '1', image: 'test-image-url' } } };
    const { getByText } = render(<Home route={route} />);
    
    fireEvent(getByText('אירוע אמת'), 'pressIn');
    await act(async () => {
      jest.advanceTimersByTime(800);
    });
  
    fireEvent.press(getByText('Message 1')); 
    fireEvent.press(getByText('שלח'));
    
    await act(async () => {
      expect(axios.put).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        message: 'Message 1',
      }));
      expect(getByText('התראה נשלחה בהצלחה')).toBeTruthy(); 
    });
  });
  