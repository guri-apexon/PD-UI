import { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from 'apollo-react/components/Button';
import Pagination from 'apollo-react/components/Pagination';
import PropTypes from 'prop-types';
import PlusIcon from 'apollo-react-icons/Plus';
import Minus from 'apollo-react-icons/Minus';
import Loader from 'apollo-react/components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { protocolSummary, getPdfData } from './protocolSlice';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const observerConfig = {
  // How much of the page needs to be visible to consider page visible
  threshold: 0,
};

export function useIntersectionObserver(element, options, observerCallback) {
  useEffect(() => {
    if (!element || !('IntersectionObserver' in window)) {
      return undefined;
    }
    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element, options, observerCallback]);
}

function PageWithObserver({ pageNumber, setPageVisibility, ...otherProps }) {
  const [page, setPage] = useState();
  const onIntersectionChange = useCallback(
    ([entry]) => {
      setPageVisibility(pageNumber, entry.isIntersecting);
    },
    [pageNumber, setPageVisibility],
  );
  useIntersectionObserver(page, observerConfig, onIntersectionChange);
  return <Page canvasRef={setPage} pageNumber={pageNumber} {...otherProps} />;
}
function Pdf({ page, refs, pageRight, handlePaginationPage }) {
  const protocolAllItems = useSelector(protocolSummary);
  const dispatch = useDispatch();
  const fileStream = useSelector(getPdfData);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [pageScale, setPageScale] = useState(1.5);
  const [visiblePages, setVisiblePages] = useState({});
  const [scrollPage, setScrollPage] = useState(0);

  const [pdfString, setPdfString] = useState(null);

  const { documentFilePath, protocol } = protocolAllItems.data;
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    setPage(page - 1);
  }, [page]);

  useEffect(() => {
    setPage(scrollPage - 1);
    // handlePaginationPage(scrollPage - 1);
  }, [scrollPage]);

  useEffect(() => {
    console.log('currentPage', currentPage);
    if (refs[currentPage]?.current) {
      refs[currentPage]?.current?.scrollIntoView({ behavior: 'instant' });
    }
  }, [currentPage]);

  useEffect(() => {
    console.log({ pageRight });
    setPage(pageRight - 1);
  }, [pageRight]);

  const handleZoomIn = () => {
    setPageScale(pageScale + 0.2);
  };
  const handleZoomOut = () => {
    setPageScale(pageScale - 0.2);
  };

  const setPageVisibility = useCallback((pageNumber, isIntersecting) => {
    setVisiblePages((prevVisiblePages) => ({
      ...prevVisiblePages,
      [pageNumber]: isIntersecting,
    }));
  }, []);

  useEffect(() => {
    const visible = Object.entries(visiblePages)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    if (visible.length === 1) {
      setScrollPage(parseInt(visible[0], 10));
    }
  }, [visiblePages]);

  useEffect(() => {
    setPage(scrollPage - 1);
  }, [scrollPage]);

  const getCurrentPage = () => {
    return scrollPage - 1 || currentPage;
    // return currentPage;
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
    }
  }, [fileStream]);

  if (!pdfString) {
    return <Loader />;
  }
  return (
    <div
      id="pdfDocument"
      className="pdf_container"
      data-testid="protocol-column-wrapper"
    >
      <Document file={pdfString} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <div ref={refs[index]} key={index}>
            <PageWithObserver
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              setPageVisibility={setPageVisibility}
              className="pdf-page"
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
          // page={getCurrentPage()}
          page={currentPage}
          onChangePage={(pg) => {
            setPage(pg);
            handlePaginationPage(pg);
          }}
        />
        <div>
          <Button
            size="small"
            className="buttonStyles"
            data-testId="zoomIn"
            disabled={pageScale >= 1.6}
            onClick={handleZoomIn}
          >
            <PlusIcon />
          </Button>
          <Button
            size="small"
            className="buttonStyles"
            data-testId="zoomOut"
            disabled={pageScale <= 0.5}
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

PageWithObserver.propTypes = {
  pageNumber: PropTypes.isRequired,
  setPageVisibility: PropTypes.isRequired,
};
