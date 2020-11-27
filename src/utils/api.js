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

let BASE_URL = "";

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://ca2spdml01q:9001";
} else {
  BASE_URL = "http://www.production.com";
}

export default BASE_URL;

export const Apis = {
    protocol:`${BASE_URL}/api/protocol`
}
