import { isObject } from 'lodash';

export const flattenObject = (updatedData, data, level, parentKey) => {
  const objectKeys = data ? Object?.keys(data) : [];
  objectKeys?.forEach((key) => {
    const keyValue = data?.[key];
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
                attr_value:
                  attr.attr_type === 'boolean'
                    ? attr.attr_value.toString()
                    : attr.attr_value,
                display_name: attr?.display_name || attr.attr_name,
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
