/* eslint-disable */
import { render, screen } from '../../../../../test-utils/test-utils';
import AssessmentContent from '../Assessment/AssessmentContent';
import { contentData, data } from '../__mock__/_assessment.mock_data';

const initialData = {
  protocol: {
    assessments: data,
  },
};

describe('<AssessmentContent />', () => {
  it('Should Render without error', () => {
    render(
      <AssessmentContent
        assessments={contentData.data}
        isEditEnabled={true}
        showModal={true}
        columns={data.data.columns}
        dropDownData={contentData.dropDownData}
        handleSelection={jest.fn()}
        handleAdd={jest.fn()}
        getFinalDataFromTable={jest.fn()}
        datafetch={false}
        handleTableChange={jest.fn()}
      />,
      {
        initialState: initialData,
      },
    );
    const assessment = screen.getByTestId('assessment-content');
    expect(assessment).toBeInTheDocument();
  });
  it('Should enable edit', () => {
    render(
      <AssessmentContent
        assessments={contentData.data}
        isEditEnabled={false}
        showModal={true}
        columns={data.data.columns}
        dropDownData={contentData.dropDownData}
        handleSelection={jest.fn()}
        handleAdd={jest.fn()}
        getFinalDataFromTable={jest.fn()}
        datafetch={false}
        handleTableChange={jest.fn()}
      />,
      {
        initialState: initialData,
      },
    );
    const assessment = screen.getByTestId('edit-modal-assessment');
    expect(assessment).toBeInTheDocument();
  });
  it('Should be able to discard edit mode', () => {
    render(
      <AssessmentContent
        assessments={contentData.data}
        isEditEnabled={true}
        showModal={true}
        columns={data.data.columns}
        dropDownData={contentData.dropDownData}
        handleSelection={jest.fn()}
        handleAdd={jest.fn()}
        getFinalDataFromTable={jest.fn()}
        datafetch={false}
        handleTableChange={jest.fn()}
      />,
      {
        initialState: initialData,
      },
    );
    const assessment = screen.getByTestId('discard-assessmentContent');
    expect(assessment).toBeInTheDocument();
  });
});
