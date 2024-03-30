import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import EventListComponent from './EventListComponent'; // Adjust the import path as necessary
import fetchMock from 'jest-fetch-mock';

describe('EventListComponent', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('displays a loading indicator initially', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] })); // Mock fetch response
    const { getByTestId } = render(<EventListComponent />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders events after fetching', async () => {
    const mockEvents = [
      { id_event: '1', name_event: 'Event 1', severity: 'High', description: 'Description 1', report: 'Report 1' },
      // Add more mock events as needed
    ];
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockEvents }));

    const { getByText } = render(<EventListComponent />);

    await waitFor(() => {
      expect(getByText('Event 1')).toBeTruthy();
      // Verify other event details as needed
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
