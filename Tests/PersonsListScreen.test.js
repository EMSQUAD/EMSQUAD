import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import axios from 'axios';
import PersonListScreen from '../component/PersonsListScreen';
import { useNavigation } from '@react-navigation/native';

jest.mock('axios');
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});
it('fetches and displays persons', async () => {
    const mockPersons = [
      { _id: '1', name: 'John Doe' },
      { _id: '2', name: 'Jane Doe' },
    ];
  
    axios.get.mockResolvedValue({ data: mockPersons });
  
    const { findByText } = render(<PersonListScreen />);
  
    expect(axios.get).toHaveBeenCalledWith('YOUR_API_ENDPOINT/persons');
    
    for (const person of mockPersons) {
      expect(await findByText(person.name)).toBeTruthy();
    }
  });
  it('navigates to the Chat screen with the correct parameters when a person is pressed', async () => {
    const mockPersons = [{ _id: '1', name: 'John Doe' }];
    axios.get.mockResolvedValue({ data: mockPersons });
  
    const navigation = useNavigation();
    const { getByText } = render(<PersonListScreen />);
  
    const personItem = await getByText(mockPersons[0].name);
    fireEvent.press(personItem);
  
    expect(navigation.navigate).toHaveBeenCalledWith('Chat', { personId: mockPersons[0]._id });
  });
  