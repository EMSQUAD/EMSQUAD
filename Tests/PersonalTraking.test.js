import React from 'react';
import { render } from '@testing-library/react-native';
import PersonalTracking from '../component/PersonalTracking';

jest.mock('react-native-chart-kit', () => ({
  BarChart: () => 'BarChart',
}));
describe('PersonalTracking Component', () => {
    it('renders correctly and generates expected chart configuration', () => {
      const { getByText, getByTestId } = render(<PersonalTracking />);
  
      expect(getByText('מעקב אישי')).toBeTruthy();
  
      expect(getByTestId('BarChart')).toBeTruthy();
  
    });
  });
  