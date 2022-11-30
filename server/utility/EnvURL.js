const getENVURL = function () {
  let baseUrlElastic = '';
  let baseUrlSSO = '';
  let access_token = '';
  let refresh_token = '';

  switch (process.env.NODE_ENV) {
    case 'dev':
      baseUrlElastic = process.env.ELASTIC_DEV_URL;
      baseUrlSSO = process.env.CIMS_DEV_URL;
      access_token = 'access_token_dev';
      refresh_token = 'refresh_token_dev';
      break;
    case 'svt':
      baseUrlElastic = process.env.ELASTIC_SVT_URL;
      baseUrlSSO = process.env.CIMS_SVT_URL;
      access_token = 'access_token_svt';
      refresh_token = 'refresh_token_svt';
      break;
    case 'uat':
      baseUrlElastic = process.env.ELASTIC_UAT_URL;
      baseUrlSSO = process.env.CIMS_UAT_URL;
      access_token = 'access_token_uat';
      refresh_token = 'refresh_token_uat';
      break;
    case 'prod':
      baseUrlElastic = process.env.ELASTIC_PROD_URL;
      baseUrlSSO = process.env.CIMS_PROD_URL;
      access_token = 'access_token';
      refresh_token = 'refresh_token';
      break;
    default:
      baseUrlElastic = process.env.ELASTIC_DEV_URL;
      baseUrlSSO = process.env.CIMS_DEV_URL;
      access_token = 'access_token_dev';
      refresh_token = 'refresh_token_dev';
  }
  const envs = {
    baseUrlElastic,
    baseUrlSSO,
    access_token,
    refresh_token,
  };
  return envs;
};

module.exports = {
  getENVURL,
};
