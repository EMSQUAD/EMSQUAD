import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsPage from '../component/Settings'; // Adjust the import path as necessary
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useRoute: () => ({
    params: {
      userDetails: { id: '1', name: 'John Doe' },
    },
  }),
}));

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
describe('SettingsPage Component', () => {
    it('renders all settings options', () => {
      const { getByText } = render(<SettingsPage />);
  
      settingsOptions.forEach((option) => {
        expect(getByText(option.title)).toBeTruthy();
      });
    });
  
    it('navigates correctly when options are pressed', () => {
      const mockNavigate = jest.fn();
      useNavigation.mockReturnValue({ navigate: mockNavigate });
  
      const { getByText } = render(<SettingsPage />);
  
      settingsOptions.forEach((option) => {
        const settingsOption = getByText(option.title);
        fireEvent.press(settingsOption);
        expect(mockNavigate).toHaveBeenCalledWith(option.navigateTo, { userDetails: expect.any(Object) });
      });
    });
  });
  