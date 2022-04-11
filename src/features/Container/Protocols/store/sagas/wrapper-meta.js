import { put, call, select } from "redux-saga/effects";
import { getWrapperDataMeta, setDOCID } from "../slice";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import { cloneDeep } from "lodash";

function* getWrapperState() {
  const state = yield select();
  const wrapper = state.protocol.wrapperDataMeta;
  return wrapper;
}
function* getDOCIDState() {
  const state = yield select();
  const id = state.protocol.docID;
  return id;
}
export function* handleExpandBPO1(action) {
  const { sectionName } = action.payload;
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);
  cloneData.data[sectionName].expanded = !cloneData.data[sectionName].expanded;
  yield put(getWrapperDataMeta(cloneData));
}
export function* fetchProtocolViewData1(action) {
  const { id, body, childString, sectionName } = action.payload;
  console.log(childString, id, BASE_URL_8000);
  const docID = yield getDOCIDState();

  if (body) {
    console.log("Section Name: ", sectionName);
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
    yield put(getWrapperDataMeta(preLoadingState));
    if (sectionName === "Objectives and Endpoints") {
      let url = `${BASE_URL_8000}/api/segments/get_objectives_endpoints?aidocid=${id}&objectives=All%20objectives&endpoints=All%20endpoints`;

      const config = {
        url: url,
        method: "GET",
      };
      const { data, success } = yield call(httpCall, config);

      if (success) {
        const currentData1 = yield getWrapperState();
        let cloneData1 = cloneDeep(currentData1);
        const obj1 = {
          loading: false,
          success: true,
          error: "",
          detail: data[id],
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
        yield put(getWrapperDataMeta(preLoadingState));
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
        yield put(getWrapperDataMeta(preLoadingState));
      }
    } else if (sectionName === "Study") {
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
        yield put(getWrapperDataMeta(preLoadingState));
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
        yield put(getWrapperDataMeta(preLoadingState));
      }
    } else {
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
        yield put(getWrapperDataMeta(preLoadingState));
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
        yield put(getWrapperDataMeta(preLoadingState));
      }
    }
  } else {
    if (id === docID) {
      const currentData = yield getWrapperState();
      yield put(getWrapperDataMeta(currentData));
    } else {
      const preLoadingState = {
        loader: true,
        success: false,
        error: "",
        data: null,
        detail: null,
      };
      yield put(getWrapperDataMeta(preLoadingState));
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
        yield put(getWrapperDataMeta(successState));
        yield put(setDOCID(id));
      } else {
        const errorState = {
          loader: false,
          success: false,
          error: "NO DATA FOUND",
          data: null,
        };
        yield put(getWrapperDataMeta(errorState));
      }
    }
  }
}
