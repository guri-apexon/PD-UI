import { runSaga } from "redux-saga";
import {
  usersFunction,
  deleteUser,
  updateUser,
  addNewUser,
  addNewRole,
  getRolesFunction,
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
