import { isEmpty, isObject } from 'lodash';
import difference from 'lodash/difference';

const metaDataFun = (
  flattenObject,
  updatedData,
  key,
  keyValue,
  level,
  parentKey,
) => {
  if (isObject(keyValue) && key !== '_meta_data' && key !== '_childs') {
    updatedData[key] = updatedData[key]
      ? updatedData[key]
      : {
          // eslint-disable-next-line
          _meta_data: keyValue?._meta_data?.map((attr, index) => {
            return {
              ...attr,
              id: index + 1,
              isCustom: key !== 'summary',
            };
          }),
          formattedName: level === 1 ? key : `${parentKey}.${key}`,
          name: key,
          level,
          isActive: false,
          isEdit: false,
          // eslint-disable-next-line
          _childs: keyValue?._childs ? keyValue?._childs : [],
        };
    // eslint-disable-next-line
    if (keyValue?._childs && keyValue?._childs.length > 0) {
      flattenObject(
        updatedData,
        keyValue,
        level + 1,
        level === 1 ? key : updatedData[key]?.formattedName,
      );
    }
  }
};
export const flattenObject = (
  flattenObject,
  updatedData,
  data,
  level,
  parentKey,
) => {
  const objectKeys = data ? Object?.keys(data) : [];
  objectKeys?.forEach((key) => {
    const keyValue = data?.[key];
    metaDataFun(updatedData, key, keyValue, level, parentKey);
  });
  return updatedData;
};

export const mergeSummary = (data) => {
  let finalResult = data;
  const objectKeys = data ? Object?.keys(data) : [];
  objectKeys.forEach((key) => {
    if (key === 'summary_extended') {
      // eslint-disable-next-line
      const updateMetaData = finalResult.summary_extended._meta_data.map(
        (fields) => {
          return {
            ...fields,
            isCustom: true,
          };
        },
      );
      finalResult = {
        ...finalResult,
        summary: {
          ...finalResult.summary,
          // eslint-disable-next-line
          _meta_data: [...finalResult.summary._meta_data, ...updateMetaData],
          _childs: [
            // eslint-disable-next-line
            ...finalResult.summary._childs,
            // eslint-disable-next-line
            ...finalResult.summary_extended._childs,
          ],
        },
      };
      delete finalResult.summary_extended;
    }
  });
  return finalResult;
};

export const flattenMetaParam = (updatedParam, data, level) => {
  const objectKeys = data ? Object?.keys(data) : [];
  objectKeys?.forEach((key) => {
    const keyValue = data?.[key];
    if (
      isObject(keyValue) &&
      key !== 'dropDownList' &&
      key !== 'summary_extended'
    ) {
      updatedParam[key] = updatedParam[key]
        ? updatedParam[key]
        : {
            dropDownList:
              Object?.keys(keyValue).length > 0 ? Object?.keys(keyValue) : [],
          };
      if (Object?.keys(keyValue).length > 0) {
        flattenMetaParam(updatedParam, keyValue, level + 1);
      }
    }
  });
  return updatedParam;
};

export const sectionNameFun = (
  addToAccordion,
  sectionName,
  setSuggestedList,
  suggestedList,
) => {
  if (sectionName?.label) {
    addToAccordion(sectionName.label);
    setSuggestedList(
      suggestedList.filter((list) => list.label !== sectionName.label),
    );
  }
};

export const metaParamResultFun = (metaParamResult, setMetaParams) => {
  if (!isEmpty(metaParamResult)) {
    setMetaParams(metaParamResult);
  }
};

export const accordianResultFun = (accordianResult, setAccordianData) => {
  if (!isEmpty(accordianResult)) {
    setAccordianData(accordianResult);
  }
};

export const metaParamResultAndAccordian = (
  metaParamResult,
  accordianData,
  setSuggestedList,
  setMetaParams,
) => {
  if (!isEmpty(metaParamResult) && !isEmpty(accordianData)) {
    const updatedParam = {};
    const result = flattenMetaParam(updatedParam, metaParamResult, 1);
    let metaList = [];
    const filterItems = difference(
      Object.keys(metaParamResult),
      Object.keys(accordianData),
    );

    if (filterItems.length > 0) {
      filterItems.forEach((names) => {
        if (names !== 'summary_extended') {
          metaList = [...metaList, { label: names }];
        }
      });
      setSuggestedList(metaList || []);
    }

    setMetaParams(result);
  }
};

export const apiResponseFun = (
  apiResponse,
  accordianData,
  rows,
  setAccordianData,
  fetchMetaData,
) => {
  if (apiResponse?.status) {
    if (apiResponse.op === 'addAttributes') {
      const selectedData = accordianData[apiResponse.reqData.name];
      const accMetaData =
        apiResponse?.reqData?.name === 'summary_extended'
          ? rows.summary
          : rows[apiResponse?.reqData?.name];
      setAccordianData({
        ...accordianData,
        [apiResponse.reqData.name]: {
          ...selectedData,
          isEdit: false,
          _meta_data: [...accMetaData],
        },
      });
    } else if (apiResponse.op === 'addField') {
      if (apiResponse?.reqData?.level === 1) {
        const obj = {
          name: apiResponse?.reqData?.name,
          formattedName: apiResponse?.reqData?.name,
          isEdit: false,
          isActive: false,
          _meta_data: [],
          level: 1,
          _childs: [],
        };
        setAccordianData({
          [apiResponse.reqData.name]: obj,
        });
      } else {
        const obj = {
          name: apiResponse?.reqData?.name,
          formattedName: `${apiResponse.reqData.accData.formattedName}.${apiResponse.reqData.name}`,
          isEdit: false,
          isActive: false,
          _meta_data: [],
          level: apiResponse.reqData.accData.level + 1,
          _childs: [],
        };
        const selectedData = accordianData[apiResponse?.reqData?.accData?.name];
        setAccordianData({
          ...accordianData,
          [apiResponse.reqData.accData.name]: {
            ...selectedData,
            // eslint-disable-next-line
            _childs: selectedData?._childs
              ? // eslint-disable-next-line
                [...selectedData._childs, apiResponse.reqData.name]
              : [apiResponse.reqData.name],
          },
          [apiResponse.reqData.name]: obj,
        });
      }
    } else {
      fetchMetaData();
    }
  }
};

export const handleSaveFun = (
  accData,
  rows,
  postCall,
  deletedAttributes,
  deleteCall,
  accordianData,
) => {
  if (accData.name === 'summary') {
    const filterCustomData = rows[accData?.name]?.filter(
      (data) => data?.isCustom,
    );
    const filterNonCustomData = rows[accData?.name]?.filter(
      (data) => !data?.isCustom,
    );
    if (filterCustomData?.length > 0) {
      postCall(
        {
          formattedName: 'summary_extended',
          name: 'summary_extended',
        },
        filterCustomData,
      );
    }
    if (deletedAttributes.length > 0) {
      deleteCall(
        {
          formattedName: 'summary_extended',
          name: 'summary_extended',
        },
        'deleteAttribute',
      );
    }
    postCall(accordianData[accData.name], filterNonCustomData);
  } else {
    const accMetaData = rows[accData?.name] ? rows[accData?.name] : [];
    if (deletedAttributes.length > 0) {
      deleteCall(accordianData[accData.name], 'deleteAttribute');
    }
    postCall(accordianData[accData.name], accMetaData);
  }
};

export const handleDataChangeFun = (e, setType, type, setVal) => {
  if (e?.target?.name === 'attr_type') {
    setType(e.target.value);
  } else if (type !== 'date') {
    setVal(e.target.value);
  }
};
