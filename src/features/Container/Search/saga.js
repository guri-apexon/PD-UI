import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";
import { getFilters, getSearchResult } from "./searchSlice";
import { httpCall, Apis, BASE_URL_8000 } from "../../../utils/api";
import _ from "lodash";
import elasticsearch from "elasticsearch";

const client = new elasticsearch.Client({
  host: "http://10.3.67.228:9200/pd-index",
  log: "trace",
  // apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

function* getFilterData(action) {
  // console.log("search", action.payload);
  // debugger
  const url = "../../../../filters.json";
  const sponsorUrl = `${BASE_URL_8000}/api/protocol_sponsor/?skip=0`;
  const indicationUrl = `${BASE_URL_8000}/api/indications/?skip=0`;

  try {
    const data = yield call(httpCall, { url, method: "GET" });
    const sponsorList = yield call(httpCall, {
      url: sponsorUrl,
      method: "GET",
    });
    const indicationList = yield call(httpCall, {
      url: indicationUrl,
      method: "GET",
    });
    // console.log("filter", indicationList, sponsorList);
    if (indicationList.success && sponsorList.success) {
      // let data = data;
      let formatSponser = sponsorList.data.map((item) => {
        return {
          title: item.sponsor_name,
          id: item.id,
        };
      });
      let formatIndication = indicationList.data.map((item) => {
        return {
          title: item.indication_name,
          id: item.id,
        };
      });
      let formatFilter = data.data.map((item) => {
        if (item.sectionName === "Sponsors") {
          let items = _.cloneDeep(item);
          items.sectionContent = formatSponser;
          return items;
        } else if (item.sectionName === "Indication") {
          let items = _.cloneDeep(item);
          items.sectionContent = formatIndication;
          return items;
        } else {
          return item;
        }
      });
      console.log("format Fi", formatFilter);
      const obj = {
        success: true,
        data: formatFilter,
      };
      yield put(getFilters(obj));
    }
  } catch (e) {}

  // console.log(data);
  // console.log(",,,,,,,", sponsorList);
  // console.log("1111111", indicationList);
  // getSummaryData(data)
}

function* getSearchData(action) {
  // console.log("search", action.payload);

  if (action.payload) {
    const obj = {
      search: true,
      loader: true,
      success: false,
      data: [],
    };
    yield put(getSearchResult(obj));
    // const url = "../../../../searchResult.json";
    // const bodyData = {
    //   query: {
    //     multi_match: {
    //       query: action.payload,
    //       fields: ["InterventionGroups", "Objectives"],
    //     },
    //   },
    // };
    // const url = `${Apis.search}/?source_content_type=application/json&source=${JSON.stringify(bodyData)}`;
    // const url = `${Apis.search}/?q=${action.payload}`
    // const url=``

    try {
      // const resp = yield client.search({
      //   body: {
      //     query: {
      //       multi_match: {
      //         query: action.payload,
      //         fields: [
      //           "Objectives",
      //           "Endpoints",
      //           "AdverseEvents",
      //           "SeriousAdverseEvents",
      //           "ObjectiveAndEndpoint",
      //           "InclusionCriteria",
      //           "ExclusionCriteria",
      //           "NumberOfParticipants",
      //           "Title",
      //           "ShortTitle",
      //           "PrimaryObjective",
      //           "SecondaryObjective",
      //           "ExploratoryObjective",
      //           "PrimaryEndpoint",
      //           "SecondaryEndpoint",
      //           "Rationale",
      //           "Design",
      //           "BriefSummary",
      //           "InterventionGroups",
      //           "DataMonitoringCommittee",
      //           "Schema",
      //         ],
      //       },
      //     },
      //   },
      // });
      // console.log(resp.hits.hits);
      const url = `http://localhost:4000/elastic/${action.payload}`;

      const resp = yield call(httpCall, {
        url,
        method: "GET",
      });
      const data = resp.data.hits.hits;
      // console.log("Search Result", data);
      // const data = [];
      if (resp.data && resp.data.hits && data.length !== 0) {
        const requiredFormat = createJSONFormat(data);

        const obj = {
          search: true,
          loader: false,
          success: true,
          data: requiredFormat,
        };
        yield put(getSearchResult(obj));
      } else if (resp.data.hits.hits.length === 0) {
        const obj = {
          search: true,
          loader: false,
          success: true,
          data: [],
        };
        yield put(getSearchResult(obj));
      }
    } catch (e) {
      const obj = {
        success: false,
        data: [],
      };
      yield put(getSearchResult(obj));
    }
  } else {
    const obj = {
      search: false,
      loader: false,
      success: true,
      data: [],
    };
    yield put(getSearchResult(obj));
  }
}

function* watchIncrementAsync() {
  yield takeEvery("GET_SEARCH_FILTER", getFilterData);
  yield takeEvery("GET_SEARCH_RESULT", getSearchData);
}

export default function* protocolSaga() {
  yield all([watchIncrementAsync()]);
}

function createJSONFormat(data) {
  let arr = [];

  for (let i = 0; i < data.length; i++) {
    let sampleRows = data.filter(
      (item) => item._source.ProtocolNo === data[i]._source.ProtocolNo
    );
    let rows = sampleRows.map((item) => {
      return {
        version: item._source.ProtocolVersion,
        draft: "",
        sourceDocument: item._source.SourceFileName,
        documentPath: item._source.documentPath,
        uploadDate: item._source.uploadDate,
        documentStatus: item._source.DocumentStatus,
      };
    });
    let obj = {
      protocolNumber: data[i]._source.ProtocolNo,
      protocolDescription: data[i]._source.Title,
      indication: data[i]._source.indication,
      phase: data[i]._source.phase,
      sponsor: data[i]._source.sponsor,
      sourceDocument: data[i]._source.SourceFileName,
      molecule: "",
      approvalDate: data[i]._source.approval_date,
      followed: false,
      rows: rows,
    };
    arr.push(obj);
  }

  console.log("arrs", arr);
  return getUniqObject(arr);
}

function getUniqObject(obj) {
  const uniqueObj = Array.from(new Set(obj.map((a) => a.protocolNumber))).map(
    (protocolNumber) => {
      return obj.find((a) => a.protocolNumber === protocolNumber);
    }
  );
  return uniqueObj;
}
