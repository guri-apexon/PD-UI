import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Upload from "apollo-react-icons/Upload";
import Download from "apollo-react-icons/Download";
import Button from "apollo-react/components/Button";
import { viewResult } from "../../Protocols/protocolSlice";
import ProtocolViewClass from "../../Protocols/ProtocolViewClass";
function QCProtocolView({ protId, path }) {
  const dispatch = useDispatch();
  const viewData = useSelector(viewResult);
  const [selectedFile, setSelectedFile] = useState({});
  useEffect(() => {
    dispatch({ type: "GET_PROTOCOL_TOC_SAGA", payload: protId });
  }, []);
  const listData = [];
  console.log("Path", path);
  const subSections = {
    TOC: viewData.tocSections,
    SOA: viewData.soaSections,
  };
  console.log("view", viewData);
  if (subSections.TOC && subSections.TOC.length) {
    listData.push({ section: "Table of Contents", id: "Toc" });
  }
  if (subSections.SOA && subSections.SOA.length) {
    listData.push({ section: "Schedule of Assessments", id: "SOA" });
  }
  const onFileChange = (event) => {
    // Update the state
    // this.setState({ selectedFile: event.target.files[0] });
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (!selectedFile.name) {
      return;
    }
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", selectedFile, selectedFile.name);

    // Details of the uploaded file
    console.log(selectedFile);

    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
  };
  return (
    viewData && (
      <div id="protocol-view">
        <div style={{ marginLeft: "26%", marginBottom: "5px" }}>
          <input type="file" onChange={onFileChange} />
          <Button
            variant="secondary"
            icon={<Upload />}
            size="small"
            style={{ marginRight: 10 }}
            onClick={() => onFileUpload()}
          >
            Upload
          </Button>
          <Button
            variant="secondary"
            icon={<Download />}
            size="small"
            style={{ marginRight: 10, float: "right" }}
          >
            Download
          </Button>
        </div>
        <ProtocolViewClass
          view={viewData}
          data={subSections}
          listData={listData}
        />
        <div style={{ marginLeft: "26%", marginTop: "5px" }}>
          <Button
            variant="secondary"
            size="small"
            style={{ marginRight: 10 }}
            onClick={() => console.log("test")}
          >
            Approve
          </Button>
          <Button variant="secondary" size="small" style={{ marginRight: 10 }}>
            Send QC Approve
          </Button>
        </div>
      </div>
    )
  );
}

export default QCProtocolView;
