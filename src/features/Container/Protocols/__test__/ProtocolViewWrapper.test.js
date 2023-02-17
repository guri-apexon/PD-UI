import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../../store/store';
import ProtocolViewWrapper from '../ProtocolViewWrapper';

describe('ProtocolViewWrapper', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <ProtocolViewWrapper
          data={{ userPrimaryRoleFlag: true }}
          refx={null}
          sectionRef={null}
          summaryData={null}
        />
      </Provider>,
    );
  });
  it('does not display source document if user does not have primary role flag', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <ProtocolViewWrapper
          data={{ userPrimaryRoleFlag: false }}
          refx={{}}
          sectionRef={{}}
          summaryData={{ success: true }}
        />
      </Provider>,
    );
    expect(queryByText('Source Document')).toBeNull();
  });
});
