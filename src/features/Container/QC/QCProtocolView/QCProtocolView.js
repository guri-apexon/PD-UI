/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'apollo-react/components/Button';
import Loader from 'apollo-react/components/Loader';
import {
  protocolSummary,
  rightBladeValue,
  viewResult,
} from '../../Protocols/protocolSlice';
import ProtocolView from '../../Protocols/ProtocolView';
import { PROTOCOL_RIGHT_MENU } from '../../Protocols/Constant/Constants';
import Modal from 'apollo-react/components/Modal';
import PipelineComponent from '../../Dashboard/Pipeline/Pipeline';
import { toast } from 'react-toastify';

function QCProtocolView({ protId, handleChangeTab }) {
  const dispatch = useDispatch();
  const [protData, setProtData] = useState();
  const [docIdEntered, setDocIdEntered] = React.useState(protId || '');
  const [workFlow, setWorkflow] = React.useState('');
  const [docIdError, setDocIdError] = React.useState(false);
  const [workFlowName, setWorkflowName] = React.useState('');
  const [workflowError, setworkflowError] = React.useState(false);
  const [showPipelineModal, setShowPipelineModal] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const summary = useSelector(protocolSummary);
  const BladeRightValue = useSelector(rightBladeValue);
  const workflowSubmitData = useSelector(
    (state) => state.dashboard.workflowSubmit,
  );
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

  useEffect(() => {
    if (workflowSubmitData.success) {
      dispatch({ type: 'APPROVE_QC_SAGA', payload: protId });
      setShowPipelineModal(false);
      handleChangeTab(null, 0);
      dispatch({ type: 'RESET_SUBMIT_WORKFLOW_DATA' });
    }
  }, [workflowSubmitData]);

  const handlePipelineSubmit = () => {
    let finalWorkflow = [];
    workFlow.forEach((item) => {
      let obj = { work_flow_name: item.work_flow_name, dependency_graph: [] };
      item.services.map((service) => {
        if (service.checked) {
          const serviceObj = {
            service_name: service.service_name,
            depends: service.depends,
          };
          obj.dependency_graph.push(serviceObj);
        }
      });
      if (obj.dependency_graph.length) {
        finalWorkflow.push(obj);
      }
    });
    if (!docIdEntered) {
      setDocIdError(true);
    } else {
      setDocIdError(false);
    }
    if (!finalWorkflow.length) {
      setworkflowError(true);
    } else {
      setworkflowError(false);
    }
    if (docIdEntered && finalWorkflow.length) {
      const body = {
        docId: docIdEntered,
        workFlowName,
        workFlowList: finalWorkflow,
      };
      dispatch({
        type: 'SUBMIT_WORKFLOW_DATA',
        payload: body,
      });
    }
  };

  const handleQCApprove = () => {
    dispatch({ type: 'APPROVE_QC_SAGA', payload: protId });
    setModalOpen(false);
  };
  if (workflowSubmitData.loading) {
    return <Loader />;
  }
  return (
    <div>
      {BladeRightValue &&
        BladeRightValue.includes(PROTOCOL_RIGHT_MENU.HOME) && (
          <Button
            className="button-style"
            variant="secondary"
            onClick={() => setModalOpen(true)}
          >
            Submit
          </Button>
        )}
      <Modal
        className="modal"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title=""
        message="Please select what action you need to perform ?"
        buttonProps={[
          {
            label: 'QC Approve',
            onClick: () => handleQCApprove(),
          },
          {
            label: 'Workflow Orchestration',
            onClick: () => {
              setShowPipelineModal(true);
              setModalOpen(false);
            },
          },
        ]}
        id="Submit"
      />
      <Modal
        className="admin-add-protocol-modal"
        variant="default"
        open={showPipelineModal}
        onClose={() => setShowPipelineModal(false)}
        title="Workflow Orchestration"
        buttonProps={[
          {},
          {
            label: 'Submit',
            onClick: handlePipelineSubmit,
          },
        ]}
        id="add-protocol-modal"
        data-testid="add-protocol-modal"
      >
        <PipelineComponent
          setDocId={setDocIdEntered}
          setWorkflow={setWorkflow}
          docIdError={docIdError}
          workflowError={workflowError}
          setWorkflowName={setWorkflowName}
          docId={docIdEntered}
          userType="QC1"
        />
      </Modal>
      {data && <ProtocolView protId={protId} data={protData} refs={null} />}
    </div>
  );
}

export default QCProtocolView;
