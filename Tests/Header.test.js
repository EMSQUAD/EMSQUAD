import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../component/Header';

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: jest.fn(),
    }),
}));

jest.mock('./DropdownMenu', () => 'DropdownMenu');

jest.mock('../assets/images/logo.png', () => 'test-logo');

it('renders correctly', () => {
    const userDetails = {
        image: 'user-image-url',
    };
    const { getByText, getByTestId } = render(<Header userDetails={userDetails} />);

    expect(getByTestId('user-image')).toBeTruthy(); 
});
it('toggles the menu modal visibility when pressed', () => {
    const userDetails = {
        image: 'user-image-url',
    };
    const { getByTestId, queryByTestId } = render(<Header userDetails={userDetails} />);

    const toggleButton = getByTestId('toggle-menu-button'); 
    fireEvent.press(toggleButton);

    expect(queryByTestId('dropdown-menu-modal')).toBeTruthy();

    fireEvent.press(queryByTestId('dropdown-menu-backdrop'));
    expect(queryByTestId('dropdown-menu-modal')).toBeNull();
});
it('passes correct props to DropdownMenu', () => {
    const userDetails = {
        image: 'user-image-url',
    };
    const { getByTestId } = render(<Header userDetails={userDetails} />);

    fireEvent.press(getByTestId('toggle-menu-button'));

});
