import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from 'apollo-react/components/Button';
import Pagination from 'apollo-react/components/Pagination';
import PropTypes from 'prop-types';
import PlusIcon from 'apollo-react-icons/Plus';
import Minus from 'apollo-react-icons/Minus';
import Loader from 'apollo-react/components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { protocolSummary, getPdfData } from '../protocolSlice';
import './PdfViewer.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer({ page, refs, pageRight, handlePaginationPage }) {
  const protocolAllItems = useSelector(protocolSummary);
  const dispatch = useDispatch();
  const fileStream = useSelector(getPdfData);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setPage] = useState(0);
  const [pageScale, setPageScale] = useState(1);
  const [pdfString, setPdfString] = useState(null);

  const { documentFilePath, protocol, fileName } = protocolAllItems.data;
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  function changeScale() {
    const letPanel = document.getElementById('pdfDocument');
    const width = parseInt(getComputedStyle(letPanel, '').width, 10);
    const scale = (width / 1000).toFixed(2);
    setPageScale(scale);
  }

  const getResizerClassNames = () => {
    const x = document.getElementsByClassName('react-resizable');
    if (x && x.length === 2) {
      const y = x[0].childNodes;
      if (y && y.length === 2) {
        const z = y[1].className;
        const xy = y[1].childNodes;
        if (xy) {
          const xz = xy[0].className;
          return [z, xz];
        }
        return [z];
      }
    }
    return [];
  };

  const addMouseMove = (e) => {
    if (e) {
      const { className } = e.target;
      const elemClassnames = getResizerClassNames();
      if (elemClassnames.includes(className.toString()))
        document.addEventListener('mousemove', changeScale, false);
    }
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
    if (page) {
      setPage(page - 1);
    }
  }, [page]);

  useEffect(() => {
    if (refs && refs[currentPage]?.current) {
      refs[currentPage].current.scrollIntoView({ behavior: 'instant' });
    }
    setTimeout(() => {
      if (document.getElementById('pdfDocument')) {
        document.getElementById('pdfDocument').scrollTop = 0;
      }
    }, 100);

    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    if (pageRight) {
      setPage(pageRight - 1);
    }
  }, [pageRight]);

  const handleZoomIn = () => {
    setPageScale((parseFloat(pageScale) + 0.2).toFixed(2));
  };
  const handleZoomOut = () => {
    setPageScale((parseFloat(pageScale) - 0.2).toFixed(2));
  };

  useEffect(() => {
    const fileTypeArr = fileName.split('.');
    const fileType = fileTypeArr[fileTypeArr.length - 1];
    let filePath = documentFilePath;
    if (!isEqual(fileType, 'pdf')) {
      filePath = documentFilePath.replace(
        fileName,
        `WorkingTempDirectory\\${fileName.replace(fileType, 'pdf')}`,
      );
    }
    dispatch({
      type: 'GET_FILE_STREAM',
      payload: {
        name: protocol,
        dfsPath: filePath,
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
          className="document-pdf"
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

export default PDFViewer;
PDFViewer.propTypes = {
  page: PropTypes.isRequired,
  refs: PropTypes.isRequired,
  pageRight: PropTypes.isRequired,
  handlePaginationPage: PropTypes.isRequired,
};
