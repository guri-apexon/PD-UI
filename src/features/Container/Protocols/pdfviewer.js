import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function Pdf() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    console.log('setpages', numPages);
  };

  return (
    <div>
      <Document
        file="/ALM-Executing-TestCases_DefectManagementProcess.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* <Page pageNumber={pageNumber} /> */}
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            className="pdf-page"
            pageNumber={index + 1}
            width="510"
            id={index}
          />
        ))}
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
export default Pdf;
