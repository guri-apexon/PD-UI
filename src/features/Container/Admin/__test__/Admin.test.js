import * as redux from 'react-redux';
import { render } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Admin from '../Admin';

describe('Admin Screen', () => {
  test('should render Admin screen', () => {
    render(<Admin />);
  });

  test('should fetch users when component mounts', () => {
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
    render(<Admin />);

    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock.mock.calls[0][0]).toEqual({ type: 'GET_USERS_SAGA' });
  });
});
