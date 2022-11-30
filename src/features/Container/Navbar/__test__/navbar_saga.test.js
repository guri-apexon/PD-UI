import { runSaga } from 'redux-saga';
import * as api from '../../../../utils/api';

import { navbarNotificationData, readNotification } from '../saga';

const userDetail = {
  userId: 'u1072231',
  username: 'Subhadatta',
  email: 'subhadatta@iqvia.com',
  user_type: 'QC2',
};
describe('Navbar Saga Unit Test', () => {
  test('Should run give success data: navbarNotificationData', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      data: [
        {
          aidocId: '9f1f6bd8-3899-48b3-9629-69bdb5f83263',
          id: '7242',
          protocol: 'Redaction-SDS-PROT',
          protocolTitle: '',
          readFlag: false,
          timeCreated: '2021-10-11T13:13:43.303000',
        },
        {
          aidocId: 'dfbb0964-616b-4ab3-bc31-13e252f44d8a',
          id: '7959',
          protocol: 'Excel-CSV-Prot',
          protocolTitle: '',
          readFlag: false,
          timeCreated: '2021-10-21T07:58:54.933000',
        },
      ],
      success: true,
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        navbar: {
          notifications: userDetail,
        },
      }),
    };
    await runSaga(fakeStore, navbarNotificationData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
    // navbarNotificationData(data);
  });
  test('Should give Failure data: navbarNoticationdata', async () => {
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
    await runSaga(fakeStore, navbarNotificationData, {
      payload: '51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc',
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test('Should run give success data: readNotification', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      data: [],
      success: true,
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        navbar: {
          notifications: userDetail,
        },
      }),
    };
    await runSaga(fakeStore, readNotification, {
      payload: {
        aidocId: 'dfbb0964-616b-4ab3-bc31-13e252f44d8a',
        id: '7959',
        protocol: 'Excel-CSV-Prot',
      },
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
    // navbarNotificationData(data);
  });
  test('Should run give failure data: readNotification', async () => {
    const dispatchedActions = [];
    const mockOutput = {
      data: [],
      success: false,
    };
    const mockCallApi = jest
      .spyOn(api, 'httpCall')
      .mockImplementation(() => Promise.resolve(mockOutput));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        navbar: {
          notifications: userDetail,
        },
      }),
    };
    await runSaga(fakeStore, readNotification, {
      payload: {
        aidocId: 'dfbb0964-616b-4ab3-bc31-13e252f44d8a',
        id: '7959',
        protocol: 'Excel-CSV-Prot',
      },
      type: '',
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
    // navbarNotificationData(data);
  });
});
