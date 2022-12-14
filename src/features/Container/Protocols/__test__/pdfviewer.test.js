import { useState } from 'react';
import { render, fireEvent } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Pdf from '../pdfviewer';

function Testing() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <Pdf
      value={(numPages, pageNumber)}
      setValue={(setNumPages, setPageNumber)}
    />
  );
}

function Testing2() {
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return <Pdf onDocumentLoadSuccess={numPages} setNumPages={numPages} />;
}

describe('pdfviewer component', () => {
  test('should show Pdf', () => {
    render(<Testing />);
  });
});

describe('Onload', () => {
  test('Document load Success', () => {
    render(<Testing2 />);
  });

  test('Zoom In Counter', () => {
    // render the component on virtual dom
    const screen = render(<Pdf />);
    const zoomIn = screen.getByTestId('zoomIn');
    expect(zoomIn).toBeInTheDocument();
    fireEvent.click(zoomIn);
  });

  //

  test('Zoom Out Counter', () => {
    // render the component on virtual dom
    const screen = render(<Pdf />);
    const zoomOut = screen.getByTestId('zoomOut');
    expect(zoomOut).toBeInTheDocument();
    fireEvent.click(zoomOut);
  });
});
