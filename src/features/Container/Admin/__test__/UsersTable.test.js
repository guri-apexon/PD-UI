/* eslint-disable */
import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import getColumns from '../columns.data';

import UsersTable from '../UsersTable';

const options = ['QC1', 'QC2', 'admin', 'normal'];
let column = [];
beforeEach(() => {
  // setup a DOM element as a render target
  column = getColumns(options);
});

describe('UsersTable Screen', () => {
  const userData = [
    {
      username: 'u1072231',
      first_name: 'Sohan',
      last_name: 'Khatawkar',
      email: 'sohan.khatawkar@iqvia.com',
      country: 'India',
      date_of_registration: '2021-01-29T04:09:44.277000',
      user_type: 'normal',
    },
    {
      username: 'q1036048',
      first_name: 'Abhay',
      last_name: 'K',
      email: 'abhay.kumar2@quintiles.com',
      country: 'India',
      date_of_registration: '2021-01-29T06:40:31.823000',
      user_type: 'QC2',
    },
  ];
  const userDataOne = [
    {
      username: 'u1072231',
      first_name: 'Sohan',
      last_name: 'Khatawkar',
      email: 'sohan.khatawkar@iqvia.com',
      country: 'India',
      date_of_registration: '2021-01-29T04:09:44.277000',
      user_type: 'normal',
    },
  ];

  test('should render UsersTable screen with empty data', () => {
    render(<UsersTable initialRows={[]} columns={column} />);
  });

  test('should render UsersTable screen with data', () => {
    render(<UsersTable initialRows={userData} columns={column} />);
  });

  test('should render UsersTable screen with only one row data', () => {
    render(<UsersTable initialRows={userDataOne} columns={column} />);
  });

  test('should render click Filter Button', () => {
    render(<UsersTable initialRows={userData} columns={column} />);
    fireEvent.click(screen.getByTestId('user-action-buttons').children[1]);
    expect(screen.getByTestId('username')).toBeInTheDocument();
    expect(screen.getByTestId('first_name')).toBeInTheDocument();
    expect(screen.getByTestId('last_name')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('country')).toBeInTheDocument();
  });

  test('should render click New User Button', () => {
    render(<UsersTable initialRows={userDataOne} columns={column} />);
    fireEvent.click(screen.getByTestId('user-action-buttons').children[0]);
  });
});

describe('UsersTable Screen Edit and Delete user', () => {
  const userData = [
    {
      username: 'u1072231',
      first_name: 'Sohan',
      last_name: 'Khatawkar',
      email: 'sohan.khatawkar@iqvia.com',
      country: 'India',
      date_of_registration: '2021-01-29T04:09:44.277000',
      user_type: 'admin',
    },
    {
      username: 'q1036048',
      first_name: 'Abhay',
      last_name: 'K',
      email: 'abhay.kumar2@quintiles.com',
      country: 'India',
      date_of_registration: '2021-01-29T06:40:31.823000',
      user_type: 'QC2',
    },
  ];
  test('should click on Delete button on row', () => {
    render(<UsersTable initialRows={userData} columns={column} />);
    fireEvent.click(screen.getByTestId('delete-q1036048'));
  });

  test('should click on Edit button on row', () => {
    render(<UsersTable initialRows={userData} columns={column} />);
    fireEvent.click(screen.getByTestId('edit-u1072231'));
  });

  test('should click on Edit button and then cancel on row', () => {
    render(<UsersTable initialRows={userData} columns={column} />);
    fireEvent.click(screen.getByTestId('edit-u1072231'));
    fireEvent.click(screen.getByTestId('edit-cancel'));
  });

  test('should click on Edit button and then save on row Editable Select cell', () => {
    render(<UsersTable initialRows={userData} columns={column} />);
    fireEvent.click(screen.getByTestId('edit-u1072231'));
    const edit = screen.getByTestId('editablecell-select-u1072231').children[1]
      .children[1];
    fireEvent.change(edit, { target: { value: 'normal' } });
    fireEvent.click(screen.getByTestId('edit-save'));
  });
});
