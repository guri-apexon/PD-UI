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
  fetchSectionHeaderList,
  getSectionList,
  getProtocolTocDataResult,
} from '../saga';

const userDetail = {
  username: 'test',
  userId: 'u1021402',
  email: 'test@iqvia.com',
};
describe('Protocol Saga Unit Test', () => {
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

  test('fetchSectionHeaderList success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
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
    await runSaga(fakeStore, fetchSectionHeaderList, {
      payload: { docId: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc' },
    }).toPromise();
    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('fetchSectionHeaderList failure', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
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
    await runSaga(fakeStore, fetchSectionHeaderList, {
      payload: { docId: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc' },
    }).toPromise();
    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('getSectionList success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
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
    await runSaga(fakeStore, getSectionList, {
      payload: {
        docId: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
        protocol: '15-06',
        linkId: 'linkId',
      },
    }).toPromise();
    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('getSectionList with no message success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      message: 'No Access',
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
    await runSaga(fakeStore, getSectionList, {
      payload: {
        docId: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
        protocol: '15-06',
        linkId: 'linkId',
      },
    }).toPromise();
    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('getSectionList failure', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
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
    await runSaga(fakeStore, getSectionList, {
      payload: {
        docId: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
        protocol: '15-06',
        linkId: 'linkId',
      },
    }).toPromise();
    expect(mockApi).toHaveBeenCalledTimes(1);
  });

  test('getProtocolTocDataResult without user try success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: {
        iqvdataToc: JSON.stringify({
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        }),
        iqvdataSoa: JSON.stringify({
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        }),
        iqvdataSummary: JSON.stringify({
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        }),
      },
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
});
