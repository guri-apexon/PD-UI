import * as redux from 'react-redux';
import { render } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import DashboardSearch from '../DashboardSearch';

describe('Protocol Table container component', () => {
  const state = {
    initialState: {
      dashboard: {
        protocols: [],
      },
    },
  };

  test('should render DashboardSearch', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    render(<DashboardSearch />, state);
  });
});
