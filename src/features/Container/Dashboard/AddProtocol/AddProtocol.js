/* eslint-disable */
import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import Link from 'apollo-react/components/Link';
import './style.scss';
import Button from 'apollo-react/components/Button';
import TextField from 'apollo-react/components/TextField';
import Modal from 'apollo-react/components/Modal';
import Grid from 'apollo-react/components/Grid';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import Typography from 'apollo-react/components/Typography';
import PageLoader from 'apollo-react/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import Plus from 'apollo-react-icons/Plus';
import InfoIcon from 'apollo-react-icons/Info';
import IconButton from 'apollo-react/components/IconButton';
import Tooltip from 'apollo-react/components/Tooltip';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import {
  initialFormErrorValues,
  initialFormValues,
  documentStatusList,
  amendmentNumber,
  emptyAutoObj,
} from './constants';
import { dashboard, addProtocolErrorData } from '../dashboardSlice';
import CustomDropdown from '../../../Components/CustomDropdown/CustomDropdown';
import Loader from '../../../Components/Loader/Loader';
import CustomFileUpload from './CustomFileUpload';
import { messages } from '../../../../AppConstant/AppConstant';
import PipelineComponent from '../Pipeline/Pipeline';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import { errorMessage, dashboardErrorType } from '../constant';

const versionRegx = /^[a-zA-Z0-9\s-._ ]*$/;
const versionErrText = messages.versionMessage.validationMessage;
function AddProtocol() {
  let dropdownFocus = '';
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);
  const addProtocolError = useSelector(addProtocolErrorData);
  const dashboardData = useSelector(dashboard);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [inputValue2, setInputValue2] = React.useState();
  const [documentValue2, setDocumentValue2] = React.useState();
  const [showAdminModal, setShowAdminModal] = React.useState(false);
  const [valueTemp] = useState({
    amendmentNumber: { label: '' },
    documentStatus: { label: '' },
  });
  const [value2, setValue2] = React.useState({
    amendmentNumber: undefined,
    documentStatus: undefined,
  });
  const [formErrorValues, setFormErrorValues] = useState(
    initialFormErrorValues,
  );
  const [tabSelected, setTabSelected] = React.useState(0);
  const [docIdEntered, setDocIdEntered] = React.useState('');
  const [workFlow, setWorkflow] = React.useState('');
  const [docIdError, setDocIdError] = React.useState(false);
  const [workFlowName, setWorkflowName] = React.useState('');
  const [workFlowNameError, setWorkflowNameError] = React.useState('');
  const [workflowError, setworkflowError] = React.useState(false);
  const workflowSubmitData = useSelector(
    (state) => state.dashboard.workflowSubmit,
  );
  const history = useHistory();

  useEffect(() => {
    if (userDetail.user_type === 'admin') {
      setShowAdminModal(true);
    }
  }, [userDetail]);

  useEffect(() => {
    if (workflowSubmitData.success) {
      setDocIdEntered('');
    setWorkflowName('');
      toast.success(
        'Workflows execution were submitted successfully for the protocol',
      );
      dispatch({ type: 'RESET_SUBMIT_WORKFLOW_DATA' });
    }
  }, [workflowSubmitData]);
  const handleChangeTab = (event, value) => {
    setTabSelected(value);
  };

  const handleOpen = () => {
    dispatch({ type: 'TOGGLE_ADDPROTOCOL_MODAL', payload: true });
  };

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_ADDPROTOCOL_MODAL', payload: false });
  };
  const onModalClose = () => {
    handleClose();
    setValue2({ amendmentNumber: undefined, documentStatus: undefined });
    dispatch({ type: 'RESET_ERROR_ADD_PROTOCOL' });
    dispatch({ type: 'RESET_ERROR_ADD_PROTOCOL_NEW' });
  };
  const onModalOpen = () => {
    dispatch({ type: 'RESET_ERROR_ADD_PROTOCOL' });
    setFormValues(initialFormValues);
    setValue2({ amendmentNumber: undefined, documentStatus: undefined });
    setFormErrorValues(initialFormErrorValues);
    handleOpen();
  };
  const onTextFieldChange = (fieldName, e, fieldType, dropdownValue) => {
    const tempError = cloneDeep(formErrorValues);
    const tempValues = cloneDeep(formValues);
    if (fieldType === 'Textbox') {
      if (
        formErrorValues[fieldName].isRequired &&
        !e.target.value.trim().length > 0
      ) {
        tempError[fieldName].error = true;
        tempError[fieldName].errorMessage = 'Required';
      } else {
        tempError[fieldName].error = false;
        tempError[fieldName].errorMessage = ' ';
      }
      if (formErrorValues[fieldName].regex && e.target.value.length > 0) {
        const reg = formErrorValues[fieldName].regex;
        // let reg = new RegExp(formErrorValues[fieldName].regex);
        // let isNumber = /^[0-9]+(\.[0-9]{1,2})?$/.test(e.target.value);
        const isNumber = versionRegx.test(e.target.value);
        if (isNumber && reg.test(parseFloat(e.target.value))) {
          tempValues[fieldName] = e.target.value;
          tempError[fieldName].error = false;
          tempError[fieldName].errorMessage = ' ';
        } else {
          tempValues[fieldName] = e.target.value;
          tempError[fieldName].error = true;
          tempError[fieldName].errorMessage = versionErrText;
        }
      } else {
        tempValues[fieldName] = e.target.value;
      }
      if (
        ['protocolNumber', 'projectID'].includes(fieldName) &&
        e.target.value.trim().length > 0
      ) {
        tempError.protocolNumber.error = false;
        tempError.protocolNumber.errorMessage = ' ';
        tempError.projectID.error = false;
        tempError.projectID.errorMessage = ' ';
      }
      setFormValues(tempValues);
      setFormErrorValues(tempError);
    }
    if (fieldType === 'CustomDropdown') {
      if (
        dropdownValue &&
        dropdownValue.label &&
        dropdownValue.label.length > 0
      ) {
        tempError[fieldName].error = false;
        tempError[fieldName].errorMessage = '';
        tempValues[fieldName] = dropdownValue;
        dropdownFocus = dropdownValue.label;
      } else {
        tempValues[fieldName] = { label: '' };
      }
      setFormErrorValues(tempError);
      setFormValues(tempValues);
    }
    if (fieldType === 'Dropdown') {
      if (dropdownValue != null) {
        dropdownFocus =
          dropdownValue && dropdownValue.label && dropdownValue.label;
        const tempValue2 = cloneDeep(value2);
        tempValue2[fieldName] = dropdownValue;
        setValue2(tempValue2);

        tempError[fieldName].error = false;
        tempError[fieldName].errorMessage = '';
        tempValues[fieldName] = dropdownValue || { label: '' };
        setFormValues(tempValues);
        valueTemp[fieldName] = dropdownValue;
      } else {
        if (!dropdownFocus.length > 0) {
          valueTemp[fieldName] = { label: '' };
        }
        // DropDown logic changes Ends
      }
      setFormErrorValues(tempError);
    }
  };

  const onFieldBlur = (fieldName, e, fieldType) => {
    const temp = cloneDeep(formErrorValues);
    const temp2 = cloneDeep(valueTemp);
    if (fieldType === 'Textbox') {
      if (
        !e.target.value.trim().length > 0 &&
        formErrorValues[fieldName].isRequired
      ) {
        temp[fieldName].error = true;
        temp[fieldName].errorMessage = 'Required';
      } else if (!temp[fieldName].error) {
        temp[fieldName].error = false;
        temp[fieldName].errorMessage = ' ';
      }
      if (
        formErrorValues[fieldName].regex &&
        e.target.value &&
        e.target.value.trim().length > 0
      ) {
        const reg = formErrorValues[fieldName].regex;
        // let reg = new RegExp(formErrorValues[fieldName].regex);
        // let isNumber = /^[0-9]+(\.[0-9]{1,2})?$/.test(e.target.value);
        const isNumber = versionRegx.test(e.target.value);
        if (isNumber && reg.test(parseFloat(e.target.value))) {
          temp[fieldName].error = false;
          temp[fieldName].errorMessage = ' ';
        } else {
          temp[fieldName].error = true;
          // temp[fieldName].errorMessage =
          //   "Does not Match, Positive and upto 2 Decimals only";
          temp[fieldName].errorMessage = versionErrText;
        }
      }
      setFormErrorValues(temp);
    }
    if (fieldType === 'Dropdown') {
      if (!dropdownFocus.length > 0 && formErrorValues[fieldName].isRequired) {
        if (fieldName === 'amendmentNumber') {
          temp.versionNumber.error = false;
          temp.versionNumber.errorMessage = ' ';
        }
        temp[fieldName].error = true;
        temp[fieldName].errorMessage = 'Required';
        // DropDown logic changes start
        if (temp2[fieldName].label && temp2[fieldName].label.length > 0) {
          temp[fieldName].error = false;
          temp[fieldName].errorMessage = ' ';
        }
        // DropDown logic changes start
      } else {
        temp[fieldName].error = false;
        temp[fieldName].errorMessage = ' ';
      }
      dropdownFocus = '';
      setFormErrorValues(temp);
    }
    if (fieldType === 'CustomDropdown') {
      if (!e.length > 0 && formErrorValues[fieldName].isRequired) {
        temp[fieldName].error = true;
        temp[fieldName].errorMessage = 'Select or Add';
      } else {
        temp[fieldName].error = false;
        temp[fieldName].errorMessage = ' ';
      }
      dropdownFocus = '';
      setFormErrorValues(temp);
    }
  };
  const handleFileUploadError = (msg, err, fieldName) => {
    const tempError = cloneDeep(formErrorValues);
    tempError[fieldName].error = err;
    tempError[fieldName].errorMessage = msg;
    setFormErrorValues(tempError);
  };
  const setUploadFile = (file, fieldName) => {
    const tempValue = cloneDeep(formValues);
    tempValue[fieldName] = file;
    setFormValues(tempValue);
  };
  /* istanbul ignore next */
  const sendPostData = (duplicatePush) => {
    const tempFormValues = cloneDeep(formValues);
    let postData = {};
    postData = {
      duplicateCheck: !duplicatePush,
      protocol_number: tempFormValues.protocolNumber
        ? encodeURIComponent(tempFormValues.protocolNumber)
        : '',
      protocol_version: tempFormValues.versionNumber
        ? tempFormValues.versionNumber
        : '',
      is_active: true,
      created_by: 'User',
      modified_by: 'User',
      amendmentNumber:
        tempFormValues &&
        tempFormValues.amendmentNumber &&
        tempFormValues.amendmentNumber.label,
      documentStatus:
        tempFormValues.documentStatus &&
        encodeURIComponent(tempFormValues.documentStatus.value),
      projectID:
        tempFormValues.projectID &&
        encodeURIComponent(tempFormValues.projectID),
      uploadFile: tempFormValues.uploadFile ? tempFormValues.uploadFile : [],
      fileName:
        tempFormValues.uploadFile[0].name &&
        encodeURIComponent(tempFormValues.uploadFile[0].name),
    };
    dispatch({ type: 'POST_ADDPROTOCOL_DATA', payload: postData });
  };
  /* istanbul ignore next */
  const handleSaveForm = () => {
    const tempValues = cloneDeep(formValues);
    const tempError = cloneDeep(formErrorValues);
    let errorExist = false;
    for (const field of Object.keys(tempError)) {
      switch (tempError[field].type) {
        case 'Textbox':
        case 'File':
          if (
            (tempValues[field] &&
              tempValues[field].length > 0 &&
              !tempError[field].error) ||
            !tempError[field].isRequired
          ) {
            if (field === 'versionNumber1') {
              tempError[field].error = true;
              tempError[field].errorMessage = 'Required';
              errorExist = true;
            }
          } else {
            tempError[field].error = true;
            tempError[field].errorMessage = 'Required';
            errorExist = true;
          }
          break;
        case 'Dropdown':
        case 'CustomDropdown':
          if (
            (tempValues[field] &&
              tempValues[field].label &&
              tempValues[field].label.length > 0 &&
              !tempError[field].error) ||
            !tempError[field].isRequired
          ) {
            tempError[field].error = false;
            tempError[field].errorMessage = ' ';
          } else {
            tempError[field].error = true;
            tempError[field].errorMessage =
              tempError[field].type === 'Dropdown'
                ? 'Required'
                : 'Select or Add';
            errorExist = true;
          }
          break;
        default:
          break;
      }
      if (!tempValues.protocolNumber.length && !tempValues.projectID.length) {
        tempError.protocolNumber.error = true;
        tempError.protocolNumber.errorMessage =
          'Please enter either protocol or project id or both';
        tempError.projectID.error = true;
        tempError.projectID.errorMessage =
          'Please enter either protocol or project id or both';
        errorExist = true;
      } else {
        tempError.protocolNumber.error = false;
        tempError.protocolNumber.errorMessage = ' ';
        tempError.projectID.error = false;
        tempError.projectID.errorMessage = ' ';
      }
    }
    setFormErrorValues(tempError);
    if (!errorExist) {
      sendPostData();
    }
  };

  const getSubTitle = (arr) => {
    return (
      <ul className="version-validation">
        {arr.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    );
  };
  const handleProtocolClick = (docid) => {
    onModalClose();
    history.push(`/protocols?protocolId=${docid}`);
  };
  const renderAddProtocolContent = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={5} sm={5}>
          <TextField
            label="Protocol Number"
            placeholder="Protocol Number"
            fullWidth
            value={formValues.protocolNumber}
            helperText={formErrorValues.protocolNumber.errorMessage}
            error={formErrorValues.protocolNumber.error}
            required={formErrorValues.protocolNumber.isRequired}
            onChange={(e) => onTextFieldChange('protocolNumber', e, 'Textbox')}
            onBlur={(e) => onFieldBlur('protocolNumber', e, 'Textbox')}
            data-testid="protocol-number-texfield"
          />
        </Grid>
        <Grid item xs={1} sm={1} />
        <Grid item xs={5} sm={5}>
          <div className="autocomplete-class" id="amendmentNumber">
            <AutocompleteV2
              label="Amendment"
              placeholder="Amendment"
              source={amendmentNumber}
              fullWidth
              value={value2.amendmentNumber}
              helperText={formErrorValues.amendmentNumber.errorMessage}
              error={formErrorValues.amendmentNumber.error}
              required={formErrorValues.amendmentNumber.isRequired}
              onBlur={(e) => onFieldBlur('amendmentNumber', e, 'Dropdown')}
              onChange={(e, newValue) =>
                onTextFieldChange('amendmentNumber', e, 'Dropdown', newValue)
              }
              inputValue={inputValue2}
              onInputChange={(event, newInputValue) => {
                setInputValue2(newInputValue);
              }}
              data-testid="amendment-number-texfield"
            />
          </div>
        </Grid>
        <Grid item xs={1} sm={1} />
        <Grid item xs={5} sm={5}>
          <TextField
            label="Project ID or Opportunity Number"
            placeholder="Project ID or Opportunity Number"
            value={formValues.projectID}
            fullWidth
            helperText={formErrorValues.projectID.errorMessage}
            error={formErrorValues.projectID.error}
            required={formErrorValues.projectID.isRequired}
            onChange={(e) => onTextFieldChange('projectID', e, 'Textbox')}
            onBlur={(e) => onFieldBlur('projectID', e, 'Textbox')}
            data-testid="projectID-texfield"
          />
        </Grid>
        <Grid item xs={1} sm={1} />
        <Grid item xs={5} sm={5}>
          <TextField
            className="version-text-field"
            label={
              <span>
                Version Number <span className="asteric">*</span>
                <Tooltip
                  variant="light"
                  title={messages.versionMessage.heading}
                  subtitle={getSubTitle(messages.versionMessage.infoMessage)}
                  placement="left"
                >
                  <IconButton color="grey" size="small">
                    <InfoIcon size="small" />
                  </IconButton>
                </Tooltip>
              </span>
            }
            placeholder="Version Number"
            value={formValues.versionNumber}
            fullWidth
            helperText={formErrorValues.versionNumber.errorMessage}
            error={formErrorValues.versionNumber.error}
            required={formErrorValues.versionNumber.isRequired}
            onChange={(e) => onTextFieldChange('versionNumber', e, 'Textbox')}
            onBlur={(e) => onFieldBlur('versionNumber', e, 'Textbox')}
            data-testid="version-number-texfield"
          />
        </Grid>
        <Grid item xs={1} sm={1} />

        <Grid item xs={5} sm={5}>
          <div className="autocomplete-class">
            <AutocompleteV2
              label="Document Status"
              placeholder="Document Status"
              source={documentStatusList}
              fullWidth
              value={value2.documentStatus}
              helperText={formErrorValues.documentStatus.errorMessage}
              error={formErrorValues.documentStatus.error}
              required={formErrorValues.documentStatus.isRequired}
              onBlur={(e, newValue) =>
                onFieldBlur('documentStatus', e, 'Dropdown')
              }
              onChange={(e, newValue) => {
                onTextFieldChange('documentStatus', e, 'Dropdown', newValue);
              }}
              inputValue={documentValue2}
              onInputChange={(event, newInputValue) => {
                setDocumentValue2(newInputValue);
              }}
              data-testid="document-status-texfield"
            />
          </div>
        </Grid>
        <Grid item xs={1} sm={1} />

        <Grid item xs={1} sm={1} />
        <Grid item xs={1} sm={1} />
        <Typography variant="title2" gutterBottom>
          Place the protocol document in PDF or Word{' '}
          <span className="emphasize">(English only)</span> format below.
          <span className="file-required-astrik"> *</span>
        </Typography>
        <Grid item xs={12} sm={12}>
          <div
            className="custom-fileupload-add"
            data-testid="custom-fileupload"
          >
            <CustomFileUpload
              formSelectedFiles={
                formValues.uploadFile && formValues.uploadFile.length > 0
                  ? formValues.uploadFile
                  : []
              }
              fullWidth
              handleFileUploadError={handleFileUploadError}
              setUploadFile={setUploadFile}
            />
          </div>
          {formErrorValues &&
            formErrorValues.uploadFile &&
            formErrorValues.uploadFile.errorMessage === 'Required' && (
              <span className="file-error-message">Required</span>
            )}
          {renderError()}
        </Grid>
      </Grid>
    );
  };

  const renderError = () => {
    if (addProtocolError?.type === 'inputCheck') {
      return (
        <div className="protocol-duplicate-error">
          {addProtocolError.data.message}
        </div>
      );
    } else if (addProtocolError?.type === 'protocolDuplicate') {
      return (
        !isEmpty(addProtocolError.data) && (
          <>
            <div className="protocol-duplicate-error">
              <div className="line-one">{addProtocolError.data.message}</div>
              <div className="line-two">
                <span>Protocol Name: </span>
                <Link
                  onClick={() =>
                    handleProtocolClick(addProtocolError.data.docid)
                  }
                >
                  {addProtocolError.data.protocolName}
                </Link>
              </div>
            </div>
            {showAdminModal && (
              <div className="protocol-admin-feature">
                <div className="line-one">
                  {errorMessage.adminMessage + ' '}
                  <span
                    className="link-click-here"
                    onClick={() => sendPostData(true)}
                  >
                    Click here
                  </span>
                </div>
              </div>
            )}
          </>
        )
      );
    }
    return <></>;
  };
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
    if (!workFlowName) {
      setWorkflowNameError(true);
    } else {
      setWorkflowNameError(false);
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
  return (
    <div className="add-protocol">
      <div className="add-protocol-button">
        <Button
          variant="primary"
          onClick={() => onModalOpen()}
          icon={Plus}
          data-testid="add-protocol-button"
        >
          Add Protocol to Library
        </Button>
      </div>
      {showAdminModal ? (
        <Modal
          className="admin-add-protocol-modal"
          variant="default"
          open={dashboardData && dashboardData.addProtocolModal}
          onClose={() => onModalClose()}
          subtitle={
            dashboardData &&
            dashboardData.addProtocolDataError && (
              <span className="file-error-message">
                {dashboardData.addProtocolDataError}
              </span>
            )
          }
          buttonProps={[
            {},
            {
              label: tabSelected === 0 ? 'Save' : 'Submit',
              onClick:
                tabSelected === 0 ? handleSaveForm : handlePipelineSubmit,
            },
          ]}
          id="add-protocol-modal"
          data-testid="add-protocol-modal"
        >
          <div data-testid="workflow-orchestration">
            <Tabs value={tabSelected} onChange={handleChangeTab} truncate>
              <Tab label="Add Protocol to Library" />
              <Tab label="Workflow Orchestration" />
            </Tabs>
          </div>
          <div>
            {tabSelected === 0 && (
              <div className="add-protocol-tab-container">
                {dashboardData.isLoading && <PageLoader />}
                {renderAddProtocolContent()}
              </div>
            )}
            {tabSelected === 1 && (
              <PipelineComponent
                setDocId={setDocIdEntered}
                setWorkflow={setWorkflow}
                docIdError={docIdError}
                workflowError={workflowError}
                setWorkflowName={setWorkflowName}
                workflowNameError={workFlowNameError}
                docId={docIdEntered}
              />
            )}
          </div>
        </Modal>
      ) : (
        <Modal
          variant="default"
          open={dashboardData && dashboardData.addProtocolModal}
          onClose={() => onModalClose()}
          title="Add Protocol to Library"
          subtitle={
            dashboardData &&
            dashboardData.addProtocolDataError && (
              <span className="file-error-message">
                {dashboardData.addProtocolDataError}
              </span>
            )
          }
          buttonProps={[{}, { label: 'Save', onClick: handleSaveForm }]}
          id="add-protocol-modal"
          data-testid="add-protocol-modal"
        >
          {dashboardData.isLoading && <PageLoader />}
          {renderAddProtocolContent()}
        </Modal>
      )}
    </div>
  );
}

export default React.memo(AddProtocol);
