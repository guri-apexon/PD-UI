import moment from 'moment';
import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import MappingTable from '../MappingTable';

describe('MappingTable Screen', () => {
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

  const mapValues = [
    {
      follow: false,
      isActive: true,
      lastUpdated: '2021-01-28T05:31:26.877000',
      protocol: 'Protocol-1AA',
      timeCreated: '2021-01-28T05:31:26.877000',
      userId: '1072231',
      userRole: 'primary',
      id: 1,
    },
    {
      follow: true,
      isActive: true,
      lastUpdated: '2021-08-03T13:18:15.420000',
      protocol: 'Test Summary',
      timeCreated: '2021-04-14T08:03:34.260000',
      userId: '1072231',
      userRole: 'primary',
      id: 2,
    },
  ];

  mapValues.map((item) => {
    item.follow = item.follow ? 'Yes' : 'No';
    item.timeCreated = moment(item.timeCreated).format('MM/DD/YYYY HH:mm:ss');
    item.lastUpdated = moment(item.lastUpdated).format('MM/DD/YYYY HH:mm:ss');
    return item;
  });

  test('should render MappingTable screen with Inital Rows empty values', () => {
    render(<MappingTable initialRows={[]} loader={false} />, {
      initialState: {
        admin: mockState,
      },
    });
  });

  test('should render MappingTable screen with Inital data', () => {
    mockState.map = mapValues;
    render(<MappingTable initialRows={mapValues} loader={false} />, {
      initialState: {
        admin: mockState,
      },
    });
  });

  test('should render MappingTable screen and click the delete', () => {
    mockState.map = mapValues;
    render(<MappingTable initialRows={mapValues} loader={false} />, {
      initialState: {
        admin: mockState,
      },
    });
    fireEvent.click(screen.getByTestId('delete-1'));
  });

  test('should render MappingTable screen with loader', () => {
    mockState.map = mapValues;
    render(<MappingTable initialRows={[]} loader />, {
      initialState: {
        admin: mockState,
      },
    });
  });
});
