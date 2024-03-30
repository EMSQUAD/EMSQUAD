import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddUserScreen from '../component/AddUser'; // Adjust the import path as necessary

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'משתמש נוסף בהצלחה' }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('AddUserScreen', () => {
  it('updates inputs correctly', () => {
    const { getByPlaceholderText } = render(<AddUserScreen />);
    const idInput = getByPlaceholderText('תעודת זהות');
    
    fireEvent.changeText(idInput, '123456789');
    
    expect(idInput.props.value).toBe('123456789');
  });

  it('submits form with correct details', async () => {
    const { getByText, getByPlaceholderText } = render(<AddUserScreen />);

    fireEvent.changeText(getByPlaceholderText('תעודת זהות'), '123456789');
    fireEvent.changeText(getByPlaceholderText('שם פרטי'), 'John');
    fireEvent.changeText(getByPlaceholderText('שם משפחה'), 'Doe');
    
    fireEvent.press(getByText('שלח'));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it('handles network request failure gracefully', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Network Error')));
    
    const { getByText } = render(<AddUserScreen />);
    fireEvent.press(getByText('שלח'));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });
});
