import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from 'apollo-react/components/Button';
import Pagination from 'apollo-react/components/Pagination';
import PropTypes from 'prop-types';
import PlusIcon from 'apollo-react-icons/Plus';
import Minus from 'apollo-react-icons/Minus';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Pdf({ page, refs, pageRight }) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [pageScale, setPageScale] = useState(1.5);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    setPage(page - 1);
  }, [page]);

  useEffect(() => {
    if (refs[currentPage]?.current) {
      refs[currentPage]?.current?.scrollIntoView({ behavior: 'instant' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    setPage(pageRight - 1);
  }, [pageRight]);

  const handleZoomIn = () => {
    // if (pageScale < 1.2) {
    setPageScale(pageScale + 0.2);
    // }
  };
  const handleZoomOut = () => {
    // if (pageScale >= 0.5) {
    setPageScale(pageScale - 0.2);
    // }
  };

  function listener(el) {
    if (numPages) {
      const avg = el.target.scrollHeight / numPages;
      const pg = Math.ceil(el.target.scrollTop / avg);
      if (pg <= numPages) {
        setPage(pg);
      }
    }
  }

  return (
    <div
      id="pdfDocument"
      className="pdf_container"
      data-testid="protocol-column-wrapper"
      onScroll={listener}
    >
      <Document
        file="/Protocol-2019-0.d4b7a02b-55b0-4eb8-b231-5f9939ed9720.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div ref={refs[index]} key={index}>
            <Page
              key={`page_${index + 1}`}
              className="pdf-page"
              pageNumber={index + 1}
              width="490"
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
            disabled={pageScale >= 1.2}
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
  pageRight: PropTypes.isRequired,
};
