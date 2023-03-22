import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import ProtocolViewWrapper from '../ProtocolViewWrapper';
import { summary } from './data';

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
const initialState = {
  protocol: {
    summary: {
      data: summary,
      loading: false,
      success: true,
    },
    fileStream: {
      data: 'file://quintiles.net/enterprise/Services/protdigtest/pilot_iqvxml//574051fb-1cb5-4e6c-816c-f9964090a1e7/Prot_Amend-V3.0-2019-12-10-VER-000001%20(1).pdf',
      success: true,
    },
  },
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
            success: false,
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
      {
        initialState,
      },
    );
    const lnkAnchorNode = screen.getByTestId('download-doc');
    fireEvent.click(lnkAnchorNode);
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
