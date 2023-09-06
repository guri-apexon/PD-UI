/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AssessmentVisitTable from '../Table';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import Plus from 'apollo-react-icons/Plus';
import Save from 'apollo-react-icons/Save';
import Undo from 'apollo-react-icons/Undo';
import Pencil from 'apollo-react-icons/Pencil';
import Cog from 'apollo-react-icons/Cog';
import ColumnSettings from '../ColumnSettings';

const VisitContent = ({
  data,
  columns,
  isEditEnabled,
  dropDownData,
  handleSelection,
  showModal,
  handleAdd,
  datafetch,
  getFinalDataFromTable,
  handleEdit,
  handleSaveData,
  handleUndo,
  handleTableChange,
  showSettings,
  setShowSetting,
  handleColumnSelection,
  visitColumns,
}) => {
  const [selected, setSelected] = useState('');
  const wrapperRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSetting(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

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
      <>
        {showSettings && (
          <div className="column-settings" ref={wrapperRef}>
            <ColumnSettings
              handleColumnSelection={handleColumnSelection}
              data={visitColumns}
            />
          </div>
        )}
        <div className="column-settings-icon">
          <span
            data-testId="metadatapencil"
            onClick={() => setShowSetting(!showSettings)}
          >
            <Cog className="metadata-plus-size" data-testid="handle-edit" />
          </span>
        </div>
      </>
      {data && (
        <AssessmentVisitTable
          data={data}
          columns={columns}
          settings={true}
          editEnabled={isEditEnabled}
          fullView={showModal}
          getFinalDataFromTable={getFinalDataFromTable}
          datafetch={datafetch}
          handleTableChange={handleTableChange}
          page="visit"
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
                key={uuidv4()}
                value={elem.id}
                children={
                  <span
                    dangerouslySetInnerHTML={{ __html: elem.visit_label }}
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

export default VisitContent;
