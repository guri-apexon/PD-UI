import { render } from '@testing-library/react';
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
