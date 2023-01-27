import { render, fireEvent } from '@testing-library/react';
import RenderContent from '../CustomComponents/RenderContent';

describe('RenderContent', () => {
  const handleContentEditMock = jest.fn();
  const setActiveLineIDMock = jest.fn();
  const deleteSectionMock = jest.fn();
  const sectionData = {
    type: 'text',
    content: 'Test content',
    line_id: 'line-1',
  };

  it('renders the correct content and edit button when type is text', () => {
    const { getByText } = render(
      <RenderContent
        sectionData={sectionData}
        handleContentEdit={handleContentEditMock}
        activeLineID="line-1"
        setActiveLineID={setActiveLineIDMock}
        deleteSection={deleteSectionMock}
      />,
    );
    expect(getByText('Test content')).toBeInTheDocument();
    expect(getByText('Edit')).toBeInTheDocument();
  });

  it('calls the handleContentEdit, setActiveLineID and deleteSection functions when clicking the edit button', () => {
    const { getByText } = render(
      <RenderContent
        sectionData={sectionData}
        handleContentEdit={handleContentEditMock}
        activeLineID="line-1"
        setActiveLineID={setActiveLineIDMock}
        deleteSection={deleteSectionMock}
      />,
    );
    fireEvent.click(getByText('Edit'));
    expect(handleContentEditMock).toHaveBeenCalledWith(sectionData);
    expect(setActiveLineIDMock).toHaveBeenCalledWith(sectionData.line_id);
    expect(deleteSectionMock).toHaveBeenCalledWith(sectionData.line_id);
  });

  it('renders the correct content and no edit button when edit is false', () => {
    const { getByText, queryByText } = render(
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
    expect(queryByText('Edit')).toBeNull();
  });
});
