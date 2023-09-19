/* eslint-disable */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import Plus from 'apollo-react-icons/Plus';
import Save from 'apollo-react-icons/Save';
import Undo from 'apollo-react-icons/Undo';
import Pencil from 'apollo-react-icons/Pencil';
import AssessmentVisitTable from '../Table';

const AssessmentContent = ({
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
    <div className="asssessment-content" data-testId="assessment-content">
      {showModal && (
        <div className="modal-icons">
          {!isEditEnabled ? (
            <span
              data-testId="edit-modal-assessment"
              onClick={(e) => {
                handleEdit(e);
              }}
            >
              <Pencil className="metadata-plus-size" />
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
                data-testId="discard-assessmentContent"
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
      {assessments?.length && (
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
            data-testId={`select-assessment`}
            onChange={(e) => {
              handleSelection(e);
              setSelected(e.target.value);
            }}
            placeholder="Select Key"
            canDeselect={false}
            size="small"
          >
            {dropDownData.map((elem, i) => (
              <MenuItem
                key={uuidv4()}
                value={elem.id}
                data-testId={`option-assessmen-${i}`}
                children={
                  <span
                    dangerouslySetInnerHTML={{ __html: elem.assessment_text }}
                  ></span>
                }
              />
            ))}
          </Select>
          <div className="plus-containter">
            <span
              role="presentation"
              data-testId="assessment-plus"
              onClick={handleAdd}
            >
              <Plus />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default AssessmentContent;
