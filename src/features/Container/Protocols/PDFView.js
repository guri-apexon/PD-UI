import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import "./sample.less";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFView(props) {
  // let splitArr = path.documentFilePath.split("\\");
  // const pdfFile = splitArr[splitArr.length - 1];
  const pdfFile = "/Protocol - V1 - 07-Jun-2020.pdf";
  const [numPages, setNumPages] = useState(null);
  //   const [refs, setRefs] = useState(null);
  function onDocumentLoadSuccess(data) {
    setNumPages(data.numPages);
    // const checkRef = [...Array(data.numPages)].map(() => React.createRef());
    // setRefs(checkRef);
  }

  return (
    <div className="Example">
      <div className="Example__container">
        <div
          className="Example__container__document"
          style={{
            scrollPadding: "50px 0px 0px 50px",
            padding: "10px 16px",
            overflowY: "scroll",
            height: "65vh",
          }}
        >
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.apply(null, { length: numPages })
              .map((val, index) => {
                return index + 1;
              })
              .map((pages, i) => (
                <div id={`page-${pages}`} key={i}>
                  <Page
                    width={500}
                    scale={props.scale}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    pageNumber={pages}
                  />
                </div>
              ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
