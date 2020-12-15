import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";
import { getFilters, getSearchResult } from "./searchSlice";
import { httpCall, Apis } from "../../../utils/api";

function* getFilterData(action) {
  console.log("search", action.payload);
  const url = "../../../../filters.json";
  const data = yield call(httpCall, { url, method: "GET" });
  console.log(data);
  // getSummaryData(data)
  yield put(getFilters(data));
}

function* getSearchData(action) {
  console.log("search", action.payload);

  if (action.payload) {
    
    
    const obj = {
      loader: true,
      success: false,
      data: [],
    };
    yield put(getSearchResult(obj));
    // const url = "../../../../searchResult.json";

    const url = Apis.search;

    const bodyData = {
      query: {
        match: {
          InterventionGroups: action.payload,
        },
      },
    };

    try {
      const resp = yield call(httpCall, { url, method: "GET", data: bodyData });
      const data = resp.data.hits.hits;
      console.log("Search Result", data);
      if (data.length === 0) {
        const obj = {
          loader: false,
          success: true,
          data: [],
        };
        yield put(getSearchResult(obj));
      } else {
        const requiredFormat = createJSONFormat(data);

        const obj = {
          loader: false,
          success: true,
          data: requiredFormat,
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
  }else{
    
    const obj = {
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
  return arr;
}
