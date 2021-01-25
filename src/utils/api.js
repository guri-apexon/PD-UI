import axios from "axios";

export const httpCall = async (config) => {
  try {
    const response = await axios(config);
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
let backendHost;
if (process.env.NODE_ENV === "development") {
  // let backendHost;
  const apiVersion = "v1";

  const hostname = window && window.location && window.location.hostname;
  // debugger;
  if (hostname.includes("ca2spdml06d")) {
    //DEV
    backendHost = "ca2spdml01q";
  } else if (
    hostname.includes("ca2spdml06c") ||
    hostname.includes("ca2spdml07c")
  ) {
    //UAT
    backendHost = "ca2spdml05c";
  } else if (hostname.includes("ca2spdml16q")) {
    //SVT
    backendHost = `ca2spdml15q`;
  } else if (hostname.includes("localhost")) {
    //SVT
    backendHost = `ca2spdml01q`;
  }
  // else {
  //   backendHost = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3000";
  // }

  BASE_URL = `http://${backendHost}:9001`;
  BASE_URL_8000 = `http://${backendHost}:8000`;
} else {
  BASE_URL = `http://${backendHost}:9001`;
  BASE_URL_8000 = `http://${backendHost}:8000`;
}

export default BASE_URL;
export { BASE_URL_8000 };

export const Apis = {
  protocol: `${BASE_URL}/api/protocol`,
  search: `http://ca2spdml04q:9200/pd-index/_search`,
};
