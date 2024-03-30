import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import NavBar from '../component/Navbar';
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
    useRoute: jest.fn(),
  };
});

jest.mock('../assets/images/settings.png', () => 'settingsIcon');
jest.mock('../assets/images/task.png', () => 'taskIcon');
jest.mock('../assets/images/home.png', () => 'homeIcon');
jest.mock('../assets/images/chat.png', () => 'chatIcon');
