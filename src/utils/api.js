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
let backendPostHost;
let baseUrlSSO;
let UI_URL='';
let UIhost;

console.log("------ENVIRONMENT-------", process.env.REACT_APP_ENV);
if (process.env.REACT_APP_ENV === "dev") {
  backendHost = "https://dev-protocoldigitalization-api.work.iqvia.com";
  backendPostHost="https://dev-protocoldigitalization-ai.work.iqvia.com";
  UIhost='https://dev-protocoldigitalization-ui.work.iqvia.com';
  baseUrlSSO = "https://dev-protocoldigitalization.work.iqvia.com/v1";
} else if (process.env.REACT_APP_ENV === "svt") {
  backendHost = "https://svt-protocoldigitalization-api.work.iqvia.com";
  backendPostHost="https://svt-protocoldigitalization-ai.work.iqvia.com";
  UIhost='http://pd-svt';
  baseUrlSSO = "https://ca2uampd01q.quintiles.net:8080/v1";
} else if (process.env.REACT_APP_ENV === "uat") {
  backendHost = "https://uat-protocoldigitalization-api.work.iqvia.com";
  backendPostHost="https://uat-protocoldigitalization-ai.work.iqvia.com";
  UIhost='http://pd-uat';
  baseUrlSSO = "https://ca2uampd01c.quintiles.net:8080/v1";
} else if (process.env.REACT_APP_ENV === "prod") {
  backendHost = "ca2spdml01q";
  backendPostHost="ca2spdml01q";
  UIhost='ca2spdml06d';
  baseUrlSSO = "https://ca2utmsa04q.quintiles.net:8080/v1";
} else {
  backendHost = "ca2spdml01q";
  backendPostHost="ca2spdml01q";
  UIhost='ca2spdml06d';
  baseUrlSSO = "https://ca2uampd01d.quintiles.net:8080/v1";
}
console.log('---------SSO------',baseUrlSSO);
//   else {
//   const apiVersion = "v1";

//   const hostname = window && window.location && window.location.hostname;
//   // debugger;
//   if (hostname.includes("ca2spdml06d")) {
//     //DEV
//     backendHost = "ca2spdml01q";
//   } else if (
//     hostname.includes("ca2spdml06c") ||
//     hostname.includes("ca2spdml07c")
//   ) {
//     //UAT
//     backendHost = "ca2spdml05c";
//   } else if (hostname.includes("ca2spdml16q")) {
//     //SVT
//     backendHost = `ca2spdml15q`;
//   } else if (hostname.includes("localhost")) {
//     //SVT
//     backendHost = `ca2spdml01q`;
//   }
//   BASE_URL = `http://${backendHost}:9001`;
//   BASE_URL_8000 = `http://${backendHost}:8000`;
// }
// BASE_URL = `http://${backendPostHost}:9001`;
// BASE_URL_8000 = `http://${backendHost}:8000`;
BASE_URL = `${backendPostHost}`;
BASE_URL_8000 = `${backendHost}`;
UI_URL= `${UIhost}`;
export default BASE_URL;
export { BASE_URL_8000, baseUrlSSO, UI_URL };

export const Apis = {
  protocol: `${BASE_URL}/api/protocol`,
  search: `http://ca2spdml04q:9200/pd-index/_search`,
};

export const SSO_ENABLED = true;