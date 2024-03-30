import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../component/Header';

// Mocks for external components and libraries as necessary
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: jest.fn(),
    }),
}));

jest.mock('./DropdownMenu', () => 'DropdownMenu');

// Mock the Image require to simplify testing
jest.mock('../assets/images/logo.png', () => 'test-logo');

it('renders correctly', () => {
    const userDetails = {
        image: 'user-image-url',
    };
    const { getByText, getByTestId } = render(<Header userDetails={userDetails} />);

    // You can test for the presence of elements like the greeting message, user image, etc.
    expect(getByTestId('user-image')).toBeTruthy(); // Assuming you add testIDs to your Image components
});
it('toggles the menu modal visibility when pressed', () => {
    const userDetails = {
        image: 'user-image-url',
    };
    const { getByTestId, queryByTestId } = render(<Header userDetails={userDetails} />);

    const toggleButton = getByTestId('toggle-menu-button'); // Add a testID to your TouchableOpacity
    fireEvent.press(toggleButton);

    // Assuming the modal has a testID too
    expect(queryByTestId('dropdown-menu-modal')).toBeTruthy();

    // Close the menu by pressing the backdrop (simplified for this test)
    fireEvent.press(queryByTestId('dropdown-menu-backdrop'));
    expect(queryByTestId('dropdown-menu-modal')).toBeNull();
});
it('passes correct props to DropdownMenu', () => {
    const userDetails = {
        image: 'user-image-url',
    };
    const { getByTestId } = render(<Header userDetails={userDetails} />);

    // Open the menu to render DropdownMenu
    fireEvent.press(getByTestId('toggle-menu-button'));

    // Validate DropdownMenu props if necessary
    // This might be more complex because you'd need a more integrated test or to check the function implementations
    // As an example, ensure DropdownMenu's `closeMenu` prop causes the modal to close when invoked
});
