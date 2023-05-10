import getKeyFromEnrichText from '../utilFunction';

describe('getKeyFromEnrichText', () => {
  it('should return the correct key for "preferred_term"', () => {
    const result = getKeyFromEnrichText('preferred_term');
    expect(result).toEqual('iqv_standard_term');
  });

  it('should return the correct key for "clinical_terms"', () => {
    const result = getKeyFromEnrichText('clinical_terms');
    expect(result).toEqual('clinical_terms');
  });

  it('should return the correct key for "ontology"', () => {
    const result = getKeyFromEnrichText('ontology');
    expect(result).toEqual('ontology');
  });

  it('should return an empty string for other terms', () => {
    const result = getKeyFromEnrichText('unknown_term');
    expect(result).toEqual('');
  });
});
