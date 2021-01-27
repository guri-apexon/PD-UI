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
console.log("------ENVIRONMENT-------", process.env.REACT_APP_ENV);
if (process.env.REACT_APP_ENV === "dev") {
  backendHost = "ca2spdml01q";
} else if (process.env.REACT_APP_ENV === "svt") {
  backendHost = "ca2spdml13q";
} else if (process.env.REACT_APP_ENV === "uat") {
  backendHost = "ca2spdml03c";
} else if (process.env.REACT_APP_ENV === "prod") {
  backendHost = "ca2spdml01q";
} else {
  backendHost = "ca2spdml01q";
}
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
BASE_URL = `http://${backendHost}:9001`;
BASE_URL_8000 = `http://${backendHost}:8000`;
export default BASE_URL;
export { BASE_URL_8000 };

export const Apis = {
  protocol: `${BASE_URL}/api/protocol`,
  search: `http://ca2spdml04q:9200/pd-index/_search`,
};
