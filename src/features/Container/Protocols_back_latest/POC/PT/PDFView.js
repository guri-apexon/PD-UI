// import "./pdf.less";
import "./pdf.scss";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { fileStream } from "../../store/slice";
import { ActionTypes } from "../../store/ActionTypes";

import ZoomOut from "../../../../../assets/images/zoom-out.png";
import ZoomIn from "../../../../../assets/images/zoom-in.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFView({ name, dfsPath, zoom }) {
  const dispatch = useDispatch();
  // const { data, success, loader } = useSelector(fileStream);

  const [pdfScale, setPdfScale] = useState(0.2);
  const [isPDF] = useState(true);
  const [numPages, setNumPages] = useState(null);
  const [pdfPageNum, setPDFPageNum] = useState(0);
  // const { fileURL } = props;
  // const [filename, setFileName] = useState("");

  // let splitArr = path.documentFilePath.split("\\");
  // const pdfFile = splitArr[splitArr.length - 1];
  const filename = "/POC/d5180c00025csp-FINAL-25Feb-clean.pdf";
  // useState(() => {
  //   const type = filename.type;
  //   if (type === "application/pdf") {
  //     setIsPDF(true);
  //   } else {
  //     setIsPDF(false);
  //   }
  // }, [filename]);
  // useEffect(() => {
  //   setFileName(fileURL);
  // }, [fileURL]);

  //   const [refs, setRefs] = useState(null);
  function onDocumentLoadSuccess(data) {
    setNumPages(data.numPages);
    // const checkRef = [...Array(data.numPages)].map(() => React.createRef());
    // setRefs(checkRef);
  }
  useEffect(() => {
    setPdfScale(zoom);
  }, [zoom]);
  useEffect(() => {
    dispatch({ type: ActionTypes.GET_FILE_STREAM, payload: { name, dfsPath } });
    // setPdfScale(1.0);
    document.getElementById("pdf-section").scrollRight = 120;
  }, []);
  const handleZoomIn = () => {
    setPdfScale(pdfScale + 0.2);
  };
  const handleZoomOut = () => {
    setPdfScale(pdfScale - 0.2);
  };
  console.log("Page Number", pdfPageNum);
  return filename && isPDF ? (
    <div className="Example">
      <div className="zoom-container">
        <img
          className="zoom-out"
          src={ZoomOut}
          alt="zoom-out"
          onClick={() => handleZoomOut()}
        />
        <img
          className="zoom-in"
          src={ZoomIn}
          alt="zoom-in"
          onClick={() => handleZoomIn()}
        />
      </div>
      <div className="Example__container">
        <div
          id="pdf-section"
          className="Example__container__document"
          style={{
            scrollPadding: "50px 0px 0px 50px",
            padding: "10px 16px",
            overflowY: "scroll",
            height: "74vh",
          }}
        >
          <Document file={filename} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.apply(null, { length: numPages })
              .map((val, index) => {
                return index + 1;
              })
              .map((pages, i) => (
                <div
                  id={`page-${pages}`}
                  key={i}
                  onMouseEnter={() => setPDFPageNum(pages)}
                >
                  <Page
                    width={500}
                    scale={pdfScale}
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
  ) : (
    <div></div>
  );
}
