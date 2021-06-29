import { runSaga } from "redux-saga";
import * as api from "../../../../utils/api";

import { navbarNotificationData } from "../saga";
const userDetail = {
  userId: "u1072231",
  username: "Subhadatta",
  email: "subhadatta@iqvia.com",
  user_type: "QC2",
};
describe("Navbar Saga Unit Test", () => {
  test("Should run give success data: navbarNotificationData", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      data: [
        {
          id: "1",
          read: false,
          header: "D8850C00003",
          details: "Post-exposure Prophylaxis of COVID-19 in Adults",
          timestamp: "2021-04-29T00:00:00",
          protocolNumber: "D8850C00003",
          aidocId: "45830060-0dcd-474f-a0e7-3974dd53b208",
        },
      ],
      success: true,
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
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
      payload: "51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
    // navbarNotificationData(data);
  });
  test("Should give Failure data: navbarNoticationdata", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: null,
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail: userDetail,
        },
      }),
    };
    await runSaga(fakeStore, navbarNotificationData, {
      payload: "51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
});
