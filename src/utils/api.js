import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

const cookiesServer = new Cookies();
/* eslint-disable */
export const httpCall = async (config) => {
  let token = cookiesServer.get('api_token');
  if (!token) {
    await getToken();
    token = cookiesServer.get('api_token');
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
      },
    };
  } else {
      headerConfig = {
        ...config,
        headers: {
          Authorization: config.auth ? config.auth : `Bearer ${token}`,
        },
      };
  }
  try {
    const response = await axios(headerConfig);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: 'Success',
      };
    }
    if (response.status === 204) {
      return {
        success: true,
        data: response.data,
        message: 'No-Content',
      };
    }
    if (response.status === 401) {
      return {
        success: false,
        data: response.data.detail,
        message: 'Authentication-Error',
      };
    }
    if (response.status === 409) {
      return {
        success: true,
        data: response.data.detail,
        code: 'DUPLICATE_ENTITY',
      };
    }
    if (response.status === 206) {
      return {
        success: true,
        data: [],
        message: response.data,
      };
    }
  } catch (err) {
    if (err && err.response && err.response.status === 403) {
      return {
        success: false,
        data: '',
        err: err.response,
        message: 'No Access',
      };
    }
    if (err.response && err.response.status === 409) {
      return {
        success: false,
        data: err.response.data.detail,
        code: 'DUPLICATE_ENTITY',
      };
    }
    return {
      success: false,
      err: err.response,
      message: 'Not-Found',
    };
  }
};
/* eslint-enable */
export const httpCallSDA = async (config) => {
  const headerConfig = {
    ...config,
  };
  try {
    const response = await axios(headerConfig);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: 'Success',
      };
    }
    if (response.status === 404 || response.status === 409) {
      return {
        success: false,
        code: response.code,
        message: response.message,
      };
    }
    return {
      success: false,
      code: response.code,
      message: response.message,
    };
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 404 || err.response.status === 409)
    ) {
      return {
        success: false,
        code: err.response.data.code,
        message: err.response.data.message,
      };
    }
    return {
      success: false,
      err: err.response,
      message:
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Error while adding user to SDA',
    };
  }
};

export const getToken = async () => {
  const headerConfig = {
    /* eslint-disable */
    url: `${BASE_URL_8000}/api/token/`,
    /* eslint-enable */
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${process.env.REACT_APP_BASIC}`,
    },
  };
  try {
    const response = await axios(headerConfig);
    if (response.status === 200) {
      cookiesServer.remove('api_token');
      cookiesServer.set('api_token', response.data.access_token);
      return {
        err: null,
        status: response.status,
        token: response.data.access_token,
      };
    }
    if (response.status === 401) {
      toast.error('error', response);
    }
    return {
      err: null,
      status: response.status,
    };
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      return {
        status: err.response.status,
        err: err.response.data.detail,
      };
    }
    return {
      status: 'CORS',
      err: 'Something Went Wrong',
    };
  }
};

// export const API_ROOT = `${backendHost}/api/${apiVersion}`;
/* eslint-disable */
let BASE_URL = '';
let BASE_URL_8000 = '';
let backendHost;
let backendPostHost;
let baseUrlSSO;
let UI_URL = '';
let UIhost;
/* eslint-enable */
const environment = process.env.REACT_APP_ENV;
if (environment === 'local') {
  // backendHost = 'https://dev-protocoldigitalization-api.work.iqvia.com';
  backendHost = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';
  backendPostHost = 'https://dev-protocoldigitalization-ai.work.iqvia.com';
  UIhost = 'https://dev-protocoldigitalization-ui.work.iqvia.com';
  baseUrlSSO = 'https://dev-protocoldigitalization.work.iqvia.com/v1';
} else if (environment === 'dev') {
  backendHost = 'https://dev-protocoldigitalization-api.work.iqvia.com';
  backendPostHost = 'https://dev-protocoldigitalization-ai.work.iqvia.com';
  UIhost = 'https://dev-protocoldigitalization-ui.work.iqvia.com';
  baseUrlSSO = 'https://dev-protocoldigitalization.work.iqvia.com/v1';
} else if (environment === 'test') {
  backendHost = 'https://test-protocoldigitalization-api.work.iqvia.com';
  backendPostHost = 'https://test-protocoldigitalization-ai.work.iqvia.com';
  UIhost = 'https://test-protocoldigitalization-ui.work.iqvia.com';
  baseUrlSSO = 'https://test-protocoldigitalization.work.iqvia.com/v1';
} else if (environment === 'svt') {
  backendHost = 'https://svt-protocoldigitalization-api.work.iqvia.com';
  backendPostHost = 'https://svt-protocoldigitalization-ai.work.iqvia.com';
  UIhost = 'https://svt-protocoldigitalization-ui.work.iqvia.com';
  baseUrlSSO = 'https://svt-protocoldigitalization.work.iqvia.com/v1';
} else if (environment === 'uat') {
  backendHost = 'https://uat-protocoldigitalization-api.work.iqvia.com';
  backendPostHost = 'https://uat-protocoldigitalization-ai.work.iqvia.com';
  UIhost = 'https://uat-protocoldigitalization-ui.work.iqvia.com';
  baseUrlSSO = 'https://uat-protocoldigitalization.work.iqvia.com/v1';
} else if (environment === 'uat1') {
  backendHost = 'https://uat1-protocoldigitalization-api.work.iqvia.com';
  backendPostHost = 'https://uat1-protocoldigitalization-ai.work.iqvia.com';
  UIhost = 'https://uat1-protocoldigitalization-ui.work.iqvia.com';
  baseUrlSSO = 'https://uat1-protocoldigitalization.work.iqvia.com/v1';
} else if (environment === 'prod') {
  backendHost = 'https://protocoldigitalization-api.work.iqvia.com';
  backendPostHost = 'https://protocoldigitalization-ai.work.iqvia.com';
  UIhost = 'https://protocoldigitalization-ui.work.iqvia.com';
  baseUrlSSO = 'https://protocoldigitalization.work.iqvia.com/v1';
} else {
  backendHost = 'https://dev-protocoldigitalization-api.work.iqvia.com';
  backendPostHost = 'https://dev-protocoldigitalization-ai.work.iqvia.com';
  UIhost = 'https://dev-protocoldigitalization-ui.work.iqvia.com';
  baseUrlSSO = 'https://dev-protocoldigitalization.work.iqvia.com/v1';
}

BASE_URL = `${backendPostHost}`;
BASE_URL_8000 = `${backendHost}`;
UI_URL = `${UIhost}`;
export default BASE_URL;
export { BASE_URL_8000, baseUrlSSO, UI_URL };

export const Apis = {
  protocol: `${BASE_URL}/api/protocol`,
  search: 'http://ca2spdml04q:9200/pd-index/_search',
  HEADER_LIST: '/api/cpt_data',
  GET_SECTION_CONTENT: '/api/cpt_data/get_section_data',
  DOWNLOAD_API: '/api/download_file',
  ENRICHED_CONTENT: '/api/cpt_data/update_enriched_data',
};

export const SSO_ENABLED = environment !== 'local';
