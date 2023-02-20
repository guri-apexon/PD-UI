import { render } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import ProtocolMap from '../ProtocolMap';

describe('ProtocolMap Screen', () => {
  const mockState = {
    users: [],
    roles: [],
    map: [],
    loader: false,
    newUser: {
      userId: null,
      firstName: null,
      lastName: null,
      email: null,
      country: null,
      userRole: null,
    },
    modalToggle: true,
    newUserError: '',
    searchedData: {},
    roleOptions: {
      user: ['normal', 'QC1', 'QC2', 'admin'],
      protocol: ['Primary', 'Secondary'],
    },
  };
  test('should render ProtocolMap screen', () => {
    render(<ProtocolMap />, {
      initialState: {
        admin: mockState,
      },
    });
  });

  test('should render ProtocolMap screen loading', () => {
    mockState.loader = true;
    render(<ProtocolMap />, {
      initialState: {
        admin: mockState,
      },
    });
  });
});
