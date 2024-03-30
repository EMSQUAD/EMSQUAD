import React from 'react';
import { render } from '@testing-library/react-native';
import Training from './Training';

describe('Training Component', () => {
  it('renders training events correctly', () => {
    const { getByText } = render(<Training />);
    const eventTitles = ['ישיבה צוות 8.3', 'תרגיל אימון 9.3', 'ספירת מלאי 10.3'];

    eventTitles.forEach(title => {
      expect(getByText(title)).toBeTruthy();
    });

    expect(getByText('אירועים קרובים')).toBeTruthy(); // Check if the section title is rendered
  });
});
