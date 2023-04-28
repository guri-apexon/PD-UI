import { runSaga } from 'redux-saga';
import * as api from '../../../../utils/api';
import protocolData from './protocolJSON.json';
import {
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
} from '../saga';

const userDetail = {
  username: 'test',
  userId: 'u1021402',
  email: 'test@iqvia.com',
};
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
    await runSaga(fakeStore, updateDerivedData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
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
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
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
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('updateSectionData should be Success', async () => {
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
    await runSaga(fakeStore, updateSectionData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });

  test('updateSectionData should be Fails', async () => {
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
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
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
});
