import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { protocolViewData } from "../../store/slice";
import ProtocolViewClass from "./ProtocolViewClass";
import { ActionTypes } from "../../store/ActionTypes";

function ProtocolView({ id, name }) {
  const dispatch = useDispatch();
  const viewData = useSelector(protocolViewData);
  useEffect(() => {
    dispatch({
      type: ActionTypes.GET_PROTOCOL_VIEW,
      payload: {
        endPoint: "protocol_data/",
        id: id,
        user: "normal",
        protocol: name,
      },
    });
  }, []);
  const listData = [];

  const subSections = {
    TOC: viewData.tocSections,
    SOA: viewData.soaSections,
  };
  console.log("view", viewData);
  /* istanbul ignore else */
  if (subSections.TOC && subSections.TOC.length) {
    listData.push({
      section: "Table of Contents",
      id: "TOC",
      subSections: true,
    });
  }
  /* istanbul ignore else */
  if (subSections.SOA && subSections.SOA.length) {
    listData.push({
      section: "Schedule of Assessments",
      id: "SOA",
      subSections: true,
    });
  }
  /* istanbul ignore else */
  if (viewData.iqvdataSummary) {
    listData.push({ section: "Summary", id: "SUM", subSections: false });
  }
  return (
    viewData && (
      <ProtocolViewClass
        view={viewData}
        data={subSections}
        listData={listData}
      />
    )
  );
}

export default ProtocolView;
