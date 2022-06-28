import React from "react";
import FileViewer from "react-file-viewer";

const file = "/POC/d5180c00025csp-FINAL-25Feb-clean.docx";
const type = "docx";
// const file = "/POC/d5180c00025csp-FINAL-25Feb-clean.pdf";
// const type = "pdf";

const DocumentViewer = () => {
  const onError = (e) => {
    console.log(e, "error in file-viewer");
  };
  return (
    <FileViewer
      fileType={type}
      filePath={file}
      errorComponent={RenderError}
      onError={onError}
    />
  );
};
export default DocumentViewer;

const RenderError = () => {
  return <div>Something went wrong</div>;
};
