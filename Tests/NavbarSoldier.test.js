import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import NavBar from '../component/NavbarSoliser'; // Adjust the path according to your project structure
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('../assets/images/settings.png', () => 'settingsIcon');
jest.mock('../assets/images/task.png', () => 'taskIcon');
jest.mock('../assets/images/home.png', () => 'homeIcon');
jest.mock('../assets/images/chat.png', () => 'chatIcon');
describe('NavBar Component', () => {
    const mockNavigate = jest.fn();
  
    beforeEach(() => {
      useNavigation.mockReturnValue({ navigate: mockNavigate });
      useRoute.mockReturnValue({
        params: {
          userDetails: {
            id: '1',
            first_name: 'John',
            last_name: 'Doe',
          },
          name: '', // Mock current route name if needed
        },
      });
    });
  
    it('navigates correctly when options are pressed', () => {
      const { getByText } = render(<NavBar />);
      
      // Assuming you have a userDetails object to pass for navigation
      const userDetails = {
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
      };
  
      const options = [
        { text: "הגדרות", screen: "SettingsSolider" },
        { text: "אירועים", screen: "Events" },
        { text: "בית", screen: "HomeSolider" },
        { text: "צ'אט", screen: "Users" },
      ];
  
      options.forEach(option => {
        fireEvent.press(getByText(option.text));
        expect(mockNavigate).toHaveBeenCalledWith(option.screen, { userDetails });
      });
  
      // Reset mock to ensure clean slate for next tests
      mockNavigate.mockClear();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  });
  