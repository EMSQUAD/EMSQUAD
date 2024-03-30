import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserProfileScreen from '../component/UserProfile'; 
import { Alert } from 'react-native';

global.fetch = jest.fn();


jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  Alert: { alert: jest.fn() },
}));


const mockNavigate = jest.fn();
const route = {
  params: {
    user: {
      id_use: '1',
      first_name: 'John',
      last_name: 'Doe',
      image: 'image_url',
      certifications: 'None',
      phone: '1234567890',
      status_ability: 'available',
    },
  },
};
const navigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
};
it('renders user information correctly', () => {
    const { getByText } = render(
      <UserProfileScreen route={route} navigation={navigation} />
    );
  
    expect(getByText(`John Doe`)).toBeTruthy();
    expect(getByText(`ת"ז: 1`)).toBeTruthy();

  });
  it('handles user deletion successfully', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
  
    const { getByText } = render(
      <UserProfileScreen route={route} navigation={navigation} />
    );
  
    fireEvent.press(getByText('מחיקה'));
  

    expect(Alert.alert).toHaveBeenCalledWith(
      'מחיקה',
      expect.any(String),
      expect.any(Array) 
    );
  
  });
  it('handles failure in user deletion', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to delete user'));
  
    const { getByText } = render(
      <UserProfileScreen route={route} navigation={navigation} />
    );
  
    fireEvent.press(getByText('מחיקה'));
  
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Failed to delete user',
      expect.any(Array)
    );
  });
  