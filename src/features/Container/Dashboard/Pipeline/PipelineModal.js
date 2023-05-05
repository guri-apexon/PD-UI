import React, { useEffect, useState } from 'react';
import Sync from 'apollo-react-icons/Sync';
import Clock from 'apollo-react-icons/Clock';
import StatusCheck from 'apollo-react-icons/StatusCheck';
import Tooltip from 'apollo-react/components/Tooltip';
import Button from 'apollo-react/components/Button';
import PropTypes from 'prop-types';
import { serviceStatus } from './data';

import './pipelineModal.scss';

function PipelineModal({ wfData = [], fetchMoreData, showMore, error }) {
  const [workflowArray, setWorkflowArr] = useState([]);

  const covertToFormat = (data) => {
    const workflowsArr = [];
    data.forEach((workflow) => {
      const servicesObj = {
        services: [],
        name: 'Workflow',
        status: workflow.wfStatus,
        percentComplete: workflow.wfPercentComplete,
        timeCreated: workflow.timeCreated,
      };
      workflow.wfAllServices.forEach((service) => {
        const obj = { name: service, status: '' };
        if (workflow.wfRunningServices.includes(service)) {
          obj.status = serviceStatus.RUNNING;
        } else if (workflow.wfFinishedServices.includes(service)) {
          obj.status = serviceStatus.COMPLETED;
        } else {
          obj.status = serviceStatus.PENDING;
        }
        servicesObj.services.push(obj);
      });
      workflowsArr.push(servicesObj);
    });
    return workflowsArr;
  };

  useEffect(() => {
    if (wfData.length) {
      const workflowsArr = covertToFormat(wfData);
      setWorkflowArr(workflowsArr);
    }
  }, [wfData]);

  const renderStatus = (service) => {
    switch (service.status) {
      case serviceStatus.RUNNING:
        return <Sync />;
      case serviceStatus.COMPLETED:
        return <StatusCheck />;
      default:
        return <Clock />;
    }
  };

  const handlePipeline = () => {
    return workflowArray.map((workFlow) => (
      <div
        className={`pipeline-container pipeline-${workFlow.status}`}
        key={React.key}
      >
        <div className="pipelines">
          {workFlow.services.map((service) => (
            <div className={`service-icons ${service.status}`} key={React.key}>
              <Tooltip variant="light" title={service.name} placement="bottom">
                {renderStatus(service)}
              </Tooltip>
            </div>
          ))}
        </div>
        <div className="overall-status">
          <div className="status-percent">
            {`${workFlow.status} (${workFlow.percentComplete}%)`}
          </div>
          <div className="status-time">{workFlow.timeCreated}</div>
        </div>
      </div>
    ));
  };
  return (
    <div className="show-running-status">
      <div>{workflowArray.length && handlePipeline()}</div>
      <div className="wf-more-error">{error}</div>
      {!showMore && (
        <Button
          className="running-see-more"
          variant="text"
          onClick={() => fetchMoreData()}
        >
          See More..
        </Button>
      )}
    </div>
  );
}
PipelineModal.propTypes = {
  wfData: PropTypes.isRequired,
  fetchMoreData: PropTypes.isRequired,
  showMore: PropTypes.isRequired,
  error: PropTypes.isRequired,
};
export default PipelineModal;
