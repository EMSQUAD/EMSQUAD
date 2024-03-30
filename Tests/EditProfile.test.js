import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import EditProfileScreen from '../component/EditProfile';

// Mocks for navigation and route
const mockGoBack = jest.fn();
const mockRoute = {
    params: {
        userDetails: {
            id: '1',
            first_name: 'John',
            last_name: 'Doe',
            phone: '1234567890',
            certifications: 'None',
            image: 'image-url',
        },
    },
};

global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Profile updated successfully.' }),
}));

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: mockGoBack,
    }),
    useRoute: () => mockRoute,
}));
it('renders with initial values', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(<EditProfileScreen />);

    expect(getByDisplayValue(mockRoute.params.userDetails.first_name)).toBeTruthy();
    expect(getByDisplayValue(mockRoute.params.userDetails.last_name)).toBeTruthy();
    expect(getByDisplayValue(mockRoute.params.userDetails.phone)).toBeTruthy();
    // Continue for other inputs
});
it('updates the inputs when changed', () => {
    const { getByPlaceholderText } = render(<EditProfileScreen />);

    const firstNameInput = getByPlaceholderText('First Name');
    fireEvent.changeText(firstNameInput, 'Jane');
    expect(firstNameInput.props.value).toBe('Jane');

    // Repeat for other fields
});
it('submits the form and shows success message', async () => {
    fetch.mockClear();
    global.Alert = { alert: jest.fn() }; // Mock Alert.alert

    const { getByText } = render(<EditProfileScreen />);

    const submitButton = getByText('שמור');

    await act(async () => {
        fireEvent.press(submitButton);
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(global.Alert.alert).toHaveBeenCalledWith("Success", "Profile updated successfully.");
    expect(mockGoBack).toHaveBeenCalled(); // Assuming navigation.goBack() is called upon success
});
it('shows an error message if the API call fails', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({
        ok: false,
        text: () => Promise.resolve('An error occurred'),
    }));

    global.Alert.alert.mockClear();

    const { getByText } = render(<EditProfileScreen />);

    await act(async () => {
        fireEvent.press(getByText('שמור'));
    });

    expect(global.Alert.alert).toHaveBeenCalledWith('Error', 'An error occurred while updating the profile. Please try again.');
});
