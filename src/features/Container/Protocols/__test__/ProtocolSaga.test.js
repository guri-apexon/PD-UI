import { runSaga } from 'redux-saga';
import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as api from '../../../../utils/api';
import protocolData from './protocolJSON.json';
import TOC from './TOC.json';
import protocolSaga, {
  parsedData,
  getSummaryData,
  fetchAssociateProtocol,
  getProtocolToc,
  getCompareResult,
  getSoaSections,
  getTocSections,
  captalize,
  getProtocolTocDataResult,
  MetaDataVariable,
  deleteAttribute,
  addMetaDataField,
  addMetaDataAttributes,
  saveEnrichedAPI,
  fetchFileStream,
  RightBladeValue,
  setTOCActive,
  setEnrichedAPI,
  getSOAData,
  soaUpdateDetails,
  getDerivedDataById,
  getAllDerivedDataByCategory,
  updateDerivedData,
  LabData,
  updateSectionLockDetails,
  getSectionLockDetails,
  handleConfigurableAPI,
  updateSectionData,
  setSectionIndex,
  getenrichedword,
  setResetQCData,
  UpdateLabData,
  setDiscardDetails,
  getDocumentSectionLock,
  watchProtocolAsync,
  watchProtocolViews,
  setResetSectionData,
  updateAndSetSectionLockDetails,
  resetAllDipaViewDataByCategory,
  resetSOAData,
  handleCreateLabDataTable,
} from '../saga';

const userDetail = {
  username: 'test',
  userId: 'u1021402',
  email: 'test@iqvia.com',
};

describe('watchProtocolAsync', () => {
  it('should call getSummaryData on "GET_PROTOCOL_SUMMARY" action', () => {
    const generator = watchProtocolAsync();

    expect(generator.next().value).toEqual(
      takeEvery('GET_PROTOCOL_SUMMARY', getSummaryData),
    );
  });

  it('should call getProtocolToc on "GET_PROTOCOL_TOC_SAGA" action', () => {
    const generator = watchProtocolAsync();

    generator.next();

    expect(generator.next().value).toEqual(
      takeLatest('GET_PROTOCOL_TOC_SAGA', getProtocolToc),
    );
  });

  it('should call fetchAssociateProtocol on "FETCH_ASSOCIATE_PROTOCOLS" action', () => {
    const generator = watchProtocolAsync();

    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeLatest('FETCH_ASSOCIATE_PROTOCOLS', fetchAssociateProtocol),
    );
  });

  it('should call getCompareResult on "POST_COMPARE_PROTOCOL" action', () => {
    const generator = watchProtocolAsync();

    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('POST_COMPARE_PROTOCOL', getCompareResult),
    );
  });
});

describe('watchProtocolAsync', () => {
  it('should call handleConfigurableAPI on "GET_SECTION_LIST" action', () => {
    const generator = watchProtocolViews();

    expect(generator.next().value).toEqual(
      takeEvery('GET_SECTION_LIST', handleConfigurableAPI),
    );
  });

  it('should call fetchFileStream on "GET_FILE_STREAM" action', () => {
    const generator = watchProtocolViews();

    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('GET_FILE_STREAM', fetchFileStream),
    );
  });

  it('should call getProtocolTocDataResult on "FETCH_ASSOCIATE_PROTOCOLS" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('GET_PROTOCOL_TOC_DATA', getProtocolTocDataResult),
    );
  });

  it('should call MetaDataVariable on "GET_METADATA_VARIABLE" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('GET_METADATA_VARIABLE', MetaDataVariable),
    );
  });

  it('should call RightBladeValue on "GET_RIGHT_BLADE" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('GET_RIGHT_BLADE', RightBladeValue),
    );
  });

  it('should call setTOCActive on "SET_TOC_Active" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('SET_TOC_Active', setTOCActive),
    );
  });

  it('should call addMetaDataAttributes on "ADD_METADATA_ATTRIBUTES" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('ADD_METADATA_ATTRIBUTES', addMetaDataAttributes),
    );
  });

  it('should call addMetaDataField on "ADD_METADATA_FIELD" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('ADD_METADATA_FIELD', addMetaDataField),
    );
  });

  it('should call deleteAttribute on "DELETE_METADATA" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('DELETE_METADATA', deleteAttribute),
    );
  });

  it('should call saveEnrichedAPI on "SAVE_ENRICHED_DATA" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('SAVE_ENRICHED_DATA', saveEnrichedAPI),
    );
  });

  it('should call setEnrichedAPI on "GET_ENRICHED_API" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('GET_ENRICHED_API', setEnrichedAPI),
    );
  });

  it('should call getSOAData on "GET_SOA_DATA" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeLatest('GET_SOA_DATA', getSOAData),
    );
  });

  it('should call setSectionIndex on "ADD_SECTION_INDEX" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('ADD_SECTION_INDEX', setSectionIndex),
    );
  });

  it('should call updateSectionData on "UPDATE_SECTION_DATA" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('UPDATE_SECTION_DATA', updateSectionData),
    );
  });

  it('should call LabData on "GET_LAB_DATA" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(takeEvery('GET_LAB_DATA', LabData));
  });

  it('should call UpdateLabData on "UPDATE_LAB_DATA" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('UPDATE_LAB_DATA', UpdateLabData),
    );
  });

  it('should call getenrichedword on "SET_ENRICHED_WORD" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('SET_ENRICHED_WORD', getenrichedword),
    );
  });

  it('should call soaUpdateDetails on "SOA_UPDATE_DETAILS" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeLatest('SOA_UPDATE_DETAILS', soaUpdateDetails),
    );
  });

  it('should call setResetSectionData on "RESET_SECTION_DATA" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeLatest('RESET_SECTION_DATA', setResetSectionData),
    );
  });

  it('should call getSectionLockDetails on "GET_SECTION_LOCK" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeLatest('GET_SECTION_LOCK', getSectionLockDetails),
    );
  });

  it('should call updateSectionLockDetails on "SET_SECTION_LOCK" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeLatest('SET_SECTION_LOCK', updateSectionLockDetails),
    );
  });

  it('should call updateAndSetSectionLockDetails on "UPDATE_AND_SET_SECTION_LOCk" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeLatest('UPDATE_AND_SET_SECTION_LOCk', updateAndSetSectionLockDetails),
    );
  });

  it('should call setResetQCData on "RESET_QC_DATA" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeLatest('RESET_QC_DATA', setResetQCData),
    );
  });

  it('should call getDerivedDataById on "GET_DERIVED_SECTIONS" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('GET_DERIVED_SECTIONS', getDerivedDataById),
    );
  });

  it('should call getAllDerivedDataByCategory on "GET_ALL_DIPA_VIEW" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('GET_ALL_DIPA_VIEW', getAllDerivedDataByCategory),
    );
  });

  it('should call updateDerivedData on "UPDATE_DIPA_VIEW" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('UPDATE_DIPA_VIEW', updateDerivedData),
    );
  });

  it('should call setDiscardDetails on "DISCARD_DETAILS" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('DISCARD_DETAILS', setDiscardDetails),
    );
  });

  it('should call getDocumentSectionLock on "GET_DOC_SECTION_LOCK" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('GET_DOC_SECTION_LOCK', getDocumentSectionLock),
    );
  });

  it('should call resetAllDipaViewDataByCategory on "RESET_ALL_DIPA_VIEW" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('RESET_ALL_DIPA_VIEW', resetAllDipaViewDataByCategory),
    );
  });

  it('should call resetSOAData on "RESET_SOA_DATA" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeLatest('RESET_SOA_DATA', resetSOAData),
    );
  });

  it('should call handleCreateLabDataTable on "CREATE_LABDATA_TABLE" action', () => {
    const generator = watchProtocolViews();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('CREATE_LABDATA_TABLE', handleCreateLabDataTable),
    );
  });

  test('handleCreateLabDataTable success branch', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: null,
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, handleCreateLabDataTable, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('handleCreateLabDataTable fail branch', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: null,
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, handleCreateLabDataTable, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('handleCreateLabDataTable error branch', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: null,
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.reject(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, handleCreateLabDataTable, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
});

describe('Protocol Saga', () => {
  test('should run parsedData function', () => {
    const obj = {
      id: '1',
    };
    parsedData(JSON.stringify(JSON.stringify(obj)));
  });
  // getSoaSections Starts

  test('should run getSoaSections function', () => {
    const obj = [
      {
        TableIndex: '1',
        TableName: 'TableName',
      },
    ];
    getSoaSections(obj);
  });

  // getSoaSections Ends
  // captalize Starts

  test('should run getSoaSections function', () => {
    const obj = 'Table sections';
    captalize(obj);
  });

  // captalize Ends

  // getTocSections Starts

  test('should run getTocSections function', () => {
    const toc = {
      data: [
        [
          '',
          'Unmapped',
          'text',
          'TITLE PAGE',
          { font_style: '' },
          { IsBold: false, font_size: -1, font_style: 'Heading1' },
          'Unmapped',
          'TITLE PAGE',
          '  ',
          1,
        ],
      ],
    };
    getTocSections(toc);
  });

  test('should run getTocSections function', () => {
    const toc = {
      data: [
        [
          '',
          'Unmapped',
          'text',
          'TITLE PAGE',
          { IsBold: false, font_size: -1, font_style: 'Heading1' },
          'Heading1',
          'Unmapped1',
          'TITLE PAGE',
          '',
          1,
        ],
      ],
    };
    getTocSections(toc);
  });

  // getTocSections  Ends

  // getSummaryData Starts
  test('getSummaryData should be success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: {
        amendment: 'N',
        approvalDate: null,
        compareStatus: null,
        completenessOfDigitization: null,
        digitizedConfidenceInterval: null,
        documentFilePath: 'quintiles.net',
        documentStatus: 'final',
        draftVersion: null,
        environment: 'dev',
        errorCode: null,
        errorReason: null,
        fileName: 'Protocol-2020-04-09-VER-000001.pdf',
        id: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
        indication: 'Renal Impairment Compared with Matched Controls',
        iqvXmlPathComp: null,
        iqvXmlPathProc: null,
        isActive: true,
        isProcessing: false,
        lastUpdated: '2021-01-28T11:09:47.977000',
        moleculeDevice: 'Lenabasum (JBT-101)',
        nctId: null,
        percentComplete: '100',
        phase: null,
        projectId: 'Protocol-2020-04-09-VER-000001.pdf',
        protocol: 'JBT101-RIS-001',
        protocolTitle: null,
        shortTitle: null,
        sourceSystem: 'dev',
        sponsor: 'Corbus Pharmaceuticals',
        status: 'PROCESS_COMPLETED',
        studyStatus: '1',
        timeCreated: '2021-01-28T10:56:35.377000',
        uploadDate: '2021-01-28T10:56:35.377000',
        userCreated: null,
        userId: '1063396',
        userUpdated: null,
        versionNumber: '6',
        qcActivity: 'QC_NOT_STARTED',
      },
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getSummaryData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getSummaryData should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: null,
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getSummaryData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getSummaryData saga', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [{ protocol: '15-06' }],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getSummaryData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  // getSummaryData Ends

  // fetchAssociateProtocol Starts
  test('fetchAssociateProtocol should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, fetchAssociateProtocol, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('fetchAssociateProtocol should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, fetchAssociateProtocol, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  // fetchAssociateProtocol Ends

  // getProtocolToc Start

  test('getProtocolToc should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: protocolData,
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getProtocolToc, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getProtocolToc should be Fails', async () => {
    const dispatchedActions = [];

    const mockOutput = {
      success: false,
      data: {},
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getProtocolToc, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getProtocolToc should be Error out', async () => {
    const dispatchedActions = [];

    const mockOutput = {
      success: false,
      data: {},
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.reject(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getProtocolToc, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  // getProtocolToc Ends

  // getCompareResult Starts
  test('getCompareResult should be Success', async () => {
    const dispatchedActions = [];

    const mockOutput = {
      success: true,
      data: {
        id: '1111',
      },
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getCompareResult, {
      payload: {
        docID2: '1111',
      },
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getCompareResult should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: null,
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getCompareResult, {
      payload: {
        docID2: '1111',
      },
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getCompareResult should be Error', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: null,
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getCompareResult, {
      payload: null,
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });

  test('getProtocolTocDataResult without user try success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
    };
    const payload = {
      docId: '1234',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getProtocolTocDataResult, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('getProtocolTocDataResult without user try failure(catch)', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
      iqvdataSoa: [],
    };
    const payload = {
      id: 'afsdwe',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getProtocolTocDataResult, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('getProtocolTocDataResult without user failure', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const payload = {
      id: 'afsdwe',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getProtocolTocDataResult, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('getProtocolTocDataResult SAGA', async () => {
    const dispatchedActions = [];
    const mockOutput = { success: true, data: TOC };
    const payload = {
      id: 'afsdwe',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getProtocolTocDataResult, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('getMetadata get', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const payload = {
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      op: 'metadata',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, MetaDataVariable, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('MetaDataVariable Saga', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const payload = {
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      op: 'metadata',
      fieldName: 'fieldName',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, MetaDataVariable, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('MetaDataVariable Saga Else', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const payload = {
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      op: 'op',
      fieldName: 'fieldName',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, MetaDataVariable, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('getMetadata delete', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const payload = {
      op: 'deleteField',
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      fieldName: 'abc',
      attributeNames: 'atf',
      reqData: 'hg',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, deleteAttribute, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('deleteAttribute if condition branch', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: { isDeleted: true },
    };
    const payload = {
      op: 'deleteField',
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      fieldName: 'abc',
      attributeNames: 'atf',
      reqData: { accData: { name: 'name' } },
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, deleteAttribute, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('deleteAttribute if condition branch', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: { isDeleted: true },
    };
    const payload = {
      op: 'op',
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      fieldName: 'abc',
      attributeNames: 'atf',
      reqData: { accData: { name: 'name' } },
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, deleteAttribute, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('deleteAttribute if condition branch', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
    };
    const payload = {
      op: 'op',
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      fieldName: 'abc',
      attributeNames: 'atf',
      reqData: { accData: { name: 'name' } },
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, deleteAttribute, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('getMetadata addMetaDataField', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const payload = {
      op: 'addFields',
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      fieldName: 'abc',
      attributeNames: 'atf',
      reqData: 'hg',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, addMetaDataField, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });
  test('getMetadata addMetaDataAttributes', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const payload = {
      op: 'addFields',
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      fieldName: 'abc',
      attributeNames: 'atf',
      reqData: 'hg',
      attributes: [{ A: 1, B: 2 }],
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, addMetaDataAttributes, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });
  test('getMetadata saveEnrichedAPI', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const payload = {
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      linkId: 'abc',
      data: 'atf',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, saveEnrichedAPI, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });
  test('getMetadata get Failed', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const payload = {
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      op: 'addFields',
      type: '',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, MetaDataVariable, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('fetchFileStream get', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const payload = {
      name: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      dfsPath: 'metadata',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, fetchFileStream, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('fetchFileStream download branch', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const payload = {
      name: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      dfsPath: 'metadata',
      isDownlod: true,
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, fetchFileStream, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('fetchFileStream saga catch', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const payload = {
      name: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
      dfsPath: 'metadata',
    };
    const mockApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.reject(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, fetchFileStream, {
      payload,
    }).toPromise();

    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('fetchFileStream get', async () => {
    const dispatchedActions = [];
    const payload = {
      name: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, RightBladeValue, { payload }).toPromise();

    expect(undefined).toBeUndefined();
  });

  test('RightBladeValue SAGA', async () => {
    const dispatchedActions = [];
    const payload = {
      name: 'Home',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        protocol: {
          TOCActiveAccordion: '',
        },
      }),
    };
    await runSaga(fakeStore, RightBladeValue, { payload }).toPromise();

    expect(undefined).toBeUndefined();
  });

  test('setTOCActive get', async () => {
    const dispatchedActions = [];
    const payload = {
      data: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, setTOCActive, { payload }).toPromise();

    expect(undefined).toBeUndefined();
  });

  test('setEnrichedAPI get', async () => {
    const dispatchedActions = [];
    const payload = {
      flag: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, setEnrichedAPI, { payload }).toPromise();
    expect(undefined).toBeUndefined();
  });

  test('getSOAData  ', async () => {
    const dispatchedActions = [];
    const payload = {
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getSOAData, { payload }).toPromise();
    expect(undefined).toBeUndefined();
  });

  test('SOA_UPDATE_DETAILS  ', async () => {
    const dispatchedActions = [];
    const payload = {
      docId: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, soaUpdateDetails, { payload }).toPromise();
    expect(undefined).toBeUndefined();
  });

  test('getDerivedDataById should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getDerivedDataById, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });

  test('getDerivedDataById should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getDerivedDataById, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });

  test('getDerivedDataById catch block', async () => {
    const dispatchedActions = [];
    const mockOutput = null;
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getDerivedDataById, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getAllDerivedDataByCategory should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getAllDerivedDataByCategory, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });

  test('getAllDerivedDataByCategory should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getAllDerivedDataByCategory, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });

  test('updateDerivedData should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, updateDerivedData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('updateDerivedData should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    const mockToastError = jest.spyOn(toast, 'error');
    await runSaga(fakeStore, updateDerivedData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
    expect(mockToastError).toHaveBeenCalledTimes(0);
  });

  test('LabData should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, LabData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('LabData should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, LabData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('updateSectionLockDetails should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, updateSectionLockDetails, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('updateSectionLockDetails should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, updateSectionLockDetails, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getSectionLockDetails should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getSectionLockDetails, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getSectionLockDetails should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getSectionLockDetails, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('handleConfigurableAPI should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, handleConfigurableAPI, {
      payload: {
        docId: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
        protocol: '15-06',
        linkId: '1',
        linkLevel: '6',
        sectionText: 'abc',
        configVariable: ['1'],
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('handleConfigurableAPI should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.reject(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, handleConfigurableAPI, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('updateSectionData should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      data: { success: true },
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: { userDetail },
        protocol: {},
      }),
    };
    await runSaga(fakeStore, updateSectionData, {
      payload: {
        reqBody: [
          {
            type: 'text',
            content: 'new text',
            qc_change_type: 'add',
            link_id: '0435018d-e4bb-11ed-a922-005056ab6469',
            uuid: 'f864d7f0-898f-49f5-9645-62e4c0186017',
            line_id: 'f864d7f0-898f-49f5-9645-62e4c0186017',
            prev_detail: { line_id: 'ca58545b-79ea-49ca-9cc1-8f397527fe3f' },
          },
        ],
        linkId: '342343242',
        refreshToc: true,
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('updateSectionData should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      data: { success: true },
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, updateSectionData, {
      payload: {
        reqBody: [
          {
            type: 'text',
            content: 'new text',
            qc_change_type: 'add',
            link_id: '0435018d-e4bb-11ed-a922-005056ab6469',
            uuid: 'f864d7f0-898f-49f5-9645-62e4c0186017',
            line_id: 'f864d7f0-898f-49f5-9645-62e4c0186017',
            prev_detail: { line_id: 'ca58545b-79ea-49ca-9cc1-8f397527fe3f' },
          },
        ],
        linkId: '342343242',
        headerEdited: true,
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('updateSectionData should fail  if', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, updateSectionData, {
      payload: {
        reqBody: [
          {
            type: 'text',
            content: 'new text',
            qc_change_type: 'add',
            link_id: '0435018d-e4bb-11ed-a922-005056ab6469',
            uuid: 'f864d7f0-898f-49f5-9645-62e4c0186017',
            line_id: 'f864d7f0-898f-49f5-9645-62e4c0186017',
            prev_detail: { line_id: 'ca58545b-79ea-49ca-9cc1-8f397527fe3f' },
          },
        ],
        linkId: '342343242',
        refreshToc: true,
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('updateSectionData should fail else', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, updateSectionData, {
      payload: {
        reqBody: [
          {
            type: 'text',
            content: 'new text',
            qc_change_type: 'add',
            link_id: '0435018d-e4bb-11ed-a922-005056ab6469',
            uuid: 'f864d7f0-898f-49f5-9645-62e4c0186017',
            line_id: 'f864d7f0-898f-49f5-9645-62e4c0186017',
            prev_detail: { line_id: 'ca58545b-79ea-49ca-9cc1-8f397527fe3f' },
          },
        ],
        linkId: '342343242',
        headerEdited: true,
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('updateSectionData catch', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.reject(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, updateSectionData, {
      payload: {
        reqBody: [],
        linkId: '342343242',
        headerEdited: true,
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });

  test('setSectionIndex get', async () => {
    const dispatchedActions = [];
    const payload = {
      data: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, setSectionIndex, { payload }).toPromise();

    expect(undefined).toBeUndefined();
  });

  test('setResetSectionData get', async () => {
    const dispatchedActions = [];
    const payload = {
      data: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, setResetSectionData, { payload }).toPromise();

    expect(undefined).toBeUndefined();
  });

  test('updateAndSetSectionLockDetails get', async () => {
    const dispatchedActions = [];
    const payload = {
      data: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, updateAndSetSectionLockDetails, {
      payload,
    }).toPromise();

    expect(undefined).toBeUndefined();
  });

  test('getenrichedword get', async () => {
    const dispatchedActions = [];
    const payload = {
      data: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getenrichedword, { payload }).toPromise();

    expect(undefined).toBeUndefined();
  });

  test('setResetQCData get', async () => {
    const dispatchedActions = [];
    const payload = {
      data: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, setResetQCData, { payload }).toPromise();

    expect(undefined).toBeUndefined();
  });

  test('UpdateLabData should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, UpdateLabData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('UpdateLabData should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.reject(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, UpdateLabData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('setDiscardDetails get', async () => {
    const dispatchedActions = [];
    const payload = {
      data: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, setDiscardDetails, { payload }).toPromise();

    expect(undefined).toBeUndefined();
  });

  test('resetAllDipaViewDataByCategory get', async () => {
    const dispatchedActions = [];
    const payload = {
      data: '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c',
    };
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, resetAllDipaViewDataByCategory, {
      payload,
    }).toPromise();

    expect(undefined).toBeUndefined();
  });

  test('getDocumentSectionLock should be Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getDocumentSectionLock, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getDocumentSectionLock should be Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getDocumentSectionLock, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getDocumentSectionLock should handle error', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.reject(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getDocumentSectionLock, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
});

describe('protocolSaga', () => {
  it('should call the correct saga watchers', () => {
    const sagaGenerator = protocolSaga();

    expect(sagaGenerator.next().value).toEqual(
      all([watchProtocolAsync(), watchProtocolViews()]),
    );

    expect(sagaGenerator.next().done).toBe(true);
  });
});
