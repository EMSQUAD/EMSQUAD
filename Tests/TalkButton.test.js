import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TalkButton from './TalkButton'; // Adjust the import path as needed

describe('TalkButton', () => {
  it('changes color and triggers callbacks on press in and out', () => {
    const onRecordStart = jest.fn();
    const onRecordStop = jest.fn();

    const { getByText } = render(
      <TalkButton
        isRecording={false}
        onRecordStart={onRecordStart}
        onRecordStop={onRecordStop}
      />
    );

    const button = getByText('לחץ והחזק לדבר');
    // Simulate pressing in
    fireEvent(button, 'pressIn');
    expect(onRecordStart).toHaveBeenCalledTimes(1);
    expect(button.parent.props.style.backgroundColor).toBe('#f00');

    // Simulate pressing out
    fireEvent(button, 'pressOut');
    expect(onRecordStop).toHaveBeenCalledTimes(1);
    expect(button.parent.props.style.backgroundColor).toBe('#ccc');
  });
});
