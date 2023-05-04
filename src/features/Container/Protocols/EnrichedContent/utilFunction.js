const getKeyFromEnrichText = (term) => {
  if (term === 'preferred_term') return 'iqv_standard_term';
  if (term === 'clinical_terms') return 'clinical_terms';
  if (term === 'ontology') return 'ontology';
  return '';
};
export default { getKeyFromEnrichText };
