const getKeyFromEnrichText = (term) => {
  if (term === 'preferred_term') return 'iqv_standard_term';
  if (term === 'clinical_terms') return 'clinical_terms';
  if (term === 'ontology') return 'ontology';
  return '';
};

const preferredTermsValidation = (value, preferredTerm) => {
  let msg = '';
  const pTLowerCase = value.toLowerCase();
  const arr = value.split(' ');
  if (value === '') {
    msg = '';
  } else if (value.includes(',') || arr.length > 1 || preferredTerm) {
    msg = 'Please tag only one Preferred Term. ';
    if (preferredTerm) {
      msg += `${preferredTerm} is already tagged Term`;
    }
  } else if (!pTLowerCase.startsWith('cpt_')) {
    msg = 'Please prefix Preferred Term with "cpt_"';
  }

  return msg;
};
export { getKeyFromEnrichText, preferredTermsValidation };
