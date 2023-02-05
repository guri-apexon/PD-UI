import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import MedicalTerm from '../EnrichedContent/MedicalTerm';
import { screen } from '../../../../test-utils/test-utils';

describe('MedicalTerm component', () => {
  const mockEnrichedTarget = 'test-mock-target';
  const mockEnrichedText = 'test-mock-text';
  const mockClinicalTerms = {
    'test-mock-text': { synonyms: 'value1, value2' },
  };
  const linkId = '46bac1b7-9197-11ed-b507-005056ab6469';
  const docId = '4c7ea27b-8a6b-4bf0-a8ed-2c1e49bbdc8c';

  const clinicalTerms = {
    Plasma: {
      synonyms: '1,2,3',
      medical_term: 'a,b,c,d',
      ontology: 'e,f,g,h',
      preferred_term: 'i,j,k,l',
    },
  };

  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <MedicalTerm
          enrichedTarget={mockEnrichedTarget}
          expanded
          enrichedText={mockEnrichedText}
          clinicalTerms={mockClinicalTerms}
          linkId={linkId}
          docId={docId}
        />
        ,
      </Provider>,
    );
    expect(container).toBeInTheDocument();
  });

  it('does not render when expanded is false', () => {
    const { container } = render(
      <Provider store={store}>
        <MedicalTerm
          enrichedTarget={mockEnrichedTarget}
          expanded={false}
          enrichedText={mockEnrichedText}
          clinicalTerms={mockClinicalTerms}
          linkId={linkId}
          docId={docId}
        />
        ,
      </Provider>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders main and sub popper cards', () => {
    const { getByTestId, getAllByTestId, getByText } = render(
      <Provider store={store}>
        <MedicalTerm
          enrichedTarget={mockEnrichedTarget}
          expanded
          enrichedText={mockEnrichedText}
          clinicalTerms={mockClinicalTerms}
          linkId={linkId}
          docId={docId}
        />
        ,
      </Provider>,
    );

    const termList = getByTestId('term-list');
    const parentItem = getAllByTestId('handleSave')[0];
    fireEvent.click(parentItem);
    screen.debug();
    const childTerm = getAllByTestId('update-term-trigger');
    fireEvent.click(childTerm[0]);
    const updateField = getByTestId('update-term-field');
    fireEvent.change(updateField, { target: { value: 'new term' } });
    fireEvent.click(getByText('Rename'));
    expect(termList).toBeInTheDocument();
  });

  test('should render the clinical terms', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MedicalTerm
          enrichedTarget={<span>Plasma</span>}
          expanded
          enrichedText="Plasma"
          clinicalTerms={clinicalTerms}
        />
      </Provider>,
    );
    const listItems = getAllByTestId('clinicalTermsList');
    expect(listItems.length).toEqual(5);
  });

  test('should render the child terms when clicked on any option', () => {
    const { getByText, getAllByTestId, getAllByTitle, getByTestId } = render(
      <Provider store={store}>
        <MedicalTerm
          enrichedTarget={<span>Plasma</span>}
          expanded
          enrichedText="Plasma"
          clinicalTerms={clinicalTerms}
        />{' '}
      </Provider>,
    );
    const Synonyms = getByText('Synonyms');
    fireEvent.click(Synonyms);
    const listItems = getAllByTestId('childItems');
    expect(listItems.length).toEqual(3);

    const editIcon = getAllByTitle('Edit')[0];
    fireEvent.click(editIcon);

    const textbox = getByTestId('textbox');
    expect(textbox).toBeInTheDocument();
    textbox.focus();

    fireEvent.keyDown(textbox, {
      key: 'a',
      code: 'keyA',
      charCode: 65,
    });

    const btnRename = getByText('Rename');
    fireEvent.click(btnRename);
  });
});
