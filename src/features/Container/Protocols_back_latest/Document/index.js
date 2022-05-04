/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import DocumentsTable from "../../../Components/DocumentsTable/DocumentsTable";
import AssociateDocumentsTable from "../../../Components/DocumentsTable/AssociateDocumentsTable";

import { useSelector, useDispatch } from "react-redux";
import { overviewData, relatedProtocol } from "../store/slice";
import Grid from "apollo-react/components/Grid";
import "./style.scss";
import { toast } from "react-toastify";
import { httpCall, BASE_URL_8000 } from "../../../../utils/api";
import Loader from "apollo-react/components/Loader";
import FileDownload from "js-file-download";
import cloneDeep from "lodash/cloneDeep";
import { userId } from "../../../../store/userDetails";

import MenuButton from "apollo-react/components/MenuButton";
import { messages } from "../../../../AppConstant/AppConstant";
import Tooltip from "apollo-react/components/Tooltip";
import InfoIcon from "apollo-react-icons/Info";
import IconButton from "apollo-react/components/IconButton";
import Download from "apollo-react-icons/Download";
import Modal from "apollo-react/components/Modal";
import { ActionTypes } from "../store/ActionTypes";

const message1 = "Please Select Base Document for Compare";
const message2 = "Please Select Comparator Document for Compare";
const Documents = ({ id, name }) => {
  const dispatch = useDispatch();
  const summary = useSelector(overviewData);
  const userId1 = useSelector(userId);
  const associateDocuments = useSelector(relatedProtocol);
  const [protocolSelected, setProtocolSelected] = useState({
    source: "",
    target: "",
    sourceData: "",
    targetData: "",
  });
  const [compareMessage, setCompareMessage] = useState(message1);
  const [loader, setLoader] = useState(false);
  const [summaryData, setSummaryData] = useState({});
  const [userName, setUserName] = useState("");
  const [tooltip1, setToolTip1] = useState(false);
  const [tooltipSelected, setToolTipSelected] = useState(
    messages.downloadFileContentCSV
  );
  const tooltip1Ref = useRef(null);
  const tooltip2Ref = useRef(null);
  useEffect(() => {
    if (id && name) {
      dispatch({ type: ActionTypes.GET_PROTOCOL_OVERVIEW, payload: id });
      dispatch({ type: ActionTypes.GET_RELATED_PROTOCOL, payload: name });
    }
  }, [dispatch, id, name]);

  const getUserName = async (userID) => {
    const config = {
      url: `${BASE_URL_8000}/api/user/read_all_users?userId=${userID}`,
      method: "GET",
    };
    const userDetailResp = await httpCall(config);
    console.log(userDetailResp);
    if (userDetailResp.success) {
      const userName = `${userDetailResp.data.first_name} ${userDetailResp.data.last_name}`;
      setUserName(userName);
    } else {
      setUserName("");
    }
  };
  useEffect(() => {
    if (summary.data && userName) {
      let newObj = cloneDeep(summary.data);
      newObj.userName = userName;
      setSummaryData(newObj);
    }
  }, [userName]);
  useEffect(() => {
    if (summary.success && summary.data.userId) {
      if (isNaN(parseInt(summary.data.userId))) {
        let newObj = cloneDeep(summary.data);
        newObj.userName = "-";
        setSummaryData(newObj);
      } else {
        getUserName(summary.data.userId);
      }
    }
  }, [summary]);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        tooltip1Ref.current &&
        !tooltip1Ref.current.contains(event.target) &&
        tooltip2Ref.current &&
        !tooltip2Ref.current.contains(event.target)
      ) {
        setToolTip1(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltip1Ref, tooltip2Ref]);

  const setProtocolToDownload = (data) => {
    if (protocolSelected.source) {
      if (protocolSelected.source === data.id) {
        const obj = {
          source: "",
          target: "",
          sourceData: "",
          targetData: "",
        };
        setProtocolSelected(obj);
        setCompareMessage(message1);
      } else if (protocolSelected.target === data.id) {
        const obj = {
          source: protocolSelected.source,
          target: "",
          sourceData: protocolSelected.sourceData,
          targetData: "",
        };
        setProtocolSelected(obj);
        setCompareMessage(message2);
      } else {
        const obj = {
          source: protocolSelected.source,
          target: data.id,
          sourceData: protocolSelected.sourceData,
          targetData: data,
        };
        setProtocolSelected(obj);
        setCompareMessage("");
      }
    } else {
      const obj = {
        source: data.id,
        target: "",
        sourceData: data,
        targetData: "",
      };
      setProtocolSelected(obj);
      setCompareMessage(message2);
    }
  };
  /* istanbul ignore next */
  const downloadCompare = async (type) => {
    try {
      setLoader(true);
      const config = {
        url: `${BASE_URL_8000}/api/document_compare/?id1=${
          protocolSelected.source
        }&id2=${protocolSelected.target}&userId=${userId1.substring(
          1
        )}&protocol=${summary.data.protocol}&file_type=${type}`,
        method: "GET",
        responseType: "blob",
      };
      const resp = await httpCall(config);
      if (resp.message === "Success") {
        FileDownload(
          resp.data,
          `${protocolSelected.source}_${protocolSelected.target}.compare_detail${type}`
        );
        setLoader(false);
      } else if (resp.message === "No-Content") {
        toast.info("No difference found for this compare");
        setLoader(false);
      } else if (resp.message === "Not-Found") {
        toast.error("Compare is not available for selected documents.");
        setLoader(false);
      }
      setProtocolSelected([]);
    } catch (e) {
      setLoader(false);
      console.log("Compare Resp", e.response);
      /* istanbul ignore next*/
      if (e.response && e.response.data) {
        toast.error(e.response.data.detail);
      } else {
        toast.error("Data fetching failed. Please try again.");
      }
    }
  };
  const fileContent = (arr) => {
    console.log("TOOLTIP", arr);
    return (
      <div>
        {/* <h3>{arr.header}</h3> */}
        <ol className="version-validation">
          {arr.body.map((item, i) => (
            <li key={i} className="compare-text-header">
              {item.header}
              <ul>
                {item.body.map((subHeader, j) => (
                  <li className="compare-text-sub-header" key={j}>
                    {subHeader}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    );
  };
  /* istanbul ignore next */
  const openToolTip = (e, type) => {
    e.stopPropagation();
    if (type === "csv") {
      setToolTipSelected(messages.downloadFileContentCSV);
    } else {
      setToolTipSelected(messages.downloadFileContentExcel);
    }
    setToolTip1(true);
  };
  /* istanbul ignore next */
  const closeToolTip = () => {
    setToolTip1(false);
  };

  const menuItems = [
    {
      key: "CSV",
      text: (
        <div className="dropdown-text-style">
          <div>CSV</div>
          <div className="info-icon">
            <Tooltip
              variant="light"
              title={"Please click here to see the detail."}
              placement="top"
            >
              <IconButton
                color="primary"
                onClick={(e) => openToolTip(e, "csv")}
                size="small"
              >
                <InfoIcon size="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ),
      onClick: () => downloadCompare(".csv"),
    },
    {
      key: "EXCEL",
      text: (
        <div className="dropdown-text-style" ref={tooltip2Ref}>
          <div>Excel</div>
          <div className="info-icon">
            <Tooltip
              variant="light"
              title={"Please click here to see the detail."}
              placement="top"
            >
              <IconButton
                color="primary"
                onClick={(e) => openToolTip(e, "excel")}
                size="small"
              >
                <InfoIcon size="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ),
      onClick: () => downloadCompare(".xlsx"),
    },
  ];
  const downloadButton = () => {
    return (
      <label className="compare-main-button">
        Compare Result
        <Download />
      </label>
    );
  };

  return (
    <div className="document-tab">
      {loader && <Loader />}
      <Modal
        open={tooltip1}
        onClose={() => closeToolTip()}
        title={tooltipSelected.header}
        // subtitle="Optional Subtitle"
        children={fileContent(tooltipSelected)}
        buttonProps={[{ label: "Okay" }]}
        id="neutral"
        hideButtons={true}
        className="modal-csv-excel-detail"
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            className="source-document-tab"
            data-testid="source-document-tab"
          >
            {"userName" in summaryData && summaryData.userName && (
              <DocumentsTable initialsRow={[summaryData]} />
            )}
          </div>
        </Grid>
        {associateDocuments && associateDocuments.length > 1 && (
          <>
            <div className="compare-info">
              {protocolSelected.source && protocolSelected.target === "" && (
                <div className="compare-Detail">
                  <label>Baseline Document :</label>
                  <span>{`${protocolSelected.sourceData.protocol} (${protocolSelected.sourceData.documentStatus} ${protocolSelected.sourceData.versionNumber})`}</span>
                </div>
              )}
              {protocolSelected.source && protocolSelected.target && (
                <div className="compare-container">
                  <div className="compare-Detail">
                    <label>Baseline Document :</label>
                    <span>{`${protocolSelected.sourceData.protocol} (${protocolSelected.sourceData.documentStatus} ${protocolSelected.sourceData.versionNumber})`}</span>
                  </div>
                  <div className="compare-Detail">
                    <label>Comparator Document :</label>
                    <span>{`${protocolSelected.targetData.protocol} (${protocolSelected.targetData.documentStatus} ${protocolSelected.targetData.versionNumber})`}</span>
                  </div>
                </div>
              )}
              <span className="compare-message">{compareMessage}</span>
            </div>
            <div className="compare-buttons">
              <MenuButton
                buttonText={downloadButton()}
                menuItems={menuItems}
                disabled={
                  protocolSelected.source && protocolSelected.target
                    ? false
                    : true
                }
              />
            </div>
          </>
        )}
        <Grid item xs={12}>
          <div className="associate-document-tab">
            {associateDocuments && associateDocuments.length > 0 && (
              <AssociateDocumentsTable
                protocolSelected={protocolSelected}
                setProtocolToDownload={setProtocolToDownload}
                //  initialsRow={protocolData && protocolData}
                initialsRow={associateDocuments}
                showCheckbox={
                  associateDocuments && associateDocuments.length > 1
                    ? true
                    : false
                }
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Documents;
