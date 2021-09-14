import { runSaga } from "redux-saga";
import { usersFunction } from "../saga";
import * as api from "../../../../utils/api";

describe("Admin Saga Unit Test", () => {
  //   const userData = [
  //     {
  //       username: "u1072231",
  //       first_name: "Sohan",
  //       last_name: "Khatawkar",
  //       email: "sohan.khatawkar@iqvia.com",
  //       country: "India",
  //       date_of_registration: "2021-01-29T04:09:44.277000",
  //       user_type: "normal",
  //     },
  //     {
  //       username: "q1036048",
  //       first_name: "Abhay",
  //       last_name: "K",
  //       email: "abhay.kumar2@quintiles.com",
  //       country: "India",
  //       date_of_registration: "2021-01-29T06:40:31.823000",
  //       user_type: "QC2",
  //     },
  //   ];
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
});
