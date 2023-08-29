/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import EyeShow from 'apollo-react-icons/EyeShow';
import Save from 'apollo-react-icons/Save';
import Undo from 'apollo-react-icons/Undo';
import Expand from 'apollo-react-icons/Expand';
import Modal from 'apollo-react/components/Modal';
import AssessmentVisitTable from '../Table';
import { assessmentData } from '../../protocolSlice';
import { useDispatch, useSelector } from 'react-redux';
import OptionalAssessment from '../OptionalAssessments/OptionalAssessments';
import AssessmentContent from './AssessmentContent';
import cloneDeep from 'lodash/cloneDeep';

const labels = {
  assessments: 'Assessments',
  optionalAssessments: 'Optional Assessments',
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
  const [showOptAssessment, setShowOptAssessment] = useState(false);
  const [showAssessment, setShowAssessment] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [validData, setValidData] = useState([]);
  const [dropDownData, setDropDownData] = useState([]);

  useEffect(() => {
    dispatch({ type: 'GET_ASSESSMENTS', payload: { docId } });
  }, []);

  useEffect(() => {
    if (assessments?.data) {
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
    }
  }, [assessments]);


  const handleSaveData = (e) => {
    e.stopPropagation();
    setEditEnabled(false);
  };

  const handleUndo = (e) => {
    e.stopPropagation();
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
    console.log(e.target.value);
    const objSelected = dropDownData.find((item) => item.id === e.target.value);
    console.log('object', objSelected);
    setValidData([...validData, objSelected]);
    // setDropDownData(removeByAttr(dropDownData, 'id', e.target.value));
  };

  return (
    <div>
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
            showOptAssessment={showOptAssessment}
            setShowOptAssessment={setShowOptAssessment}
            showAssessment={showAssessment}
            setShowAssessment={setShowAssessment}
            assessments={validData}
            isEditEnabled={isEditEnabled}
            showModal={showModal}
            columns={assessments.data.columns}
            dropDownData={dropDownData}
            handleSelection={handleSelection}
          />
        )}
      </Modal>
      <Accordion>
        <AccordionSummary>
          <div className="accordion_summary_container">
            <Typography>Assessments</Typography>
            <div className="metadata-flex">
              <span data-testId="eyeIcon" role="presentation">
                <EyeShow style={{ paddingRight: '10px' }} />
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
              <span data-testId="eyeIcon" role="presentation">
                <Expand
                  style={{ paddingRight: '10px' }}
                  onClick={(e) => {
                    handleExpand(e);
                  }}
                />
              </span>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="assessment-detail">
          {assessments?.data && (
            <AssessmentContent
              showOptAssessment={showOptAssessment}
              setShowOptAssessment={setShowOptAssessment}
              showAssessment={showAssessment}
              setShowAssessment={setShowAssessment}
              assessments={validData}
              isEditEnabled={isEditEnabled}
              showModal={showModal}
              columns={assessments.data.columns}
              dropDownData={dropDownData}
              handleSelection={handleSelection}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

Assessment.propTypes = {
  docId: PropTypes.isRequired,
};

export default Assessment;
