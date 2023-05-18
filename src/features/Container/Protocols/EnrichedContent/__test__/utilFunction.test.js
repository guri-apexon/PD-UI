import {
  getKeyFromEnrichText,
  preferredTermsValidation,
} from '../utilFunction';

describe('getKeyFromEnrichText', () => {
  it('should return "iqv_standard_term" when the input is "preferred_term"', () => {
    expect(getKeyFromEnrichText('preferred_term')).toBe('iqv_standard_term');
  });

  it('should return "clinical_terms" when the input is "clinical_terms"', () => {
    expect(getKeyFromEnrichText('clinical_terms')).toBe('clinical_terms');
  });

  it('should return "ontology" when the input is "ontology"', () => {
    expect(getKeyFromEnrichText('ontology')).toBe('ontology');
  });

  it('should return an empty string when the input is not matched with any condition', () => {
    expect(getKeyFromEnrichText('other_term')).toBe('');
  });
});

describe('preferredTermsValidation', () => {
  it('should return an empty string when the value is an empty string', () => {
    expect(preferredTermsValidation('')).toBe('');
  });

  it('should return the correct error message when the value contains a comma', () => {
    expect(preferredTermsValidation('term1, term2')).toBe(
      'Please tag only one Preferred Term. ',
    );
  });

  it('should return the correct error message when the value contains multiple words', () => {
    expect(preferredTermsValidation('term1 term2')).toBe(
      'Please tag only one Preferred Term. ',
    );
  });

  it('should return the correct error message when the value does not contain "cpt_" prefix', () => {
    expect(preferredTermsValidation('term')).toBe(
      'Please prefix Preferred Term with "cpt_"',
    );
  });

  it('should return an empty string when the value is valid', () => {
    expect(preferredTermsValidation('cpt_term')).toBe('');
  });
});

describe('preferredTermsValidation', () => {
  test('returns an empty string when the value is empty', () => {
    const result = preferredTermsValidation('');
    expect(result).toBe('');
  });

  test('returns an error message when multiple terms are tagged', () => {
    const result = preferredTermsValidation('cpt_123, cpt_456');
    expect(result).toBe('Please tag only one Preferred Term. ');
  });

  test('returns an error message when the term is not prefixed with "cpt_"', () => {
    const result = preferredTermsValidation('invalid_term');
    expect(result).toBe('Please prefix Preferred Term with "cpt_"');
  });

  test('returns an empty string when a single term is tagged and prefixed with "cpt_"', () => {
    const result = preferredTermsValidation('cpt_123');
    expect(result).toBe('');
  });
});
