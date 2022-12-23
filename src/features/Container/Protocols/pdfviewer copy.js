import { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from 'apollo-react/components/Button';
import Pagination from 'apollo-react/components/Pagination';
import PropTypes from 'prop-types';
import PlusIcon from 'apollo-react-icons/Plus';
import Minus from 'apollo-react-icons/Minus';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const observerConfig = {
  // How much of the page needs to be visible to consider page visible
  threshold: 0,
};

function useIntersectionObserver(element, options, observerCallback) {
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

function Pdf({ page, refs, pageRight }) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [pageScale, setPageScale] = useState(1);
  const [visiblePages, setVisiblePages] = useState({});
  const [scrollPage, setScrollPage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    setPage(page - 1);
    setScrollPage(page);
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
    setPageScale(pageScale + 0.1);
    // }
  };
  const handleZoomOut = () => {
    // if (pageScale >= 0.5) {
    setPageScale(pageScale - 0.1);
    // }
  };

  const setPageVisibility = useCallback((pageNumber, isIntersecting) => {
    setVisiblePages((prevVisiblePages) => ({
      ...prevVisiblePages,
      [pageNumber]: isIntersecting,
    }));
  }, []);

  useEffect(() => {
    console.clear();

    const visible = Object.entries(visiblePages)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    if (visible.length === 1) {
      setScrollPage(parseInt(visible[0], 10));
    }
    console.log(visible);
  }, [visiblePages]);

  const getCurrentPage = () => {
    console.log(scrollPage, currentPage);
    return scrollPage < currentPage ? scrollPage - 1 : currentPage;
    // console.clear();
    // console.log({ scrollPage });
    // if (scrollPage - 1 === 0) {
    //   return 1;
    // }
    // return scrollPage - 1 || currentPage;
  };

  function listener(el) {
    if (numPages) {
      const avg = el.target.scrollHeight / numPages;
      const pg = Math.ceil(el.target.scrollTop / avg);
      console.log(pg);
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
      // onScroll={listener}
    >
      <Document
        file="/Protocol-2019-0.d4b7a02b-55b0-4eb8-b231-5f9939ed9720.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
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
            {/* <Page
              key={`page_${index + 1}`}
              className="pdf-page"
              pageNumber={index + 1}
              width="490"
              id={index}
              scale={pageScale}
            /> */}
          </div>
        ))}
      </Document>
      <div className="sticky-bottom">
        <Pagination
          count={numPages}
          rowsPerPage={1}
          page={getCurrentPage()}
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

PageWithObserver.propTypes = {
  pageNumber: PropTypes.isRequired,
  setPageVisibility: PropTypes.isRequired,
};
