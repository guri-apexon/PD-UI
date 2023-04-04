import { render, fireEvent, screen, act } from '@testing-library/react';
import SectionLockTimer from '../SectionLockTimer';

describe('SectionLockTimer', () => {
  it('shows Modal on idle time-out', () => {
    jest.useFakeTimers();
    const updateSectionLock = jest.fn();
    const onDiscardClick = jest.fn();
    render(
      <SectionLockTimer
        updateSectionLock={updateSectionLock}
        onDiscardClick={onDiscardClick}
      />,
    );
    act(() => {
      jest.advanceTimersByTime(20000 * 60); // set idle time-out to 20 seconds
    });
    expect(screen.getByText('Session timeout')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Application is about to timeout due to inactivity. Please continue editing or discard.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Discard Changes')).toBeInTheDocument();
    expect(screen.getByText('Continue Editing')).toBeInTheDocument();
    jest.useRealTimers();
  });
  it('shows Modal on idle time-out', () => {
    jest.useFakeTimers();
    const updateSectionLock = jest.fn();
    const onDiscardClick = jest.fn();
    render(
      <SectionLockTimer
        updateSectionLock={updateSectionLock}
        onDiscardClick={onDiscardClick}
      />,
    );
    act(() => {
      jest.advanceTimersByTime(20000 * 60); // set idle time-out to 20 seconds
    });
    expect(screen.getByText('Session timeout')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Application is about to timeout due to inactivity. Please continue editing or discard.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Discard Changes')).toBeInTheDocument();
    const discard = screen.getByText('Discard Changes');
    fireEvent.click(discard);
    expect(screen.getByText('Continue Editing')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
