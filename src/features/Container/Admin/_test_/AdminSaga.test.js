import { runSaga } from "redux-saga";
import {
  usersFunction,
  deleteUser,
  updateUser,
  addNewUser,
  addNewRole,
  getRolesFunction,
  getProtocolMapData,
  deleteMapping,
  newMapping,
  getUserDetails,
  bulkUploadMapping,
} from "../saga";
import * as api from "../../../../utils/api";

describe("Admin Saga Unit Test", () => {
  test("usersFunction Saga Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          username: "u1072231",
          first_name: "Sohan",
          last_name: "Khatawkar",
          email: "sohan.khatawkar@iqvia.com",
          country: "India",
          date_of_registration: "2021-01-29T04:09:44.277000",
          user_type: "normal",
        },
        {
          username: "q1036048",
          first_name: "Abhay",
          last_name: "K",
          email: "abhay.kumar2@quintiles.com",
          country: "India",
          date_of_registration: "2021-01-29T06:40:31.823000",
          user_type: "QC2",
        },
      ],
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          users: [],
          roles: [],
          map: [],
        },
      }),
    };
    await runSaga(fakeStore, usersFunction, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("usersFunction Saga Failure", async () => {
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
        admin: {
          users: [],
        },
      }),
    };
    await runSaga(fakeStore, usersFunction, {
      payload: {},
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("deleteUser Saga Success", async () => {
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
        admin: {
          users: [
            {
              username: "u1072231",
              first_name: "Sohan",
              last_name: "Khatawkar",
              email: "sohan.khatawkar@iqvia.com",
              country: "India",
              date_of_registration: "2021-01-29T04:09:44.277000",
              user_type: "normal",
            },
            {
              username: "q1036048",
              first_name: "Abhay",
              last_name: "K",
              email: "abhay.kumar2@quintiles.com",
              country: "India",
              date_of_registration: "2021-01-29T06:40:31.823000",
              user_type: "QC2",
            },
          ],
          roles: [],
          map: [],
        },
      }),
    };
    await runSaga(fakeStore, deleteUser, {
      payload: "q1036048",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("deleteUser Saga failure", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: false,
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          users: [
            {
              username: "u1072231",
              first_name: "Sohan",
              last_name: "Khatawkar",
              email: "sohan.khatawkar@iqvia.com",
              country: "India",
              date_of_registration: "2021-01-29T04:09:44.277000",
              user_type: "normal",
            },
            {
              username: "q1036048",
              first_name: "Abhay",
              last_name: "K",
              email: "abhay.kumar2@quintiles.com",
              country: "India",
              date_of_registration: "2021-01-29T06:40:31.823000",
              user_type: "QC2",
            },
          ],
          roles: [],
          map: [],
        },
      }),
    };
    await runSaga(fakeStore, deleteUser, {
      payload: "q1036048",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("updateUser Saga Success", async () => {
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
        admin: {
          users: [
            {
              username: "u1072231",
              first_name: "Sohan",
              last_name: "Khatawkar",
              email: "sohan.khatawkar@iqvia.com",
              country: "India",
              date_of_registration: "2021-01-29T04:09:44.277000",
              user_type: "normal",
            },
            {
              username: "q1036048",
              first_name: "Abhay",
              last_name: "K",
              email: "abhay.kumar2@quintiles.com",
              country: "India",
              date_of_registration: "2021-01-29T06:40:31.823000",
              user_type: "QC2",
            },
          ],
          roles: [],
          map: [],
        },
      }),
    };
    await runSaga(fakeStore, updateUser, {
      payload: {
        username: "u1072231",
        country: "India",
        user_type: "admin",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("updateUser Saga Failure", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: false,
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          users: [
            {
              username: "u1072231",
              first_name: "Sohan",
              last_name: "Khatawkar",
              email: "sohan.khatawkar@iqvia.com",
              country: "India",
              date_of_registration: "2021-01-29T04:09:44.277000",
              user_type: "normal",
            },
            {
              username: "q1036048",
              first_name: "Abhay",
              last_name: "K",
              email: "abhay.kumar2@quintiles.com",
              country: "India",
              date_of_registration: "2021-01-29T06:40:31.823000",
              user_type: "QC2",
            },
          ],
          roles: [],
          map: [],
        },
      }),
    };
    await runSaga(fakeStore, updateUser, {
      payload: {
        username: "u1072231",
        country: "India",
        user_type: "admin",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("addNewUser Saga Success", async () => {
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
        admin: {
          users: [
            {
              username: "u1072231",
              first_name: "Sohan",
              last_name: "Khatawkar",
              email: "sohan.khatawkar@iqvia.com",
              country: "India",
              date_of_registration: "2021-01-29T04:09:44.277000",
              user_type: "normal",
            },
            {
              username: "q1036048",
              first_name: "Abhay",
              last_name: "K",
              email: "abhay.kumar2@quintiles.com",
              country: "India",
              date_of_registration: "2021-01-29T06:40:31.823000",
              user_type: "QC2",
            },
          ],
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, addNewUser, {
      payload: {
        userId: "u107223",
        firstName: "dad",
        lastName: "In",
        email: "s@iqvia.com",
        country: "India",
        userRole: "normal",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("updateUser Saga Failure", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: {
        err: {
          data: {
            detail: "User alredy exists in DB",
          },
        },
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          users: [
            {
              username: "u1072231",
              first_name: "Sohan",
              last_name: "Khatawkar",
              email: "sohan.khatawkar@iqvia.com",
              country: "India",
              date_of_registration: "2021-01-29T04:09:44.277000",
              user_type: "normal",
            },
            {
              username: "q1036048",
              first_name: "Abhay",
              last_name: "K",
              email: "abhay.kumar2@quintiles.com",
              country: "India",
              date_of_registration: "2021-01-29T06:40:31.823000",
              user_type: "QC2",
            },
          ],
          roles: [],
          map: [],
        },
      }),
    };
    await runSaga(fakeStore, addNewUser, {
      payload: {
        userId: "u107223",
        firstName: "dad",
        lastName: "In",
        email: "s@iqvia.com",
        country: "India",
        userRole: "normal",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("updateUser Saga Failure", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      err: {
        data: {
          detail: "User alredy exists in DB",
        },
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          users: [
            {
              username: "u1072231",
              first_name: "Sohan",
              last_name: "Khatawkar",
              email: "sohan.khatawkar@iqvia.com",
              country: "India",
              date_of_registration: "2021-01-29T04:09:44.277000",
              user_type: "normal",
            },
            {
              username: "q1036048",
              first_name: "Abhay",
              last_name: "K",
              email: "abhay.kumar2@quintiles.com",
              country: "India",
              date_of_registration: "2021-01-29T06:40:31.823000",
              user_type: "QC2",
            },
          ],
          roles: [],
          map: [],
        },
      }),
    };
    await runSaga(fakeStore, addNewUser, {
      payload: {
        userId: "u107223",
        firstName: "dad",
        lastName: "In",
        email: "s@iqvia.com",
        country: "India",
        userRole: "normal",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("addNewRole Saga Success", async () => {
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
        admin: {
          roles: [
            {
              roleName: "QC2",
              roleDescription:
                "Have access to Dashboard, Protocols, Search and QC Process",
            },
          ],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, addNewRole, {
      payload: {
        roleName: "QC1",
        roleDescription: "Have access to QC Process",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("addNewRole Saga Failure", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      err: {
        data: {
          detail:
            "Role Details Already Exist With The Given Above Role Name Along With Some Description",
        },
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [
            {
              roleName: "QC2",
              roleDescription:
                "Have access to Dashboard, Protocols, Search and QC Process",
            },
          ],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, addNewRole, {
      payload: {
        roleName: "QC2",
        roleDescription: "Have access to QC Process",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("addNewRole Saga Failure", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: {
        data: {
          detail:
            "Role Details Already Exist With The Given Above Role Name Along With Some Description",
        },
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [
            {
              roleName: "QC2",
              roleDescription:
                "Have access to Dashboard, Protocols, Search and QC Process",
            },
          ],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, addNewRole, {
      payload: {
        roleName: "QC2",
        roleDescription: "Have access to QC Process",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("getRolesFunction Saga Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          roleName: "QC1",
          roleDescription: "Have access to QC Process",
        },
      ],
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, getRolesFunction, {
      payload: "",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("getRolesFunction Saga Failure", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: {
        roleName: "QC1",
        roleDescription: "Have access to QC Process",
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, getRolesFunction, {
      payload: "",
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
});

describe("Protocol Mapping Test Cases", () => {
  test("getProtocolMapData Saga Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          follow: false,
          isActive: true,
          lastUpdated: "2021-01-28T05:31:26.877000",
          protocol: "Protocol-1AA",
          timeCreated: "2021-01-28T05:31:26.877000",
          userId: "1072231",
          userRole: "primary",
        },
        {
          follow: true,
          isActive: true,
          lastUpdated: "2021-08-03T13:18:15.420000",
          protocol: "Test Summary",
          timeCreated: "2021-04-14T08:03:34.260000",
          userId: "1072231",
          userRole: "primary",
        },
      ],
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, getProtocolMapData, {
      payload: { userId: "u1072231" },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("getProtocolMapData Saga Failure show detail message", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      err: {
        data: {
          detail: "No record found for the given userId or Protocol",
        },
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, getProtocolMapData, {
      payload: { userId: "u1072" },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("getProtocolMapData Saga Failure show Error Message", async () => {
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
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, getProtocolMapData, {
      payload: { userId: "u1072" },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("deleteMapping Saga Success", async () => {
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
        admin: {
          roles: [],
          map: [
            {
              follow: false,
              isActive: true,
              lastUpdated: "2021-01-28T05:31:26.877000",
              protocol: "Protocol-1AA",
              timeCreated: "2021-01-28T05:31:26.877000",
              userId: "1072231",
              userRole: "primary",
            },
            {
              follow: true,
              isActive: true,
              lastUpdated: "2021-08-03T13:18:15.420000",
              protocol: "Test Summary",
              timeCreated: "2021-04-14T08:03:34.260000",
              userId: "1072231",
              userRole: "primary",
            },
          ],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, deleteMapping, {
      payload: { userId: "u1072231", protocol: "Test Summary" },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("deleteMapping Saga Failure show detail message", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: {
        err: {
          data: {
            detail: "No record found for the given userId or Protocol",
          },
        },
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, deleteMapping, {
      payload: { userId: "u1072" },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("deleteMapping Saga Failure show Error Message", async () => {
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
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, deleteMapping, {
      payload: { userId: "u1072" },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("newMapping Saga Success", async () => {
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
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, newMapping, {
      payload: {
        following: false,
        projectId: null,
        protocol: "Protocol-1AA",
        userId: "u1072231",
        role: "Primary",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("newMapping Saga Failure show detail message", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      err: {
        data: {
          detail: "Already exist",
        },
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, newMapping, {
      payload: {
        following: false,
        projectId: null,
        protocol: "Protocol-1AA",
        userId: "u1072231",
        role: "Primary",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("newMapping Saga Failure show Error Message", async () => {
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
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, newMapping, {
      payload: { userId: "u1072" },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(0);
  });

  test("getUserDetails Saga Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: {
        userId: "u1072231",
        first_name: "Sohan",
        last_name: "Khatawkar",
        email: "sohan.khatawkar@iqvia.com",
        country: "India",
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, getUserDetails, {
      payload: {
        userId: "u1072231",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("getUserDetails Saga Failure Detail Message", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      err: {
        data: {
          detail: "Already exist",
        },
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, getUserDetails, {
      payload: {
        userId: "u10722",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("getUserDetails Saga Failure Detail Message", async () => {
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
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, getUserDetails, {
      payload: {
        userId: "u1072323434",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("getUserDetails Saga Success", async () => {
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: [
        {
          userId: "u1072231",
          first_name: "Sohan",
          last_name: "Khatawkar",
          email: "sohan.khatawkar@iqvia.com",
          country: "India",
        },
      ],
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, getUserDetails, {
      payload: {
        userId: "u1072231",
      },
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("bulkUploadMapping Saga Success", async () => {
    const file = new File(["(⌐□_□)"], "Bulk_Map2.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const dispatchedActions = [];
    const mockOutput = {
      success: true,
      data: ["Test data 1", "Test data 2", "Test data 3"],
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, bulkUploadMapping, {
      payload: file,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("bulkUploadMapping Saga Failure", async () => {
    const file = new File(["(⌐□_□)"], "hello.png", {
      type: "image/png",
    });
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      err: {
        data: {
          detail: "Invaid file",
        },
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, bulkUploadMapping, {
      payload: file,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("bulkUploadMapping Saga Failure", async () => {
    const file = new File(["(⌐□_□)"], "hello.png", {
      type: "image/png",
    });
    const dispatchedActions = [];
    const mockOutput = {
      success: false,
      data: {
        err: {
          data: {
            detail: ["Invaid file"],
          },
        },
      },
    };
    const mockCallApi = jest
      .spyOn(api, "httpCall")
      .mockImplementation(() => Promise.resolve(mockOutput));
    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        admin: {
          roles: [],
          map: [],
          loader: false,
        },
      }),
    };
    await runSaga(fakeStore, bulkUploadMapping, {
      payload: file,
      type: "",
    }).toPromise();
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
});
