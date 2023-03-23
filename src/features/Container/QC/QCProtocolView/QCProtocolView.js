/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'apollo-react/components/Button';
import {
  protocolSummary,
  rightBladeValue,
  viewResult,
} from '../../Protocols/protocolSlice';
import ProtocolView from '../../Protocols/ProtocolView';
import { PROTOCOL_RIGHT_MENU } from '../../Protocols/Constant/Constants';
import Modal from 'apollo-react/components/Modal';
import { isPrimaryUser } from '../../../../utils/utilFunction';

function QCProtocolView({ protId, path, userType, protocolNumber }) {
  const dispatch = useDispatch();
  const viewData = useSelector(viewResult);
  const [protData, setProtData] = useState();
  const [state, setState] = React.useState(false);
  const summary = useSelector(protocolSummary);
  const BladeRightValue = useSelector(rightBladeValue);
  const { data } = summary ? summary : {};

  useEffect(() => {
    if (protId) {
      dispatch({ type: 'GET_PROTOCOL_SUMMARY', payload: protId });
    }
  }, [protId]);

  useEffect(() => {
    if (data) {
      setProtData({
        ...data,
        userPrimaryRoleFlag: true,
      });
    }
  }, [data]);

  const handleOpen = (variant) => {
    setState({ ...state, [variant]: true });
  };

  const handleClose = (variant) => {
    setState({ ...state, [variant]: false });
  };
  return (
    <div>
      {BladeRightValue &&
        BladeRightValue.includes(PROTOCOL_RIGHT_MENU.HOME) && (
          <Button
            className="button-style"
            variant="secondary"
            onClick={() => handleOpen('neutral')}
          >
            Submit
          </Button>
        )}

      <Modal
        className="modal"
        open={state.neutral}
        onClose={() => handleClose('neutral')}
        title=""
        message="Do you want to submit ?"
        buttonProps={[{}, { label: 'Submit' }]}
        id="Submit"
      />
      {data && <ProtocolView protId={protId} data={protData} refs={null} />}
    </div>
  );
}

export default QCProtocolView;
