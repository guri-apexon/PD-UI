import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import AddClinicalTerm from '../EnrichedContent/AddClinicalTerm';

describe('AddClinicalTerm', () => {
  it('should render the Add tag button when text is selected', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <AddClinicalTerm docId="1" />
      </Provider>,
    );
    expect(getByTestId('add-tag')).toBeInTheDocument();
  });

  it('should open the modal when Add tag button is clicked', () => {
    const { getByTestId, getByLabelText } = render(
      <Provider store={store}>
        <AddClinicalTerm docId="1" />
      </Provider>,
    );
    const addButton = getByTestId('add-tag');
    fireEvent.click(addButton);

    const clinicalTermsInput = getByLabelText('Clinical terms');
    expect(clinicalTermsInput).toBeInTheDocument();
  });

  it('should add a tag when the Add tag button in the modal is clicked', () => {
    const mockDispatch = jest.fn();
    jest.mock('react-redux', () => ({
      useDispatch: () => mockDispatch,
    }));

    const { getByText, getByLabelText } = render(<AddClinicalTerm docId="1" />);
    const addButton = getByText('Add tag');
    fireEvent.click(addButton);

    const clinicalTermsInput = getByLabelText('Clinical terms');
    const ontologyInput = getByLabelText('Ontology');
    const preferredTermInput = getByLabelText('Preferred term');
    const saveButton = getByText('Add tag', { selector: 'button' });

    fireEvent.change(clinicalTermsInput, {
      target: { value: 'test clinical terms' },
    });
    fireEvent.change(ontologyInput, { target: { value: 'test ontology' } });
    fireEvent.change(preferredTermInput, {
      target: { value: 'test preferred term' },
    });
    fireEvent.click(saveButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SAVE_ENRICHED_DATA',
      payload: {
        docId: '1',
        data: {
          standard_entity_name: '',
          iqv_standard_term: 'test preferred term',
          ontology: 'test ontology',
          clinical_terms: 'test clinical terms',
        },
      },
    });
  });
});
