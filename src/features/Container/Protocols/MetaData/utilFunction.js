import { isObject } from 'lodash';

export const flattenObject = (updatedData, data, level, parentKey) => {
  const objectKeys = data ? Object?.keys(data) : [];
  objectKeys?.forEach((key) => {
    const identifier = level === 1 ? key : `${parentKey}.${key}`;
    const keyValue = data?.[key];
    if (isObject(keyValue) && key !== '_meta_data' && key !== '_childs') {
      updatedData[identifier] = updatedData[identifier]
        ? updatedData[identifier]
        : {
            // eslint-disable-next-line
            _meta_data: keyValue?._meta_data?.map((attr, index) => {
              return {
                ...attr,
                id: index + 1,
                isCustom: key !== 'summary',
                attr_value:
                  attr?.attr_type === 'boolean' && attr?.attr_value
                    ? attr?.attr_value.toString()
                    : attr?.attr_value,
                display_name: attr?.display_name || attr?.attr_name,
                attr_name: attr?.attr_name,
              };
            }),
            formattedName: identifier,
            name: key,
            level,
            isActive: false,
            isEdit: false,
            // eslint-disable-next-line
            _childs: keyValue?._childs
              ? // eslint-disable-next-line
                keyValue?._childs?.map((childName) => {
                  return `${identifier}.${childName}`;
                })
              : [],
          };
      // eslint-disable-next-line
      if (keyValue?._childs && keyValue?._childs.length > 0) {
        flattenObject(
          updatedData,
          keyValue,
          level + 1,
          level === 1 ? key : updatedData[identifier]?.formattedName,
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
      const updateMetaData = finalResult?.summary_extended?._meta_data?.map(
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
          ...finalResult?.summary,
          _meta_data: [
            // eslint-disable-next-line
            ...finalResult.summary?._meta_data,
            ...updateMetaData,
          ]?.map((attr, index) => {
            return {
              ...attr,
              id: index + 1,
            };
          }),
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

export const autoCompleteClose = (removeHook) => {
  const modalOpened = document.createElement('div');
  modalOpened.classList.add('modal-opened');
  document.body.appendChild(modalOpened);
  modalOpened.addEventListener('click', () => {
    removeHook();
    document.body.removeChild(modalOpened);
  });
};
