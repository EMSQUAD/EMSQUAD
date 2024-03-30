import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTaskScreen from '../component/AddTasks';


jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');

describe('AddTaskScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('loads tasks from AsyncStorage on component mount', async () => {
    const tasks = [
      { id: 1, name: 'Task 1', dateTime: '2023-04-04 10:00', description: 'Description 1' },
    ];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(tasks));

    const { getByText } = render(<AddTaskScreen />);
    await waitFor(() => expect(getByText('Task 1 - 2023-04-04 10:00 Description 1')).toBeTruthy());
  });

  it('adds a new task', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddTaskScreen />);
    fireEvent.changeText(getByPlaceholderText('תיאור המשימה'), 'New Task');
    fireEvent.press(getByText('הוספה'));

    await waitFor(() => expect(queryByText('New Task')).toBeTruthy());
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('removes a task', async () => {
    const tasks = [
      { id: 1, name: 'Task 1', dateTime: '2023-04-04 10:00', description: 'Description 1' },
    ];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(tasks));
    const { getByText, queryByText } = render(<AddTaskScreen />);

    await waitFor(() => expect(getByText('Task 1 - 2023-04-04 10:00 Description 1')).toBeTruthy());
    fireEvent.press(getByText('הסר'));
    await waitFor(() => expect(queryByText('Task 1 - 2023-04-04 10:00 Description 1')).toBeNull());
  });

  it('sets the task date', async () => {
    const { getByText, getByTitle } = render(<AddTaskScreen />);
    fireEvent.press(getByText('תאריך'));
    await waitFor(() => expect(getByTitle('Date Time Picker')).toBeTruthy());
  });
});
