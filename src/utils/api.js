import axios from "axios";
import Cookies from "universal-cookie";

const cookiesServer = new Cookies();

export const httpCall = async (config) => {
  let token = cookiesServer.get("api_token");
  if (!token) {
    await getToken();
    token = cookiesServer.get("api_token");
  }
  let headerConfig;
  if (config && config.headers) {
    headerConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: config.checkAuth
          ? `Basic ${process.env.REACT_APP_BASIC}`
          : `Bearer ${token}`,
        "Cache-Control": "no-store, no-cache,",
        Pragma: "no-cache",
      },
    };
  } else {
    headerConfig = {
      ...config,
      headers: {
        Authorization: config.auth ? config.auth : `Bearer ${token}`,
        "Cache-Control": "no-store, no-cache,",
        Pragma: "no-cache",
      },
    };
  }
  try {
    const response = await axios(headerConfig);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: "Success",
      };
    } else if (response.status === 204) {
      return {
        success: true,
        data: response.data,
        message: "No-Content",
      };
    } else if (response.status === 401) {
      return {
        success: false,
        data: response.data.detail,
        message: "Authentication-Error",
      };
    }
  } catch (err) {
    return {
      success: false,
      err: err.response,
      message: "Not-Found",
    };
  }
};

export const httpCallSDA = async (config) => {
  try {
    const response = await axios(config);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: "Success",
      };
    } else if (response.status === 404 || response.status === 409) {
      return {
        success: false,
        code: response.code,
        message: response.message,
      };
    } else {
      return {
        success: false,
        code: response.code,
        message: response.message,
      };
    }
  } catch (err) {
    return {
      success: false,
      err: err.response,
      message: "Not-Found",
    };
  }
};

export const getToken = async () => {
  // let formdata = new FormData();
  // formdata.append("username", "ypd_api_test");
  // formdata.append("password", "uR@TnSa5*$1ka~hasj^!4t32re");
  const headerConfig = {
    url: `${BASE_URL_8000}/api/token/`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      "Cache-Control": "no-store, no-cache,",
      Pragma: "no-cache",
      Authorization: `Basic ${process.env.REACT_APP_BASIC}`,
    },
  };
  try {
    const response = await axios(headerConfig);
    if (response.status === 200) {
      cookiesServer.remove("api_token");
      cookiesServer.set("api_token", response.data.access_token);
      return {
        err: null,
        status: response.status,
        token: response.data.access_token,
      };
    } else if (response.status === 401) {
      console.log("error", response);
    }
    return {
      err: null,
      status: response.status,
    };
  } catch (err) {
    console.log(err);
    if (err && err.response && err.response.status === 401) {
      console.log("error", err.response.data);
      return {
        status: err.response.status,
        err: err.response.data.detail,
      };
    }
    return {
      status: "CORS",
      err: "Something Went Wrong",
    };
  }
};

// export const API_ROOT = `${backendHost}/api/${apiVersion}`;

let BASE_URL = "";
let BASE_URL_8000 = "";
let backendHost;
let backendPostHost;
let baseUrlSSO;
let UI_URL = "";
let UIhost;

console.log("------ENVIRONMENT-------", process.env.REACT_APP_ENV);
if (process.env.REACT_APP_ENV === "dev") {
  backendHost = "https://dev-protocoldigitalization-api.work.iqvia.com";
  backendPostHost = "https://dev-protocoldigitalization-ai.work.iqvia.com";
  UIhost = "https://dev-protocoldigitalization-ui.work.iqvia.com";
  baseUrlSSO = "https://dev-protocoldigitalization.work.iqvia.com/v1";
} else if (process.env.REACT_APP_ENV === "test") {
  backendHost = "https://test-protocoldigitalization-api.work.iqvia.com";
  backendPostHost = "https://test-protocoldigitalization-ai.work.iqvia.com";
  UIhost = "https://test-protocoldigitalization-ui.work.iqvia.com";
  baseUrlSSO = "https://test-protocoldigitalization.work.iqvia.com/v1";
} else if (process.env.REACT_APP_ENV === "svt") {
  backendHost = "https://svt-protocoldigitalization-api.work.iqvia.com";
  backendPostHost = "https://svt-protocoldigitalization-ai.work.iqvia.com";
  UIhost = "https://svt-protocoldigitalization-ui.work.iqvia.com";
  baseUrlSSO = "https://svt-protocoldigitalization.work.iqvia.com/v1";
} else if (process.env.REACT_APP_ENV === "uat") {
  backendHost = "https://uat-protocoldigitalization-api.work.iqvia.com";
  backendPostHost = "https://uat-protocoldigitalization-ai.work.iqvia.com";
  UIhost = "https://uat-protocoldigitalization-ui.work.iqvia.com";
  baseUrlSSO = "https://uat-protocoldigitalization.work.iqvia.com/v1";
} else if (process.env.REACT_APP_ENV === "uat1") {
  backendHost = "https://uat1-protocoldigitalization-api.work.iqvia.com";
  backendPostHost = "https://uat1-protocoldigitalization-ai.work.iqvia.com";
  UIhost = "https://uat1-protocoldigitalization-ui.work.iqvia.com";
  baseUrlSSO = "https://uat1-protocoldigitalization.work.iqvia.com/v1";
} else if (process.env.REACT_APP_ENV === "prod") {
  backendHost = "https://protocoldigitalization-api.work.iqvia.com";
  backendPostHost = "https://protocoldigitalization-ai.work.iqvia.com";
  UIhost = "https://protocoldigitalization-ui.work.iqvia.com";
  baseUrlSSO = "https://protocoldigitalization.work.iqvia.com/v1";
} else {
  backendHost = "https://dev-protocoldigitalization-api.work.iqvia.com";
  backendPostHost = "https://dev-protocoldigitalization-ai.work.iqvia.com";
  UIhost = "https://dev-protocoldigitalization-ui.work.iqvia.com";
  baseUrlSSO = "https://dev-protocoldigitalization.work.iqvia.com/v1";
}
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

export const SSO_ENABLED = true;
