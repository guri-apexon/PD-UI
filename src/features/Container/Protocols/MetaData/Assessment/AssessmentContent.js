/* eslint-disable */
import React, { useState } from 'react';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import Plus from 'apollo-react-icons/Plus';
import Save from 'apollo-react-icons/Save';
import Undo from 'apollo-react-icons/Undo';
import Pencil from 'apollo-react-icons/Pencil';
import OptionalAssessment from '../OptionalAssessments/OptionalAssessments';
import AssessmentVisitTable from '../Table';

const labels = {
  assessments: 'Assessments',
  optionalAssessments: 'Optional Assessments',
};

const AssessmentContent = ({
  showOptAssessment,
  setShowOptAssessment,
  showAssessment,
  setShowAssessment,
  assessments,
  isEditEnabled,
  showModal,
  columns,
  dropDownData,
  handleSelection,
  handleAdd,
  datafetch,
  getFinalDataFromTable,
  handleEdit,
  handleSaveData,
  handleUndo,
  handleTableChange,
}) => {
  const [selected, setSelected] = useState('');
  return (
    <div className="asssessment-content">
      {showModal && (
        <div className="modal-icons">
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
      )}
      <div className="assessment-checkbox-container">
        <div className="assessment-checkbox">
          <input
            id="optAssessment"
            type="checkbox"
            checked={showOptAssessment}
            onChange={(e) => setShowOptAssessment(e.target.checked)}
            name="optAssessment"
          />
          <label htmlFor={'optAssessment'}>{labels.optionalAssessments}</label>
        </div>
        <div className="assessment-checkbox">
          <input
            id="assessment"
            type="checkbox"
            checked={showAssessment}
            onChange={(e) => setShowAssessment(e.target.checked)}
            name="assessment"
          />
          <label htmlFor={'assessment'}>{labels.assessments}</label>
        </div>
      </div>
      {showOptAssessment && <OptionalAssessment />}
      {showAssessment && assessments.length && (
        <AssessmentVisitTable
          data={assessments}
          columns={columns}
          settings={false}
          editEnabled={isEditEnabled}
          fullView={showModal}
          getFinalDataFromTable={getFinalDataFromTable}
          datafetch={datafetch}
          handleTableChange={handleTableChange}
          page="assessment"
        />
      )}
      {isEditEnabled && (
        <div className="dropdown-plus">
          <Select
            className="assessment-select"
            value={selected}
            onChange={(e) => {
              handleSelection(e);
              setSelected(e.target.value);
            }}
            placeholder="Select Key"
            canDeselect={false}
            size="small"
          >
            {dropDownData.map((elem) => (
              <MenuItem
                value={elem.id}
                children={
                  <span
                    dangerouslySetInnerHTML={{ __html: elem.assessment_text }}
                  ></span>
                }
              />
            ))}
          </Select>
          <div className="plus-containter">
            <span role="presentation">
              <Plus onClick={handleAdd} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default AssessmentContent;
