/* eslint-disable */
import React from 'react';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import OptionalAssessment from '../OptionalAssessments/OptionalAssessments';
import AssessmentVisitTable from '../Table';
import { useState } from 'react';

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
}) => {
  const [selected, setSelected] = useState('');
  return (
    <div>
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
        />
      )}
      <div>
        <Select
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
      </div>
    </div>
  );
};
export default AssessmentContent;
