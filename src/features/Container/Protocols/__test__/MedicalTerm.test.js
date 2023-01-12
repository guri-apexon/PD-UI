import { render, fireEvent } from '../../../../test-utils/test-utils';
import MedicalTerm from '../EnrichedContent/MedicalTerm';

describe('HandleSave', () => {
  test('HandleSave', () => {
    const component = render(<MedicalTerm />);
    const Popper = component.getByTestId('Termlist');
    expect(Popper).toBeInTheDocument();
    fireEvent.click(Popper);
  });
});
