import "./style.scss";
import React, { useEffect } from "react";
import Tooltip from "apollo-react/components/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../../store/ActionTypes";
import { overviewData } from "../../store/slice";
import { redaction } from "../../../../../AppConstant/AppConstant";
import {
  handleProtocolTitle,
  iconStatus,
  qcIconStatus,
} from "../../../../../utils/utilFunction";

const ProtocolOverview = ({ id }) => {
  const dispatch = useDispatch();
  const { data, loading, success } = useSelector(overviewData);
  useEffect(() => {
    if (id) {
      dispatch({ type: ActionTypes.GET_PROTOCOL_OVERVIEW, payload: id });
    }
  }, [id, dispatch]);
  const redactionCheckRender = (value, testId) => {
    return (
      <span data-testid={testId}>
        {value && value === redaction.text ? (
          <Tooltip variant="light" title={redaction.hoverText} placement="left">
            <span className="blur">{value}</span>
          </Tooltip>
        ) : (
          <span>{value}</span>
        )}
      </span>
    );
  };
  return (
    <>
      {loading && <div></div>}
      {!loading && success && (
        <div className="tab-card">
          <div>
            <p className="card-header" data-testid="overview-test">
              Overview Details
            </p>
            <div className="data-container">
              <div className="column-1-2">
                <div className="row-item">
                  <label>Project ID/CRM#</label>
                  {redactionCheckRender(data.projectId, "project-value")}
                </div>
                <div className="row-item">
                  <label>Sponsor </label>
                  {redactionCheckRender(data.sponsor, "sponser-value")}
                </div>
                <div className="row-item">
                  <label>Indication</label>
                  {redactionCheckRender(data.indication, "indication-value")}
                </div>
                <div className="row-item">
                  <label>Molecule / Device</label>
                  {redactionCheckRender(data.moleculeDevice, "molecule-value")}
                </div>
              </div>
              <div className="column-1-2">
                <div className="row-item">
                  <label>Amendment</label>
                  {redactionCheckRender(data.amendment, "amendment-value")}
                </div>
                <div className="row-item">
                  <label>Version</label>
                  {redactionCheckRender(data.versionNumber, "version-value")}
                </div>
                <div className="row-item text-capitalize">
                  <label>Document Status</label>
                  {redactionCheckRender(data.documentStatus, "status-value")}
                </div>
                <div className="row-item">
                  <label>PD Activity</label>
                  {redactionCheckRender(
                    iconStatus(data.status, data.qcStatus),
                    "activity-value"
                  )}
                </div>
                <div className="row-item">
                  <label>QC Activity</label>
                  {redactionCheckRender(
                    qcIconStatus(data.qcStatus, data.status),
                    "qc-activity-value"
                  )}
                </div>
              </div>
            </div>
            <div className="protocol-title">
              <div>Protocol Title</div>
              {handleProtocolTitle(data.protocolTitle, "title-value")}
              {/* <div data-testid="title-value">{data.protocolTitle}</div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProtocolOverview;
