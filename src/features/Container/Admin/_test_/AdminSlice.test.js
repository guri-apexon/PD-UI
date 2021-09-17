import adminSlice, { getUsers, getRoles, getProtocolMap } from "../adminSlice";

const initialState = {
  users: [],
  roles: [],
  map: [],
};

const userData = [
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
];

describe(" adminSlice Test Suite", () => {
  test("getUsers", () => {
    expect(
      adminSlice(initialState, {
        type: getUsers.type,
        payload: userData,
      })
    ).toEqual({ ...initialState, users: userData });
  });

  test("getRoles", () => {
    expect(
      adminSlice(initialState, {
        type: getRoles.type,
        payload: [],
      })
    ).toEqual({ ...initialState, users: [] });
  });
  test("getProtocolMap", () => {
    expect(
      adminSlice(initialState, {
        type: getProtocolMap.type,
        payload: [],
      })
    ).toEqual({ ...initialState, users: [] });
  });
});
