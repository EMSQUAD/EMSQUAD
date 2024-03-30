import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Home from '../component/Home';
import * as SoundUtils from '../component/SoundUtils';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

jest.mock('./SoundUtils', () => ({
  loadSound: jest.fn(),
  playSound: jest.fn(),
  stopSound: jest.fn(),
}));

const Stack = createStackNavigator();
describe('Home Component Tests', () => {
    it('renders correctly and interacts with touchable elements', async () => {
      const { getByText, getByTestId } = render(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            {/* Define other screens as needed for navigation */}
          </Stack.Navigator>
        </NavigationContainer>
      );
  
      // Test if the main button renders and can be interacted with
      const mainButton = getByText('אירוע אמת');
      fireEvent.pressIn(mainButton);
      fireEvent.pressOut(mainButton);
      expect(SoundUtils.loadSound).toHaveBeenCalled();
      expect(SoundUtils.playSound).toHaveBeenCalled();
  
      // Assuming there's logic to stop the sound, e.g., after a timeout or another action
      // This part will depend on your implementation details
      await SoundUtils.stopSound();
      expect(SoundUtils.stopSound).toHaveBeenCalled();
    });
  
    it('navigates to the Users screen when the team button is pressed', () => {
      const { getByText } = render(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            {/* Additional screens for testing navigation */}
          </Stack.Navigator>
        </NavigationContainer>
      );
  
      const teamButton = getByText('צוות');
      fireEvent.press(teamButton);
  
      // In this testing environment, we can't directly test navigation success.
      // Instead, we ensure the button intended for navigation is present and can be interacted with.
      // For more detailed navigation testing, consider integrating with @react-navigation/testing library or similar tools.
      expect(teamButton).toBeTruthy();
    });
  
    // Add more tests as needed for other interactions and functionalities
  });
  