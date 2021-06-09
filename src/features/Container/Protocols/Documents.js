import React, { useState, useEffect } from "react";
import DocumentsTable from "../../Components/DocumentsTable/DocumentsTable";
import AssociateDocumentsTable from "../../Components/DocumentsTable/AssociateDocumentsTable";

import { useSelector, useDispatch } from "react-redux";
import { protocolSummary, associateDocs } from "./protocolSlice.js";
import Grid from "apollo-react/components/Grid";
import "./Documents.scss";
import Button from "apollo-react/components/Button";
import { toast } from "react-toastify";
import { BASE_URL_8000, UI_URL } from "../../../utils/api";
import axios from "axios";

const Documents = ({ handleChangeTab }) => {
  const summary = useSelector(protocolSummary);
  const associateDocuments = useSelector(associateDocs);
  const dispatch = useDispatch();
  const [protocolSelected, setProtocolSelected] = useState([]);
  const [prevProtSelected, setPrevProtSelected] = useState("");

  // useEffect(() => {
  //   console.log("Selected", protocolSelected);
  // }, [protocolSelected]);
  const setProtocolToDownload = (id) => {
    console.log(id)
    if (protocolSelected.length === 0) {
      setProtocolSelected([id]);
    } else if (protocolSelected.length === 1) {
      const index = protocolSelected.indexOf(id);
      if (index > -1) {
        setProtocolSelected((protocolSelected) =>
          protocolSelected.filter((item) => item !== id)
        );
      } else {
        setProtocolSelected([...protocolSelected, id]);
      }
    } else if (protocolSelected.length === 2) {
      const index = protocolSelected.indexOf(id);
      if (index > -1) {
        setProtocolSelected((protocolSelected) =>
          protocolSelected.filter((item) => item !== id)
        );
      } else {
        toast.warn("Comparison is available only for two protocols.");
        // setProtocolSelected([...protocolSelected, id]);
      }
    }
  };
  const downloadCompare = async () => {
    console.log("Selected", protocolSelected);
    if (protocolSelected.length <= 1) {
      toast.warn("Please select two versions, for compare and download");
    } else if (protocolSelected.length === 2) {
      try {
        // id1 = "1c39ca0b-ebc4-4307-bcaf-b4770d9fcbfb"
        // id2 = "545e1adb-ad3c-423e-a58b-f402db6ff0e0"

        
        const resp = await axios.get(
          `http://ca2spdml01q:8000/api/document_compare/?id1=022eddd1-e7eb-4387-86a2-94db36437438&id2=ffc6f734-13b7-45a7-9909-20e9dd1dc878`
        );
        // const resp = await axios.get(
        //   `http://ca2spdml01q:8000/api/document_compare/?id1=${protocolSelected[0]}&id2=${protocolSelected[1]}`
        // );
        console.log(resp);
        const data = resp.data;
        if (data.numChangesTotal > 0) {
          const path = data.compareCSVPath;
          let splitArr = path.split("/");
          const fileName = splitArr[splitArr.length - 1];
          const filePath = `${UI_URL}/${fileName}`;
          console.log(filePath);

          const link = document.createElement("a");
          link.href = filePath;
          link.setAttribute("download", `${fileName}`);

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
        } else {
          //alert
        }
      } catch (e) {
        console.log("Compare Resp", e.response);
        toast.error(e.response.data.detail);
      }

      // console.log("Compare Response",resp.data)
      // if(resp.data){

      // }
      // toast.warn("No difference found for this compare");
    }
  };
  return (
    <div className="document-tab">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            className="source-document-tab"
            data-testid="source-document-tab"
          >
            <DocumentsTable initialsRow={summary.success && [summary.data]} />
          </div>
        </Grid>
        <div style={{ width: "100%", marginTop: "10px", marginRight: "7px" }}>
          <Button
            onClick={() => downloadCompare()}
            variant="primary"
            data-testid="compare-download-button"
            style={{
              float: "right",
              height: 38,
              width: 235,
              boxShadow:
                "0 4px 8px 0 rgb(5 85 252 / 32%), 0 4px 16px 0 rgb(0 0 0 / 4%)",
            }}
          >
            {"Download Compare Result"}
          </Button>
        </div>
        <Grid item xs={12}>
          <div className="associate-document-tab">
            <AssociateDocumentsTable
              handleChangeTab={handleChangeTab}
              protocolSelected={protocolSelected}
              setProtocolToDownload={setProtocolToDownload}
              //  initialsRow={protocolData && protocolData}
              initialsRow={associateDocuments && associateDocuments}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Documents;
