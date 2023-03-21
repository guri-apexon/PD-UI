import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../../store/store';
import ProtocolViewWrapper from '../ProtocolViewWrapper';

const secRef = jest.fn();
const refxRef = jest.fn();
const dataProps = {
  userPrimaryRoleFlag: true,
  userId: '1138076',
  protocol: 'SushilWord1',
  fileName: 'Doc1.docx',
  documentFilePath:
    '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\3a7df6bc-2371-4db2-8108-7e2575cb58b8\\Doc1.docx',
};
describe('ProtocolViewWrapper', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <ProtocolViewWrapper
          data={dataProps}
          refx={refxRef}
          sectionRef={secRef}
          summaryData={{
            message: 'Success',
            success: true,
            data: [
              {
                LinkLevel: 1,
                LinkType: 'toc',
                audit_info: {
                  last_reviewed_date: '',
                  last_reviewed_by: '',
                  total_no_review: '',
                },
                doc_id: '3a7df6bc-2371-4db2-8108-7e2575cb58b8',
                group_type: 'Doc',
                line_id: '3a7df6bc-2371-4db2-8108-7e2575cb58b8',
                link_id: '0b8941ae-c4b7-11ed-99eb-005056ab6469',
                page: 1,
                qc_change_type: '',
                sec_id: '',
                section_locked: false,
                sequence: 0,
                source_file_section: 'PD Comparing documents using Draftable',
              },
            ],
          }}
        />
      </Provider>,
    );
  });
  it('does not display source document if user does not have primary role flag', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <ProtocolViewWrapper
          data={{
            userPrimaryRoleFlag: false,
            userId: '1138076',
            protocol: 'SushilWord1',
            fileName: 'Doc1.docx',
            documentFilePath:
              '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\3a7df6bc-2371-4db2-8108-7e2575cb58b8\\Doc1.docx',
          }}
          refx={{}}
          sectionRef={secRef}
          summaryData={{ success: true }}
        />
      </Provider>,
    );
    expect(queryByText('Source Document')).toBeNull();
  });
});
