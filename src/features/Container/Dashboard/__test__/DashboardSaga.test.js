import React from "react";
import { runSaga } from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import {
  recentSearchAsyn,
  addProtocolSponsor,
  postAddProtocol,
  protocolAsyn,
  resetErrorAddProtocol,
  toggleAddProtocol,
  saveRecentSearch,
  compareSelectedAsyn,
  savedSearchAsyn
} from "../saga";

import * as api from "../../../../utils/api";
const userDetail = {
  username: "Sohan111",
  userId: "u1021402",
  email: "test@iqvia.com",
};
const file = new File(["(⌐□_□)"], "chucknorris.doc", {
  type: "application/msword",
});
const addProtocolData = {
  uploadFile: [file],
  fileName: "file",
  protocol_version: "1",
  protocol_number: "11",
  sponsor: "Sp",
  documentStatus: "final",
  amendmentNumber: "Y",
  projectID: "11",
  indication: "ind",
  moleculeDevice: "Mol",
  userId: "1222",
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
          sponsor: "astella",
          id: 1,
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
      message: "API fails",
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

  // Post AddProtocol Test Cases Starts

  test("addProtocolSponsor Saga Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          sponsor: "astella",
          id: 1,
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

    await runSaga(fakeStore, postAddProtocol, {
      payload: addProtocolData,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("addProtocolSponsor Saga success with no duplicate", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
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
    await runSaga(fakeStore, postAddProtocol, {
      payload: addProtocolData,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });

  test("addProtocolSponsor Saga fails", async () => {
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
    await runSaga(fakeStore, postAddProtocol, {
      payload: addProtocolData,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(2);
  });

  test("addProtocolSponsor Saga error in catch section", async () => {
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
    await runSaga(fakeStore, postAddProtocol, {
      payload: addProtocolData,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("addProtocolSponsor Saga Duplicate Exist Test", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: {
        Duplicate: "Duplicate",
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
    await runSaga(fakeStore, postAddProtocol, {
      payload: addProtocolData,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  // Test protocolAsyn function starts
  test("protocolAsyn Saga Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          protocolTitle: "astella",
          protocol: "11",
          projectID: "Proj1",
          sponsor: "Astellla",
          uploadDate: "20201202",
          id: 1,
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

    await runSaga(fakeStore, protocolAsyn, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("protocolAsyn Saga Success with empty values", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          protocolTitle: "",
          protocol: "",
          projectID: "",
          sponsor: "",
          uploadDate: "",
          id: 1,
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
    await runSaga(fakeStore, protocolAsyn, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("protocolAsyn Saga fails", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [
        {
          protocolTitle: "astella",
          protocol: "11",
          projectID: "Proj1",
          sponsor: "Astellla",
          uploadDate: "20201202",
          id: 1,
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

    await runSaga(fakeStore, protocolAsyn, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("protocolAsyn Saga Error out", async () => {
    const dispatchedActions = [];
    const mockOutput = {
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

    await runSaga(fakeStore, protocolAsyn, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  // Test protocolAsyn function Ends

  // Test toggleAddProtocol function Start
  test("toggleAddProtocol Success", async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail: userDetail,
        },
      }),
    };
    await runSaga(fakeStore, toggleAddProtocol, {
      data: {
        payload: "test",
      },
      type: "",
    });
  });
  // Test toggleAddProtocol function Ends
  // Test resetErrorAddProtocol function Start
  test("toggleAddProtocol Success", async () => {
    const dispatchedActions = [];
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail: userDetail,
        },
      }),
    };
    await runSaga(fakeStore, resetErrorAddProtocol, {
      data: {
        payload: "test",
      },
      type: "",
    });
  });
  // Test resetErrorAddProtocol function Ends

  // Test saveRecentSearch function Starts

  test("saveRecentSearch Saga Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
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

    await runSaga(fakeStore, saveRecentSearch, {
      payload: "Keyword",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });


  test("saveRecentSearch Saga Error Catch", async () => {
    const dispatchedActions = [];
    const mockOutput = {
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

    await runSaga(fakeStore, saveRecentSearch, {
      payload: "Keyword",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  // Test saveRecentSearch function Ends

  // Test savedSearchAsyn function Start

  test("savedSearchAsyn Saga Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [],
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

    await runSaga(fakeStore, savedSearchAsyn, {
      payload: "Keyword",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("savedSearchAsyn Saga fails", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: [],
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

    await runSaga(fakeStore, savedSearchAsyn, {
      payload: "Keyword",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("saveRecentSearch Saga Error out", async () => {
    const dispatchedActions = [];
    const mockOutput = {
     err:{
       statusText:'Errr'
     }
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

    await runSaga(fakeStore, savedSearchAsyn, {
      payload: "Keyword",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
    // Test savedSearchAsyn function Ends

      // Test compareSelectedAsyn function Start
      test("compareSelectedAsyn Success", async () => {
        const dispatchedActions = [];
        const fakeStore = {
          dispatch: (action) => dispatchedActions.push(action),
          getState: () => ({
            user: {
              userDetail: userDetail,
            },
          }),
        };
        await runSaga(fakeStore, compareSelectedAsyn, {
          data: {
            payload: 2,
          },
          type: "",
        });
      });
      test("compareSelectedAsyn Success", async () => {
        const dispatchedActions = [];
        const fakeStore = {
          dispatch: (action) => dispatchedActions.push(action),
          getState: () => ({
            user: {
              userDetail: userDetail,
            },
          }),
        };
        await runSaga(fakeStore, compareSelectedAsyn, {
          data: {
            payload: 1,
          },
          type: "",
        });
      });
       // Test compareSelectedAsyn function Ends
});
