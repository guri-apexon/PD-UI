import { runSaga } from "redux-saga";

import {
  qcProtocolsData,
  qcApprove,
  sendQc2Approval,
  qc2Reject,
  uploadQc,
} from "../saga";
import * as api from "../../../../utils/api";
import QC from "./QC_New_re.json";
const userDetail = {
  username: "Sohan111",
  userId: "u1021402",
  email: "test@iqvia.com",
  user_type: "QC2",
};
const file = new File(["(⌐□_□)"], "chucknorris.json", {
  type: "application/json",
});

const uploadData = {
  data: [file],
  id: 1111,
};
describe("Qc Saga Unit Test", () => {
  test("qcProtocolsData Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          protocolTitle: "astella",
          protocol: "11",
          projectId: "Proj1",
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

    await runSaga(fakeStore, qcProtocolsData, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("qcProtocolsData Success with empty object", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          protocolTitle: "",
          protocol: "",
          projectId: "",
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

    await runSaga(fakeStore, qcProtocolsData, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("qcProtocolsData Error From API", async () => {
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

    await runSaga(fakeStore, qcProtocolsData, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("qcProtocolsData API fails", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      err: {
        statusText: "Error",
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.reject(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail: userDetail,
        },
      }),
    };

    await runSaga(fakeStore, qcProtocolsData, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  //qcApprove
  test("qcApprove Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: true,
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

    await runSaga(fakeStore, qcApprove, {
      payload: 1222,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("qcApprove API sends Error", async () => {
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

    await runSaga(fakeStore, qcApprove, {
      payload: 1222,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("qcApprove API Fails", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      error: "Fail",
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.reject(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail: userDetail,
        },
      }),
    };

    await runSaga(fakeStore, qcApprove, {
      payload: 1222,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  // sendQc2Approval
  test("sendQc2Approval Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: true,
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

    await runSaga(fakeStore, sendQc2Approval, {
      payload: 1222,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("sendQc2Approval API sends Error", async () => {
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

    await runSaga(fakeStore, sendQc2Approval, {
      payload: 1222,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("sendQc2Approval API Fails", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      error: "Fail",
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.reject(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail: userDetail,
        },
      }),
    };

    await runSaga(fakeStore, sendQc2Approval, {
      payload: 1222,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  //qc2Reject
  test("qc2Reject Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: true,
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

    await runSaga(fakeStore, qc2Reject, {
      payload: 1222,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("qc2Reject API sends Error", async () => {
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

    await runSaga(fakeStore, qc2Reject, {
      payload: 1222,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("qc2Reject API Fails", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      error: "Fail",
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.reject(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        user: {
          userDetail: userDetail,
        },
      }),
    };

    await runSaga(fakeStore, qc2Reject, {
      payload: 1222,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  //uploadQc
  test("uploadQc Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: QC,
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

    await runSaga(fakeStore, uploadQc, {
      payload: uploadData,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("uploadQc API sends Error", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: QC,
    };
    console.log(QC.iqvdataSoa);
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

    await runSaga(fakeStore, uploadQc, {
      payload: uploadData,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
});
