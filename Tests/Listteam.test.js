import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ListTeam from '../component/Listteam';
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

global.fetch = jest.fn();
beforeEach(() => {
    useRoute.mockReturnValue({
      params: {
        userDetails: { id: '1' },
      },
    });
  
    useNavigation.mockReturnValue({
      navigate: jest.fn(),
    });
  
    fetch.mockClear();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('displays a loading indicator before data is fetched', () => {
    fetch.mockReturnValueOnce(Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: [] }),
    }));
  
    const { getByTestId } = render(<ListTeam />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
  it('renders users after fetching data successfully', async () => {
    const mockUsers = [
      { id_use: '2', first_name: 'John', last_name: 'Doe', phone: '1234567890', status_ability: 'available', image: 'image-url-1' },
    ];
  
    fetch.mockReturnValueOnce(Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: mockUsers }),
    }));
  
    const { findByText } = render(<ListTeam />);
  
    await waitFor(() => {
      expect(findByText('John Doe')).toBeTruthy();
    });
  });
  it('handles errors during fetch operation', async () => {
    fetch.mockReturnValueOnce(Promise.reject(new Error('Failed to fetch users')));
  
    const { findByText } = render(<ListTeam />);
    
    await waitFor(() => {
      expect(findByText('No users found')).toBeTruthy();
    });
  });
  it('navigates to the user profile on pressing a user card', async () => {
    const mockUsers = [
      { id_use: '2', first_name: 'Jane', last_name: 'Doe', phone: '0987654321', status_ability: 'available', image: 'image-url-2' },
    ];
  
    fetch.mockReturnValueOnce(Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: mockUsers }),
    }));
  
    const navigation = useNavigation();
    const { getByText } = render(<ListTeam />);
  
    await waitFor(() => {
      fireEvent.press(getByText('Jane Doe'));
      expect(navigation.navigate).toHaveBeenCalledWith('ProfileUser', { user: mockUsers[0] });
    });
  });
   