import { render, screen } from '@testing-library/react';
import RenderContent from '../CustomComponents/RenderContent';
import ProtocolContext from '../ProtocolContext';

const handleContentEdit = jest.fn();
const setActiveLineID = jest.fn();
const deleteSection = jest.fn();
describe('RenderContent component', () => {
  it('should render header type correctly', () => {
    const sectionData = { type: 'header', content: 'Header Content' };
    render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <RenderContent
          sectionData={sectionData}
          handleContentEdit={handleContentEdit}
          activeLineID=""
          setActiveLineID={setActiveLineID}
          deleteSection={deleteSection}
          edit={false}
        />
      </ProtocolContext.Provider>,
    );

    expect(screen.getByText(/Header Content/)).toBeInTheDocument();
  });

  it('should render text type correctly', () => {
    const sectionData = { type: 'text', content: 'Text Content' };
    render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <RenderContent
          sectionData={sectionData}
          handleContentEdit={handleContentEdit}
          activeLineID=""
          setActiveLineID={setActiveLineID}
          deleteSection={deleteSection}
          edit={false}
        />
      </ProtocolContext.Provider>,
    );

    expect(screen.getByText(/Text Content/)).toBeInTheDocument();
  });

  it('should render image type correctly', () => {
    const sectionData = { type: 'image', content: 'Image Content' };
    render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <RenderContent
          sectionData={sectionData}
          handleContentEdit={handleContentEdit}
          activeLineID=""
          setActiveLineID={setActiveLineID}
          deleteSection={deleteSection}
          edit={false}
        />
      </ProtocolContext.Provider>,
    );
  });
});
