import { put, call, select } from "redux-saga/effects";
import { getPTData } from "../slice";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import { cloneDeep } from "lodash";

function* getPTState() {
  const state = yield select();
  const wrapper = state.protocol.ptData;
  return wrapper;
}

export function* fetchPTData(action) {
  const { id, body, childString, keyIndex, input, headerName } = action.payload;
  const currentData = yield getPTState();
  const cloneData = cloneDeep(currentData);
  console.log(childString, id, BASE_URL_8000);
  if (body) {
    let preObjState = cloneData.detail ? cloneData.detail : {};
    const preNewObj = {};
    preNewObj[keyIndex] = { data: null, loading: true, success: false };
    preObjState = Object.assign(preObjState, preNewObj);
    const preLoadingState = {
      loader: false,
      success: true,
      error: "",
      data: currentData.data,
      detail: preObjState,
    };
    yield put(getPTData(preLoadingState));

    // const URL = "/POC/particular.json";
    // let URL = "";

    // if (headerName) {
    //   URL = `${BASE_URL_8000}/api/segments/section_data_by_name?aidocid=${id}&preferred_term=${input}&with_data=true&header_name=${headerName}`;
    // } else {
    //   URL = `${BASE_URL_8000}/api/segments/section_data_by_name?aidocid=${id}&preferred_term=${input}&with_data=true`;
    // }
    const URL = `${BASE_URL_8000}/api/segments/section_data_by_secid?aidocid=${id}&section_id=${childString}`;
    const config = {
      url: URL,
      method: "GET",
    };
    const { data } = yield call(httpCall, config);

    let ObjState = cloneData.detail ? cloneData.detail : {};
    const NewObj = {};
    NewObj[keyIndex] = { data: data, loading: false, success: true };
    // ObjState = Object.assign(NewObj, ObjState);
    ObjState = { ...ObjState, ...NewObj };
    const finalState = {
      loader: false,
      success: true,
      error: "",
      data: currentData.data,
      detail: ObjState,
    };

    yield put(getPTData(finalState));
  } else {
    const preLoadingState = {
      loader: true,
      success: false,
      error: "",
      data: null,
      detail: null,
    };
    yield put(getPTData(preLoadingState));

    let URL = "";

    if (headerName) {
      URL = `${BASE_URL_8000}/api/segments/section_data_by_name?aidocid=${id}&preferred_term=${input}&header_name=${headerName}`;
    } else {
      URL = `${BASE_URL_8000}/api/segments/section_data_by_name?aidocid=${id}&preferred_term=${input}`;
    }

    // if (headerName && input) {
    //   URL = `${BASE_URL_8000}/api/segments/section_data_by_name?aidocid=${id}&preferred_term=${input}&header_name=${headerName}`;
    // } else if (headerName) {
    //   URL = `${BASE_URL_8000}/api/segments/section_data_by_name?aidocid=${id}`;
    // } else if (input) {
    //   URL = `${BASE_URL_8000}/api/segments/section_data_by_name?aidocid=${id}&preferred_term=${input}`;
    // }
    const config = {
      url: URL,
      method: "GET",
    };
    const { data, success } = yield call(httpCall, config);
    if (success) {
      const successState = {
        loader: false,
        success: true,
        error: "",
        data: data,
        detail: null,
      };
      yield put(getPTData(successState));
    } else {
      const errorState = {
        loader: false,
        success: false,
        error: "No Data Found",
        data: null,
        detail: null,
      };
      yield put(getPTData(errorState));
    }
  }
}
