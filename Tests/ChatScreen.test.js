jest.mock('axios');
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({ params: { userId: '1', userName: 'John Doe', userImageUrl: 'https://example.com/image.jpg' } })
}));
jest.mock('expo-image-picker');


import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import axios from 'axios';
import ChatScreen from '../component/ChatScreen'; 

describe('ChatScreen', () => {
  it('renders correctly', async () => {
    const { findByText } = render(<ChatScreen />);
    const sendButton = await findByText('Send'); 
    expect(sendButton).toBeTruthy();
  });

  it('sends a message', async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    const { getByPlaceholderText, getByText } = render(<ChatScreen />);
    fireEvent.changeText(getByPlaceholderText('Type a message...'), 'Hello, world!');
    fireEvent.press(getByText('Send'));

    expect(axios.post).toHaveBeenCalled();
  });

});
