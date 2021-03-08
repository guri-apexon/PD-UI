import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "apollo-react/components/MenuItem";
import SelectButton from "apollo-react/components/SelectButton";

import Upload from "apollo-react-icons/Upload";
import Download from "apollo-react-icons/Download";
import Button from "apollo-react/components/Button";
import Loader from "../../../Components/Loader/Loader";
import { viewResult } from "../../Protocols/protocolSlice";
import ProtocolViewClass from "../../Protocols/ProtocolViewClass";
function QCProtocolView({ protId, path, userType }) {
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
    // axios.post("/api/protocol_data/qc1_protocol_upload", formData);
  };

  const onApprove = () => {
    const approve = window.confirm("Are you sure you want to Approve?");
    if (approve) {
      dispatch({ type: "APPROVE_QC_SAGA" });
    } else {
      // nothing
    }
  };

  const sendQc2ForApproval = () => {
    const qc2Approval = window.confirm(
      "Are you sure you want to send Qc2 for approval?"
    );
    if (qc2Approval) {
      dispatch({ type: "SEND_QC2_APPROVAL_SAGA" });
    } else {
      // nothing
    }
  };

  const onReject = () => {
    const reject = window.confirm("Are you sure you want to Reject?");
    if (reject) {
      dispatch({ type: "REJECT_QC2_SAGA" });
    } else {
      // nothing
    }
  };

  const handleChange = (value) => {
    console.log(value);
    dispatch({ type: "DOWNLOAD_PROTOCOL_QC_SAGA", payload: value });
  };

  if (viewData.loader) {
    return (
      <div
        style={{
          display: "inline-block",
          margin: "auto",
          marginTop: "10%",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    !viewData.loader && (
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
          {/* <Button
            variant="secondary"
            icon={<Download />}
            size="small"
            style={{ marginRight: 10, float: "right" }}
          >
            Download
          </Button> */}
          <SelectButton
            onChange={handleChange}
            placeholder="Download"
            style={{ marginRight: 10, float: "right" }}
          >
            <MenuItem value="1">{"Download JSON"}</MenuItem>
            <MenuItem value="2">{"Download XLSS"}</MenuItem>
          </SelectButton>
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
            onClick={() => onApprove()}
          >
            Approve
          </Button>
          {userType === "QC1" ? (
            <Button
              variant="secondary"
              size="small"
              style={{ marginRight: 10 }}
              onClick={() => sendQc2ForApproval()}
            >
              Send QC Approve
            </Button>
          ) : null}
          {userType === "QC2" ? (
            <Button
              variant="secondary"
              size="small"
              style={{ marginRight: 10 }}
              onClick={() => onReject()}
            >
              Reject
            </Button>
          ) : null}
        </div>
      </div>
    )
  );
}

export default QCProtocolView;
