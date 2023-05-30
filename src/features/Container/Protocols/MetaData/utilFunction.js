import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';
import moment from 'moment';

const formattedValue = (type, val) => {
  let payloadData = val;
  if (type === 'boolean') {
    payloadData = payloadData?.toString();
  }
  if (type === 'date' && payloadData) {
    payloadData = moment(payloadData).format('DD-MMM-YYYY');
  }
  return payloadData;
};

const findLatestTimestamp = (data) => {
  const sortedList = data?.sort((a, b) => {
    return (
      new Date(b.audit_info?.last_updated) -
      new Date(a.audit_info?.last_updated)
    );
  });
  return sortedList?.[0]?.audit_info || {};
};

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
              const attrValue = formattedValue(
                attr?.attr_type,
                attr?.attr_value,
              );
              return {
                ...attr,
                id: index + 1,
                isCustom: false,
                attr_value: formattedValue(attr?.attr_type, attrValue),
                display_name: attr?.display_name || attr?.attr_name,
              };
            }),
            formattedName: identifier,
            name: key,
            level,
            is_active: keyValue?.is_active,
            is_default: keyValue?.is_default,
            isEdit: false,
            isActive: false,
            audit_info:
              // eslint-disable-next-line
              findLatestTimestamp(keyValue?._meta_data) || {},
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
  let finalResult = cloneDeep(data);
  const objectKeys = data ? Object?.keys(data) : [];

  objectKeys.forEach((key) => {
    if (key === 'summary_extended' && finalResult?.summary_extended) {
      // eslint-disable-next-line
      const updateMetaData = finalResult?.summary_extended?._meta_data?.map(
        (fields) => {
          return {
            ...fields,
            isCustom: false,
          };
        },
      );
      const mergedMetaData = [
        // eslint-disable-next-line
        ...finalResult.Summary?._meta_data,
        ...updateMetaData,
      ]?.map((attr, index) => {
        return {
          ...attr,
          id: index + 1,
        };
      });

      finalResult = {
        ...finalResult,
        Summary: {
          ...finalResult?.Summary,
          audit_info: findLatestTimestamp(mergedMetaData) || {},
          _meta_data: mergedMetaData.sort((a, b) => a.id - b.id),
          /* eslint-disable */
          _childs: finalResult.summary_extended._childs
            ? [
                ...finalResult.Summary._childs,

                ...finalResult.summary_extended._childs,
              ]
            : [...finalResult.Summary._childs],
          /* eslint-enable */
        },
      };
    }
  });
  delete finalResult.summary_extended;
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

export const checkDuplicates = (data) => {
  const unique = data?.filter(
    (obj, index) =>
      data.findIndex(
        (attr) =>
          attr?.attr_name?.toLowerCase() === obj?.attr_name?.toLowerCase(),
      ) === index,
  );

  return unique?.length === data?.length;
};

export const validationCheck = (rowData) => {
  let isValid = true;
  if (rowData?.length > 0) {
    const keys = Object.keys(rowData[0]);
    keys.forEach((key) => {
      rowData.forEach((data) => {
        if (
          (key === 'attr_name' || key === 'attr_value') &&
          data.isCustom &&
          (!data[key] || !data[key]?.toString().trim())
        ) {
          isValid = false;
        }
      });
    });
  }

  return isValid;
};
