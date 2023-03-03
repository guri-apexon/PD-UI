import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import AddClinicalTerm from '../EnrichedContent/AddClinicalTerm';

describe('AddClinicalTerm', () => {
  const docId = 'test-doc-id';
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the component', () => {
    render(
      <Provider store={store}>
        <AddClinicalTerm docId={docId} />
      </Provider>,
    );
    // expect(screen.getByText('Add tag')).toBeInTheDocument();
  });

  it('opens the modal when "Add tag" button is clicked', () => {
    render(
      <Provider store={store}>
        <AddClinicalTerm docId={docId} />
      </Provider>,
    );
    fireEvent.mouseUp(document.body);
    // fireEvent.click(screen.getByText('Add tag'));
    expect(
      screen.getByLabelText('Add term to selected term/phrase'),
    ).toBeInTheDocument();
  });

  it('closes the modal when "Cancel" button is clicked', () => {
    render(
      <Provider store={store}>
        <AddClinicalTerm docId={docId} />
      </Provider>,
    );
    fireEvent.mouseUp(document.body);
    // fireEvent.click(screen.getByText('Add tag'));
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(
      screen.queryByLabelText('Add term to selected term/phrase'),
    ).not.toBeInTheDocument();
  });

  it('calls the dispatch function with the correct arguments when "Add tag" button is clicked', () => {
    const selectedText = 'test-selected-text';
    const clinicalTerms = 'test-clinical-terms';
    const ontology = 'test-ontology';
    const preferredTerm = 'test-preferred-term';
    render(
      <Provider store={store}>
        <AddClinicalTerm docId={docId} />
      </Provider>,
    );
    fireEvent.mouseUp(document.body);
    // fireEvent.click(screen.getByText('Add tag'));
    fireEvent.change(screen.getByLabelText('Clinical terms'), {
      target: { value: clinicalTerms },
    });
    fireEvent.change(screen.getByLabelText('Ontology'), {
      target: { value: ontology },
    });
    fireEvent.change(screen.getByLabelText('Preferred term'), {
      target: { value: preferredTerm },
    });
    fireEvent.click(screen.getByLabelText('Add tag'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SAVE_ENRICHED_DATA',
      payload: {
        docId,
        data: {
          standard_entity_name: selectedText,
          iqv_standard_term: preferredTerm,
          clinical_terms: clinicalTerms,
        },
      },
    });
  });
});
