import React from "react";
import { runSaga } from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import { recentSearchAsyn, addProtocolSponsor } from "../saga";

import * as api from "../../../../utils/api";
const userDetail = {
  username: "Sohan111",
  userId: "u1021402",
  email: "test@iqvia.com",
};
describe("Dashboard Saga Unit Test", () => {
    // recentSearchAsyn Test Cases Start
  test("recentSearchAsyn Saga Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          keyword: "Acute",
          lastUpdated: "2021-01-05T12:55:39.507000",
          sponsorId: 2,
          timeCreated: "2021-01-05T12:55:39.507000",
          userId: "1021402",
        },
      ],
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
    await runSaga(fakeStore, recentSearchAsyn, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("Recent Search Asyn else logic", async () => {
    const dispatchedActions = [];
    // const mockOutput = {
    //   message: "Successful",
    // };
    const mockOutput = {
      success: false,
      err: {
        statusText: "Error",
      },
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
    await runSaga(fakeStore, recentSearchAsyn, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("Recent Search Asyn fails", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      message: "Successful",
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
    await runSaga(fakeStore, recentSearchAsyn, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
   
  // AddProtocol Test Cases Start
   test("addProtocolSponsor Saga Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          sponsor:"astella",
          id:1
        },
      ],
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
    await runSaga(fakeStore, addProtocolSponsor, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });


  test("addProtocolSponsor Saga error", async () => {
    const dispatchedActions = [];
    const mockOutput = {
        success: false,
        err: {
          statusText: "Error",
        },
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
    await runSaga(fakeStore, addProtocolSponsor, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });

  test("addProtocolSponsor Saga fails", async () => {
    const dispatchedActions = [];
    const mockOutput = {
        message:"API fails"
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
    await runSaga(fakeStore, addProtocolSponsor, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });

  // AddProtocol Test Cases End

});

// http://ca2spdml03c:9001/pd/api/v1/documents/?sourceFileName=P
// http://ca2spdml01q:9001/pd/api/v1/documents/?sourceFileName=Pr
