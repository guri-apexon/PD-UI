import React, { useState, useEffect } from "react";
import Button from "apollo-react/components/Button";
import TextField from "apollo-react/components/TextField";
import Modal from "apollo-react/components/Modal";
import Grid from "apollo-react/components/Grid";
import AutocompleteV2 from "apollo-react/components/AutocompleteV2";
import CustomFileUpload from "./CustomFileUpload";
import Typography from "apollo-react/components/Typography";
import Loader from "apollo-react/components/Loader";
import CustomDropdown from "../../../Components/CustomDropdown/CustomDropdown";
import { useDispatch, useSelector } from "react-redux";
import { dashboard } from "../dashboardSlice";
import _ from "lodash";
import {
  initialFormErrorValues,
  initialFormValues,
  documentStatusList,
  amendmentNumber,
  emptyAutoObj,
} from "./constants";
import Plus from "apollo-react-icons/Plus";
const AddProtocol = ({ handleClose, handleOpen }) => {
  let dropdownFocus = "";
  const dispatch = useDispatch();
  const dashboardData = useSelector(dashboard);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrorValues, setFormErrorValues] = useState(
    initialFormErrorValues
  );
  const [selectedFiles, setSelectedFiles] = useState([]);
  useEffect(() => {
    dispatch({ type: "GET_SPONSOR_ADDPROTCOL_SAGA" });
  }, []); // eslint-disable-line

  const onModalClose = () => {
    handleClose("custom");
  };
  const onModalOpen = () => {
    setFormValues(initialFormValues);
    setFormErrorValues(initialFormErrorValues);
    handleOpen("custom");
  };
  const onTextFieldChange = (fieldName, e, fieldType, dropdownValue) => {
    let tempError = _.cloneDeep(formErrorValues);
    let tempValues = _.cloneDeep(formValues);
    if (fieldType === "Textbox") {
      if (
        formErrorValues[fieldName].isRequired &&
        !e.target.value.trim().length > 0
      ) {
        tempError[fieldName].error = true;
        tempError[fieldName].errorMessage = "Required";
      } else {
        tempError[fieldName].error = false;
        tempError[fieldName].errorMessage = " ";
      }
      if (formErrorValues[fieldName].regex && e.target.value.length > 0) {
        let reg = new RegExp(formErrorValues[fieldName].regex);
        if (reg.test(e.target.value)) {
          tempValues[fieldName] = e.target.value;
          tempError[fieldName].error = false;
          tempError[fieldName].errorMessage = " ";
        } else {
          tempValues[fieldName] = e.target.value;
          tempError[fieldName].error = true;
          tempError[fieldName].errorMessage =
            "Does not Match, upto 2 Decimals only";
        }
      } else {
        tempValues[fieldName] = e.target.value;
      }
      setFormValues(tempValues);
      setFormErrorValues(tempError);
    }
    if (fieldType === "Dropdown" || fieldType === "CustomDropdown") {
      if (
        dropdownValue &&
        dropdownValue.label &&
        dropdownValue.label.length > 0
      ) {
        tempError[fieldName].error = false;
        tempError[fieldName].errorMessage = "";
      } else if (formErrorValues[fieldName].isRequired) {
        tempError[fieldName].error = true;
        tempError[fieldName].errorMessage = "Required";
      }
      tempValues[fieldName] = dropdownValue ? dropdownValue : { label: "" };
      dropdownFocus =
        dropdownValue && dropdownValue.label ? dropdownValue.label : "";
      setFormErrorValues(tempError);
      setFormValues(tempValues);
    }
  };

  const onFieldBlur = (fieldName, e, fieldType) => {
    let temp = _.cloneDeep(formErrorValues);
    let tempFormValues = _.cloneDeep(formValues);
    if (fieldType === "Textbox") {
      if (
        !e.target.value.trim().length > 0 &&
        formErrorValues[fieldName].isRequired
      ) {
        temp[fieldName].error = true;
        temp[fieldName].errorMessage = "Required";
      } else {
        temp[fieldName].error = false;
        temp[fieldName].errorMessage = " ";
      }
      setFormErrorValues(temp);
    }
    if (fieldType === "Dropdown") {
      if (!dropdownFocus.length > 0 && formErrorValues[fieldName].isRequired) {
        temp[fieldName].error = true;
        temp[fieldName].errorMessage = "Required";
      } else if (
        fieldName === "documentStatus" ||
        fieldName === "amendmentNumber"
      ) {
        temp[fieldName].error = false;
        temp[fieldName].errorMessage = " ";
        switch (fieldName) {
          case "documentStatus":
            {
              if (
                dropdownFocus === "Approved Final" &&
                ["Y"].includes(formValues.amendmentNumber.label)
              ) {
                temp.amendmentNumber.error = true;
                temp.amendmentNumber.errorMessage =
                  "Amendment Cannot be 'Y' for Final Document";
              } else {
                if (tempFormValues.amendmentNumber.label.length > 0) {
                  temp.amendmentNumber.error = false;
                  temp.amendmentNumber.errorMessage = " ";
                }
              }
            }
            break;
          case "amendmentNumber":
            {
              if (
                dropdownFocus === "Y" &&
                formValues.documentStatus.label === "Approved Final"
              ) {
                temp.amendmentNumber.error = true;
                temp.amendmentNumber.errorMessage =
                  "Amendment Cannot be 'Y' for Final Document";
              } else {
                if (
                  tempFormValues.amendmentNumber &&
                  tempFormValues.amendmentNumber.label &&
                  tempFormValues.amendmentNumber.label.length > 0
                ) {
                  temp.amendmentNumber.error = false;
                  temp.amendmentNumber.errorMessage = " ";
                }
              }
            }
            break;
        }
      } else {
        temp[fieldName].error = false;
        temp[fieldName].errorMessage = " ";
      }
      dropdownFocus = "";
      setFormErrorValues(temp);
    }
    if (fieldType === "CustomDropdown") {
      if (!e.length > 0 && formErrorValues[fieldName].isRequired) {
        temp[fieldName].error = true;
        temp[fieldName].errorMessage = `Select or Add`;
      } else {
        temp[fieldName].error = false;
        temp[fieldName].errorMessage = " ";
      }
      dropdownFocus = "";
      setFormErrorValues(temp);
    }
  };
  const handleFileUploadError = (msg, err, fieldName) => {
    let tempError = _.cloneDeep(formErrorValues);
    tempError[fieldName].error = err;
    tempError[fieldName].errorMessage = msg;
    setFormErrorValues(tempError);
  };
  const setUploadFile = (file, fieldName) => {
    let tempValue = _.cloneDeep(formValues);
    tempValue[fieldName] = file;
    setFormValues(tempValue);
  };
  const handleSaveForm = () => {
    const tempValues = _.cloneDeep(formValues);
    const tempError = _.cloneDeep(formErrorValues);
    let errorExist = false;
    for (let field of Object.keys(tempError)) {
      switch (tempError[field].type) {
        case "Textbox":
        case "File":
          if (
            (tempValues[field] &&
              tempValues[field].length > 0 &&
              !tempError[field].error) ||
            !tempError[field].isRequired
          ) {
            tempError[field].error = false;
            tempError[field].errorMessage = " ";
          } else {
            tempError[field].error = true;
            tempError[field].errorMessage = "Required";
            errorExist = true;
          }
          break;
        case "Dropdown":
        case "CustomDropdown":
          if (
            (tempValues[field] &&
              tempValues[field].label &&
              tempValues[field].label.length > 0 &&
              !tempError[field].error) ||
            !tempError[field].isRequired
          ) {
            tempError[field].error = false;
            tempError[field].errorMessage = " ";
          } else {
            tempError[field].error = true;
            tempError[field].errorMessage =
              tempError[field].type === "Dropdown"
                ? "Required"
                : "Select or Add";
            errorExist = true;
          }
          break;
        default:
          break;
      }
    }
    setFormErrorValues(tempError);
    if (!errorExist) {
      sendPostData();
    }
  };
  const sendPostData = () => {
    const tempFormValues = _.cloneDeep(formValues);
    let postData = {};
    postData = {
      protocol_number: tempFormValues.protocolNumber
        ? tempFormValues.protocolNumber
        : "",
      indication:
        tempFormValues.indication && tempFormValues.indication.label
          ? tempFormValues.indication.label
          : "",
      protocol_version: tempFormValues.versionNumber
        ? tempFormValues.versionNumber
        : "",
      is_active: true,
      created_by: "User",
      created_on: new Date().toISOString(),
      modified_by: "User",
      modified_on: new Date().toISOString(),
      sponsor:
        tempFormValues && tempFormValues.sponsor && tempFormValues.sponsor.label
          ? tempFormValues.sponsor.label
          : "",
      amendmentNumber:
        tempFormValues &&
        tempFormValues.amendmentNumber &&
        tempFormValues.amendmentNumber.value,
      documentStatus:
        tempFormValues.documentStatus && tempFormValues.documentStatus.value,
      projectID: tempFormValues.projectID,
      moleculeDevice: tempFormValues.moleculeDevice,
      uploadFile: tempFormValues.uploadFile ? tempFormValues.uploadFile : [],
      fileName: tempFormValues.uploadFile[0].name,
    };
    dispatch({ type: "POST_ADDPROTOCOL_DATA", payload: postData });
  };
  console.log("dashboardData :", dashboardData);
  return (
    <>
      {dashboardData && dashboardData.isLoading ? (
        <Loader />
      ) : (
        <div className="add-protocol">
          <div className="add-protocol-button">
            <Button
              variant="primary"
              onClick={() => onModalOpen("custom")}
              icon={Plus}
            >
              {"Add Protocol to Library"}
            </Button>
          </div>
          <Modal
            variant="default"
            open={dashboardData && dashboardData.addProtocolModal}
            onClose={() => onModalClose()}
            title="Add Protocol to Library"
            buttonProps={[{}, { label: "Save", onClick: handleSaveForm }]}
            id="add-protocol-modal"
          >
            <Grid container spacing={2}>
              <Grid item xs={5} sm={5}>
                <TextField
                  label="Protocol Number"
                  placeholder="Optional hint Text"
                  fullWidth
                  value={formValues.protocolNumber}
                  helperText={formErrorValues.protocolNumber.errorMessage}
                  error={formErrorValues.protocolNumber.error}
                  required={formErrorValues.protocolNumber.isRequired}
                  onChange={(e) =>
                    onTextFieldChange("protocolNumber", e, "Textbox")
                  }
                  onBlur={(e) => onFieldBlur("protocolNumber", e, "Textbox")}
                />
              </Grid>
              <Grid item xs={1} sm={1}></Grid>
              <Grid item xs={5} sm={5}>
                <div className="autocomplete-class" id="amendmentNumber">
                  <AutocompleteV2
                    label="Amendment"
                    placeholder="Optional hint text…"
                    source={amendmentNumber}
                    fullWidth
                    value={
                      formValues.amendmentNumber && formValues.amendmentNumber
                        ? formValues.amendmentNumber
                        : emptyAutoObj
                    }
                    helperText={formErrorValues.amendmentNumber.errorMessage}
                    error={formErrorValues.amendmentNumber.error}
                    required={formErrorValues.amendmentNumber.isRequired}
                    onBlur={(e, newValue) =>
                      onFieldBlur("amendmentNumber", e, "Dropdown", newValue)
                    }
                    onChange={(e, newValue) =>
                      onTextFieldChange(
                        "amendmentNumber",
                        e,
                        "Dropdown",
                        newValue
                      )
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={1} sm={1}></Grid>
              <Grid item xs={5} sm={5}>
                <TextField
                  label="Project ID or Opportunity Number"
                  placeholder="Optional hint Text"
                  value={formValues.projectID}
                  fullWidth
                  helperText={formErrorValues.projectID.errorMessage}
                  error={formErrorValues.projectID.error}
                  required={formErrorValues.projectID.isRequired}
                  onChange={(e) => onTextFieldChange("projectID", e, "Textbox")}
                  onBlur={(e) => onFieldBlur("projectID", e, "Textbox")}
                />
              </Grid>
              <Grid item xs={1} sm={1}></Grid>
              <Grid item xs={5} sm={5}>
                <TextField
                  label="Version Number"
                  placeholder="Optional hint Text"
                  value={formValues.versionNumber}
                  fullWidth
                  helperText={formErrorValues.versionNumber.errorMessage}
                  error={formErrorValues.versionNumber.error}
                  required={formErrorValues.versionNumber.isRequired}
                  onChange={(e) =>
                    onTextFieldChange("versionNumber", e, "Textbox")
                  }
                  onBlur={(e) => onFieldBlur("versionNumber", e, "Textbox")}
                  type="number"
                />
              </Grid>
              <Grid item xs={1} sm={1}></Grid>

              <Grid item xs={5} sm={5}>
                <div className="autocomplete-class" id="sponsor">
                  <CustomDropdown
                    id="Sponsor"
                    label="Sponsor"
                    placeholder="Optional hint text…"
                    source={
                      dashboardData &&
                      dashboardData.addProtocolData &&
                      dashboardData.addProtocolData.sponsor
                    }
                    fullWidth
                    fieldType="CustomDropdown"
                    fieldName="sponsor"
                    formValue={
                      formValues.sponsor && formValues.sponsor
                        ? formValues.sponsor
                        : emptyAutoObj
                    }
                    helperText={formErrorValues.sponsor.errorMessage.trim()}
                    error={formErrorValues.sponsor.error}
                    required={formErrorValues.sponsor.isRequired}
                    onBlur={onFieldBlur}
                    onChange={onTextFieldChange}
                    insertField="sponsor_name"
                  />
                </div>
              </Grid>

              <Grid item xs={1} sm={1}></Grid>
              <Grid item xs={5} sm={5}>
                <div className="autocomplete-class">
                  <AutocompleteV2
                    label="Document Status"
                    placeholder="Optional hint text…"
                    source={documentStatusList}
                    fullWidth
                    value={
                      formValues.documentStatus && formValues.documentStatus
                        ? formValues.documentStatus
                        : emptyAutoObj
                    }
                    helperText={formErrorValues.documentStatus.errorMessage}
                    error={formErrorValues.documentStatus.error}
                    required={formErrorValues.documentStatus.isRequired}
                    onBlur={(e, newValue) =>
                      onFieldBlur("documentStatus", e, "Dropdown", newValue)
                    }
                    onChange={(e, newValue) =>
                      onTextFieldChange(
                        "documentStatus",
                        e,
                        "Dropdown",
                        newValue
                      )
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={1} sm={1}></Grid>
              <Grid item xs={5} sm={5}>
                <div className="autocomplete-class" id="indication-container">
                  <CustomDropdown
                    id="Indication"
                    label="Indication"
                    placeholder="Optional hint text…"
                    source={
                      dashboardData &&
                      dashboardData.addProtocolData &&
                      dashboardData.addProtocolData.indication
                    }
                    fullWidth
                    fieldType="CustomDropdown"
                    fieldName="indication"
                    formValue={
                      formValues.indication && formValues.indication
                        ? formValues.indication
                        : emptyAutoObj
                    }
                    helperText={formErrorValues.indication.errorMessage.trim()}
                    error={formErrorValues.indication.error}
                    required={formErrorValues.indication.isRequired}
                    onBlur={onFieldBlur}
                    onChange={onTextFieldChange}
                    insertField="indication_name"
                  />
                </div>
              </Grid>
              <Grid item xs={1} sm={1}></Grid>
              <Grid item xs={5} sm={5}>
                <TextField
                  label="Molecule/Device"
                  placeholder="Optional hint Text"
                  fullWidth
                  value={formValues.moleculeDevice && formValues.moleculeDevice}
                  helperText={formErrorValues.moleculeDevice.errorMessage}
                  error={formErrorValues.moleculeDevice.error}
                  required={formErrorValues.moleculeDevice.isRequired}
                  onChange={(e) =>
                    onTextFieldChange("moleculeDevice", e, "Textbox")
                  }
                  onBlur={(e) => onFieldBlur("moleculeDevice", e, "Textbox")}
                />
              </Grid>
              <Grid item xs={1} sm={1}></Grid>
              <Typography variant="title2" gutterBottom>
                Place the protocol document in PDF or Word format below
                <span className="file-required-astrik"> *</span>
              </Typography>
              <Grid item xs={12} sm={12}>
                <CustomFileUpload
                  selectedFiles={selectedFiles}
                  fullWidth
                  handleFileUploadError={handleFileUploadError}
                  setUploadFile={setUploadFile}
                />
                {formErrorValues &&
                  formErrorValues.uploadFile &&
                  formErrorValues.uploadFile.errorMessage === "Required" && (
                    <span className="file-error-message">Required</span>
                  )}
                {dashboardData && dashboardData.addProtocolDataError && (
                  <span className="file-error-message">API Error</span>
                )}
              </Grid>
            </Grid>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AddProtocol;
