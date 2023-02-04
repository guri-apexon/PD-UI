import {
  fireEvent,
  getAllByTitle,
  getByTestId,
  render,
} from '../../../../test-utils/test-utils';
import MedicalTerm from '../EnrichedContent/MedicalTerm';

describe('Metadata Accordian View', () => {
  const clinicalTerms = {
    Plasma: {
      synonyms: '1,2,3',
      medical_term: 'a,b,c,d',
      ontology: 'e,f,g,h',
      preferred_term: 'i,j,k,l',
    },
  };
  test('should render the component', () => {
    const component = render(
      <MedicalTerm
        enrichedTarget={<span>Plasma</span>}
        expanded
        enrichedText="Plasma"
        clinicalTerms={clinicalTerms}
      />,
    );
    expect(component).toBeTruthy();
  });

  test('should render the clinical terms', () => {
    const { getAllByTestId } = render(
      <MedicalTerm
        enrichedTarget={<span>Plasma</span>}
        expanded
        enrichedText="Plasma"
        clinicalTerms={clinicalTerms}
      />,
    );
    const listItems = getAllByTestId('clinicalTermsList');
    expect(listItems.length).toEqual(5);
  });

  test('should render the child terms when clicked on any option', () => {
    const { getByText, getAllByTestId, debug, getAllByTitle, getByTestId } =
      render(
        <MedicalTerm
          enrichedTarget={<span>Plasma</span>}
          expanded
          enrichedText="Plasma"
          clinicalTerms={clinicalTerms}
        />,
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
    // expect(editIcon.length).toEqual(3);
  });
});
