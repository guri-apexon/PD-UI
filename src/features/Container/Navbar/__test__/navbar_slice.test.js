/* eslint-disable */
import navbarSlice, {
  deleteNotificationData,
  getLoader,
  getNotification,
  getOptInOutData,
  loader,
  navbar,
  navbarNotifications,
  navbarNotificationsError,
  setError,
} from '../navbarSlice';

const initialState = {
  navbar: {
    notifications: [],
    error: false,
    loader: false,
    OptInOut: {},
  },
};

describe('Navbar Slice Test', () => {
  test('getNotification Action', () => {
    expect(
      navbarSlice(initialState, {
        type: getNotification.type,
        payload: [
          {
            id: '1',
            read: false,
            header: 'D8850C00003',
            details: 'Post-exposure Prophylaxis of COVID-19 in Adults',
            timestamp: '2021-04-29T00:00:00',
            protocolNumber: 'D8850C00003',
            aidocId: '45830060-0dcd-474f-a0e7-3974dd53b208',
          },
        ],
      }),
    ).toEqual({
      ...initialState,
      notifications: [
        {
          id: '1',
          read: false,
          header: 'D8850C00003',
          details: 'Post-exposure Prophylaxis of COVID-19 in Adults',
          timestamp: '2021-04-29T00:00:00',
          protocolNumber: 'D8850C00003',
          aidocId: '45830060-0dcd-474f-a0e7-3974dd53b208',
        },
      ],
    });
  });
  test('setError Action', () => {
    expect(
      navbarSlice(initialState, {
        type: setError.type,
        payload: false,
      }),
    ).toEqual({
      ...initialState,
      error: false,
    });
  });
  test('getLoader Action', () => {
    expect(
      navbarSlice(initialState, {
        type: getLoader.type,
        payload: false,
      }),
    ).toEqual({
      ...initialState,
      loader: false,
    });
  });
  test('test for all slices', () => {
    navbar(initialState);
    navbarNotifications(initialState);
    navbarNotificationsError(initialState);
    loader(initialState);
  });

  test('getOptInOutData Action', () => {
    expect(
      navbarSlice(initialState, {
        type: getOptInOutData.type,
        payload: {
          id: '1',
          read: false,
          header: 'D8850C00003',
          details: 'Post-exposure Prophylaxis of COVID-19 in Adults',
          timestamp: '2021-04-29T00:00:00',
          protocolNumber: 'D8850C00003',
          aidocId: '45830060-0dcd-474f-a0e7-3974dd53b208',
        },
      }),
    ).toEqual({
      ...initialState,
      OptInOut: {
        id: '1',
        read: false,
        header: 'D8850C00003',
        details: 'Post-exposure Prophylaxis of COVID-19 in Adults',
        timestamp: '2021-04-29T00:00:00',
        protocolNumber: 'D8850C00003',
        aidocId: '45830060-0dcd-474f-a0e7-3974dd53b208',
      },
    });
  });

  test('deleteNotificationData Action', () => {
    const state = {
      navbar: {
        notifications: [
          {
            id: '1',
            read: false,
            header: 'D8850C00003',
            details: 'Post-exposure Prophylaxis of COVID-19 in Adults',
            timestamp: '2021-04-29T00:00:00',
            protocolNumber: 'D8850C00003',
            aidocId: '45830060-0dcd-474f-a0e7-3974dd53b208',
          },
        ],
        error: false,
        loader: false,
        OptInOut: {},
      },
    };
    expect(
      navbarSlice(state, {
        type: deleteNotificationData.type,
        payload: {
          id: '2',
          read: false,
          header: 'D8850C00003',
          details: 'Post-exposure Prophylaxis of COVID-19 in Adults',
          timestamp: '2021-04-29T00:00:00',
          protocolNumber: 'D8850C00003',
          aidocId: '45830060-0dcd-474f-a0e7-3974dd53b208',
        },
      }),
    ).toEqual({
      ...state,
      navbar: {
        notifications: [
          {
            id: '1',
            read: false,
            header: 'D8850C00003',
            details: 'Post-exposure Prophylaxis of COVID-19 in Adults',
            timestamp: '2021-04-29T00:00:00',
            protocolNumber: 'D8850C00003',
            aidocId: '45830060-0dcd-474f-a0e7-3974dd53b208',
          },
        ],
        error: false,
        loader: false,
        OptInOut: {},
      },
    });
  });
});
