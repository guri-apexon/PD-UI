import { runSaga } from 'redux-saga';

import * as api from '../../../../utils/api';
import {
  getIndicationData,
  getSponsorData,
  getFilterData,
  getSearchData,
  createJSONFormat,
  setAsssociateProtocols,
  updateSearchResult,
  getRecentData,
  getDataByRange,
} from '../saga';

const userDetail = {
  username: 'Sohan111',
  userId: 'u1021402',
  email: 'test@iqvia.com',
};
describe('Search Saga Unit Test', () => {
  // getIndicationData Starts
  test('getIndicationData success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          indicationName: 'ABCC6',
          indId: '1',
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
    await runSaga(fakeStore, getIndicationData, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getIndicationData Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [
        {
          indicationName: 'ABCC6',
          indId: '1',
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
    await runSaga(fakeStore, getIndicationData, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  // getIndicationData Ends

  // getSponsorData Starts
  test('getSponsorData success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          sponsorName: 'ABCC6',
          sponsorId: '1',
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
    await runSaga(fakeStore, getSponsorData, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getSponsorData Fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [
        {
          sponsorName: 'ABCC6',
          sponsorId: '1',
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
    await runSaga(fakeStore, getSponsorData, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  // getSponsorData Ends

  // getFilterData Starts

  test('getFilterData success', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          indicationName: 'ABCC6',
          indId: '1',
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
    await runSaga(fakeStore, getFilterData, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(3);
  });
  test('getFilterData success with SectionName as Sponsor and Indication', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          indicationName: 'ABCC6',
          indId: '1',
          sectionName: 'Indication',
        },
        {
          sponsorName: 'ABCC6',
          sponsorId: '1',
          sectionName: 'Sponsors',
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
    await runSaga(fakeStore, getFilterData, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(3);
  });
  test('getFilterData fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [
        {
          indicationName: 'ABCC6',
          indId: '1',
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
    await runSaga(fakeStore, getFilterData, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(3);
  });

  // getSearchData Starts

  test('getSearchData success ', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: {
        hits: {
          hits: [{ id: '1', document: 'Prtocol1' }],
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
    await runSaga(fakeStore, getSearchData, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getSearchData success with zero data', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: {
        hits: {
          hits: [],
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
    await runSaga(fakeStore, getSearchData, {
      payload: {},
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('getSearchData fails', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: {
        hits: {
          hits: [],
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
    await runSaga(fakeStore, getSearchData, {
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });

  // createJSONFormat Starts
  test('should run parsedData function', () => {
    const data = [
      {
        _source: {
          ProtocolNo: '11',
          ProtocolTitle: 'Title',
          Indication: 'Y',
          phase: 'I',
          SponsorName: 'Astella',
          MoleculeDevice: 'Mol',
          approval_date: '20201101',
          uploadDate: '20200220',
          followed: false,
          rows: [],
          rowsLoading: true,
          is_active: 'yes',
          ProjectId: 'qq',
          SourceFileName: 'protocl.pdf',
          documentPath: 'ww',
          DocumentStatus: 'Draft',
          VersionNumber: '1',
        },
      },
    ];
    createJSONFormat(data);
  });
  // createJSONFormat Ends

  //   setAsssociateProtocols Starts

  test('should run parsedData function', () => {
    const data = [
      {
        _source: {
          ProtocolNo: '11',
          ProtocolTitle: 'Title',
          Indication: 'Y',
          phase: 'I',
          SponsorName: 'Astella',
          MoleculeDevice: 'Mol',
          approval_date: '20201101',
          uploadDate: '20200220',
          followed: false,
          rows: [],
          rowsLoading: true,
          is_active: 'yes',
          ProjectId: 'qq',
          SourceFileName: 'protocl.pdf',
          documentPath: 'ww',
          DocumentStatus: 'Draft',
          VersionNumber: '1',
          id: '123',
        },
        id: '123',
      },
      {
        _source: {
          ProtocolNo: '11',
          ProtocolTitle: 'Title',
          Indication: 'Y',
          phase: 'I',
          SponsorName: 'Astella',
          MoleculeDevice: 'Mol',
          approval_date: '20201101',
          uploadDate: '20200220',
          followed: false,
          rows: [],
          rowsLoading: true,
          is_active: 'yes',
          ProjectId: 'qq',
          SourceFileName: 'protocl.pdf',
          documentPath: 'ww',
          DocumentStatus: 'Draft',
          VersionNumber: '1',
          id: '123',
        },
        id: '1231',
      },
    ];
    const assoicate = [
      {
        id: '1222',
        prtocolName: 'Prot',
      },
    ];
    setAsssociateProtocols('123', data, assoicate);
  });
  // setAsssociateProtocols Ends

  // updateSearchResult Starts
  test('updateSearchResult success ', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, updateSearchResult, {
      payload: {},
      type: '',
    }).toPromise();
  });
  // updateSearchResult Ends

  // getRecentData Starts
  test('getRecentData success ', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getRecentData, {
      payload: '0',
      type: '',
    }).toPromise();
  });
  // getRecentData Ends

  // getRecentData Starts
  test('getRecentData success ', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getRecentData, {
      payload: '6',
      type: '',
    }).toPromise();
  });
  // getRecentData Ends

  // getDataByRange Starts
  test('getDataByRange success with empty to and from', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getDataByRange, {
      payload: {
        from: '',
        to: '',
      },
      type: '',
    }).toPromise();
  });
  // getDataByRange Ends
  // getDataByRange Starts
  test('getDataByRange success with to and from', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getDataByRange, {
      payload: {
        from: '2020-11-24',
        to: '2020-11-24',
      },
      type: '',
    }).toPromise();
  });
  // getDataByRange Ends

  // getDataByRange Starts
  test('getDataByRange success with from ', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getDataByRange, {
      payload: {
        from: '2020-11-24',
        to: '',
      },
      type: '',
    }).toPromise();
  });
  // getDataByRange Ends

  // getDataByRange Starts
  test('getDataByRange success with to only ', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail,
        },
      }),
    };
    await runSaga(fakeStore, getDataByRange, {
      payload: {
        from: '',
        to: '2020-11-24',
      },
      type: '',
    }).toPromise();
  });
  // getDataByRange Ends
});
