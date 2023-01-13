import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from 'apollo-react/components/Button';
import Pagination from 'apollo-react/components/Pagination';
import PropTypes from 'prop-types';
import PlusIcon from 'apollo-react-icons/Plus';
import Minus from 'apollo-react-icons/Minus';
import Loader from 'apollo-react/components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { protocolSummary, getPdfData } from '../protocolSlice';
import './PdfViewer.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Pdf({ page, refs, pageRight, handlePaginationPage }) {
  const protocolAllItems = useSelector(protocolSummary);
  const dispatch = useDispatch();
  const fileStream = useSelector(getPdfData);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setPage] = useState(0);
  const [pageScale, setPageScale] = useState(1);
  const [pdfString, setPdfString] = useState(null);

  const { documentFilePath, protocol } = protocolAllItems.data;
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  function changeScale() {
    const letPanel = document.getElementById('pdfDocument');
    const width = parseInt(getComputedStyle(letPanel, '').width, 10);
    if (width < 400) {
      setPageScale(0.4);
    } else if (width < 500) {
      setPageScale(0.6);
    } else if (width < 600) {
      setPageScale(0.8);
    } else if (width < 700) {
      setPageScale(1);
    } else if (width < 750) {
      setPageScale(1.1);
    } else if (width < 800) {
      setPageScale(1.2);
    } else if (width > 900) {
      setPageScale(1.4);
    } else if (width > 1000) {
      setPageScale(1.6);
    }
  }

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      () => {
        document.addEventListener('mousemove', changeScale, false);
      },
      false,
    );
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', changeScale, false);
      },
      false,
    );
  }, []);

  useEffect(() => {
    if (page) {
      setPage(page - 1);
    }
  }, [page]);

  useEffect(() => {
    if (refs[currentPage]?.current) {
      refs[currentPage]?.current?.scrollIntoView({ behavior: 'instant' });
    }
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    if (pageRight) {
      setPage(pageRight - 1);
    }
  }, [pageRight]);

  const handleZoomIn = () => {
    setPageScale(pageScale + 0.2);
  };
  const handleZoomOut = () => {
    setPageScale(pageScale - 0.2);
  };

  useEffect(() => {
    dispatch({
      type: 'GET_FILE_STREAM',
      payload: {
        name: protocol,
        dfsPath: documentFilePath,
      },
    });
    // eslint-disable-next-line
  }, [documentFilePath]);

  useEffect(() => {
    if (fileStream.success) {
      setPdfString(fileStream.data);
    } else {
      setPdfString(null);
    }
  }, [fileStream]);

  if (!pdfString) {
    return <Loader />;
  }

  function handleKeyDown(e) {
    let pg = 0;
    if (e.key === 'PageDown' && currentPage < numPages - 1) {
      pg = currentPage + 1;
    }
    if (e.key === 'PageUp' && currentPage !== 0) {
      pg = currentPage - 1;
    }
    setPage(pg);
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      id="pdfDocument"
      className="pdf_container"
      data-testid="protocol-column-wrapper"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {pdfString && (
        <Document
          file={pdfString}
          onLoadSuccess={onDocumentLoadSuccess}
          onKeyDown={(e) => handleKeyDown(e)}
        >
          <Page pageNumber={currentPage + 1} scale={pageScale} />
        </Document>
      )}
      <div className="sticky-bottom pdf-pagination">
        <Pagination
          count={numPages}
          rowsPerPage={1}
          page={currentPage}
          onChangePage={(pg) => {
            setPage(pg);
            handlePaginationPage(pg + 1);
          }}
        />
        <div>
          <Button
            size="small"
            className="buttonStyles"
            data-testId="zoomIn"
            disabled={pageScale >= 3.0}
            onClick={handleZoomIn}
          >
            <PlusIcon />
          </Button>
          <Button
            size="small"
            className="buttonStyles"
            data-testId="zoomOut"
            disabled={pageScale <= 0.7}
            onClick={handleZoomOut}
          >
            <Minus />
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
  handlePaginationPage: PropTypes.isRequired,
};
