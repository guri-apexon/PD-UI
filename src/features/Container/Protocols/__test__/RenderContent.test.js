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
    const sectionData = {
      type: 'table',
      content: null,
      line_id: 'line-1',
    };
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    render(
      <RenderContent
        sectionData={sectionData}
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
