import { render } from '@testing-library/react';
import MedicalTerm from '../EnrichedContent/MedicalTerm';

const sample = [
  {
    content: 'This is an Example',
  },
];

describe('Medical Term', () => {
  test('should render the component', () => {
    const component = render(<MedicalTerm data={sample} />);
    const clinicalTerms = component.getByTestId('ClinicalTerms');
    expect(component).toBeTruthy();
    expect(clinicalTerms).toBeInTheDocument();
  });
});
