/* eslint-disable */
import { runSaga } from 'redux-saga';
import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import dashboardSaga, {
  recentSearchAsyn,
  addProtocolSponsor,
  postAddProtocol,
  protocolAsyn,
  resetErrorAddProtocol,
  toggleAddProtocol,
  saveRecentSearch,
  savedSearchAsyn,
  followedProtocols,
  sendQcReview,
  watchDashboard,
  addProtocolIndication,
  handleFollow,
  fetchAssociateData,
  fetchWorkflowData,
  resetWorkflowSubmitData,
  submitWorkflowData,
  fetchMoreWorkflow,
  handleDownload,
  resetErrorAddProtocolNew,
} from '../saga';

import BASE_URL, * as api from '../../../../utils/api';
import { getProtocols } from '../dashboardSlice';

const userDetail = {
  username: 'Sohan111',
  userId: 'u1021402',
  email: 'test@iqvia.com',
};
const file = new File(['(⌐□_□)'], 'chucknorris.doc', {
  type: 'application/msword',
});
const addProtocolData = {
  uploadFile: [file],
  fileName: 'file',
  protocol_version: '1',
  protocol_number: '11',
  sponsor: 'Sp',
  documentStatus: 'final',
  amendmentNumber: 'Y',
  projectId: '11',
  indication: 'ind',
  moleculeDevice: 'Mol',
  userId: '1222',
};

describe('watchDashboard', () => {
  it('should call protocolAsyn on "GET_PROTOCOL_TABLE_SAGA" action', () => {
    const generator = watchDashboard();

    expect(generator.next().value).toEqual(
      takeLatest('GET_PROTOCOL_TABLE_SAGA', protocolAsyn),
    );
  });

  it('should call recentSearchAsyn on "GET_RECENT_SEARCH_DATA" action', () => {
    const generator = watchDashboard();

    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('GET_RECENT_SEARCH_DATA', recentSearchAsyn),
    );
  });

  it('should call postAddProtocol on "POST_ADDPROTOCOL_DATA" action', () => {
    const generator = watchDashboard();

    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('POST_ADDPROTOCOL_DATA', postAddProtocol),
    );
  });

  it('should call toggleAddProtocol on "TOGGLE_ADDPROTOCOL_MODAL" action', () => {
    const generator = watchDashboard();

    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('TOGGLE_ADDPROTOCOL_MODAL', toggleAddProtocol),
    );
  });

  it('should call savedSearchAsyn on "GET_SAVED_SEARCH_DATA" action', () => {
    const generator = watchDashboard();

    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('GET_SAVED_SEARCH_DATA', savedSearchAsyn),
    );
  });

  it('should call resetErrorAddProtocol on "RESET_ERROR_ADD_PROTOCOL" action', () => {
    const generator = watchDashboard();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('RESET_ERROR_ADD_PROTOCOL', resetErrorAddProtocol),
    );
  });

  it('should call resetErrorAddProtocolNew on "RESET_ERROR_ADD_PROTOCOL_NEW" action', () => {
    const generator = watchDashboard();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('RESET_ERROR_ADD_PROTOCOL_NEW', resetErrorAddProtocolNew),
    );
  });

  it('should call saveRecentSearch on "POST_RECENT_SEARCH_DASHBOARD" action', () => {
    const generator = watchDashboard();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeEvery('POST_RECENT_SEARCH_DASHBOARD', saveRecentSearch),
    );
  });

  it('should call sendQcReview on "SEND_QC_REVIEW_SAGA" action', () => {
    const generator = watchDashboard();

    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual(
      takeLatest('SEND_QC_REVIEW_SAGA', sendQcReview),
    );
  });

  it('should call handleDownload on "HANDLE_DOWNLOAD_SAGA" action', () => {
    const generator = watchDashboard();

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
      takeLatest('HANDLE_DOWNLOAD_SAGA', handleDownload),
    );
  });

  it('should call handleFollow on "HANDLE_FOLLOW_SAGA" action', () => {
    const generator = watchDashboard();

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
      takeLatest('HANDLE_FOLLOW_SAGA', handleFollow),
    );
  });

  it('should call fetchAssociateData on "FETCH_ASSOCIATE_DATA" action', () => {
    const generator = watchDashboard();

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
      takeLatest('FETCH_ASSOCIATE_DATA', fetchAssociateData),
    );
  });

  it('should call fetchWorkflowData on "FETCH_WORKFLOW_DATA" action', () => {
    const generator = watchDashboard();

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
      takeLatest('FETCH_WORKFLOW_DATA', fetchWorkflowData),
    );
  });

  it('should call submitWorkflowData on "SUBMIT_WORKFLOW_DATA" action', () => {
    const generator = watchDashboard();

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
      takeLatest('SUBMIT_WORKFLOW_DATA', submitWorkflowData),
    );
  });

  it('should call resetWorkflowSubmitData on "RESET_SUBMIT_WORKFLOW_DATA" action', () => {
    const generator = watchDashboard();

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
      takeLatest('RESET_SUBMIT_WORKFLOW_DATA', resetWorkflowSubmitData),
    );
  });

  it('should call fetchMoreWorkflow on "FETCH_MORE_WORKFLOW" action', () => {
    const generator = watchDashboard();

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
      takeLatest('FETCH_MORE_WORKFLOW', fetchMoreWorkflow),
    );
  });
});

describe('Dashboard Saga Unit Test', () => {
  // recentSearchAsyn Test Cases Start
  test('recentSearchAsyn Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          keyword: 'Acute',
          lastUpdated: '2021-01-05T12:55:39.507000',
          sponsorId: 2,
          timeCreated: '2021-01-05T12:55:39.507000',
          userId: '1021402',
        },
        {
          keyword: 'Acute A',
          lastUpdated: '2021-01-05T12:55:39.507000',
          sponsorId: 2,
          timeCreated: '2021-01-05T12:55:39.507000',
          userId: '1021402',
        },
      ],
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
    await runSaga(fakeStore, recentSearchAsyn, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('Recent Search Asyn else logic', async () => {
    const dispatchedActions = [];

    const mockOutput = {
      success: false,
      err: {
        statusText: 'Error',
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
    await runSaga(fakeStore, recentSearchAsyn, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test('Recent Search Asyn fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      message: 'Successful',
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
    await runSaga(fakeStore, recentSearchAsyn, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  // AddProtocol Test Cases End

  // Post AddProtocol Test Cases Starts

  test('addProtocolSponsor Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          sponsor: 'astella',
          id: 1,
        },
      ],
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

    await runSaga(fakeStore, postAddProtocol, {
      payload: addProtocolData,
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('addProtocolSponsor Saga success with no duplicate', async () => {
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
    await runSaga(fakeStore, postAddProtocol, {
      payload: addProtocolData,
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });

  test('addProtocolSponsor Saga fails', async () => {
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
    await runSaga(fakeStore, postAddProtocol, {
      payload: addProtocolData,
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });
  test('addProtocolSponsor Saga fails with Error message', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: null,
      err: {
        data: {
          message: 'Error',
        },
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
    await runSaga(fakeStore, postAddProtocol, {
      payload: addProtocolData,
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });

  test('addProtocolSponsor Saga error in catch section', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      message: 'Successful',
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
    await runSaga(fakeStore, postAddProtocol, {
      payload: addProtocolData,
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('addProtocolSponsor Saga Duplicate Exist Test', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: {
        Duplicate: 'Duplicate',
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
    await runSaga(fakeStore, postAddProtocol, {
      payload: addProtocolData,
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  // Test protocolAsyn function starts
  test('protocolAsyn Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          protocolTitle: 'astella',
          protocol: '11',
          projectId: 'Proj1',
          sponsor: 'Astellla',
          uploadDate: '20201202',
          id: 1,
          userUploadedFlag: true,
        },
        {
          protocolTitle: 'astellaa',
          protocol: '112',
          projectId: 'Proj1',
          sponsor: 'Astellla',
          uploadDate: '20201202',
          id: 2,
          userUploadedFlag: false,
          userPrimaryRoleFlag: false,
          userFollowingFlag: true,
        },
      ],
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

    await runSaga(fakeStore, protocolAsyn, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('protocolAsyn Saga Success Followed', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          protocolTitle: 'astella',
          protocol: '11',
          projectId: 'Proj1',
          sponsor: 'Astellla',
          uploadDate: '20201202',
          id: 1,
          userUploadedFlag: true,
        },
        {
          protocolTitle: 'astellaa',
          protocol: '112',
          projectId: 'Proj1',
          sponsor: 'Astellla',
          uploadDate: '20201202',
          id: 2,
          userUploadedFlag: false,
          userPrimaryRoleFlag: false,
          userFollowingFlag: true,
        },
      ],
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

    await runSaga(fakeStore, protocolAsyn, {
      payload: [
        {
          protocolTitle: 'astella',
          protocol: '11',
          projectId: 'Proj1',
          sponsor: 'Astellla',
          uploadDate: '20201202',
          id: 1,
          userUploadedFlag: true,
        },
      ],
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });
  test('protocolAsyn Saga Success with empty values', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          protocolTitle: '',
          protocol: '',
          projectId: '',
          sponsor: '',
          uploadDate: '',
          id: 1,
        },
      ],
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
    await runSaga(fakeStore, protocolAsyn, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test('protocolAsyn Saga fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [
        {
          protocolTitle: 'astella',
          protocol: '11',
          projectId: 'Proj1',
          sponsor: 'Astellla',
          uploadDate: '20201202',
          id: 1,
        },
      ],
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

    await runSaga(fakeStore, protocolAsyn, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('protocolAsyn Saga Error out', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      err: {
        statusText: 'Error',
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

    await runSaga(fakeStore, protocolAsyn, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  // Test protocolAsyn function Ends

  test('resetErrorAddProtocolNew Success', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, resetErrorAddProtocolNew, {
      data: {
        payload: 'test',
      },
      type: '',
    });
  });

  // Test toggleAddProtocol function Start
  test('toggleAddProtocol Success', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, toggleAddProtocol, {
      data: {
        payload: 'test',
      },
      type: '',
    });
  });
  // Test toggleAddProtocol function Ends
  // Test resetErrorAddProtocol function Start
  test('toggleAddProtocol Success', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, resetErrorAddProtocol, {
      data: {
        payload: 'test',
      },
      type: '',
    });
  });
  // Test resetErrorAddProtocol function Ends

  // Test saveRecentSearch function Starts

  test('saveRecentSearch Saga Success', async () => {
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

    await runSaga(fakeStore, saveRecentSearch, {
      payload: 'Keyword',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('saveRecentSearch Saga Error Catch', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      err: {
        statusText: 'Error',
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

    await runSaga(fakeStore, saveRecentSearch, {
      payload: 'Keyword',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('saveRecentSearch Saga Error out', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      err: {
        statusText: 'Error',
      },
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

    await runSaga(fakeStore, saveRecentSearch, {
      payload: 'Keyword',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('saveRecentSearch Saga Error out', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      err: {
        statusText: 'Error',
      },
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

    await runSaga(fakeStore, saveRecentSearch, {
      payload: '',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });

  // Test saveRecentSearch function Ends

  // Test savedSearchAsyn function Start

  test('savedSearchAsyn Saga Success', async () => {
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

    await runSaga(fakeStore, savedSearchAsyn, {
      payload: 'Keyword',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('savedSearchAsyn Saga fails', async () => {
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

    await runSaga(fakeStore, savedSearchAsyn, {
      payload: 'Keyword',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  // Test savedSearchAsyn function Ends

  // Test GET_FOLLOWED_PROTOCOL_SAGA function Start

  xtest('GET_FOLLOWED_PROTOCOL_SAGA Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          id: '2a5111a6-5465-46f5-b133-a85724bae4ef',
          amendment: 'Y',
          amendmentNumber: null,
          approvalDate: null,
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
          moleculeDevice: 'test',
          percentComplete: '100',
          phase: 'I',
          projectId: '',
          protocol: 'JBT101-RIS-001',
          protocolTitle:
            'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
          sponsor: 'Corbus Pharmaceuticals',
          status: 'PROCESS_COMPLETED',
          uploadDate: '2021-04-08T09:51:34.077000',
          userId: '1020640',
          versionNumber: '10.1',
          qcActivity: 'QC_IN_PROGRESS',
        },
      ],
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

    await runSaga(fakeStore, followedProtocols, {
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  xtest('GET_FOLLOWED_PROTOCOL_SAGA Saga fails', async () => {
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

    await runSaga(fakeStore, followedProtocols, {
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  // Test GET_FOLLOWED_PROTOCOL_SAGA function Ends

  // Test SEND_QC_REVIEW_SAGA function Start

  test('SEND_QC_REVIEW_SAGA Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: {
        response: {
          id1: {
            is_success: true,
            message:
              'Successfully changed qcStatus from QC_NOT_STARTED to QC1. ES update completed',
          },
          id2: {
            is_success: false,
            message:
              'Successfully changed qcStatus from QC_NOT_STARTED to QC1. ES update completed',
          },
        },
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
        dashboard: {
          selectedProtocols: ['id1', 'id2'],
        },
      }),
    };

    await runSaga(fakeStore, sendQcReview, {
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('SEND_QC_REVIEW_SAGA Saga fails', async () => {
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
        dashboard: {
          selectedProtocols: ['id1'],
        },
      }),
    };

    await runSaga(fakeStore, sendQcReview, {
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('handleDownload Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: true,
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
        dashboard: {
          sponsorLoading: false,
          addProtocolData: {
            sponsor: [],
            indication: [],
          },
          followedProtocols: [
            {
              id: '2a5111a6-5465-46f5-b133-a85724bae4ef',
              amendment: 'Y',
              amendmentNumber: null,
              approvalDate: null,
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
              moleculeDevice: 'test',
              percentComplete: '100',
              phase: 'I',
              projectId: '',
              protocol: 'JBT101-RIS-001',
              protocolTitle:
                'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
              sponsor: 'Corbus Pharmaceuticals',
              status: 'PROCESS_COMPLETED',
              uploadDate: '2021-04-08T09:51:34.077000',
              userId: '1020640',
              versionNumber: '10.1',
              qcActivity: 'QC_IN_PROGRESS',
            },
            {
              id: '01a8d886-1018-404b-b496-9555f7712a21',
              amendment: 'Y',
              amendmentNumber: null,
              approvalDate: null,
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
              moleculeDevice: 'test',
              percentComplete: '100',
              phase: 'I',
              projectId: '',
              protocol: 'covid',
              protocolTitle:
                'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
              sponsor: 'Corbus Pharmaceuticals',
              status: 'PROCESS_COMPLETED',
              uploadDate: '2021-04-08T09:51:34.077000',
              userId: '1020640',
              versionNumber: '10.1',
              qcActivity: 'QC_IN_PROGRESS',
            },
          ],
        },
      }),
    };

    await runSaga(fakeStore, handleDownload, {
      type: '',
      payload: {
        data: {
          protocol: 'covid',
          UserRole: 'normal',
        },
        follow: false,
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('handleDownload Saga fails', async () => {
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
        dashboard: {
          selectedProtocols: ['id1'],
        },
      }),
    };

    await runSaga(fakeStore, handleDownload, {
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('handleFollow Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: true,
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
        dashboard: {
          sponsorLoading: false,
          addProtocolData: {
            sponsor: [],
            indication: [],
          },
          followedProtocols: [
            {
              id: '2a5111a6-5465-46f5-b133-a85724bae4ef',
              amendment: 'Y',
              amendmentNumber: null,
              approvalDate: null,
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
              moleculeDevice: 'test',
              percentComplete: '100',
              phase: 'I',
              projectId: '',
              protocol: 'JBT101-RIS-001',
              protocolTitle:
                'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
              sponsor: 'Corbus Pharmaceuticals',
              status: 'PROCESS_COMPLETED',
              uploadDate: '2021-04-08T09:51:34.077000',
              userId: '1020640',
              versionNumber: '10.1',
              qcActivity: 'QC_IN_PROGRESS',
            },
            {
              id: '01a8d886-1018-404b-b496-9555f7712a21',
              amendment: 'Y',
              amendmentNumber: null,
              approvalDate: null,
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
              moleculeDevice: 'test',
              percentComplete: '100',
              phase: 'I',
              projectId: '',
              protocol: 'covid',
              protocolTitle:
                'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
              sponsor: 'Corbus Pharmaceuticals',
              status: 'PROCESS_COMPLETED',
              uploadDate: '2021-04-08T09:51:34.077000',
              userId: '1020640',
              versionNumber: '10.1',
              qcActivity: 'QC_IN_PROGRESS',
            },
          ],
        },
      }),
    };

    await runSaga(fakeStore, handleFollow, {
      type: '',
      payload: {
        data: {
          protocol: 'covid',
          UserRole: 'normal',
        },
        follow: false,
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('handleFollow Saga Failure', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: true,
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
        dashboard: {
          sponsorLoading: false,
          addProtocolData: {
            sponsor: [],
            indication: [],
          },
          followedProtocols: { test: [] },
        },
      }),
    };

    await runSaga(fakeStore, handleFollow, {
      type: '',
      payload: {
        data: {
          protocol: 'covid',
          UserRole: 'normal',
        },
        follow: false,
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });

  test('fetchAssociateData Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          amendment: 'a1',
          approvalDate: '2020-06-17T00:00:00',
          compareStatus: null,
          completenessOfDigitization: null,
          digitizedConfidenceInterval: null,
          documentFilePath:
            '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\01a8d886-1018-404b-b496-9555f7712a21\\998_CTP_V1.0_17-Jun-2020_signed_pw.pdf',
          documentStatus: 'final',
          draftVersion: null,
          environment: 'env',
          errorCode: 1,
          errorReason:
            "Digitizer2Standard template file does not exist 'D:\\Projects\\IQVDocumentManager\\Code\\Release\\D2_cpt1.docx.iqv.xml.zip'",
          fileName: 'covid',
          id: '01a8d886-1018-404b-b496-9555f7712a21',
          indication: 'ind',
          iqvXmlPathComp: null,
          iqvXmlPathProc: null,
          isActive: true,
          isProcessing: false,
          lastUpdated: '2021-05-12T20:25:30.550000',
          moleculeDevice: 'mol',
          nctId: null,
          percentComplete: '100',
          phase: 'II',
          projectId: 'covid',
          protocol: 'covid',
          protocolTitle:
            'Title:  A randomized, placebo-controlled, double-blind, multi-center, phase II trial investigating the efficacy and safety of trimodulin (BT588) as add-on therapy to standard of care in adult subjects with severe COVID-19. A randomized, placebo-controlled, double-blind, multi-center, phase II trial investigating the efficacy and safety of trimodulin (BT588) as addon therapy to standard of care in adult subjects with severe COVID-19.',
          qcStatus: 'QC2',
          shortTitle: 'ESsCOVID',
          sourceSystem: 'sys',
          sponsor: 'c',
          status: 'PROCESS_COMPLETED',
          studyStatus: 'st',
          timeCreated: '2021-05-12T20:03:34.560000',
          uploadDate: '2021-05-12T20:03:34.560000',
          userCreated: null,
          userId: 'u1000713',
          userUpdated: null,
          versionNumber: '1',
        },
        {
          amendment: 'a1',
          approvalDate: '2020-06-17T00:00:00',
          compareStatus: null,
          completenessOfDigitization: null,
          digitizedConfidenceInterval: null,
          documentFilePath:
            '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\01a8d886-1018-404b-b496-9555f7712a21\\998_CTP_V1.0_17-Jun-2020_signed_pw.pdf',
          documentStatus: 'final',
          draftVersion: null,
          environment: 'env',
          errorCode: 1,
          errorReason:
            "Digitizer2Standard template file does not exist 'D:\\Projects\\IQVDocumentManager\\Code\\Release\\D2_cpt1.docx.iqv.xml.zip'",
          fileName: 'covid',
          id: '01a8d886-1018-404b-b496-9555f7712a21s',
          indication: 'ind',
          iqvXmlPathComp: null,
          iqvXmlPathProc: null,
          isActive: true,
          isProcessing: false,
          lastUpdated: '2021-05-12T20:25:30.550000',
          moleculeDevice: 'mol',
          nctId: null,
          percentComplete: '100',
          phase: 'II',
          projectId: 'covid',
          protocol: 'covid',
          protocolTitle:
            'Title:  A randomized, placebo-controlled, double-blind, multi-center, phase II trial investigating the efficacy and safety of trimodulin (BT588) as add-on therapy to standard of care in adult subjects with severe COVID-19. A randomized, placebo-controlled, double-blind, multi-center, phase II trial investigating the efficacy and safety of trimodulin (BT588) as addon therapy to standard of care in adult subjects with severe COVID-19.',
          qcStatus: 'QC2',
          shortTitle: 'ESsCOVID',
          sourceSystem: 'sys',
          sponsor: 'c',
          status: 'PROCESS_COMPLETED',
          studyStatus: 'st',
          timeCreated: '2021-05-12T20:03:34.560000',
          uploadDate: '2021-05-12T20:03:34.560000',
          userCreated: null,
          userId: 'u1000713',
          userUpdated: null,
          versionNumber: '1',
        },
      ],
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
        dashboard: {
          sponsorLoading: false,
          addProtocolData: {
            sponsor: [],
            indication: [],
          },
          followedProtocols: [
            {
              id: '2a5111a6-5465-46f5-b133-a85724bae4ef',
              amendment: 'Y',
              amendmentNumber: null,
              approvalDate: null,
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
              moleculeDevice: 'test',
              percentComplete: '100',
              phase: 'I',
              projectId: '',
              protocol: 'JBT101-RIS-001',
              protocolTitle:
                'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
              sponsor: 'Corbus Pharmaceuticals',
              status: 'PROCESS_COMPLETED',
              uploadDate: '2021-04-08T09:51:34.077000',
              userId: '1020640',
              versionNumber: '10.1',
              qcActivity: 'QC_IN_PROGRESS',
            },
            {
              id: '01a8d886-1018-404b-b496-9555f7712a21',
              amendment: 'Y',
              amendmentNumber: null,
              approvalDate: null,
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
              moleculeDevice: 'test',
              percentComplete: '100',
              phase: 'I',
              projectId: '',
              protocol: 'covid',
              protocolTitle:
                'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
              sponsor: 'Corbus Pharmaceuticals',
              status: 'PROCESS_COMPLETED',
              uploadDate: '2021-04-08T09:51:34.077000',
              userId: '1020640',
              versionNumber: '10.1',
              qcActivity: 'QC_IN_PROGRESS',
            },
          ],
        },
      }),
    };

    await runSaga(fakeStore, fetchAssociateData, {
      type: '',
      payload: {
        protocol: 'covid',
        id: '01a8d886-1018-404b-b496-9555f7712a21',
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('fetchAssociateData Saga failure', async () => {
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
        dashboard: {
          sponsorLoading: false,
          addProtocolData: {
            sponsor: [],
            indication: [],
          },
          followedProtocols: [
            {
              id: '2a5111a6-5465-46f5-b133-a85724bae4ef',
              amendment: 'Y',
              amendmentNumber: null,
              approvalDate: null,
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
              moleculeDevice: 'test',
              percentComplete: '100',
              phase: 'I',
              projectId: '',
              protocol: 'JBT101-RIS-001',
              protocolTitle:
                'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
              sponsor: 'Corbus Pharmaceuticals',
              status: 'PROCESS_COMPLETED',
              uploadDate: '2021-04-08T09:51:34.077000',
              userId: '1020640',
              versionNumber: '10.1',
              qcActivity: 'QC_IN_PROGRESS',
            },
            {
              id: '01a8d886-1018-404b-b496-9555f7712a21',
              amendment: 'Y',
              amendmentNumber: null,
              approvalDate: null,
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
              moleculeDevice: 'test',
              percentComplete: '100',
              phase: 'I',
              projectId: '',
              protocol: 'covid',
              protocolTitle:
                'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
              sponsor: 'Corbus Pharmaceuticals',
              status: 'PROCESS_COMPLETED',
              uploadDate: '2021-04-08T09:51:34.077000',
              userId: '1020640',
              versionNumber: '10.1',
              qcActivity: 'QC_IN_PROGRESS',
            },
          ],
        },
      }),
    };

    await runSaga(fakeStore, fetchAssociateData, {
      type: '',
      payload: {
        protocol: 'covid',
        id: '01a8d886-1018-404b-b496-9555f7712a21',
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('fetchWorkflowData Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      loading: false,
      error: null,
      success: true,
      data: {
        Status: 200,
        default_workflows: {
          document_compare: [
            {
              depends: [],
              service_name: 'digitizer2_compare',
            },
          ],
        },
        custom_workflows: {
          dipa_client: [
            {
              depends: [],
              service_name: 'meta_tagging',
            },
            {
              depends: ['meta_tagging'],
              service_name: 'meta_extraction',
            },
            {
              depends: [],
              service_name: 'digitizer2_compare',
            },
            {
              depends: [],
              service_name: 'digitizer2_normsoa',
            },
          ],
        },
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
        dashboard: {
          sponsorLoading: false,
          addProtocolData: {
            sponsor: [],
            indication: [],
          },
          followedProtocols: [],
        },
      }),
    };

    await runSaga(fakeStore, fetchWorkflowData, {
      type: '',
      payload: {
        protocol: 'covid',
        id: '01a8d886-1018-404b-b496-9555f7712a21',
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test('submitWorkflowData Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      loading: false,
      error: null,
      data: {},
      success: true,
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
        dashboard: {
          sponsorLoading: false,
          addProtocolData: {
            sponsor: [],
            indication: [],
          },
          followedProtocols: [],
        },
      }),
    };

    await runSaga(fakeStore, submitWorkflowData, {
      type: '',
      payload: {
        protocol: 'covid',
        id: '01a8d886-1018-404b-b496-9555f7712a21',
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test('submitWorkflowData Saga Error', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      loading: false,
      error: null,
      data: {},
      success: false,
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
        dashboard: {
          sponsorLoading: false,
          addProtocolData: {
            sponsor: [],
            indication: [],
          },
          followedProtocols: [],
        },
      }),
    };

    await runSaga(fakeStore, submitWorkflowData, {
      type: '',
      payload: {
        protocol: 'covid',
        id: '01a8d886-1018-404b-b496-9555f7712a21',
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test('resetWorkflowSubmitData Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      loading: false,
      error: null,
      data: [],
      success: false,
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
        dashboard: {
          sponsorLoading: false,
          addProtocolData: {
            sponsor: [],
            indication: [],
          },
          followedProtocols: [],
        },
      }),
    };

    await runSaga(fakeStore, resetWorkflowSubmitData, {
      type: '',
      payload: {
        protocol: 'covid',
        id: '01a8d886-1018-404b-b496-9555f7712a21',
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });
  test('fetchMoreWorkflow Saga Success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      loading: false,
      error: null,
      data: [],
      success: false,
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
        dashboard: {
          sponsorLoading: false,
          addProtocolData: {
            sponsor: [],
            indication: [],
          },
          protocols: [],
        },
      }),
    };

    await runSaga(fakeStore, fetchMoreWorkflow, {
      type: '',
      payload: {
        protocol: 'covid',
        id: '01a8d886-1018-404b-b496-9555f7712a21',
      },
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  it('should handle fetch more workflow failure', async () => {
    const docId = '123';
    const state = {
      dashboard: {
        protocols: [
          {
            id: '123',
            showMoreCalling: false,
            showMore: false,
          },
        ],
      },
    };

    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(state));

    const dispatchedActions = [];
    const mockStore = {
      getState: () => state,
      dispatch: (action) => dispatchedActions.push(action),
    };

    await runSaga(mockStore, fetchMoreWorkflow, { payload: docId }).toPromise();

    expect(mockCallApi).toHaveBeenCalledWith({
      url: `${BASE_URL}/pd/api/v1/documents/get_workflows_by_doc_id?doc_id=${docId}`,
      method: 'GET',
      checkAuth: true,
      headers: { 'Content-Type': 'application/json' },
    });

    mockCallApi.mockRestore();
  });

  // Test SEND_QC_REVIEW_SAGA function Ends

  // watch All Sagas
  test('should watch all Dashboard Sagas', () => {
    watchDashboard();
  });
});

describe('protocolSaga', () => {
  it('should call the correct saga watchers', () => {
    const sagaGenerator = dashboardSaga();

    expect(sagaGenerator.next().value).toEqual(all([watchDashboard()]));

    expect(sagaGenerator.next().done).toBe(true);
  });
});
