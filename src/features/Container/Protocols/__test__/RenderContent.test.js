import { render } from '@testing-library/react';
import RenderContent from '../CustomComponents/RenderContent';
import * as ProtocolContext from '../ProtocolContext';
import { CONTENT_TYPE } from '../../../../AppConstant/AppConstant';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));
describe('RenderContent', () => {
  const handleContentEditMock = jest.fn();
  const setActiveLineIDMock = jest.fn();
  const deleteSectionMock = jest.fn();

  it('renders the correct content and edit button when type is text', () => {
    const sectionData = {
      type: 'text',
      content: 'Test content',
      line_id: 'line-1',
    };
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByText } = render(
      <RenderContent
        sectionData={sectionData}
        handleContentEdit={handleContentEditMock}
        activeLineID="line-1"
        setActiveLineID={setActiveLineIDMock}
        deleteSection={deleteSectionMock}
        edit={false}
      />,
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('renders the correct content and edit button when type is header', () => {
    const sectionData = {
      type: 'header',
      content: 'Test content',
      line_id: 'line-1',
    };
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByText } = render(
      <RenderContent
        sectionData={sectionData}
        handleContentEdit={handleContentEditMock}
        activeLineID="line-1"
        setActiveLineID={setActiveLineIDMock}
        deleteSection={deleteSectionMock}
        edit={false}
      />,
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('renders the correct content and edit button when type is image', () => {
    const sectionData = {
      type: 'image',
      content: 'img',
      line_id: 'line-1',
    };
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByTestId } = render(
      <RenderContent
        sectionData={sectionData}
        handleContentEdit={handleContentEditMock}
        activeLineID="line-1"
        setActiveLineID={setActiveLineIDMock}
        deleteSection={deleteSectionMock}
        edit={false}
      />,
    );
    expect(getByTestId('readmode-img')).toBeInTheDocument();
  });

  it('renders the correct content and edit button when type is table', () => {
    const sectionTableData = {
      type: 'table',
      content: {
        Table:
          '<table border="1" class="dataframe">\n  <thead>\n    <tr style="text-align: right;">\n      <th>ColIndex</th>\n      <th>1.0</th>\n      <th>2.0</th>\n      <th>3.0</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>0</th>\n      <td>3</td>\n      <td>1</td>\n      <td>1</td>\n    </tr>\n    <tr>\n      <th>1</th>\n      <td>3</td>\n      <td>2</td>\n      <td>2</td>\n    </tr>\n  </tbody>\n</table>',
        TableProperties:
          '[{"row_indx": 0, "roi_id": "4d6bf3cc-b5e8-4dbe-b65d-e6e5c81a68be", "op_type": null, "columns": [{"col_indx": 0, "op_type": null, "cell_id": "bc8eaf44-5b77-4e8a-b4db-22e00c56873d", "value": "3"}, {"col_indx": 1, "op_type": null, "cell_id": "48678342-7924-4d5e-b514-d11e2723723c", "value": "1"}, {"col_indx": 2, "op_type": null, "cell_id": "0ae22bb5-0afe-4682-8ced-d95fb6799d44", "value": "1"}]}, {"row_indx": 1, "roi_id": "c36c8423-b6a8-4e17-b09c-6913bea3bf4f", "op_type": null, "columns": [{"col_indx": 0, "op_type": null, "cell_id": "520714cf-e6d1-48a7-8291-8a3b0129f99e", "value": "3"}, {"col_indx": 1, "op_type": null, "cell_id": "8f187714-a6fa-497f-a7dc-38155f9e49a6", "value": "2"}, {"col_indx": 2, "op_type": null, "cell_id": "4106bd2d-0255-492c-bf62-84de4c8189c2", "value": "2"}]}]',
        AttachmentListProperties: [],
        TableIndex: '5',
        TableName: '',
        Header: [0],
      },
      line_id: 'line-1',
    };
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    render(
      <RenderContent
        sectionData={sectionTableData}
        handleContentEdit={handleContentEditMock}
        activeLineID="line-1"
        setActiveLineID={setActiveLineIDMock}
        deleteSection={deleteSectionMock}
        edit={false}
      />,
    );
  });
});

const sectionData = {
  type: CONTENT_TYPE.HEADER,
  content: 'Example header content',
  line_id: 1,
};

describe('RenderContent', () => {
  it('should render header content correctly', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByText } = render(
      <RenderContent
        sectionData={sectionData}
        handleContentEdit={() => {}}
        activeLineID={1}
        setActiveLineID={() => {}}
        deleteSection={() => {}}
        edit={() => {}}
      />,
    );

    expect(getByText('Example header content')).toBeInTheDocument();
  });

  it('should render text content correctly', () => {
    const textSectionData = {
      type: CONTENT_TYPE.TEXT,
      content: 'Example text content',
      line_id: 2,
    };
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByText } = render(
      <RenderContent
        sectionData={textSectionData}
        handleContentEdit={() => {}}
        activeLineID={2}
        setActiveLineID={() => {}}
        deleteSection={() => {}}
        edit={() => {}}
      />,
    );

    expect(getByText('Example text content')).toBeInTheDocument();
  });

  it('should render image content correctly', () => {
    const imageSectionData = {
      type: CONTENT_TYPE.IMAGE,
      content: 'https://example.com/image.jpg',
      line_id: 4,
    };
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByRole } = render(
      <RenderContent
        sectionData={imageSectionData}
        handleContentEdit={() => {}}
        activeLineID={4}
        setActiveLineID={() => {}}
        deleteSection={() => {}}
        edit={() => {}}
      />,
    );

    expect(getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/image.jpg',
    );
  });
});
