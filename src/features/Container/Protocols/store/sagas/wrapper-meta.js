import { put, call, select } from "redux-saga/effects";
import { getWrapperDataMeta, setDOCID } from "../slice";
// import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import { httpCall } from "../../../../../utils/api";
import { cloneDeep } from "lodash";

// const inMedicalTerm = [
//   {
//     source_file_section: "Inclusion Criteria",
//     source_heading_number: "3.1",
//     input_seq_num: 261,
//     parent_heading_num_seq: ["3", "3.1"],
//     parent_sec_id_seq: [10, 11],
//     derived_heading_level: 2,
//     pt_from_ontology: ["inclusion criteria"],
//     medical_terms: {
//       asthma: {
//         class: "Indication",
//         ontology: "ON-1",
//         synonyms: [],
//         concept_id: 1,
//       },
//       LABA: {
//         class: "Bronchodilators",
//         ontology: "ON-1",
//         synonyms: ["Long-Acting Beta-Agonists"],
//         concept_id: 2,
//       },
//       LAMA: {
//         class: "Bronchodilators",
//         ontology: "ON-1",
//         synonyms: ["Long-Acting Muscarinic Antagonist"],
//         concept_id: 3,
//       },
//     },
//     page: 12,
//     font_info: {
//       IsBold: true,
//       font_size: -1,
//       font_style: "Heading2",
//       print_page: 12,
//       entity: [],
//       roi_id: {
//         para: "ac5b958f-a682-44b9-bf8b-8c8c770af3d1",
//         childbox: "",
//         subtext: "",
//       },
//       Bold: false,
//       Caps: false,
//       ColorRGB: 0,
//       DStrike: false,
//       Emboss: false,
//       Highlight: "",
//       Imprint: false,
//       Italics: false,
//       Outline: false,
//       rFonts: "",
//       rStyle: "",
//       Shadow: false,
//       Size: -1,
//       SmallCaps: false,
//       Strike: false,
//       Underline: "",
//       Vanish: false,
//       VertAlign: "",
//     },
//     is_active: true,
//     indexes: {
//       seg_pages: [13, 12, 14],
//     },
//     aidocid: "09e5f949-e170-4bd3-baac-77e377ed4821",
//     genre: "2_section_metadata",
//     sec_id: 11,
//     attributes: {
//       age: "5 to 11 years",
//       weight: ">= 16 kgs",
//       BMI: "5th to 95th percentile",
//     },
//     derived_info: {
//       derived_count: 14,
//       derived_mechanism: [],
//     },
//   },
// ];

function* getWrapperState() {
  const state = yield select();
  const wrapper = state.protocol.wrapperDataMeta;
  return wrapper;
}
// function* getDOCIDState() {
//   const state = yield select();
//   const id = state.protocol.docID;
//   return id;
// }
export function* handleExpandBPO1(action) {
  const { sectionName } = action.payload;
  const currentData = yield getWrapperState();
  let cloneData = cloneDeep(currentData);
  cloneData.data[sectionName].expanded = !cloneData.data[sectionName].expanded;
  yield put(getWrapperDataMeta(cloneData));
}
export function* fetchProtocolViewData1(action) {
  const { id, body, childString, sectionName } = action.payload;
  // const docID = yield getDOCIDState();
  console.log(childString);
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
    yield put(getWrapperDataMeta(preLoadingState));
    if (sectionName === "Objectives and Endpoints") {
      // let url = `${BASE_URL_8000}/api/segments/get_objectives_endpoints?aidocid=${id}&objectives=All%20objectives&endpoints=All%20endpoints`;
      let url = `/MedicalTermMetadata/Data/Objectives.json`;

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
          detail: data["09e5f949-e170-4bd3-baac-77e377ed4821"],
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
      // } else if (sectionName === "Study Population") {
    } else {
      // const URL = `${BASE_URL_8000}/api/segments/section_data_by_secid?aidocid=${id}&section_id=${childString}`;
      const URL = `/MedicalTermMetadata/Data/SectionData.json`;

      const config = {
        url: URL,
        method: "GET",
      };
      const { data, success } = yield call(httpCall, config);

      if (success) {
        const currentData1 = yield getWrapperState();
        let cloneData1 = cloneDeep(currentData1);
        let headers = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].genre === "2_section_metadata") {
            // const obj1 = {
            //   loading: false,
            //   success: true,
            //   error: "",
            //   detail: data[i],
            //   expanded: true,
            //   header: cloneData1.data[sectionName].header,
            // };
            headers.push(data[i]);
          }
        }
        const obj1 = {
          loading: false,
          success: true,
          error: "",
          detail: headers,
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
    // else {
    //   // const URL = "/POC/particular.json";
    //   const URL = `${BASE_URL_8000}/api/segments/section_data_by_secid?aidocid=${id}&section_id=${childString}`;
    //   const config = {
    //     url: URL,
    //     method: "GET",
    //   };
    //   const { data, success } = yield call(httpCall, config);

    //   if (success) {
    //     const currentData1 = yield getWrapperState();
    //     let cloneData1 = cloneDeep(currentData1);
    //     data.shift();
    //     const obj1 = {
    //       loading: false,
    //       success: true,
    //       error: "",
    //       detail: data,
    //       expanded: true,
    //       header: cloneData1.data[sectionName].header,
    //     };
    //     cloneData1.data[sectionName] = obj1;
    //     const preLoadingState = {
    //       loader: false,
    //       success: true,
    //       error: "",
    //       data: cloneData1.data,
    //     };
    //     yield put(getWrapperDataMeta(preLoadingState));
    //   } else {
    //     const currentData2 = yield getWrapperState();
    //     let cloneData2 = cloneDeep(currentData2);
    //     const obj2 = {
    //       loading: false,
    //       success: true,
    //       error: "",
    //       detail: null,
    //       expanded: true,
    //       header: cloneData2.data[sectionName].header,
    //     };
    //     cloneData2.data[sectionName] = obj2;
    //     const preLoadingState = {
    //       loader: false,
    //       success: true,
    //       error: "",
    //       data: cloneData2.data,
    //     };
    //     yield put(getWrapperDataMeta(preLoadingState));
    //   }
    // }
  } else {
    // if (id === docID) {
    //   const currentData = yield getWrapperState();
    //   yield put(getWrapperDataMeta(currentData));
    // } else {
    const preLoadingState = {
      loader: true,
      success: false,
      error: "",
      data: null,
      detail: null,
    };
    yield put(getWrapperDataMeta(preLoadingState));
    // const URL = `${BASE_URL_8000}/api/segments/section_metadata_by_level?aidocid=${id}`;
    const URL = "/MedicalTermMetadata/Data/Sectionheader.json";
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
  // }
}
