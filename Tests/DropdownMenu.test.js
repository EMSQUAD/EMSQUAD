import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DropdownMenu from './DropdownMenu';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));
jest.mock('@expo/vector-icons', () => ({
    AntDesign: 'AntDesignIcon',
}));
it('renders correctly', () => {
    const { getByText } = render(<DropdownMenu />);
    expect(getByText('חזור')).toBeTruthy();
    expect(getByText('התנתקות')).toBeTruthy();
    expect(getByText('יציאה מהאפליקציה')).toBeTruthy();
});
it('closes the menu when the close button is pressed', () => {
    const closeMenuMock = jest.fn();
    const { getByText } = render(<DropdownMenu closeMenu={closeMenuMock} />);

    fireEvent.press(getByText('חזור'));
    expect(closeMenuMock).toHaveBeenCalled();
});

it('navigates back when the back button is pressed', () => {
    const navigationMock = {
        goBack: jest.fn(),
        reset: jest.fn(),
    };
    useNavigation.mockReturnValue(navigationMock);

    const { getByText } = render(<DropdownMenu />);

    fireEvent.press(getByText('התנתקות'));
    expect(navigationMock.goBack).toHaveBeenCalled();
});

it('resets navigation to login screen on logout', () => {
    const navigationMock = {
        goBack: jest.fn(),
        reset: jest.fn(),
    };
    useNavigation.mockReturnValue(navigationMock);

    const { getByText } = render(<DropdownMenu />);

    fireEvent.press(getByText('יציאה מהאפליקציה'));
    expect(navigationMock.reset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: 'Login' }],
    });
});
