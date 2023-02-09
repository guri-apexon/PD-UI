/* eslint-disable import/prefer-default-export */
export const restructingObjecttilsFun = (
  clinicalTermsArr,
  enrichedText,
  setPreferredTerm,
  setSynonyms,
  setClassification,
  setOntologyTemp,
) => {
  if (clinicalTermsArr) {
    Object.entries(clinicalTermsArr[enrichedText] || {}).forEach(
      (key, value) => {
        if (key === 'preferred_term') {
          setPreferredTerm(value);
        }
        if (key === 'synonyms') {
          setSynonyms(value);
        }
        if (key === 'classification') {
          setClassification(value);
        }
        if (key === 'ontology') {
          setOntologyTemp(value);
        }
      },
    );
  }
};

export const enrichedTextUtilsFun = (
  enrichedText,
  setClinicalTerms,
  enrichedTerms,
  restructingObject,
  setSAnchorEl,
) => {
  if (enrichedText) {
    setClinicalTerms([...enrichedTerms]);
    restructingObject();
  } else {
    setClinicalTerms([]);
    setSAnchorEl(null);
  }
};

export const selectedTermUtilsFun = (
  selectedTerm,
  clinicalTermsArr,
  enrichedText,
  setChildArr,
) => {
  if (selectedTerm && clinicalTermsArr) {
    const arr = clinicalTermsArr[enrichedText][selectedTerm]?.split(',');
    if (arr && arr.length === 1 && arr[0] === '') {
      setChildArr([]);
    } else {
      setChildArr(arr);
    }
  }
};

export const expandedUtilsFun = (expanded, setAnchorEl, setSAnchorEl) => {
  if (!expanded) {
    setAnchorEl(null);
    setSAnchorEl(null);
  }
};

export const anchorElUtilsFun = (anchorEl, setSAnchorEl) => {
  if (!anchorEl) {
    setSAnchorEl(null);
  }
};

export const apiFlagselectorUtilsFun = (
  apiFlagselector,
  clinicalTermsArr,
  setChildArr,
  tempChild,
  enrichedText,
  selectedTerm,
  setClinicalTermsArr,
  dispatch,
) => {
  if (apiFlagselector && clinicalTermsArr) {
    setChildArr(tempChild);
    const obj = {
      [enrichedText]: {
        ...clinicalTermsArr[enrichedText],
        [selectedTerm]: tempChild.toString(),
      },
    };
    setClinicalTermsArr(obj);
    dispatch({
      type: 'GET_ENRICHED_API',
      payload: { flag: false },
    });
  }
};

export const handleSaveUtilsFun = (
  newTermValue,
  childTermValue,
  selectedTerm,
  childArr,
  setTempChild,
  setChildTermValue,
  enrichedText,
  preferredTerm,
  classification,
  synonyms,
  ontologyTemp,
  dispatch,
  docId,
  linkId,
) => {
  if (newTermValue === '') {
    return false;
  }

  if (!childTermValue || !selectedTerm) return false;
  const temp = [...childArr];

  const newArr = temp.map((x) => {
    if (x === childTermValue) {
      return newTermValue;
    }
    return x;
  });
  setTempChild(newArr);

  setChildTermValue(null);
  let name;
  if (selectedTerm === 'synonyms') name = 'entity_xref';
  else if (selectedTerm === 'classification') name = 'entity_class';
  else if (selectedTerm === 'preferred_term') name = 'iqv_standard_term';
  else if (selectedTerm === 'ontology') name = 'ontology';
  const tempObj = {
    standard_entity_name: enrichedText,
    iqv_standard_term: preferredTerm,
    entity_class: classification,
    entity_xref: synonyms,
    ontology: ontologyTemp,
  };
  const saveObj = { ...tempObj, [name]: newArr.toString() };

  dispatch({
    type: 'SAVE_ENRICHED_DATA',
    payload: {
      docId,
      linkId,
      data: saveObj,
    },
  });
  return true;
};
