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
import { panelHandle, pageFun, currentPageFun } from './utilsPdfviewer';
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
    const scale = (width / 1000).toFixed(2);
    setPageScale(scale);
  }

  const addMouseMove = (e, changeScale) => {
    panelHandle(e, changeScale);
  };

  const removeMouseMove = () => {
    document.removeEventListener('mousemove', changeScale, false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', addMouseMove, false);
    document.addEventListener('mouseup', removeMouseMove, false);

    return () => {
      document.removeEventListener('mousedown', addMouseMove);
      document.removeEventListener('mouseup', removeMouseMove);
      removeMouseMove();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    pageFun(page, setPage);
  }, [page]);

  currentPageFun(refs, currentPage);

  useEffect(() => {
    currentPageFun(refs, currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  const pageRightFun = (pageRight) => {
    if (pageRight) {
      setPage(pageRight - 1);
    }
  };

  useEffect(() => {
    pageRightFun(pageRight);
  }, [pageRight]);

  const handleZoomIn = () => {
    setPageScale((parseFloat(pageScale) + 0.2).toFixed(2));
  };
  const handleZoomOut = () => {
    setPageScale((parseFloat(pageScale) - 0.2).toFixed(2));
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

  const fileStreamFun = (fileStream) => {
    if (fileStream.success) {
      setPdfString(fileStream.data);
    } else {
      setPdfString(null);
    }
  };

  useEffect(() => {
    fileStreamFun(fileStream);
  }, [fileStream]);

  if (!pdfString) {
    return <Loader />;
  }

  function handleKeyDown(e) {
    if (e.key === 'PageDown' && currentPage < numPages - 1) {
      setPage(currentPage + 1);
    } else if (e.key === 'PageUp' && currentPage !== 0) {
      setPage(currentPage - 1);
    }
  }

  return (
    // eslint-disable-next-line
    <div
      id="pdfDocument"
      className="pdf_container"
      data-testid="protocol-column-wrapper"
      // eslint-disable-next-line
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
        <div className="zoom-controls">
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