import * as redux from 'react-redux';
import { render, fireEvent } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import { dateSection } from '../Data/constants';

import { DateRangeCard } from '../CustomFilterCards';

describe('DateRangeCard container component', () => {
  const state = {
    initialState: {
      search: {
        recent: {
          from: '',
          to: '',
        },
        range: {
          from: '',
          to: '',
        },
      },
    },
  };

  xtest('should render DateRangeCard Recent date radio selection', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(
      <DateRangeCard section={dateSection} dateRangeValue={[null, null]} />,
      state,
    );
    const radio = container.getByTestId('recent-date-wrapper').children[0]
      .children[1].children[0];
    fireEvent.click(radio);
  });

  xtest('should render DateRangeCard Date range date selection', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(<DateRangeCard section={dateSection} />, state);
    const inputSel =
      container.getByTestId('range-date-wrapper').children[0].children[0]
        .children[0].children[1].children[0];
    fireEvent.click(inputSel);

    const dateSel =
      container.getByTestId('range-date-wrapper').children[0].children[1]
        .children[0].children[0].children[1].children[0].children[5];
    fireEvent.click(dateSel);

    const dateSel2 =
      container.getByTestId('range-date-wrapper').children[1].children[1]
        .children[0].children[0].children[1].children[1].children[5];
    fireEvent.click(dateSel2);
  });
});
