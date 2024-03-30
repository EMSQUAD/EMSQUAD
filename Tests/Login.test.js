import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import LoginScreen from '../component/Login';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

global.fetch = jest.fn();
global.Alert = { alert: jest.fn() };
it('shows an alert if ID or password is not entered', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    const loginButton = getByText('התחברות');
  
    fireEvent.changeText(getByPlaceholderText('תעודת זהות'), '');
    fireEvent.changeText(getByPlaceholderText('סיסמא'), '');
    fireEvent.press(loginButton);
  
    expect(Alert.alert).toHaveBeenCalledWith('Validation Error', 'Please enter both ID and password');
  });
  it('navigates to the correct screen based on user type after successful login', async () => {
    const mockResponseData = {
      data: {
        first_name: 'John',
        last_name: 'Doe',
        image: 'image-url',
        status_ability: 'active',
        type_user: 'Comander',
        message: 'Login successful',
        phone: '1234567890',
        certifications: 'Some certifications',
      },
    };
  
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponseData),
    });
  
    const navigation = useNavigation();
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
  
    fireEvent.changeText(getByPlaceholderText('תעודת זהות'), '123');
    fireEvent.changeText(getByPlaceholderText('סיסמא'), 'password');
    
    await act(async () => {
      fireEvent.press(getByText('התחברות'));
    });
  
    expect(navigation.navigate).toHaveBeenCalledWith('Home', { userDetails: expect.any(Object) });
  });
  it('displays an alert if the login API call fails', async () => {
    fetch.mockRejectedValueOnce(new Error('API call failed'));
  
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText('תעודת זהות'), '123');
    fireEvent.changeText(getByPlaceholderText('סיסמא'), 'password');
    
    await act(async () => {
      fireEvent.press(getByText('התחברות'));
    });
  
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'An error occurred during login');
  });
   