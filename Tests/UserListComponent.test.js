import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UserListComponent from '../component/DisplayUsers.component';
import { useNavigation, useRoute } from '@react-navigation/native';

// Mocking the external modules
jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
    useRoute: jest.fn(),
}));

// Mock global fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            data: [
                { id_use: '1', first_name: 'John', last_name: 'Doe', image: 'image-url-1', status_ability: 'Active' },
                // Add more mock users if needed
            ],
        }),
    })
);
it('renders the loading state', () => {
    useRoute.mockImplementation(() => ({ params: { userDetails: { id: '2' } } }));
    const { getByText } = render(<UserListComponent />);
    expect(getByText('Loading...')).toBeTruthy();
});
it('renders users after fetching', async () => {
    useRoute.mockImplementation(() => ({ params: { userDetails: { id: '2' } } }));
    const { queryByText, findAllByText } = render(<UserListComponent />);

    await waitFor(() => expect(queryByText('Loading...')).toBeNull());
    expect(findAllByText(/John Doe/)).toBeTruthy();
});
it('displays no users found when the list is empty', async () => {
    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ data: [] }),
        })
    );

    useRoute.mockImplementation(() => ({ params: {} }));
    const { getByText } = render(<UserListComponent />);

    await waitFor(() => expect(getByText('No users found')).toBeTruthy());
});
it('navigates to the ChatScreen with the correct parameters when a user is pressed', async () => {
    const navigateMock = jest.fn();
    useNavigation.mockImplementation(() => ({ navigate: navigateMock }));
    useRoute.mockImplementation(() => ({ params: { userDetails: { id: '2' } } }));

    const { getByText } = render(<UserListComponent />);

    await waitFor(() => {
        const userCard = getByText('John Doe');
        fireEvent.press(userCard);
        expect(navigateMock).toHaveBeenCalledWith('ChatScreen', {
            userId: '1',
            userName: 'John Doe',
            userImageUrl: 'image-url-1',
        });
    });
});
