import { render } from '../../../../test-utils/test-utils';
import MedicalTerm from '../EnrichedContent/MedicalTerm';

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(<MedicalTerm />);
    expect(component).toBeTruthy();
  });
});
