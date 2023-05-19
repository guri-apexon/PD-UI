import Documents from '../Documents';
import { fireEvent, render, screen } from '../../../../test-utils/test-utils';

describe('rendering Documents File', () => {
  test('send summary data', () => {
    const test = jest.fn();
    render(<Documents handleChangeTab={test} />, {
      initialState: {
        protocol: {
          summary: {
            data: {
              userId: '123',
              protocol: 'test123',
            },
            success: true,
          },
        },
      },
    });
    fireEvent.click(document);
    fireEvent.click(screen.getByText(/Associated Versions/i));
  });

  test('send summary data as undefined', () => {
    const test = jest.fn();
    render(<Documents handleChangeTab={test} />, {
      initialState: {
        protocol: {
          summary: {
            data: {
              userId: '',
              protocol: 'test123',
            },
            success: true,
          },
        },
      },
    });
    fireEvent.click(document);
  });
});
