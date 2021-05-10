import { runSaga } from "redux-saga";
import * as api from "../../../../utils/api";

import {
  parsedData,
  getSummaryData,
  fetchAssociateProtocol,
  getProtocolToc,
  getCompareResult,
  getSoaSections,
  getTocSections,
  captalize,
  getElement
} from "../saga";

const userDetail = {
  username: "test",
  userId: "u1021402",
  email: "test@iqvia.com",
};
describe("Protocol Saga Unit Test", () => {
  test("should run parsedData function", () => {
    let obj = {
      id: "1",
    };
    parsedData(JSON.stringify(JSON.stringify(obj)));
  });
  //getSoaSections Starts
  test("should run getSoaSections function", () => {
    let obj = [
      {
        TableIndex: "1",
        TableName: "TableName",
      },
    ];
    getSoaSections(obj);
  });

  //getSoaSections Ends
  //captalize Starts

  test("should run getSoaSections function", () => {
    let obj = "Table sections";
    captalize(obj);
  });

  //captalize Ends

  // getTocSections Starts

  test("should run getTocSections function", () => {
    let toc = {
      data: [
        
         [   "",
         "Unmapped",
         "text",
         "TITLE PAGE",
         { font_style: "" },
         { IsBold: false, font_size: -1, font_style: "Heading1" },
         "Unmapped",
         "TITLE PAGE",
         "  ",
         1]
        
      ],
    };
    getTocSections(toc);
  });
  test("should run getTocSections function", () => {
    let toc = {
      data: [
        
         [   "",
         "Unmapped",
         "text",
         "TITLE PAGE",
         { IsBold: false, font_size: -1, font_style: "Heading1" },
         "Heading1",
         "Unmapped1",
         "TITLE PAGE",
         "",
         1]
        
      ],
    };
    getTocSections(toc);
  });
  // getTocSections  Ends

  // getElement Starts

  // test("should run getElement function", () => {
  //   let style={
  //       font_style:'Heading1'
  //   }
  //   getElement(style);
  //   let style1={
  //       font_style:'p'
  //   }
  //   getElement(style1);
  // });

 // getElement Ends

  // getSummaryData Starts
  test("getSummaryData should be success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: {
        amendment: "N",
        approvalDate: null,
        compareStatus: null,
        completenessOfDigitization: null,
        digitizedConfidenceInterval: null,
        documentFilePath: "quintiles.net",
        documentStatus: "final",
        draftVersion: null,
        environment: "dev",
        errorCode: null,
        errorReason: null,
        fileName: "Protocol-2020-04-09-VER-000001.pdf",
        id: "51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc",
        indication: "Renal Impairment Compared with Matched Controls",
        iqvXmlPathComp: null,
        iqvXmlPathProc: null,
        isActive: true,
        isProcessing: false,
        lastUpdated: "2021-01-28T11:09:47.977000",
        moleculeDevice: "Lenabasum (JBT-101)",
        nctId: null,
        percentComplete: "100",
        phase: null,
        projectId: "Protocol-2020-04-09-VER-000001.pdf",
        protocol: "JBT101-RIS-001",
        protocolTitle: null,
        shortTitle: null,
        sourceSystem: "dev",
        sponsor: "Corbus Pharmaceuticals",
        status: "PROCESS_COMPLETED",
        studyStatus: "1",
        timeCreated: "2021-01-28T10:56:35.377000",
        uploadDate: "2021-01-28T10:56:35.377000",
        userCreated: null,
        userId: "1063396",
        userUpdated: null,
        versionNumber: "6",
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
    await runSaga(fakeStore, getSummaryData, {
      payload: "51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("getSummaryData should be Fails", async () => {
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
    await runSaga(fakeStore, getSummaryData, {
      payload: "51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  // getSummaryData Ends

  //fetchAssociateProtocol Starts
  test("fetchAssociateProtocol should be Success", async () => {
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
    await runSaga(fakeStore, fetchAssociateProtocol, {
      payload: "51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("fetchAssociateProtocol should be Fails", async () => {
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
    await runSaga(fakeStore, fetchAssociateProtocol, {
      payload: "51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  //fetchAssociateProtocol Ends

  //getProtocolToc Start

  test("getProtocolToc should be Success", async () => {
    const dispatchedActions = [];
    let obj = {
      id: "1",
    };
    const mockOutput = {
      success: true,
      data: {
        documentFilePath: "\\quintiles.net",
        fileName: "Protocol-2020-04-09-VER-000001.pdf",
        id: "51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc",
        iqvdata: null,
        iqvdataSoa: JSON.stringify(JSON.stringify(obj)),
        iqvdataSoaStd: null,
        iqvdataSummary: JSON.stringify(JSON.stringify(obj)),
        iqvdataToc: JSON.stringify(JSON.stringify(obj)),
        isActive: true,
        userId: "1111",
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
    await runSaga(fakeStore, getProtocolToc, {
      payload: "51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("getProtocolToc should be Fails", async () => {
    const dispatchedActions = [];
    let obj = {
      id: "1",
    };
    const mockOutput = {
      success: false,
      data: {},
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
    await runSaga(fakeStore, getProtocolToc, {
      payload: "51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("getProtocolToc should be Error out", async () => {
    const dispatchedActions = [];
    let obj = {
      id: "1",
    };
    const mockOutput = {
      success: false,
      data: {},
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
    await runSaga(fakeStore, getProtocolToc, {
      payload: "51c63c56-d3f0-4d8a-8a1c-c5bb39f802dc",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  //getProtocolToc Ends

  //getCompareResult Starts

  test("getCompareResult should be Success", async () => {
    const dispatchedActions = [];
    let obj = {
      id: "1",
    };
    const mockOutput = {
      success: true,
      data: {
        id: "1111",
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
    await runSaga(fakeStore, getCompareResult, {
      payload: {
        docID2: "1111",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("getCompareResult should be Fails", async () => {
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
    await runSaga(fakeStore, getCompareResult, {
      payload: {
        docID2: "1111",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("getCompareResult should be Error", async () => {
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
    await runSaga(fakeStore, getCompareResult, {
      payload: null,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });

  //getCompareResult Ends
});
