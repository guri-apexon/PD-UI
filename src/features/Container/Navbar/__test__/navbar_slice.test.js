/* eslint-disable */
import navbarSlice, {
  getNotification,
  setError,
  getLoader,
  navbar,
  navbarNotifications,
  navbarNotificationsError,
  loader,
} from '../navbarSlice';

const initialState = {
  navbar: {
    notifications: [],
    error: false,
    loader: false,
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
});
