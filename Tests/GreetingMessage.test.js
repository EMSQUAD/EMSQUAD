import React from 'react';
import { render } from '@testing-library/react-native';
import GreetingMessage from '../component/DateMessage'; 

const mockCurrentHour = (hour) => {
  jest.spyOn(global, 'Date').mockImplementation(() => ({
    getHours: () => hour,
  }));
};

describe('GreetingMessage', () => {
  afterEach(() => {
    jest.restoreAllMocks(); 
  });

  it('should display "בוקר טוב" in the morning', () => {
    mockCurrentHour(8); 
    const { getByText } = render(<GreetingMessage user={{ first_name: 'John' }} />);
    expect(getByText('בוקר טוב, John')).toBeTruthy();
  });

  it('should display "צהריים טובים" in the afternoon', () => {
    mockCurrentHour(14); 
    const { getByText } = render(<GreetingMessage user={{ first_name: 'John' }} />);
    expect(getByText('צהריים טובים, John')).toBeTruthy();
  });

  it('should display "ערב טוב" in the evening', () => {
    mockCurrentHour(19); 
    const { getByText } = render(<GreetingMessage user={{ first_name: 'John' }} />);
    expect(getByText('ערב טוב, John')).toBeTruthy();
  });

  it('should display "לילה טוב" at night', () => {
    mockCurrentHour(23);
    const { getByText } = render(<GreetingMessage user={{ first_name: 'John' }} />);
    expect(getByText('לילה טוב, John')).toBeTruthy();
  });
});
