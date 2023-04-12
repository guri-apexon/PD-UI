import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import TextField from 'apollo-react/components/TextField';
import Loader from '../../../Components/Loader/Loader';
import { workflow } from '../dashboardSlice';
import './style.scss';

function PipelineComponent({
  setDocId,
  setWorkflow,
  docIdError,
  workflowError,
  setWorkflowName,
  docId,
  userType,
}) {
  const [workflowData, setWorkflowData] = useState([]);
  const [customWorkflowData, setCustomWorkflowData] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const dispatch = useDispatch();
  const workFlowStoreData = useSelector(workflow);

  useEffect(() => {
    if (workFlowStoreData.data.Status !== 200) {
      dispatch({ type: 'FETCH_WORKFLOW_DATA' });
    }
    // eslint-disable-next-line
  }, [dispatch]);

  const formatData = (workflow) => {
    const newArr = Object.keys(workflow)?.map((key) => {
      const obj = { work_flow_name: key, checked: false, services: [] };
      workflow[key].forEach((service) => {
        const inObj = {
          service_name: service.service_name,
          checked: false,
          depends: service.depends,
          disabled: false,
        };
        obj.services.push(inObj);
      });
      return obj;
    });
    return newArr;
  };

  useEffect(() => {
    if (!isEmpty(workFlowStoreData.data.custom_workflows)) {
      const custom = formatData(workFlowStoreData.data.custom_workflows);
      const workflow = formatData(workFlowStoreData.data.default_workflows);
      setWorkflowData(workflow);
      setCustomWorkflowData(custom);
    }
  }, [workFlowStoreData]);

  useEffect(() => {
    const mergedArr = workflowData.concat(customWorkflowData);
    setWorkflow(mergedArr);
    // eslint-disable-next-line
  }, [workflowData, customWorkflowData]);

  const isAllTrue = (arrObj) => {
    let allTrue = true;
    arrObj.forEach((item) => {
      if (!item.checked) {
        allTrue = false;
      }
    });
    return allTrue;
  };
  const handleDependencies = (servicesArr, serviceObj) => {
    const arr = [...servicesArr];
    if (serviceObj.depends.length) {
      arr.forEach((service) => {
        serviceObj.depends.forEach((dependent) => {
          if (dependent === service.service_name) {
            service.checked = serviceObj.checked;
            service.disabled = serviceObj.checked;
            if (service.depends.length) {
              handleDependencies(arr, service);
            }
          }
        });
      });
    }
    return arr;
  };

  const handleServiceClick = (parentIndex, childIndex, type) => {
    if (type === 'default') {
      const newArr = [...workflowData];
      newArr[parentIndex].services[childIndex].checked =
        !newArr[parentIndex].services[childIndex].checked;
      newArr[parentIndex].services = handleDependencies(
        newArr[parentIndex].services,
        newArr[parentIndex].services[childIndex],
      );

      if (!isAllTrue(newArr[parentIndex].services)) {
        newArr[parentIndex].checked = false;
        setAllChecked(false);
      } else {
        newArr[parentIndex].checked = true;
        if (isAllTrue(newArr)) {
          setAllChecked(true);
        } else {
          setAllChecked(false);
        }
      }
      setWorkflowData(newArr);
    } else {
      const newArr = [...customWorkflowData];
      newArr[parentIndex].services[childIndex].checked =
        !newArr[parentIndex].services[childIndex].checked;
      newArr[parentIndex].services = handleDependencies(
        newArr[parentIndex].services,
        newArr[parentIndex].services[childIndex],
      );

      if (!isAllTrue(newArr[parentIndex].services)) {
        newArr[parentIndex].checked = false;
      } else {
        newArr[parentIndex].checked = true;
      }
      setCustomWorkflowData(newArr);
    }
  };
  const handleWorkflowSelected = (index, type) => {
    if (type === 'default') {
      const newArr = [...workflowData];
      newArr[index].checked = !newArr[index].checked;
      newArr[index].services.forEach((item) => {
        item.checked = newArr[index].checked;
        item.disabled = newArr[index].checked;
      });
      if (isAllTrue(newArr)) {
        setAllChecked(true);
      } else {
        setAllChecked(false);
      }
      setWorkflowData(newArr);
    } else {
      const newArr = [...customWorkflowData];
      newArr[index].checked = !newArr[index].checked;
      newArr[index].services.forEach((item) => {
        item.checked = newArr[index].checked;
        item.disabled = newArr[index].checked;
      });
      setCustomWorkflowData(newArr);
    }
  };
  const renderWorkflow = (data, type) => {
    return data.map((item, i) => (
      <div className="workflow-services" key={item.work_flow_name}>
        <div className="checkbox-parent">
          <input
            id={`wf-${item.work_flow_name}`}
            type="checkbox"
            onChange={() => handleWorkflowSelected(i, type)}
            checked={item.checked}
            data-testid={item.work_flow_name}
          />
          <label className="input-label" htmlFor={`wf-${item.work_flow_name}`}>
            {item.work_flow_name}
          </label>
        </div>
        <div className="checkbox-childs">
          {item.services.map((service, j) => (
            <div key={service.service_name + item.work_flow_name}>
              <input
                type="checkbox"
                onChange={() => handleServiceClick(i, j, type)}
                checked={service.checked}
                data-testid={service.service_name}
                disabled={service.disabled}
                id={`service-${service.service_name + item.work_flow_name}`}
              />
              <label
                className="input-label"
                htmlFor={`service-${
                  service.service_name + item.work_flow_name
                }`}
              >
                {service.service_name}
              </label>
            </div>
          ))}
        </div>
      </div>
    ));
  };
  const handleAllClick = () => {
    setAllChecked(!allChecked);
    const newArr = workflowData.map((item) => {
      if (allChecked) {
        const newServiceArr = item.services.map((service) => {
          return { ...service, checked: false, disabled: false };
        });
        return { ...item, services: newServiceArr, checked: false };
      }
      const newServiceArrTrue = item.services.map((service) => {
        return { ...service, checked: true, disabled: false };
      });
      return { ...item, services: newServiceArrTrue, checked: true };
    });
    setWorkflowData(newArr);
  };
  return (
    <div className="pipeline-component">
      <div className="docid-section">
        <TextField
          label="Please enter docid:"
          placeholder="Enter docid here"
          minWidth={400}
          required
          className="docid-field"
          fullWidth
          onChange={(e) => setDocId(e.target.value)}
          error={docIdError}
          value={docId}
          helperText={
            docIdError ? 'Please enter the docId of the protocol' : ''
          }
          disabled={userType !== 'admin'}
        />
      </div>
      {workFlowStoreData.loading && (
        <div className="custom-loader-container">
          <Loader />
        </div>
      )}
      <div className="workflow-section">
        <label
          className={
            workflowError ? 'workflow-text error-text-color' : 'workflow-text'
          }
        >
          Select workflow/services to run: <span>*</span>
        </label>
        <div className="custom-workflow">
          <label className="custom-label">Default workflows:</label>
          <div className="all-workflow">
            <input
              type="checkbox"
              onChange={() => handleAllClick()}
              checked={allChecked}
              data-testid="all-checkbox"
            />
            <label className="input-label">All</label>
          </div>
          <div className="workflow-render">
            {renderWorkflow(workflowData, 'default')}
          </div>
        </div>
        {userType === 'admin' && (
          <div className="custom-workflow">
            <label className="custom-label">Custom workflows:</label>
            <div className="workflow-render">
              {renderWorkflow(customWorkflowData, 'custom')}
            </div>
          </div>
        )}
      </div>
      {userType === 'admin' && (
        <div className="docid-section">
          <TextField
            label="Please enter workflow name"
            placeholder="Workflow name"
            minWidth={400}
            className="docid-field"
            fullWidth
            onChange={(e) => setWorkflowName(e.target.value)}
            helperText="This is a custom name for the workflow combination you are selecting. Add name here if you really needs to create one new custom workflow"
          />
        </div>
      )}
    </div>
  );
}
PipelineComponent.propTypes = {
  setDocId: PropTypes.func.isRequired,
  setWorkflowName: PropTypes.func.isRequired,
  setWorkflow: PropTypes.func.isRequired,
  workflowError: PropTypes.bool.isRequired,
  docIdError: PropTypes.bool.isRequired,
  docId: PropTypes.string,
  userType: PropTypes.string,
};

PipelineComponent.defaultProps = {
  docId: '',
  userType: 'admin',
};
export default React.memo(PipelineComponent);
