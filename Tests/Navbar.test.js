import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import NavBar from '../component/Navbar';
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
    useRoute: jest.fn(),
  };
});

jest.mock('../assets/images/settings.png', () => 'settingsIcon');
jest.mock('../assets/images/task.png', () => 'taskIcon');
jest.mock('../assets/images/home.png', () => 'homeIcon');
jest.mock('../assets/images/chat.png', () => 'chatIcon');
describe('NavBar Component', () => {
    const mockNavigate = jest.fn();
  
    beforeAll(() => {
      useNavigation.mockReturnValue({ navigate: mockNavigate });
      useRoute.mockReturnValue({
        params: {
          userDetails: {
            id: '1',
            first_name: 'John',
            last_name: 'Doe',
          },
        },
      });
    });
  
    it('renders correctly and navigates with userDetails', () => {
      const { getByText } = render(<NavBar />);
  
      const homeOption = getByText("בית");
      const chatOption = getByText("צ'אט");
      const eventsOption = getByText("אירועים");
      const settingsOption = getByText("הגדרות");
  
      fireEvent.press(homeOption);
      expect(mockNavigate).toHaveBeenCalledWith('Home', {
        userDetails: expect.objectContaining({
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
        }),
      });
  
      fireEvent.press(chatOption);
      expect(mockNavigate).toHaveBeenCalledWith('Users', {
        userDetails: expect.objectContaining({
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
        }),
      });
  
      fireEvent.press(eventsOption);
      expect(mockNavigate).toHaveBeenCalledWith('Events', expect.any(Object));
  
      fireEvent.press(settingsOption);
      expect(mockNavigate).toHaveBeenCalledWith('Settings', expect.any(Object));
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  });
  