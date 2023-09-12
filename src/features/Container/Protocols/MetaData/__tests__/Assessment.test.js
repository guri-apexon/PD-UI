import {
  render,
  fireEvent,
  screen,
} from '../../../../../test-utils/test-utils';
import Assessment from '../Assessment/Assessment';
import { data } from '../__mock__/_assessment.mock_data';

const initialData = {
  protocol: {
    assessments: data,
  },
};

describe('<Assessment />', () => {
  it('Should Render without error', () => {
    render(<Assessment docId="1234" />, {
      initialState: initialData,
    });
    const assessment = screen.getByTestId('assessment-container');
    expect(assessment).toBeInTheDocument();
  });
  it('Should enable edit mode', () => {
    render(<Assessment docId="1234" />, {
      initialState: initialData,
    });
    const assessment = screen.getByTestId('edit-assessment');
    fireEvent.click(assessment);
    const saveIcon = screen.getByTestId('metadatasave-assessment');
    expect(saveIcon).toBeInTheDocument();
    fireEvent.click(saveIcon);
  });
  it('Should enable audit pop-up', () => {
    render(<Assessment docId="1234" />, {
      initialState: initialData,
    });
    const eyeIcon = screen.getByTestId('eyeIcon-assessment');
    fireEvent.click(eyeIcon);
  });
  it('Should expand accordion', () => {
    render(<Assessment docId="1234" />, {
      initialState: initialData,
    });
    const id = screen.getByTestId('assessment-accordion');
    fireEvent.click(id);
  });
  it('Should show full view', () => {
    render(<Assessment docId="1234" />, {
      initialState: initialData,
    });
    const id = screen.getByTestId('expand-assessment');
    fireEvent.click(id);
    // const edit = screen.getByTestId('edit-assessmentcontent');
    // fireEvent.click(edit);
    // const discard = screen.findByTestId('discard-assessmentContent');
    // fireEvent.click(discard);
  });
  it('Should add new row', () => {
    render(<Assessment docId="1234" />, {
      initialState: initialData,
    });
    const assessmentEdit = screen.getByTestId('edit-assessment');
    fireEvent.click(assessmentEdit);
    const id = screen.getByTestId('assessment-plus');
    fireEvent.click(id);
  });
  it('Should handle discard functionality', () => {
    render(<Assessment docId="1234" />, {
      initialState: initialData,
    });
    const assessmentEdit = screen.getByTestId('edit-assessment');
    fireEvent.click(assessmentEdit);
    const id = screen.getByTestId('discard-assessment');
    fireEvent.click(id);
    const discard = screen.getByText('Discard');
    fireEvent.click(discard);
  });
  // it.only('Should handle select functionality of no value', () => {
  //   render(<Assessment docId="1234" />, {
  //     initialState: initialData,
  //   });
  //   const assessmentEdit = screen.getByTestId('edit-assessment');
  //   fireEvent.click(assessmentEdit);
  //   const id = screen.getByTestId('select-assessment').children[1];
  //   fireEvent.click(id);
  //   const select = screen.getByTestId('option-assessmen-0');
  //   fireEvent.click(select);
  // });
});
