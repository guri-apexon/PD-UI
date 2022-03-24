import { put, call, select } from "redux-saga/effects";
import { getWrapperData } from "../slice";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import { cloneDeep } from "lodash";

function* getWrapperState() {
  const state = yield select();
  const wrapper = state.protocol.wrapperData;
  return wrapper;
}

export function* fetchProtocolViewData(action) {
  const { id, body, childString, keyIndex } = action.payload;
  const currentData = yield getWrapperState();
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
    yield put(getWrapperData(preLoadingState));

    // const URL = "/POC/particular.json";
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

    yield put(getWrapperData(finalState));
  } else {
    const preLoadingState = {
      loader: true,
      success: false,
      error: "",
      data: null,
      detail: null,
    };
    yield put(getWrapperData(preLoadingState));
    const URL = `${BASE_URL_8000}/api/segments/section_metadata_by_level?aidocid=${id}`;
    // const URL = "/POC/lev-1.json";
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
      yield put(getWrapperData(successState));
    }
  }
}
