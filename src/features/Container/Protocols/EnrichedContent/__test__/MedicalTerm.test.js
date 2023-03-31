import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../../../../store/store';
import { screen } from '../../../../../test-utils/test-utils';
import MedicalTerm from '../MedicalTerm';

describe('MedicalTerm component', () => {
  const mockEnrichedTarget = 'test-mock-target';
  const mockEnrichedText = 'test-mock-text';
  const mockClinicalTerms = {
    'test-mock-text': { synonyms: 'value1, value2' },
  };
  const linkId = '46bac1b7-9197-11ed-b507-005056ab6469';
  const docId = '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c';
  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        {' '}
        <MedicalTerm
          enrichedTarget={mockEnrichedTarget}
          expanded
          enrichedText={mockEnrichedText}
          clinicalTerms={mockClinicalTerms}
          linkId={linkId}
          docId={docId}
        />{' '}
        ,{' '}
      </Provider>,
    );
    expect(container).toBeInTheDocument();
  });
  it('does not render when expanded is false', () => {
    const { container } = render(
      <Provider store={store}>
        {' '}
        <MedicalTerm
          enrichedTarget={mockEnrichedTarget}
          expanded={false}
          enrichedText={mockEnrichedText}
          clinicalTerms={mockClinicalTerms}
          linkId={linkId}
          docId={docId}
        />{' '}
        ,{' '}
      </Provider>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('click on cancel icon on editing clinical term', () => {
    const clinicaltermsObject = {
      patients: {
        preferred_term: 'kumar, hari',
        ontology: 'shankarf',
        synonyms: '',
        medical_term: '',
        classification: '',
      },
    };
    render(
      <Provider store={store}>
        <MedicalTerm
          enrichedTarget={mockEnrichedTarget}
          expanded
          enrichedText="patients"
          clinicalTerms={clinicaltermsObject}
          linkId={linkId}
          docId={docId}
        />
      </Provider>,
    );
    userEvent.click(screen.getAllByTestId('listItem')[1]);
    expect(screen.getByText(/shankarf/i)).toBeInTheDocument();
    expect(screen.getByTestId('pencil-icon')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('pencil-icon'));
    expect(screen.getByTestId('input-term1')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-icon')).toBeInTheDocument();
    expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
    expect(screen.getByTestId('save-icon')).toBeInTheDocument();
    const field = screen.getByTestId('input-term1').querySelector('input');
    expect(field).toBeInTheDocument();
    fireEvent.change(field, { target: { value: 'some text' } });
    expect(field.value).toBe('some text');
    userEvent.click(screen.getByTestId('cancel-icon'));
    expect(screen.queryByTestId('cancel-icon')).not.toBeInTheDocument();
  });

  it('click on save icon on editing clinical term', () => {
    const clinicaltermsObject = {
      patients: {
        preferred_term: 'kumar, hari',
        ontology: 'shankarf',
        synonyms: '',
        medical_term: '',
        classification: '',
      },
    };
    render(
      <Provider store={store}>
        <MedicalTerm
          enrichedTarget={mockEnrichedTarget}
          expanded
          enrichedText="patients"
          clinicalTerms={clinicaltermsObject}
          linkId={linkId}
          docId={docId}
        />
      </Provider>,
    );
    userEvent.click(screen.getAllByTestId('listItem')[1]);
    userEvent.click(screen.getByTestId('pencil-icon'));
    expect(screen.getByTestId('save-icon')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('save-icon'));
  });

  it('click on delete icon on editing clinical term', () => {
    const clinicaltermsObject = {
      patients: {
        preferred_term: 'kumar, hari',
        ontology: 'shankarf',
        synonyms: '',
        medical_term: '',
        classification: '',
      },
    };
    render(
      <Provider store={store}>
        <MedicalTerm
          enrichedTarget={mockEnrichedTarget}
          expanded
          enrichedText="patients"
          clinicalTerms={clinicaltermsObject}
          linkId={linkId}
          docId={docId}
        />
      </Provider>,
    );
    userEvent.click(screen.getAllByTestId('listItem')[1]);
    userEvent.click(screen.getByTestId('pencil-icon'));
    expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('delete-icon'));
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete the tag /i),
    ).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Delete' }));
  });

  it('click on Delete tag button', () => {
    const clinicaltermsObject = {
      patients: {
        preferred_term: 'kumar, hari',
        ontology: 'shankarf',
        synonyms: '',
        medical_term: '',
        classification: '',
      },
    };
    render(
      <Provider store={store}>
        <MedicalTerm
          enrichedTarget={mockEnrichedTarget}
          expanded
          enrichedText="patients"
          clinicalTerms={clinicaltermsObject}
          linkId={linkId}
          docId={docId}
        />
      </Provider>,
    );
    expect(
      screen.getByRole('button', { name: 'Delete tag' }),
    ).toBeInTheDocument();
    userEvent.click(screen.getAllByTestId('listItem')[1]);
    userEvent.click(screen.getByRole('button', { name: 'Delete tag' }));
    userEvent.click(screen.getByRole('button', { name: 'Delete' }));
  });
});
