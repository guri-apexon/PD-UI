import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'apollo-react/components/TextField';
import Checkbox from 'apollo-react/components/Checkbox';
import CheckboxGroup from 'apollo-react/components/CheckboxGroup';
import { workflow } from '../dashboardSlice';

function PipelineComponent({
  setDocId,
  setWorkflow,
  docIdError,
  workflowError,
}) {
  const [workflowData, setWorkflowData] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const dispatch = useDispatch();
  const workFlowStoreData = useSelector(workflow);

  useEffect(() => {
    dispatch({ type: 'FETCH_WORKFLOW_DATA' });
  }, [dispatch]);

  useEffect(() => {
    if (workFlowStoreData.data.length) {
      const newArr = workFlowStoreData?.data?.map((item) => {
        const obj = { ...item, checked: false, services: [] };
        item.services.forEach((service) => {
          const inObj = {
            service_name: service,
            checked: false,
          };
          obj.services.push(inObj);
        });
        return obj;
      });
      setWorkflowData(newArr);
    }
  }, [workFlowStoreData]);

  useEffect(() => {
    setWorkflow(workflowData);
  }, [workflowData]);

  const isAllTrue = (arrObj) => {
    let allTrue = true;
    arrObj.forEach((item) => {
      if (!item.checked) {
        allTrue = false;
      }
    });
    return allTrue;
  };
  const handleServiceClick = (parentIndex, childIndex) => {
    const newArr = [...workflowData];
    newArr[parentIndex].services[childIndex].checked =
      !newArr[parentIndex].services[childIndex].checked;
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
  };
  const handleWorkflowSelected = (index) => {
    const newArr = [...workflowData];
    newArr[index].checked = !newArr[index].checked;
    newArr[index].services.forEach((item) => {
      item.checked = newArr[index].checked;
    });
    if (isAllTrue(newArr)) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
    setWorkflowData(newArr);
  };
  const renderWorkflow = () => {
    return workflowData.map((item, i) => (
      <div className="workflow-services" key={item.workflow_name}>
        <div className="checkbox-parent">
          <Checkbox
            label={item.workflow_name}
            checked={item.checked}
            onChange={() => handleWorkflowSelected(i)}
            size="small"
            required
          />
        </div>
        <div className="checkbox-childs">
          <CheckboxGroup size="small">
            {item.services.map((service, j) => (
              <Checkbox
                checked={service.checked}
                label={service.service_name}
                key={service.service_name}
                onChange={() => handleServiceClick(i, j)}
              />
            ))}
          </CheckboxGroup>
        </div>
      </div>
    ));
  };
  const handleAllClick = () => {
    setAllChecked(!allChecked);
    const newArr = workflowData.map((item) => {
      if (allChecked) {
        const newServiceArr = item.services.map((service) => {
          return { ...service, checked: false };
        });
        return { ...item, services: newServiceArr, checked: false };
      }
      const newServiceArrTrue = item.services.map((service) => {
        return { ...service, checked: true };
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
          helperText={
            docIdError ? 'Please enter the docId of the protocol' : ''
          }
        />
      </div>
      <div className="workflow-section">
        <label
          className={
            workflowError ? 'workflow-text error-text-color' : 'workflow-text'
          }
        >
          Select workflow/services to run: <span>*</span>
        </label>
        <div className="all-workflow">
          <Checkbox
            checked={allChecked}
            label="All"
            onChange={() => handleAllClick()}
          />
        </div>
        <div className="workflow-render">{renderWorkflow()}</div>
      </div>
    </div>
  );
}
PipelineComponent.propTypes = {
  setDocId: PropTypes.func.isRequired,
  setWorkflow: PropTypes.func.isRequired,
  workflowError: PropTypes.bool.isRequired,
  docIdError: PropTypes.bool.isRequired,
};
export default PipelineComponent;
