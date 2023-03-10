import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import AddNewMapping from '../AddNewMapping';

describe('AddNewMapping Screen', () => {
  const mockState = {
    users: [],
    roles: [],
    map: [],
    loader: false,
    newMapping: {
      userId: null,
      protocol: null,
      role: null,
      following: null,
    },
    modalToggle: true,
    AddNewMappingError: '',
    roleOptions: {
      user: ['normal', 'QC1', 'QC2', 'admin'],
      protocol: ['primary', 'secondary'],
    },
  };

  test('should render AddNewMapping screen', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
  });

  test('should Open the model', () => {
    const data = { ...mockState };
    data.modalToggle = false;
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    fireEvent.click(screen.getByText('Map'));
  });

  test('should Add New Mapping with all values', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const editUserId =
      screen.getByTestId('userId-texfield').children[1].children[0];
    const editProtocol =
      screen.getByTestId('protocol-texfield').children[1].children[0];
    const editRole = screen.getByTestId('role-select').children[1].children[1];
    const editFollowing =
      screen.getByTestId('following-select').children[1].children[1];
    const editProjectId =
      screen.getByTestId('projectId-texfield').children[1].children[0];

    fireEvent.change(editUserId, { target: { value: 'u1072231' } });
    expect(editUserId.value).toEqual('u1072231');

    fireEvent.change(editProtocol, { target: { value: 'Protocol-1AA' } });
    expect(editProtocol.value).toEqual('Protocol-1AA');

    fireEvent.change(editRole, { target: { value: 'primary' } });
    expect(editRole.value).toEqual('primary');
    expect(editFollowing.value).toEqual('1');

    fireEvent.change(editProjectId, { target: { value: 'Protocol-1AA' } });
    expect(editProjectId.value).toEqual('Protocol-1AA');
    fireEvent.click(screen.getByText('Add'));
  });

  test('should throw error for add with no values', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    fireEvent.click(screen.getByText('Add'));
  });

  test('should change the User ID', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const edit = screen.getByTestId('userId-texfield').children[1].children[0];
    fireEvent.change(edit, { target: { value: 'u1072231' } });
    expect(edit.value).toEqual('u1072231');
  });
  test('should change the Protoocol Number', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const edit =
      screen.getByTestId('protocol-texfield').children[1].children[0];
    fireEvent.change(edit, { target: { value: 'SOHPT7' } });
    expect(edit.value).toEqual('SOHPT7');
  });
  test('should change the Role', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const edit = screen.getByTestId('role-select').children[1].children[1];
    fireEvent.change(edit, { target: { value: 'secondary' } });
    expect(edit.value).toEqual('secondary');
  });

  test('should focus the user id show required message', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const edit = screen.getByTestId('userId-texfield');
    fireEvent.change(edit.children[1].children[0], { target: { value: '' } });
    fireEvent.focusOut(edit.children[1].children[0]);
    expect(edit.children[2]).toBeInTheDocument();
  });

  test('should focus the user id show Enter Valid User Id message', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const edit = screen.getByTestId('userId-texfield');
    fireEvent.change(edit.children[1].children[0], {
      target: { value: 'w10722' },
    });
    fireEvent.focusOut(edit.children[1].children[0]);
    expect(edit.children[2]).toBeInTheDocument();
  });

  test('should focus the Protocol Number show required message', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const edit = screen.getByTestId('protocol-texfield');
    fireEvent.change(edit.children[1].children[0], { target: { value: '' } });
    fireEvent.focusOut(edit.children[1].children[0]);
    expect(edit.children[2]).toBeInTheDocument();
  });

  test('should focus the Protocol Number show Enter Valid Protocol message', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const edit = screen.getByTestId('protocol-texfield');
    fireEvent.change(edit.children[1].children[0], {
      target: { value: '#435@#$' },
    });
    fireEvent.focusOut(edit.children[1].children[0]);
    expect(edit.children[2]).toBeUndefined();
  });

  test('should focus the role show required message', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const edit = screen.getByTestId('role-select');
    fireEvent.change(edit.children[1].children[1], { target: { value: '' } });
    fireEvent.focusOut(edit.children[1].children[1]);
    expect(edit.children[2]).toBeInTheDocument();
  });

  test('should focus the role and not show required message', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const edit = screen.getByTestId('role-select');
    fireEvent.change(edit.children[1].children[1], {
      target: { value: 'primary' },
    });
    fireEvent.focusOut(edit.children[1].children[1]);
    expect(edit.children[1].children[1].value).toEqual('primary');
  });

  test('should focus the following show required message', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const edit = screen.getByTestId('following-select');
    fireEvent.change(edit.children[1].children[1], { target: { value: '' } });
    fireEvent.focusOut(edit.children[1].children[1]);
    expect(edit.children[2]).toBeInTheDocument();
  });

  test('should focus the following and not show required message', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    const edit = screen.getByTestId('projectId-texfield');
    fireEvent.change(edit.children[1].children[0], {
      target: { value: 'Protocol-1' },
    });
    fireEvent.focusOut(edit.children[1].children[0]);
    expect(edit.children[2]).toBeUndefined();
  });

  test('should close the modal', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });
    fireEvent.click(screen.getByText('Cancel'));
  });

  test('should focus the following show required message', () => {
    render(<AddNewMapping />, {
      initialState: {
        admin: mockState,
      },
    });

    const edit = screen.getByTestId('viaTicketNumber-textField');
    fireEvent.change(edit.children[1].children[0], {
      target: { value: 'viaTicketNumber-123' },
    });
    fireEvent.focusOut(edit.children[1].children[0]);
    expect(edit.children[2]).toBeUndefined();
  });
});
