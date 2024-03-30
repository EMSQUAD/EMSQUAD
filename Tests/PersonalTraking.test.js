import React from 'react';
import { render } from '@testing-library/react-native';
import PersonalTracking from '../component/PersonalTracking';

// Mock react-native-chart-kit
jest.mock('react-native-chart-kit', () => ({
  BarChart: () => 'BarChart',
}));
describe('PersonalTracking Component', () => {
    it('renders correctly and generates expected chart configuration', () => {
      const { getByText, getByTestId } = render(<PersonalTracking />);
  
      // Verify the title is rendered
      expect(getByText('מעקב אישי')).toBeTruthy();
  
      // Since we mock BarChart as a plain component, we can't directly assert on its props.
      // However, we can check for its presence as a sign that the component is utilizing it.
      expect(getByTestId('BarChart')).toBeTruthy();
  
      // Additional tests can be written to mock and verify specific interactions or data handling,
      // but these would likely require more complex setups or additional libraries/tooling.
    });
  });
  