import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector } from 'react-redux';
import { screen } from '../../../../../test-utils/test-utils';
import AddClinicalTerm from '../AddClinicalTerm';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe('rendering the Add Clinical Term Component', () => {
  beforeEach(() => {
    window.getSelection = () => {
      return 'enrollment';
    };
  });
  test('select text and click on AddTag, popup will come with disabled Add tag button', () => {
    const state = {
      modal: true,
    };
    useSelector.mockImplementation(() => state);
    render(<AddClinicalTerm docId={1} linkId={2} />);
    expect(screen.getByRole('button', { name: 'Add tag' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
    expect(
      screen.getByText(
        /At least one of these options are required to be filled to add tag/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add tag' })).toBeDisabled();
  });

  test('enter the clinicalTerms, Ontology and Preferred-Terms TextFields and click on AddTag button', () => {
    const state = {
      modal: true,
    };
    useSelector.mockImplementation(() => state);
    render(<AddClinicalTerm docId={1} linkId={2} />);
    userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
    const field1 = screen
      .getByTestId('clinicalTerms-text')
      .querySelector('input');
    expect(field1).toBeInTheDocument();
    fireEvent.change(field1, { target: { value: 'some text' } });
    expect(field1.value).toBe('some text');
    const field2 = screen.getByTestId('ontology-text').querySelector('input');
    expect(field2).toBeInTheDocument();
    fireEvent.change(field2, { target: { value: 'some text' } });
    expect(field2.value).toBe('some text');
    const field3 = screen
      .getByTestId('Preferred-term-text')
      .querySelector('input');
    expect(field3).toBeInTheDocument();
    fireEvent.change(field3, { target: { value: 'some text' } });
    expect(field3.value).toBe('some text');
    expect(screen.getByRole('button', { name: 'Add tag' })).toBeEnabled();
    userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
  });
});
