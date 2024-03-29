import { MemoryRouter } from 'react-router-dom';
import { cleanup } from '@testing-library/react';
import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import Documents from '../Documents';
import * as api from '../../../../utils/api';

const AssociateDocs = [
  {
    id: '23abcc3f-9bef-4c57-a860-019c6d831ae2',
    userId: '1019814',
    fileName: 'Protocol-2020-04-09-VER-000001.pdf',
    documentFilePath:
      '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\23abcc3f-9bef-4c57-a860-019c6d831ae2\\Protocol-2020-04-09-VER-000001.pdf',
    protocol: 'JBT101-RIS-001',
    projectId: null,
    sponsor: 'Corbus Pharmaceuticals',
    indication: 'Renal Impairment Compared with Matched Controls',
    moleculeDevice: 'Lenabasum (JBT-101)',
    amendment: '1',
    isProcessing: false,
    percentComplete: '100',
    compareStatus: null,
    iqvXmlPathProc: null,
    iqvXmlPathComp: null,
    shortTitle: null,
    versionNumber: '',
    documentStatus: 'final',
    draftVersion: null,
    errorCode: null,
    errorReason: null,
    status: 'PROCESS_COMPLETED',
    phase: 'I',
    digitizedConfidenceInterval: null,
    completenessOfDigitization: null,
    protocolTitle:
      'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
    studyStatus: '1',
    sourceSystem: 'Dev',
    environment: 'dev',
    uploadDate: '2021-01-18T16:45:30.923000',
    timeCreated: '2021-01-18T16:45:30.923000',
    lastUpdated: '2021-01-18T18:37:26.343000',
    userCreated: null,
    userUpdated: null,
    approvalDate: null,
    isActive: true,
    nctId: null,
    protocolSelected: [],
  },
  {
    id: '2a5111a6-5465-46f5-b133-a85724bae4ef',
    userId: '1020640',
    fileName: 'Protocol-2020-04-09-VER-000001.pdf',
    documentFilePath:
      '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\2a5111a6-5465-46f5-b133-a85724bae4ef\\Protocol-2020-04-09-VER-000001.pdf',
    protocol: 'JBT101-RIS-001',
    projectId: '',
    sponsor: 'Corbus Pharmaceuticals',
    indication: 'ABCC6 deficiency',
    moleculeDevice: 'test',
    amendment: 'Y',
    isProcessing: false,
    percentComplete: '100',
    compareStatus: null,
    iqvXmlPathProc: null,
    iqvXmlPathComp: null,
    shortTitle:
      'A 2-Part Study of the Pharmacokinetics and Safety of a Single Dose of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls Rationale:',
    versionNumber: '10.1',
    documentStatus: 'final',
    draftVersion: null,
    errorCode: null,
    errorReason: null,
    status: 'PROCESS_COMPLETED',
    phase: 'I',
    digitizedConfidenceInterval: null,
    completenessOfDigitization: null,
    protocolTitle:
      'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
    studyStatus: null,
    sourceSystem: null,
    environment: null,
    uploadDate: '2021-04-08T09:51:34.077000',
    timeCreated: '2021-04-08T09:51:34.077000',
    lastUpdated: '2021-04-08T10:01:40.243000',
    userCreated: null,
    userUpdated: null,
    approvalDate: '2020-04-09T00:00:00',
    isActive: true,
    nctId: null,
    protocolSelected: [],
  },
  {
    id: 'ca88a438-b426-45fb-b5b7-4b5752901f30',
    userId: '1019814',
    fileName: 'Protocol-2020-04-14-DOD-000001.pdf',
    documentFilePath:
      '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\ca88a438-b426-45fb-b5b7-4b5752901f30\\Protocol-2020-04-14-DOD-000001.pdf',
    protocol: 'JBT101-RIS-001',
    projectId: null,
    sponsor: 'Corbus Pharmaceuticals',
    indication: 'Renal Impairment Compared with Matched Controls',
    moleculeDevice: 'Lenabasum (JBT-101)',
    amendment: 'Y',
    isProcessing: false,
    percentComplete: '100',
    compareStatus: null,
    iqvXmlPathProc: null,
    iqvXmlPathComp: null,
    shortTitle: null,
    versionNumber: '1',
    documentStatus: 'final',
    draftVersion: null,
    errorCode: null,
    errorReason: null,
    status: 'PROCESS_COMPLETED',
    phase: 'I',
    digitizedConfidenceInterval: null,
    completenessOfDigitization: null,
    protocolTitle:
      'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
    studyStatus: '1',
    sourceSystem: 'Dev',
    environment: 'dev',
    uploadDate: '2021-01-18T16:45:30.723000',
    timeCreated: '2021-01-18T16:45:30.723000',
    lastUpdated: '2021-01-18T18:43:34.983000',
    userCreated: null,
    userUpdated: null,
    approvalDate: '2020-04-14T17:38:34.887000',
    isActive: true,
    nctId: null,
    protocolSelected: [],
  },
];
const summaryData = {
  aidocId: '2a5111a6-5465-46f5-b133-a85724bae4ef',
  amendment: 'Y',
  completenessOfDigitization: null,
  digitizedConfidenceInterval: null,
  documentFilePath:
    '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\2a5111a6-5465-46f5-b133-a85724bae4ef\\Protocol-2020-04-09-VER-000001.pdf',
  documentStatus: 'final',
  draftVersion: null,
  errorCode: null,
  errorReason: null,
  fileName: 'Protocol-2020-04-09-VER-000001.pdf',
  indication: 'ABCC6 deficiency',
  sponsor: 'Corbus Pharmaceuticals',
  versionNumber: '10.1',
  percentComplete: '100',
  projectId: '',
  protocol: 'JBT101-RIS-001',
  userId: '1020640',
  status: 'PROCESS_COMPLETED',
  uploadDate: '2021-04-08T09:51:34.077000',
  moleculeDevice: 'test',
  phase: 'I',
  protocolTitle:
    'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
  amendmentNumber: null,
  approvalDate: null,
  userName: 'Subha',
};
const initialState = {
  initialState: {
    protocol: {
      summary: {
        loading: false,
        success: true,
        data: summaryData,
      },
      view: {
        iqvdataSoa: [],
        iqvdataSummary: {},
        iqvdataToc: {
          data: [],
        },
        loader: true,
      },
      associateDocs: AssociateDocs,
      compare: {
        loading: false,
        called: false,
        iqvdata: '',
        error: false,
        message: '',
      },
    },
  },
};

const summaryDataWithoutUserID = {
  aidocId: '2a5111a6-5465-46f5-b133-a85724bae4ef',
  amendment: 'Y',
  completenessOfDigitization: null,
  digitizedConfidenceInterval: null,
  documentFilePath:
    '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\2a5111a6-5465-46f5-b133-a85724bae4ef\\Protocol-2020-04-09-VER-000001.pdf',
  documentStatus: 'final',
  draftVersion: null,
  errorCode: null,
  errorReason: null,
  fileName: 'Protocol-2020-04-09-VER-000001.pdf',
  indication: 'ABCC6 deficiency',
  sponsor: 'Corbus Pharmaceuticals',
  versionNumber: '10.1',
  percentComplete: '100',
  projectId: '',
  protocol: 'JBT101-RIS-001',
  userId: 'bulk',
  status: 'PROCESS_COMPLETED',
  uploadDate: '2021-04-08T09:51:34.077000',
  moleculeDevice: 'test',
  phase: 'I',
  protocolTitle:
    'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
  amendmentNumber: null,
  approvalDate: null,
  userName: '',
};
const AssociateDocsWithOneDoc = [
  {
    id: 'ca88a438-b426-45fb-b5b7-4b5752901f30',
    userId: '1019814',
    fileName: 'Protocol-2020-04-14-DOD-000001.pdf',
    documentFilePath:
      '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\ca88a438-b426-45fb-b5b7-4b5752901f30\\Protocol-2020-04-14-DOD-000001.pdf',
    protocol: 'JBT101-RIS-001',
    projectId: null,
    sponsor: 'Corbus Pharmaceuticals',
    indication: 'Renal Impairment Compared with Matched Controls',
    moleculeDevice: 'Lenabasum (JBT-101)',
    amendment: 'Y',
    isProcessing: false,
    percentComplete: '100',
    compareStatus: null,
    iqvXmlPathProc: null,
    iqvXmlPathComp: null,
    shortTitle: null,
    versionNumber: '1',
    documentStatus: 'final',
    draftVersion: null,
    errorCode: null,
    errorReason: null,
    status: 'PROCESS_COMPLETED',
    phase: 'I',
    digitizedConfidenceInterval: null,
    completenessOfDigitization: null,
    protocolTitle:
      'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
    studyStatus: '1',
    sourceSystem: 'Dev',
    environment: 'dev',
    uploadDate: '2021-01-18T16:45:30.723000',
    timeCreated: '2021-01-18T16:45:30.723000',
    lastUpdated: '2021-01-18T18:43:34.983000',
    userCreated: null,
    userUpdated: null,
    approvalDate: '2020-04-14T17:38:34.887000',
    isActive: true,
    nctId: null,
    protocolSelected: [],
  },
];
const initialState2 = {
  initialState: {
    protocol: {
      summary: {
        loading: false,
        success: true,
        data: summaryDataWithoutUserID,
      },
      view: {
        iqvdataSoa: [],
        iqvdataSummary: {},
        iqvdataToc: {
          data: [],
        },
        loader: true,
      },
      associateDocs: AssociateDocs,
      compare: {
        loading: false,
        called: false,
        iqvdata: '',
        error: false,
        message: '',
      },
    },
  },
};
const initialState3 = {
  initialState: {
    protocol: {
      summary: {
        loading: false,
        success: true,
        data: summaryDataWithoutUserID,
      },
      view: {
        iqvdataSoa: [],
        iqvdataSummary: {},
        iqvdataToc: {
          data: [],
        },
        loader: true,
      },
      associateDocs: AssociateDocsWithOneDoc,
      compare: {
        loading: false,
        called: false,
        iqvdata: '',
        error: false,
        message: '',
      },
    },
  },
};

afterEach(cleanup);
describe('Should render document tab', () => {
  test('Should Render without error', () => {
    const handleChangeTab = jest.fn();
    render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState,
    );
  });

  xtest('Should give warning on csv download button click', () => {
    const handleChangeTab = jest.fn();
    const container = render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState,
    );

    const dropButton = container.getByRole('button', {
      name: 'Download Compare Result',
    });
    fireEvent.click(dropButton);
    const item1 = screen.getByRole('menuitem', { name: 'CSV' });
    fireEvent.click(item1);
    // const downloadButton = container.getByTestId("compare-download-button");
    // fireEvent.click(downloadButton);
  });
  xtest('Should give warning on excel download button click', () => {
    const handleChangeTab = jest.fn();
    const container = render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState,
    );

    const dropButton = container.getByRole('button', {
      name: 'Compare Result',
    });
    fireEvent.click(dropButton);

    const item2 = screen.getByRole('menuitem', { name: 'Excel' });
    fireEvent.click(item2);
    // const downloadButton = container.getByTestId("compare-download-button");
    // fireEvent.click(downloadButton);
  });
  test('Should try to select three protocols', () => {
    const handleChangeTab = jest.fn();
    const container = render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState,
    );
    const checkbox1 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox1);
    const checkbox2 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[1]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox2);
    const checkbox3 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[2]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox3);
  });
  test('Should select two protocols and deselect one', () => {
    const handleChangeTab = jest.fn();
    const container = render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState,
    );
    const checkbox1 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox1);
    const checkbox2 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[1]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox2);

    fireEvent.click(checkbox2);
  });
  test('Should click on same protocol twice', () => {
    const handleChangeTab = jest.fn();
    const container = render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState,
    );
    const checkbox1 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox1);
    const checkbox2 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox2);
  });
  xtest('Should click on one checkbox and click download', () => {
    const handleChangeTab = jest.fn();
    const container = render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState,
    );
    const checkbox1 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox1);
    const dropButton = container.getByRole('button', {
      name: 'Compare Result',
    });
    fireEvent.click(dropButton);
    const item1 = screen.getByRole('menuitem', { name: 'CSV' });
    fireEvent.click(item1);
  });
  xtest('Should click on the checkbox and click download', async () => {
    const handleChangeTab = jest.fn();
    const data = {
      success: true,
      data: '',
      message: 'Success',
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(data));

    const container = render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState,
    );
    const checkbox1 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox1);
    const checkbox2 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[1]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox2);
    const dropButton = container.getByRole('button', {
      name: 'Compare Result',
    });
    fireEvent.click(dropButton);
    const item1 = screen.getByRole('menuitem', { name: 'CSV' });
    fireEvent.click(item1);
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });
  test('Should click on the checkbox and click download with no content', async () => {
    const handleChangeTab = jest.fn();
    const data = {
      success: true,
      data: '',
      message: 'No-Content',
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(data));

    const container = render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState,
    );
    const checkbox1 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox1);
    const checkbox2 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[1]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox2);
    const dropButton = container.getByRole('button', {
      name: 'Compare Result',
    });
    fireEvent.click(dropButton);
    const item1 = screen.getByRole('menuitem', { name: 'CSV' });
    fireEvent.click(item1);
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });
  test('Should click on the checkbox and click download with no result', async () => {
    const handleChangeTab = jest.fn();
    const data = {
      success: false,
      data: '',
      message: 'Not-Found',
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(data));

    const container = render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState,
    );
    const checkbox1 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox1);
    const checkbox2 = container.getByTestId('associate-document-tab')
      .children[0].children[0].children[1].children[0].children[1].children[1]
      .children[0].children[0].children[0].children[0];
    fireEvent.click(checkbox2);
    const dropButton = container.getByRole('button', {
      name: 'Compare Result',
    });
    fireEvent.click(dropButton);
    const item1 = screen.getByRole('menuitem', { name: 'CSV' });
    fireEvent.click(item1);
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });
  test('Should check isNan for userID', async () => {
    const handleChangeTab = jest.fn();
    const data = {
      success: true,
      data: '',
      message: 'Not-Found',
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(data));

    render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState2,
    );

    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });
  test('Should check for user detail fetch failure', async () => {
    const handleChangeTab = jest.fn();
    const data = {
      success: false,
      data: '',
      message: 'Not-Found',
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(data));

    render(
      <MemoryRouter>
        <Documents handleChangeTab={handleChangeTab} />
      </MemoryRouter>,
      initialState3,
    );

    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });
});
