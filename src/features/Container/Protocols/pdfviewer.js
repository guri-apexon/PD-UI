import { createRef, useState, useEffect } from 'react';
import { Page, Document, pdfjs } from 'react-pdf';
import Button from 'apollo-react/components/Button';
import PropTypes from 'prop-types';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function Pdf({ page, refs }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  console.log('Enter2');

  // const arr = [0, 1, 2, 3, 4, 5];
  // const refs = arr.reduce((acc, value) => {
  //   acc[value] = createRef();
  //   return acc;
  // }, {});

  useEffect(() => {
    console.log('-------', refs);
    console.log('useEffect page No', page);
    if (page === 'undefined' || page === undefined) {
      //  refs[1].current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('page:-------In UseEffect');
      refs[page - 1].current.scrollIntoView({ behavior: 'instant' });
    }
  }, [page]);
  const clickHandler = () => {
    console.log(refs);
    refs[2].current.scrollIntoView({ behavior: 'smooth' });
  };
  const handlePageNumber = (pageNumber) => {
    setPageNumber(pageNumber);
  };
  console.log('page', page);
  return (
    <div>
      {/* <Button
        variant="primary"
        onClick={() => {
          clickHandler();
        }}
      >
        sbb
      </Button> */}
      <Document
        file="/ALM-Executing-TestCases_DefectManagementProcess.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* <Page pageNumber={pageNumber} /> */}

        {Array.from(new Array(numPages), (el, index) => (
          <div ref={refs[index]} key={index}>
            <Page
              key={`page_${index + 1}`}
              className="pdf-page"
              pageNumber={index + 1}
              width="510"
              id={index}
            />
          </div>
        ))}
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
export default Pdf;
Pdf.propTypes = {
  page: PropTypes.isRequired,
  refs: PropTypes.isRequired,
};
