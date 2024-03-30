import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import EventListComponent from '../component/DisplayEvents.component'; 
import fetchMock from 'jest-fetch-mock';

describe('EventListComponent', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('displays a loading indicator initially', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] })); 
    const { getByTestId } = render(<EventListComponent />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders events after fetching', async () => {
    const mockEvents = [
      { id_event: '1', name_event: 'Event 1', severity: 'High', description: 'Description 1', report: 'Report 1' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockEvents }));

    const { getByText } = render(<EventListComponent />);

    await waitFor(() => {
      expect(getByText('Event 1')).toBeTruthy();

    });
  });

  it('shows a message when no events are found', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));

    const { getByText } = render(<EventListComponent />);

    await waitFor(() => {
      expect(getByText('No events found')).toBeTruthy();
    });
  });
});
