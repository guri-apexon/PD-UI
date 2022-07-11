import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs, Outline } from "react-pdf";
import Pagination from "apollo-react/components/Pagination";
import "./style.scss";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import ZoomOut from "../../../../../../assets/images/zoom-out.png";
import ZoomIn from "../../../../../../assets/images/zoom-in.png";
import menuIcon from "../../../../../../assets/images/list.png";

import samplePDF from "./d5180c00025csp-FINAL-25Feb-clean.pdf";
import { useSelector } from "react-redux";
import { pdfPageNumber } from "../../../store/slice";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFRenderer = () => {
  const pdf_PageNumber = useSelector(pdfPageNumber);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState(0);
  const [showPagination, setShowPagination] = useState(true);
  const [pdfScale, setPdfScale] = useState(1.0);
  const [displayMenu, setDisplayMenu] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    setPageNumber(pdf_PageNumber);
  }, [pdf_PageNumber]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDisplayMenu(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    setPageNumber(page + 1);
  }, [page]);

  useEffect(() => {
    setPage(pageNumber - 1);
  }, [pageNumber]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onItemClick({ pageNumber }) {
    setPageNumber(pageNumber);
    setDisplayMenu(false);
  }

  return (
    <div className="pd-pdf-container">
      <div onClick={() => setShowPagination(!showPagination)}>
        <Document
          file={samplePDF}
          onLoadSuccess={onDocumentLoadSuccess}
          onItemClick={onItemClick}
        >
          <div className="pdf-menu-container" ref={menuRef}>
            <button
              className="pdf-menu-button"
              onClick={() => setDisplayMenu(!displayMenu)}
            >
              <img src={menuIcon} alt="menu" />
            </button>
            <div
              className="pdf-menu"
              style={{ display: displayMenu ? "flex" : "none" }}
            >
              <Outline onItemClick={onItemClick} />
            </div>
          </div>
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={true}
            renderTextLayer={true}
            scale={pdfScale}
          />
        </Document>
      </div>
      {showPagination && (
        <div className="pd-pdf-navigation">
          {numPages && (
            <Pagination
              count={numPages}
              rowsPerPage={1}
              page={page}
              onChangePage={setPage}
            />
          )}
          <div className="zoom-container">
            <img
              className="zoom-out"
              src={ZoomOut}
              alt="zoom-out"
              onClick={() => setPdfScale(pdfScale - 0.2)}
            />
            <img
              className="zoom-in"
              src={ZoomIn}
              alt="zoom-in"
              onClick={() => setPdfScale(pdfScale + 0.2)}
            />
            {/* <button onClick={getSelectionText}>Copy</button> */}
          </div>
        </div>
      )}
    </div>
  );
};
export default PDFRenderer;
