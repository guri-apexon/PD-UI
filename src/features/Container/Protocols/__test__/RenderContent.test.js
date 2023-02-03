import { render } from '@testing-library/react';
import RenderContent from '../CustomComponents/RenderContent';
import ProtocolContext from '../ProtocolContext';

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
    const { getByText } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <RenderContent
          sectionData={sectionData}
          handleContentEdit={handleContentEditMock}
          activeLineID="line-1"
          setActiveLineID={setActiveLineIDMock}
          deleteSection={deleteSectionMock}
          edit={false}
        />
      </ProtocolContext.Provider>,
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('renders the correct content and edit button when type is text', () => {
    const sectionData = {
      type: 'header',
      content: 'Test content',
      line_id: 'line-1',
    };
    const { getByText } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <RenderContent
          sectionData={sectionData}
          handleContentEdit={handleContentEditMock}
          activeLineID="line-1"
          setActiveLineID={setActiveLineIDMock}
          deleteSection={deleteSectionMock}
          edit={false}
        />
      </ProtocolContext.Provider>,
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('renders the correct content and edit button when type is text', () => {
    const sectionData = {
      type: 'table',
      content: null,
      line_id: 'line-1',
    };
    const { getByText } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <RenderContent
          sectionData={sectionData}
          handleContentEdit={handleContentEditMock}
          activeLineID="line-1"
          setActiveLineID={setActiveLineIDMock}
          deleteSection={deleteSectionMock}
          edit={false}
        />
      </ProtocolContext.Provider>,
    );
  });
});
