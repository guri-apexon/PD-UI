import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from 'apollo-react/components/Button';
import Pagination from 'apollo-react/components/Pagination';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import PlusIcon from 'apollo-react-icons/Plus';
import Minus from 'apollo-react-icons/Minus';
import { Column } from 'react-virtualized';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function Pdf({ page, refs }) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setPage] = useState(0);
  const [pageScale, setPageScale] = useState(1);
  // const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    if (page === 'undefined' || page === undefined) {
      //  refs[1].current.scrollIntoView({ behavior: 'smooth' });
    } else {
      refs[page - 1].current.scrollIntoView({ behavior: 'instant' });
    }
  }, [page]);

  useEffect(() => {
    if (refs[currentPage].current) {
      refs[currentPage].current.scrollIntoView({ behavior: 'instant' });
    }
  }, [currentPage]);

  const clickHandler = () => {
    refs[2].current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleZoomIn = () => {
    if (pageScale < 1.2) {
      setPageScale(pageScale + 0.1);
    }
  };
  const handleZoomOut = () => {
    if (pageScale >= 0.5) {
      setPageScale(pageScale - 0.1);
    }
  };

  return (
    <div
      id="pdfDocument"
      className="pdf_container"
      data-testid="protocol-column-wrapper"
    >
      <Document
        file="/ALM-Executing-TestCases_DefectManagementProcess.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div ref={refs[index]} key={index}>
            <Page
              key={`page_${index + 1}`}
              className="pdf-page"
              pageNumber={index + 1}
              width="510"
              id={index}
              scale={pageScale}
            />
          </div>
        ))}
      </Document>
      <div className="sticky-bottom">
        <Pagination
          count={numPages}
          rowsPerPage={1}
          page={currentPage}
          onChangePage={(pg) => setPage(pg)}
        />
        <div>
          <Button
            size="small"
            icon={<PlusIcon />}
            className="buttonStyles"
            data-testid="zoomIn"
            disabled={pageScale >= 1.5}
            onClick={handleZoomIn}
          >
            {' '}
          </Button>
          <Button
            size="small"
            icon={<Minus />}
            className="buttonStyles"
            data-testid="zoomOut"
            disabled={pageScale <= 0.5}
            onClick={handleZoomOut}
          >
            {' '}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Pdf;
Pdf.propTypes = {
  page: PropTypes.isRequired,
  refs: PropTypes.isRequired,
};
