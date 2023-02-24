/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'apollo-react/components/Button';
import Loader from '../../../Components/Loader/Loader';
import {
  protocolSummary,
  rightBladeValue,
  viewResult,
} from '../../Protocols/protocolSlice';
import { loader } from '../qcSlice';
import ProtocolView from '../../Protocols/ProtocolView';
import { PROTOCOL_RIGHT_MENU } from '../../Protocols/Constant/Constants';
import Modal from 'apollo-react/components/Modal';
import { isPrimaryUser } from '../../../../utils/utilFunction';

function QCProtocolView({ protId, path, userType, protocolNumber }) {
  const dispatch = useDispatch();
  const viewData = useSelector(viewResult);
  const [protData, setProtData] = useState();
  const qcLoader = useSelector(loader);
  const [state, setState] = React.useState(false);
  const summary = useSelector(protocolSummary);
  const BladeRightValue = useSelector(rightBladeValue);
  const { data } = summary ? summary : {};

  useEffect(() => {
    dispatch({
      type: 'GET_PROTOCOL_TOC_SAGA',
      payload: {
        endPoint: 'protocol_data/',
        id: protId,
        user: 'qc',
        protocol: protocolNumber,
      },
    });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (protId) {
      dispatch({ type: 'GET_PROTOCOL_SUMMARY', payload: protId });
    }
  }, [protId]);

  useEffect(() => {
    if (data) {
      setProtData( {
        ...data,
        userPrimaryRoleFlag: isPrimaryUser(data),
      });
    }
  }, [data]);
  
  const listData = [];
  const subSections = {
    TOC:  viewData.tocSections,
    SOA:  viewData.soaSections,
  };
  /* istanbul ignore else */
  if (subSections.TOC && subSections.TOC.length) {
    listData.push({
      section: 'Table of Contents',
      id: 'TOC',
      subSections: true,
    });
  }
  /* istanbul ignore else */
  if (subSections.SOA && subSections.SOA.length) {
    listData.push({
      section: 'Schedule of Assessments',
      id: 'SOA',
      subSections: true,
    });
  }
  /* istanbul ignore else */
  if ( viewData.iqvdataSummary) {
    listData.push({ section: 'Summary', id: 'SUM', subSections: false });
  }

  const handleOpen = (variant) => {
    setState({ ...state, [variant]: true });
  };

  const handleClose = (variant) => {
    setState({ ...state, [variant]: false });
  };
  if (viewData.loader || qcLoader) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 0,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            margin: 'auto',
            marginTop: '10%',
          }}
        >
          <Loader />
        </div>
      </div>
    );
  }

  if (viewData.err) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 0,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            margin: 'auto',
            marginTop: '10%',
          }}
        >
          {viewData.err}
        </div>
      </div>
    );
  }
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
      {data &&( <ProtocolView protId={protId} data={protData} refs={null} />)}
    </div>
  );
}

export default QCProtocolView;
