import { put, call } from "redux-saga/effects";
import { getViewdata } from "../slice";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import { getUserId } from "./utils";

function parsedData(data) {
  return JSON.parse(JSON.parse(data));
}

function captalize(data) {
  return data
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}

function getTocSections(toc) {
  const sectionList = [];
  const list = [];
  toc.data.map((item) => {
    let file_section_level = item[8].toString();
    let type = item[2];
    // let heading = item[4].font_style;
    if (!file_section_level && type === "header") {
      file_section_level = "1";
    }
    let level_1_CPT_section = captalize(item[6]);
    let section_num = item[7];

    if (
      section_num &&
      file_section_level === "1" &&
      level_1_CPT_section !== "Unmapped" &&
      !sectionList.includes(level_1_CPT_section)
    ) {
      list.push({
        section: `${section_num} ${level_1_CPT_section}`,
        id: `TOC-${item[9]}`,
      });
      sectionList.push(level_1_CPT_section);
    } else if (
      type === "header" &&
      file_section_level === "1" &&
      level_1_CPT_section !== "Unmapped" &&
      !sectionList.includes(level_1_CPT_section)
    ) {
      list.push({
        section: `${section_num} ${level_1_CPT_section}`,
        id: `TOC-${item[9]}`,
      });
      sectionList.push(level_1_CPT_section);
    }
    return item;
  });
  return list;
}

function getSoaSections(soa) {
  // const sectionList = [];
  const list = [];
  soa.map((item) => {
    let TableIndex = item.TableIndex;
    let TableName = item.TableName;
    list.push({
      section: `${TableName}`,
      id: `SOA-${TableIndex}`,
    });
    return item;
    // sectionList.push(CPT_section);
  });
  return list;
}
export function* fetchViewData(action) {
  const viewData = {
    iqvdataSoa: null,
    iqvdataSummary: null,
    iqvdataToc: null,
    loader: true,
    tocSections: null,
    soaSections: null,
    err: null,
  };
  let userId = yield getUserId();
  console.log(userId);
  yield put(getViewdata(viewData));
  // const URL = `/QC_New_re.json`;
  let URL = "";
  if (action.payload.user === "qc") {
    URL = `${BASE_URL_8000}/api/protocol_qcdata/?id=${action.payload.id}`;
  } else {
    URL = `${BASE_URL_8000}/api/${action.payload.endPoint}?aidoc_id=${action.payload.id}&user=${action.payload.user}&userId=${userId}&protocol=${action.payload.protocol}`;
    // URL = "/compare.json";
  }

  const config = {
    url: URL,
    method: "GET",
  };
  try {
    const data = yield call(httpCall, config);
    if (data.success && data.data) {
      const toc = parsedData(data.data.iqvdataToc);
      const soa = parsedData(data.data.iqvdataSoa);
      const viewData = {
        iqvdataSoa: soa,
        iqvdataSummary: parsedData(data.data.iqvdataSummary),
        iqvdataToc: toc,
        loader: false,
        tocSections: getTocSections(toc),
        soaSections: getSoaSections(soa),
        err: null,
        download: data.data,
      };
      yield put(getViewdata(viewData));
    } else {
      const viewData = {
        iqvdataSoa: null,
        iqvdataSummary: null,
        iqvdataToc: null,
        loader: false,
        tocSections: null,
        soaSections: null,
        err: "No data found",
      };
      yield put(getViewdata(viewData));
    }
  } catch (err) {
    console.log(err);
    const viewData = {
      iqvdataSoa: null,
      iqvdataSummary: null,
      iqvdataToc: null,
      loader: false,
      tocSections: null,
      soaSections: null,
      err: "No data found",
    };
    yield put(getViewdata(viewData));
  }
}
