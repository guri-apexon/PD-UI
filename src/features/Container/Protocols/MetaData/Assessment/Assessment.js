/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Popover from 'apollo-react/components/Popover';
import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import EyeShow from 'apollo-react-icons/EyeShow';
import Save from 'apollo-react-icons/Save';
import Undo from 'apollo-react-icons/Undo';
import Expand from 'apollo-react-icons/Expand';
import Modal from 'apollo-react/components/Modal';
import { assessmentData } from '../../protocolSlice';
import { useDispatch, useSelector } from 'react-redux';
import AssessmentContent from './AssessmentContent';
import cloneDeep from 'lodash/cloneDeep';
import { toast } from 'react-toastify';
import RestricModal from '../Modal';

export const discardModalLabels = {
  title: 'Do you really want to discard the changes or continue editing?',
  buttonOne: 'Continue Editing',
  buttonTwo: 'Discard',
};

export const deleteModalLabels = {
  title: 'Please confirm if you want to continue with hard deletion?',
  buttonOne: 'Cancel',
  buttonTwo: 'Delete',
};

export const saveModalLabels = {
  title: 'Do you really want to save it now or continue editing?',
  buttonOne: 'Continue Editing',
  buttonTwo: 'Save',
};

const createRowData = (row) => {
  let obj = { ...row };
  Object.keys(obj).forEach(function (index) {
    obj[index] = '';
  });
  obj.id = Math.random();
  obj.doc_id = row.doc_id;
  obj.assessment_id = row.assessment_id;
  obj.table_link_text = row.table_link_text;
  obj.table_roi_id = row.table_roi_id;
  obj.assessment_text = 'Assessment Name';
  obj.operation = 'create';
  obj.status = 'added';

  return obj;
};

const isEmptyObj = (obj) => {
  const isEmpty = Object.values(obj).every((value) => {
    if (value === null || value === undefined || value === '') {
      return true;
    }
    return false;
  });
  return isEmpty;
};

const removeByAttr = function (arr, attr, value) {
  let i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr] === value
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

const Assessment = ({ docId }) => {
  const dispatch = useDispatch();
  const assessments = useSelector(assessmentData);
  const [isEditEnabled, setEditEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validData, setValidData] = useState([]);
  const [dropDownData, setDropDownData] = useState([]);
  const [datafetch, setDataFetch] = useState(false);
  const [discardModal, setDiscardModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [openAudit, setOpenAudit] = useState(false);

  useEffect(() => {
    dispatch({ type: 'GET_ASSESSMENTS', payload: { docId } });
  }, []);

  const setAssesmentData = () => {
    const data = cloneDeep(assessments.data.assessments[0].data);
    const emptyObj = [];
    const dataObj = [];

    if (data.length) {
      data.forEach((element) => {
        let objClone = cloneDeep(element);
        delete objClone.id;
        delete objClone.doc_id;
        delete objClone.assessment_id;
        delete objClone.assessment_text;
        delete objClone.table_link_text;
        delete objClone.table_roi_id;

        if (isEmptyObj(objClone)) {
          emptyObj.push(element);
        } else {
          dataObj.push(element);
        }
      });
    }
    setValidData(dataObj);
    setDropDownData(emptyObj);
  };

  useEffect(() => {
    if (assessments?.data?.assessments.length) {
      setAssesmentData();
      // const data = cloneDeep(assessments.data.assessments[0].data);
      // const emptyObj = [];
      // const dataObj = [];

      // if (data.length) {
      //   data.forEach((element) => {
      //     let objClone = cloneDeep(element);
      //     delete objClone.id;
      //     delete objClone.doc_id;
      //     delete objClone.assessment_id;
      //     delete objClone.assessment_text;
      //     delete objClone.table_link_text;
      //     delete objClone.table_roi_id;

      //     if (isEmptyObj(objClone)) {
      //       emptyObj.push(element);
      //     } else {
      //       dataObj.push(element);
      //     }
      //   });
      // }
      // setValidData(dataObj);
      // setDropDownData(emptyObj);
    }
  }, [assessments]);

  const getFinalDataFromTable = (data) => {
    setDataFetch(false);
    dispatch({ type: 'POST_ASSESSMENT', payload: { docId, body: data } });
  };

  const handleSaveData = (e) => {
    e.stopPropagation();
    setSaveModal(true);
  };

  const handleUndo = (e) => {
    e.stopPropagation();
    setDiscardModal(true);
  };
  const handleEdit = (e) => {
    e.stopPropagation();
    setEditEnabled(true);
  };
  const handleExpand = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };
  const handleSelection = (e) => {
    const index = validData.findIndex((item) => item.id === e.target.value);
    if (index < 0) {
      const objSelected = dropDownData.find(
        (item) => item.id === e.target.value,
      );

      setValidData([...validData, objSelected]);
    } else {
      toast.error('Item already exist in the table');
    }
    // setDropDownData(removeByAttr(dropDownData, 'id', e.target.value));
  };
  const handleAdd = () => {
    setValidData([...validData, createRowData(validData[0])]);
  };

  const handleTableChange = (data) => {
    setValidData(data);
  };
  const handleDiscard = () => {
    setAssesmentData();
    setDiscardModal(false);
    setEditEnabled(false);
  };
  const handleCloseModal = () => {
    setDiscardModal(false);
    setSaveModal(false);
  };

  const handleModalSave = () => {
    setDataFetch(true);
    setEditEnabled(false);
    setSaveModal(false);
  };
  const handleAudit = (e) => {
    e.stopPropagation();
    setOpenAudit(e.currentTarget);
  };

  return (
    <div>
      <RestricModal
        open={discardModal}
        setOpen={setDiscardModal}
        buttonOne={discardModalLabels.buttonOne}
        buttonTwo={discardModalLabels.buttonTwo}
        title={discardModalLabels.title}
        buttonOneHandler={handleCloseModal}
        buttonTwoHandler={handleDiscard}
      />
      <RestricModal
        open={saveModal}
        setOpen={setSaveModal}
        buttonOne={saveModalLabels.buttonOne}
        buttonTwo={saveModalLabels.buttonTwo}
        title={saveModalLabels.title}
        buttonOneHandler={handleCloseModal}
        buttonTwoHandler={handleModalSave}
      />
      <Modal
        className="full-view-modal"
        open={showModal}
        onClose={() => setShowModal(false)}
        buttonProps={[]}
        title="Assessment"
        hideButtons={true}
      >
        {assessments?.data && (
          <AssessmentContent
            assessments={validData}
            isEditEnabled={isEditEnabled}
            showModal={showModal}
            columns={assessments.data.columns}
            dropDownData={dropDownData}
            handleSelection={handleSelection}
            handleAdd={handleAdd}
            getFinalDataFromTable={getFinalDataFromTable}
            datafetch={datafetch}
            handleEdit={handleEdit}
            handleSaveData={handleSaveData}
            handleUndo={handleUndo}
            handleTableChange={handleTableChange}
          />
        )}
      </Modal>
      <Accordion>
        <AccordionSummary>
          <div className="accordion_summary_container">
            <Typography>Assessments</Typography>
            <div className="metadata-flex">
              <span data-testId="eyeIcon" role="presentation">
                <Expand
                  style={{ paddingRight: '10px' }}
                  onClick={(e) => {
                    handleExpand(e);
                  }}
                />
              </span>
              <span data-testId="eyeIcon" role="presentation">
                <EyeShow
                  style={{ paddingRight: '10px' }}
                  onClick={(e) => {
                    handleAudit(e);
                  }}
                />
              </span>
              {!isEditEnabled ? (
                <span data-testId="metadatapencil">
                  <Pencil
                    className="metadata-plus-size"
                    data-testid="handle-edit"
                    onClick={(e) => {
                      handleEdit(e);
                    }}
                  />
                </span>
              ) : (
                <>
                  <span
                    data-testId="metadatasave"
                    onClick={(e) => {
                      handleSaveData(e);
                    }}
                    role="presentation"
                  >
                    <Save className="metadata-plus-size mR" />
                  </span>
                  <span
                    data-testId="metadatadiscard"
                    onClick={(e) => {
                      handleUndo(e);
                    }}
                    role="presentation"
                  >
                    <Undo className="metadata-plus-size" />
                  </span>
                </>
              )}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="assessment-detail">
          {assessments?.data && (
            <AssessmentContent
              assessments={validData}
              isEditEnabled={isEditEnabled}
              showModal={showModal}
              columns={assessments.data.columns}
              dropDownData={dropDownData}
              handleSelection={handleSelection}
              handleAdd={handleAdd}
              getFinalDataFromTable={getFinalDataFromTable}
              datafetch={datafetch}
              handleTableChange={handleTableChange}
            />
          )}
        </AccordionDetails>
      </Accordion>
      <Popover
        data-testId="metadata-popover"
        open={!!openAudit}
        anchorEl={openAudit}
        onClose={() => setOpenAudit(null)}
      >
        <div className="auditPopover">
          <div className="textContainer">
            <div className="audit-info-line">
              <label>Last Updated Date : </label>
              <span>
                {assessments?.data?.field_audit_info?.last_updated || '...'}
              </span>
            </div>
            <div>
              <label>Last Edited By : </label>
              <span>
                {assessments?.data?.field_audit_info?.last_edited_by || '...'}
              </span>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

Assessment.propTypes = {
  docId: PropTypes.isRequired,
};

export default Assessment;
