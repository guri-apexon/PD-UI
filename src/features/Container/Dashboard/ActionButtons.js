import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "apollo-react/components/Button";

import AddProtocol from "./AddProtocol/AddProtocol";
import { displayAddProtocol, selectedProtocolsList } from "./dashboardSlice";

function ActionButtons() {
  const dispatch = useDispatch();
  const hide = useSelector(displayAddProtocol);
  const selectedProtocols = useSelector(selectedProtocolsList);
  const sendQcReview = () => {
    dispatch({ type: "SEND_QC_REVIEW_SAGA" });
  };
  return (
    <>
      {hide && (
        <div style={{ float: "right" }}>
          <AddProtocol />
        </div>
      )}
      <div style={{ float: "right", marginTop: "10px", marginRight: "14px" }}>
        <Button
          data-testid="send-qc-review"
          variant="secondary"
          onClick={sendQcReview}
          disabled={selectedProtocols.length ? false : true}
        >
          {"Send To QC Review"}
        </Button>
      </div>
    </>
  );
}

export default React.memo(ActionButtons);
