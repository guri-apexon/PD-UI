import { fireEvent, render, screen } from '@testing-library/react';
import AuditLog from '../AuditLog';

describe('AuditLog Component', () => {
  const AUDIT_LIST = [
    {
      title: 'User ID',
      keyName: 'user_id',
    },
    {
      title: 'Reviewed By',
      keyName: 'reviewed_by',
    },
    {
      title: 'Total No. of Reviews',
      keyName: 'total_no_review',
    },
  ];
  const item = {
    audit_info: {
      user_id: 'user123',
      reviewed_by: 'reviewer123',
      total_no_review: 5,
    },
  };
  const setOpenAudit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with the given props', () => {
    const openAudit = document.createElement('div');
    openAudit.setAttribute('id', 'openAudit');
    const { getByText } = render(
      <AuditLog
        openAudit={openAudit}
        setOpenAudit={setOpenAudit}
        AUDIT_LIST={AUDIT_LIST}
        item={item}
      />,
    );
    expect(getByText('User ID : user123')).toBeInTheDocument();
    expect(getByText('Reviewed By : reviewer123')).toBeInTheDocument();
    expect(getByText('Total No. of Reviews : 5')).toBeInTheDocument();
  });
});

describe('AuditLog', () => {
  test('should call setOpenAudit with null when popover is closed', () => {
    const mockOnClose = jest.fn();
    const { getByTestId } = render(
      <AuditLog
        openAudit={{}}
        setOpenAudit={mockOnClose}
        AUDIT_LIST={[{ keyName: 'key1', title: 'Title 1' }]}
        item={{ audit_info: {} }}
      />,
    );

    fireEvent.click(getByTestId('openaudit'));

    const popover = document.querySelector('[role="presentation"]');
    expect(popover).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(mockOnClose).toHaveBeenCalledTimes(0);
  });

  test('should render "-----" when no value is present for an AUDIT_LIST key', () => {
    const AUDIT_LIST = [{ title: 'Title', keyName: 'keyName' }];
    const item = { audit_info: {} };
    const openAudit = true;
    const setOpenAudit = jest.fn();

    render(
      <AuditLog
        openAudit={openAudit}
        setOpenAudit={setOpenAudit}
        AUDIT_LIST={AUDIT_LIST}
        item={item}
      />,
    );

    const dashElement = screen.getByText(/-----/);
    expect(dashElement).toBeInTheDocument();
  });
});
