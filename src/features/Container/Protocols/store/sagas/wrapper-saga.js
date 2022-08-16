import { put, call, select } from "redux-saga/effects";
import {
  getWrapperData,
  setDOCID,
  getSegmentUpdated,
  getSegmentInserted,
  setPageNumber,
} from "../slice";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import { cloneDeep, isEmpty } from "lodash";
import {
  createImageField,
  createTableField,
  createHeaderField,
  // createTableField,
  createTextField,
  getPageWiseSection,
} from "./utils";
import { toast } from "react-toastify";
import { ActionTypes } from "../ActionTypes";
import { generateHeaderID } from "../../Tabs/NewProtocolView/utils";

function* getWrapperState() {
  const state = yield select();
  const wrapper = state.protocol.wrapperData;
  return wrapper;
}
function* getSegmentUpdatedState() {
  const state = yield select();
  const segment = state.protocol.segmentUpdated;
  return segment;
}
function* getSegmentInsertedState() {
  const state = yield select();
  const segment = state.protocol.segmentInserted;
  return segment;
}
// function* getDOCIDState() {
//   const state = yield select();
//   const id = state.protocol.docID;
//   return id;
// }
export function* handleExpandBPO(action) {
  const { sectionName, value } = action.payload;
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);
  cloneData.data[sectionName].expanded =
    value || !cloneData.data[sectionName].expanded;
  yield put(getWrapperData(cloneData));
}
export function* fetchProtocolViewData(action) {
  const { aidoc_id, body, link_level, link_id, protocol, sectionName } =
    action.payload;

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
      position: cloneData.data[sectionName].position,
    };
    cloneData.data[sectionName] = obj;
    const preLoadingState = {
      loader: false,
      success: true,
      error: "",
      data: cloneData.data,
    };
    yield put(getWrapperData(preLoadingState));
    const URL = `${BASE_URL_8000}/api/cpt_data/get_section_data?aidoc_id=${aidoc_id}&link_level=${link_level}&link_id=${link_id}&userId=1072234&protocol=${protocol}&user=normal`;
    // const URL = `http://ca2spdml01q:8000/api/cpt_data/get_section_data?aidoc_id=${aidoc_id}&link_level=${link_level}&link_id=${link_id}&userId=1072234&protocol=${protocol}&user=normal`;
    // const URL = `${BASE_URL_8000}/api/segments/section_data_by_secid?aidocid=${id}&section_id=${childString}`;
    const config = {
      url: URL,
      method: "GET",
    };
    const { data, success } = yield call(httpCall, config);

    if (success && !isEmpty(data)) {
      const currentData1 = yield getWrapperState();
      let cloneData1 = cloneDeep(currentData1);
      // data.shift();
      const obj1 = {
        loading: false,
        success: true,
        error: "",
        detail: data,
        expanded: true,
        header: cloneData1.data[sectionName].header,
        position: cloneData.data[sectionName].position,
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
        error: "NO Data",
        detail: [],
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
    // if (id === docID) {
    //   const currentData = yield getWrapperState();
    //   yield put(getWrapperData(currentData));
    // } else {
    const preLoadingState = {
      loader: true,
      success: false,
      error: "",
      data: null,
      detail: null,
    };
    yield put(getWrapperData(preLoadingState));
    const URL = `${BASE_URL_8000}/api/cpt_data/?aidoc_id=${aidoc_id}&link_level=1`;
    // const URL = `http://ca2spdml01q:8000/api/cpt_data/?aidoc_id=${aidoc_id}&link_level=1`;
    // const URL = `${BASE_URL_8000}/api/segments/section_metadata_by_level?aidocid=${id}`;
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
          position: i,
        };
      }
      const successState = {
        loader: false,
        success: true,
        error: "",
        data: dataFormat,
      };
      yield put(getWrapperData(successState));
      yield put(setDOCID(aidoc_id));
    } else {
      const errorState = {
        loader: false,
        success: false,
        error: "NO DATA FOUND",
        data: null,
      };
      yield put(getWrapperData(errorState));
    }
    // }
  }
}
const objectToArray = (obj) => {
  if (!isEmpty(obj)) {
    const arr = Object.keys(obj).map((key) => obj[key]);
    return arr;
  }
};
export function* UpdateAPI(action) {
  const { id } = action.payload;
  const currentUpdatedSegment = yield getSegmentUpdatedState();
  const currentInsertedSegment = yield getSegmentInsertedState();

  if (!isEmpty(currentUpdatedSegment)) {
    const updatedArr = objectToArray(currentUpdatedSegment);
    const URLUpdate = `${BASE_URL_8000}/api/segments/modify_segments?aidocid_in=${id}&userid_in=1072234`;
    const configUpdate = {
      url: URLUpdate,
      method: "PUT",
      data: updatedArr,
    };
    const { data, success } = yield call(httpCall, configUpdate);
    if (success) {
      console.log("data", data);
      yield put({
        type: ActionTypes.GET_PROTOCOL_VIEW_NEW,
        payload: { id: id, body: false },
      });
      yield put(getSegmentUpdated({}));
      toast.success("Content Updated Successfully");
    } else {
      toast.error("Content Updation Not Saved.");
    }
  }
  if (!isEmpty(currentInsertedSegment)) {
    const insertedArr = objectToArray(currentInsertedSegment);
    const URLInsert = `${BASE_URL_8000}/api/segments/add_segments?aidocid_in=${id}&userid_in=1072234`;
    const configInsert = {
      url: URLInsert,
      method: "PUT",
      data: insertedArr,
    };
    const { data, success } = yield call(httpCall, configInsert);
    if (success) {
      console.log("data", data);
      yield put({
        type: ActionTypes.GET_PROTOCOL_VIEW_NEW,
        payload: { id: id, body: false },
      });
      yield put(getSegmentInserted({}));
      toast.success("Content Inserted Successfully");
    } else {
      toast.error("Content Insertion Not Saved.");
    }
  }
  if (isEmpty(currentUpdatedSegment) && isEmpty(currentInsertedSegment)) {
    toast.info("Nothing to update.");
  }
}

export function* updateDataStream(action) {
  const { derivedSectionType, lineId, sectionName, isSectionHeader } =
    action.payload;
  console.log("Action Payload", action.payload);
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);
  if (isSectionHeader) {
    let arrToUpdate = cloneData.data[sectionName].detail;
    for (let i = 0; i < arrToUpdate.length; i++) {
      if (arrToUpdate[i].sec_id === lineId) {
        // eslint-disable-next-line no-debugger
        debugger;
        const prevLineId = parseFloat(arrToUpdate[i + 1].line_id) - 1;
        const nextLineId = parseFloat(arrToUpdate[i + 1].line_id);
        let newLineID = (prevLineId + nextLineId) / 2;
        let obj = {};
        if (derivedSectionType === "text") {
          obj = createTextField(newLineID, arrToUpdate[i + 1]);
        } else if (derivedSectionType === "table") {
          obj = createTableField(newLineID, arrToUpdate[i], 3, 3);
        } else if (derivedSectionType === "image") {
          obj = createImageField(newLineID, arrToUpdate[i]);
        }
        // const obj = createTextField(newLineID, arrToUpdate[i + 1]);
        arrToUpdate.splice(i + 1, 0, obj);
        arrToUpdate[i] = { ...arrToUpdate[i], hover: false };
        break;
      }
    }
  } else {
    let arrToUpdate = cloneData.data[sectionName].detail;
    for (let i = 0; i < arrToUpdate.length; i++) {
      if (arrToUpdate[i].line_id === lineId) {
        if (derivedSectionType === "text") {
          let newLineID;
          if (i === arrToUpdate.length - 1) {
            newLineID = parseFloat(arrToUpdate[i].line_id) + 0.1;
          } else {
            newLineID =
              (parseFloat(arrToUpdate[i].line_id) +
                parseFloat(arrToUpdate[i + 1].line_id)) /
              2;
          }
          const obj = createTextField(newLineID, arrToUpdate[i]);
          arrToUpdate.splice(i + 1, 0, obj);
          arrToUpdate[i] = { ...arrToUpdate[i], hover: false };
          break;
          // } else if (derivedSectionType === "header") {
          // let newLineID = parseFloat(lineId) + 0.1;
          // const obj = createHeaderField(newLineID, arrToUpdate[i]);
          // arrToUpdate.splice(i + 1, 0, obj);
          // break;
          // } else if (derivedSectionType === "table") {
          //   let newLineID = parseFloat(lineId) + 0.1;
          //   const obj = createTableField(newLineID, arrToUpdate[i]);
          //   arrToUpdate.splice(i + 1, 0, obj);
          //   break;
        } else if (derivedSectionType === "header") {
          let newLineID = parseFloat(lineId) + 0.1;
          const obj = createHeaderField(newLineID, arrToUpdate[i]);
          arrToUpdate.splice(i + 1, 0, obj);
          break;
        } else if (derivedSectionType === "table") {
          let newLineID = parseFloat(lineId) + 0.1;
          const obj = createTableField(newLineID, arrToUpdate[i], 3, 3);
          arrToUpdate.splice(i + 1, 0, obj);
          break;
        } else if (derivedSectionType === "image") {
          let newLineID = parseFloat(lineId) + 0.1;
          const obj = createImageField(newLineID, arrToUpdate[i], 3, 3);
          arrToUpdate.splice(i + 1, 0, obj);
          break;
        }
      }
    }
  }

  yield put(getWrapperData(cloneData));
}

export function* updateDataEdit(action) {
  const { content, lineId, sectionName } = action.payload;
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);
  const currentUpdatedSegment = yield getSegmentUpdatedState();
  let cloneUpdatedSegment = cloneDeep(currentUpdatedSegment);

  const currentInsertedSegment = yield getSegmentInsertedState();
  let cloneInsertedSegment = cloneDeep(currentInsertedSegment);

  let arrToUpdate = cloneData.data[sectionName].detail;
  for (let i = 0; i < arrToUpdate.length; i++) {
    if (arrToUpdate[i].line_id === lineId) {
      if (content) {
        arrToUpdate[i].content = content;
      } else {
        arrToUpdate[i].content = "";
      }

      if (arrToUpdate[i].qc_change_type === "add") {
        if (i === arrToUpdate.length - 1) {
          cloneInsertedSegment[lineId] = {
            prev_line_id: arrToUpdate[i - 1].line_id,
            after_line_id: -1,
            derived_section_type: "text",
            input_seq_num: -1,
            qc_change_type: "",
            page: 5,
            is_active: true,
            sec_id: arrToUpdate[i].sec_id,
            genre: arrToUpdate[i].genre,
            font_info: {},
            content: content,
          };
        } else {
          cloneInsertedSegment[lineId] = {
            prev_line_id: arrToUpdate[i - 1].line_id,
            after_line_id: arrToUpdate[i + 1].line_id,
            derived_section_type: "text",
            input_seq_num: -1,
            qc_change_type: "",
            page: 5,
            is_active: true,
            sec_id: arrToUpdate[i].sec_id,
            genre: arrToUpdate[i].genre,
            font_info: {},
            content: content,
          };
        }
      } else {
        if (content) {
          cloneUpdatedSegment[lineId] = {
            sec_id: arrToUpdate[i].sec_id,
            line_id: arrToUpdate[i].line_id,
            genre: arrToUpdate[i].genre,
            update_type: "update_segment",
            font_info: arrToUpdate[i].font_info,
            content: content,
          };
        } else {
          cloneUpdatedSegment[lineId] = {
            sec_id: arrToUpdate[i].sec_id,
            line_id: arrToUpdate[i].line_id,
            genre: arrToUpdate[i].genre,
            update_type: "soft_delete_segment",
            font_info: arrToUpdate[i].font_info,
            content: "",
          };
        }
      }
    }
  }
  yield put(getSegmentUpdated(cloneUpdatedSegment));
  yield put(getSegmentInserted(cloneInsertedSegment));
  yield put(getWrapperData(cloneData));
}
export function* enableTableForEdit(action) {
  const { lineID, sectionName } = action.payload;
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);
  let arrToUpdate = cloneData.data[sectionName].detail;
  for (let i = 0; i < arrToUpdate.length; i++) {
    arrToUpdate[i].editEnabledFor = lineID;
    // if (
    //   arrToUpdate[i].derived_section_type === "table" &&
    //   parseFloat(lineID) === parseFloat(arrToUpdate[i].line_id)
    // ) {
    //   arrToUpdate[i].editEnabledFor = lineID;
    //   break;
    // }
  }
  yield put(getWrapperData(cloneData));
}

export function* disableTableForEdit(action) {
  const { sectionName } = action.payload;
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);
  let arrToUpdate = cloneData.data[sectionName].detail;
  for (let i = 0; i < arrToUpdate.length; i++) {
    arrToUpdate[i].editEnabledFor = "";
  }
  yield put(getWrapperData(cloneData));
}
export function* deleteTableByLineID(action) {
  const { lineID, sectionName } = action.payload;
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);
  let arrToUpdate = cloneData.data[sectionName].detail;
  for (let i = 0; i < arrToUpdate.length; i++) {
    if (arrToUpdate[i].line_id === lineID) {
      arrToUpdate[i].content = "";
    }
  }
  yield put(getWrapperData(cloneData));
}
export function* deleteImageByLineID(action) {
  const { lineID, sectionName } = action.payload;
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);
  let arrToUpdate = cloneData.data[sectionName].detail;
  for (let i = 0; i < arrToUpdate.length; i++) {
    if (arrToUpdate[i].line_id === lineID) {
      arrToUpdate[i].content = "";
      arrToUpdate[i].imageButton = false;
    }
  }
  yield put(getWrapperData(cloneData));
}

const sortObjectBasedOnPosition = (state) => {
  let cloneState = cloneDeep(state);
  const order = [],
    res = {};
  Object.keys(cloneState).forEach((key) => {
    return (order[cloneState[key]["position"]] = key);
  });
  order.forEach((key) => {
    res[key] = cloneState[key];
  });
  return res;
};

const pushObjectToState = (data, obj) => {
  let dataClone = cloneDeep(data);
  const newPosition = parseInt(obj.position);
  Object.keys(dataClone).forEach((key) => {
    if (dataClone[key].position > newPosition) {
      dataClone[key].position = dataClone[key].position + 1;
    }
  });
  dataClone["New Section"] = { ...obj, position: newPosition + 1 };
  return dataClone;
};

export function* addSection(action) {
  const { section, sectionName } = action.payload;
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);
  const header = {
    source_file_section: sectionName,
    source_heading_number: "",
    input_seq_num: null,
    parent_heading_num_seq: null,
    parent_sec_id_seq: null,
    derived_heading_level: 1,
    pt_from_ontology: null,
    medical_terms: null,
    page: null,
    font_info: {},
    is_active: true,
    indexes: {
      seg_pages: [],
    },
    aidocid: "09e5f949-e170-4bd3-baac-77e377ed4821",
    genre: "2_section_metadata",
    sec_id: null,
    child_secid_seq: [],
  };
  const obj = {
    ...section,
    detail: null,
    header,
    qc_change_type: "add",
  };
  const newState = pushObjectToState(cloneData.data, obj);
  const sortedObj = sortObjectBasedOnPosition(newState);
  cloneData.data = sortedObj;
  yield put(getWrapperData(cloneData));
}

export function* setPdfPageNumber(action) {
  yield put(setPageNumber(action.payload));
}
export function* extractDataByPageNumber(action) {
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);

  const sectionDetail = getPageWiseSection(cloneData.data, action.payload);
  console.log("Section Detail By Page", sectionDetail);

  if (sectionDetail) {
    const ele = document.getElementById(generateHeaderID(action.payload));
    if (ele) {
      ele.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (!sectionDetail.dataPresent) {
      yield put({
        type: ActionTypes.GET_PROTOCOL_VIEW_NEW,
        payload: {
          id: sectionDetail.id,
          childString: sectionDetail.childString,
          sectionName: sectionDetail.sectionName,
          body: true,
        },
      });
    } else {
      yield put({
        type: ActionTypes.HANDLE_EXPAND_BPO,
        payload: {
          sectionName: sectionDetail.sectionName,
          value: true,
        },
      });
    }
  }
}
