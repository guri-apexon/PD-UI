import { useState } from 'react';
import { render } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Pdf from '../pdfviewer';

function Testing() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <Pdf
      value={(numPages, pageNumber)}
      setValue={(setNumPages, setPageNumber)}
      onDocumentLoadSuccess={numPages}
      setNumPages={numPages}
    />
  );
}

function Testing2() {
  const onDocumentLoadSuccess = ({ numPages }) => {};
  return <Pdf />;
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
});
