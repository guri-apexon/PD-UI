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
