import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserProfileScreen from '../component/UserProfile'; // Adjust the import path as necessary
import { Alert } from 'react-native';

// Mocking fetch globally
global.fetch = jest.fn();

// Mocking Alert
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  Alert: { alert: jest.fn() },
}));

// Mocking route and navigation
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
    // Continue for other user details
  });
  it('handles user deletion successfully', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
  
    const { getByText } = render(
      <UserProfileScreen route={route} navigation={navigation} />
    );
  
    fireEvent.press(getByText('מחיקה'));
  
    // Expect an Alert to be shown on success
    expect(Alert.alert).toHaveBeenCalledWith(
      'מחיקה',
      expect.any(String),
      expect.any(Array) // Because the exact text might depend on fetched data, use expect.any(String)
    );
  
    // Expect navigation to have been called with "List" and { refresh: true }
    // This expectation should be validated after confirming the Alert action, which requires a more integrated testing approach or manual testing.
  });
  it('handles failure in user deletion', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to delete user'));
  
    const { getByText } = render(
      <UserProfileScreen route={route} navigation={navigation} />
    );
  
    fireEvent.press(getByText('מחיקה'));
  
    // Expect an Alert to be shown on failure
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Failed to delete user',
      expect.any(Array)
    );
  });
  