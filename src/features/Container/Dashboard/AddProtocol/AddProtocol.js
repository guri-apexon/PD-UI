/* eslint-disable */
import React, { useState } from 'react';
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
import {
  initialFormErrorValues,
  initialFormValues,
  documentStatusList,
  amendmentNumber,
  emptyAutoObj,
} from './constants';
import { dashboard } from '../dashboardSlice';
import CustomDropdown from '../../../Components/CustomDropdown/CustomDropdown';
import Loader from '../../../Components/Loader/Loader';
import CustomFileUpload from './CustomFileUpload';
import { messages } from '../../../../AppConstant/AppConstant';

const versionRegx = /^[a-zA-Z0-9\s-._ ]*$/;
const versionErrText = messages.versionMessage.validationMessage;
function AddProtocol() {
  let dropdownFocus = '';
  const dispatch = useDispatch();
  const dashboardData = useSelector(dashboard);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [inputValue2, setInputValue2] = React.useState();
  const [documentValue2, setDocumentValue2] = React.useState();
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

  const handleOpen = () => {
    if (
      !dashboardData.addProtocolData.sponsor.length &&
      !dashboardData.addProtocolData.indication.length
    ) {
      dispatch({ type: 'GET_SPONSOR_ADDPROTCOL_SAGA' });
      dispatch({ type: 'GET_INDICATION_ADDPROTCOL_SAGA' });
    }
    dispatch({ type: 'TOGGLE_ADDPROTOCOL_MODAL', payload: true });
  };

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_ADDPROTOCOL_MODAL', payload: false });
  };
  const onModalClose = () => {
    handleClose();
    setValue2({ amendmentNumber: undefined, documentStatus: undefined });
    dispatch({ type: 'RESET_ERROR_ADD_PROTOCOL' });
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
        const isNumber = versionRegx.test(e.target.value);
        if (isNumber && reg.test(parseFloat(e.target.value))) {
          temp[fieldName].error = false;
          temp[fieldName].errorMessage = ' ';
        } else {
          temp[fieldName].error = true;
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
        if (temp2[fieldName].label && temp2[fieldName].label.length > 0) {
          temp[fieldName].error = false;
          temp[fieldName].errorMessage = ' ';
        }
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
  const sendPostData = () => {
    const tempFormValues = cloneDeep(formValues);
    let postData = {};
    postData = {
      protocol_number: tempFormValues.protocolNumber
        ? encodeURIComponent(tempFormValues.protocolNumber)
        : '',
      indication:
        tempFormValues.indication && tempFormValues.indication.label
          ? encodeURIComponent(tempFormValues.indication.label)
          : '',
      protocol_version: tempFormValues.versionNumber
        ? tempFormValues.versionNumber
        : '',
      is_active: true,
      created_by: 'User',
      modified_by: 'User',
      sponsor:
        tempFormValues && tempFormValues.sponsor && tempFormValues.sponsor.label
          ? encodeURIComponent(tempFormValues.sponsor.label)
          : '',
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
      moleculeDevice: tempFormValues.moleculeDevice
        ? encodeURIComponent(tempFormValues.moleculeDevice)
        : '',
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
              onChange={(e) =>
                onTextFieldChange('protocolNumber', e, 'Textbox')
              }
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
            <div className="autocomplete-class" id="sponsor">
              {dashboardData.sponsorLoading ? (
                <Loader />
              ) : (
                <CustomDropdown
                  id="Sponsor"
                  label="Sponsor"
                  placeholder="Sponsor"
                  source={
                    dashboardData &&
                    dashboardData.addProtocolData &&
                    dashboardData.addProtocolData.sponsor
                  }
                  fullWidth
                  fieldType="CustomDropdown"
                  fieldName="sponsor"
                  formValue={(formValues.sponsor && formValues.sponsor)(
                    !formValues.sponsor && emptyAutoObj,
                  )}
                  helperText={formErrorValues.sponsor.errorMessage.trim()}
                  error={formErrorValues.sponsor.error}
                  required={formErrorValues.sponsor.isRequired}
                  onBlur={onFieldBlur}
                  onChange={onTextFieldChange}
                  insertField="sponsor_name"
                />
              )}
            </div>
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
          <Grid item xs={5} sm={5}>
            <div className="autocomplete-class" id="indication-container">
              {dashboardData.indicationLoading ? (
                <Loader />
              ) : (
                <CustomDropdown
                  id="Indication"
                  label="Indication"
                  placeholder="Indication"
                  source={
                    dashboardData &&
                    dashboardData.addProtocolData &&
                    dashboardData.addProtocolData.indication
                  }
                  fullWidth
                  fieldType="CustomDropdown"
                  fieldName="indication"
                  formValue={(formValues.indication && formValues.indication)(
                    !formValues.indication && emptyAutoObj,
                  )}
                  helperText={formErrorValues.indication.errorMessage.trim()}
                  error={formErrorValues.indication.error}
                  required={formErrorValues.indication.isRequired}
                  onBlur={onFieldBlur}
                  onChange={onTextFieldChange}
                  insertField="indication_name"
                />
              )}
            </div>
          </Grid>
          <Grid item xs={1} sm={1} />
          <Grid item xs={5} sm={5}>
            <TextField
              label="Molecule/Device"
              placeholder="Molecule/Device"
              fullWidth
              value={formValues.moleculeDevice}
              helperText={formErrorValues.moleculeDevice.errorMessage}
              error={formErrorValues.moleculeDevice.error}
              required={formErrorValues.moleculeDevice.isRequired}
              onChange={(e) =>
                onTextFieldChange('moleculeDevice', e, 'Textbox')
              }
              onBlur={(e) => onFieldBlur('moleculeDevice', e, 'Textbox')}
              data-testid="molecule-texfield"
            />
          </Grid>
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
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}

export default React.memo(AddProtocol);
