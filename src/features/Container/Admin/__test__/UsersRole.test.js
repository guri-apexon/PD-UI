import { render, screen, fireEvent } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import UsersRole from '../UsersRole';

describe('UsersRole Screen', () => {
  const mockState = {
    initialState: {
      admin: {
        roles: [],
        loader: false,
        modalToggle: true,
        newUserError: '',
        roleError: '',
        roleValues: {
          role: '',
          description: '',
        },
      },
    },
  };
  const initialRows = [
    {
      roleName: 'QC1',
      roleDescription:
        'Have access to Dashboard, Protocols, Search and QC Process',
    },
  ];
  test('should render UsersRole screen', () => {
    render(<UsersRole initialRows={initialRows} />, mockState);
    screen.getByText('Add New Role to PD');
  });

  test('should create new role', () => {
    render(<UsersRole initialRows={initialRows} />, mockState);
    const role =
      screen.getByTestId('user-role-texfield').children[1].children[0];
    const desc = screen.getByTestId('role-description-texfield').children[1]
      .children[0];
    fireEvent.change(role, { target: { value: 'QC1' } });
    expect(role.value).toEqual('QC1');
    fireEvent.change(desc, {
      target: { value: 'Have access only to QC process' },
    });
    expect(desc.value).toEqual('Have access only to QC process');
    fireEvent.click(screen.getByText('Create'));
  });
  test('should change user role and show required message', () => {
    render(<UsersRole initialRows={initialRows} />, mockState);
    const edit = screen.getByTestId('user-role-texfield');
    fireEvent.change(edit.children[1].children[0], { target: { value: '' } });
    fireEvent.focusOut(edit.children[1].children[0]);
    const create = screen.getByText('Create');
    fireEvent.click(create);
    expect(edit.children[2]).toBeInTheDocument();
  });
  test('should change description and show required message', () => {
    render(<UsersRole initialRows={initialRows} />, mockState);
    const edit = screen.getByTestId('role-description-texfield');
    fireEvent.change(edit.children[1].children[0], { target: { value: '' } });
    fireEvent.focusOut(edit.children[1].children[0]);
    const create = screen.getByText('Create');
    fireEvent.click(create);
    expect(edit.children[2]).toBeInTheDocument();
  });
  test('should close new role modal', () => {
    render(<UsersRole initialRows={initialRows} />, mockState);
    fireEvent.click(screen.getByText('Cancel'));
  });
});
