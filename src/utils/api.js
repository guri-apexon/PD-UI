import axios from "axios";

export const httpCall = async (config) => {
  let headerConfig;
  if (config && config.headers) {
    headerConfig = {
      ...config,
      headers: {
        ...config.headers,
        "Cache-Control": "no-store, no-cache,",
        Pragma: "no-cache",
      },
    };
  } else {
    headerConfig = {
      ...config,
      headers: {
        "Cache-Control": "no-store, no-cache,",
        Pragma: "no-cache",
      },
    };
  }
  try {
    const response = await axios(headerConfig);
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      err: err.response,
    };
  }
};

// export const API_ROOT = `${backendHost}/api/${apiVersion}`;

let BASE_URL = "";
let BASE_URL_8000 = "";
let UI_URL = "";
let backendHost=process.env.REACT_APP_BACKEND_API;
let backendPostHost=process.env.REACT_APP_BACKEND_AI;
let baseUrlSSO=process.env.REACT_APP_SSO_URL;
let UIhost=process.env.REACT_APP_UI_HOSTED_URL;

console.log("------ENVIRONMENT-------", process.env.REACT_APP_ENV);
console.log("---------SSO------", baseUrlSSO);

BASE_URL = `${backendPostHost}`;
BASE_URL_8000 = `${backendHost}`;
UI_URL = `${UIhost}`;
export default BASE_URL;
export { BASE_URL_8000, baseUrlSSO, UI_URL };

export const Apis = {
  protocol: `${BASE_URL}/api/protocol`,
  search: `http://ca2spdml04q:9200/pd-index/_search`,
};

let SSO;
if (process.env.REACT_APP_LOCAL === "true" || process.env.REACT_APP_LOCAL) {
  SSO = false;
} else {
  SSO = true;
}
export const SSO_ENABLED = SSO;
