// import { useEffect } from "react";
// // import FileViewer from "apollo-react/components/FileViewer";
// import { useDispatch, useSelector } from "react-redux";
// import { fileStream } from "../../../store/slice";
// import Loader from "apollo-react/components/Loader";
// import { ActionTypes } from "../../../store/ActionTypes";

// const file = "/POC/d5180c00025csp-FINAL-25Feb-clean.docx";
// const type = "docx";

const DocRenderer = ({ dfsPath, name }) => {
  //   const dispatch = useDispatch();
  //   const { loader, error } = useSelector(fileStream);
  //   useEffect(() => {
  //     dispatch({
  //       type: ActionTypes.GET_FILE_STREAM,
  //       payload: {
  //         name,
  //         dfsPath,
  //         type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //       },
  //     });
  //   }, [dfsPath, name]);
  //   const onError = (e) => {
  //     console.log(e, "error in file-viewer");
  //   };
  //   if (loader) {
  //     return <Loader />;
  //   }
  //   if (error) {
  //     return <h1>No data</h1>;
  //   }
  return (
    <div className="pd-pdf-container">
      <h4>Docx format is not supported.</h4>
      {/* <FileViewer
        src="https://www.informatica.com/content/dam/informatica-com/en/image/c03/c03-iqvia.jpg.thumbnail.300.169.png"
        type="docx"
      /> */}
    </div>
  );
};
export default DocRenderer;
