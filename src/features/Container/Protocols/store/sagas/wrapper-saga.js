import { put, call, select } from "redux-saga/effects";
import { getWrapperData, setDOCID } from "../slice";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import { cloneDeep } from "lodash";

function* getWrapperState() {
  const state = yield select();
  const wrapper = state.protocol.wrapperData;
  return wrapper;
}
function* getDOCIDState() {
  const state = yield select();
  const id = state.protocol.docID;
  return id;
}
export function* handleExpandBPO(action) {
  const { sectionName } = action.payload;
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);
  cloneData.data[sectionName].expanded = !cloneData.data[sectionName].expanded;
  yield put(getWrapperData(cloneData));
}
export function* fetchProtocolViewData(action) {
  const { id, body, childString, sectionName } = action.payload;
  console.log(childString, id, BASE_URL_8000);
  const docID = yield getDOCIDState();
  if (body) {
    const currentData = yield getWrapperState();
    let cloneData = cloneDeep(currentData);
    const obj = {
      loading: true,
      success: false,
      error: "",
      detail: null,
      expanded: true,
      header: cloneData.data[sectionName].header,
    };
    cloneData.data[sectionName] = obj;
    const preLoadingState = {
      loader: false,
      success: true,
      error: "",
      data: cloneData.data,
    };
    yield put(getWrapperData(preLoadingState));

    // const URL = "/POC/particular.json";
    const URL = `${BASE_URL_8000}/api/segments/section_data_by_secid?aidocid=${id}&section_id=${childString}`;
    const config = {
      url: URL,
      method: "GET",
    };
    const { data, success } = yield call(httpCall, config);

    if (success) {
      const currentData1 = yield getWrapperState();
      let cloneData1 = cloneDeep(currentData1);
      data.shift();
      const obj1 = {
        loading: false,
        success: true,
        error: "",
        detail: data,
        expanded: true,
        header: cloneData1.data[sectionName].header,
      };
      cloneData1.data[sectionName] = obj1;
      const preLoadingState = {
        loader: false,
        success: true,
        error: "",
        data: cloneData1.data,
      };
      yield put(getWrapperData(preLoadingState));
    } else {
      const currentData2 = yield getWrapperState();
      let cloneData2 = cloneDeep(currentData2);
      const obj2 = {
        loading: false,
        success: true,
        error: "",
        detail: null,
        expanded: true,
        header: cloneData2.data[sectionName].header,
      };
      cloneData2.data[sectionName] = obj2;
      const preLoadingState = {
        loader: false,
        success: true,
        error: "",
        data: cloneData2.data,
      };
      yield put(getWrapperData(preLoadingState));
    }
  } else {
    if (id === docID) {
      const currentData = yield getWrapperState();
      yield put(getWrapperData(currentData));
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
        let dataFormat = {};
        for (let i = 0; i < data.length; i++) {
          dataFormat[data[i].source_file_section] = {
            header: data[i],
            detail: null,
            loading: false,
            success: false,
            expanded: false,
          };
        }
        const successState = {
          loader: false,
          success: true,
          error: "",
          data: dataFormat,
        };
        yield put(getWrapperData(successState));
        yield put(setDOCID(id));
      }
    }
  }
}
