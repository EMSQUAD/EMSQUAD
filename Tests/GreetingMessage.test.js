import React from 'react';
import { render } from '@testing-library/react-native';
import GreetingMessage from '../component/DateMessage'; // Adjust the import path as necessary

// Utility function to mock the Date object
const mockCurrentHour = (hour) => {
  jest.spyOn(global, 'Date').mockImplementation(() => ({
    getHours: () => hour,
  }));
};

describe('GreetingMessage', () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Clean up mocks after each test
  });

  it('should display "בוקר טוב" in the morning', () => {
    mockCurrentHour(8); // Mock it as 8 AM
    const { getByText } = render(<GreetingMessage user={{ first_name: 'John' }} />);
    expect(getByText('בוקר טוב, John')).toBeTruthy();
  });

  it('should display "צהריים טובים" in the afternoon', () => {
    mockCurrentHour(14); // Mock it as 2 PM
    const { getByText } = render(<GreetingMessage user={{ first_name: 'John' }} />);
    expect(getByText('צהריים טובים, John')).toBeTruthy();
  });

  it('should display "ערב טוב" in the evening', () => {
    mockCurrentHour(19); // Mock it as 7 PM
    const { getByText } = render(<GreetingMessage user={{ first_name: 'John' }} />);
    expect(getByText('ערב טוב, John')).toBeTruthy();
  });

  it('should display "לילה טוב" at night', () => {
    mockCurrentHour(23); // Mock it as 11 PM
    const { getByText } = render(<GreetingMessage user={{ first_name: 'John' }} />);
    expect(getByText('לילה טוב, John')).toBeTruthy();
  });
});
