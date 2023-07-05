import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import Modal from 'apollo-react/components/Modal';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import Tooltip from 'apollo-react/components/Tooltip';
import IconButton from 'apollo-react/components/IconButton';
import Plus from 'apollo-react-icons/Plus';
import cloneDeep from 'lodash/cloneDeep';
import DisplayTable from './Components/Table';
import { tableOperations } from './Components/dropdownData';
import {
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  swapRowElements,
  swapColumnElements,
} from './utils';
import { removeHtmlTags } from '../../../../../utils/utilFunction';
import {
  CONTENT_TYPE,
  QC_CHANGE_TYPE,
} from '../../../../../AppConstant/AppConstant';
import { useProtContext } from '../../ProtocolContext';
import PROTOCOL_CONSTANT from '../constants';

const formattableData = (data) => {
  const cloneData = [...data];
  return cloneData.map((record) => {
    return {
      ...record,
      row_indx: record.row_indx?.toString() || '',
      columns: record.columns.map((col) => {
        return {
          ...col,
          col_indx: col.col_indx?.toString() || '',
        };
      }),
    };
  });
};

const formatFootNote = (data) => {
  const cloneFootNotes = [...data];
  return cloneFootNotes.map((eachNotes) => {
    return {
      AttachmentId: eachNotes.AttachmentId,
      Text: eachNotes.Text,
      PrevousAttachmentIndex:
        eachNotes.AttachmentIndex > 0 ? eachNotes.AttachmentIndex - 1 : null,
    };
  });
};

const confirmText = 'Please confirm if you want to continue with deletion';

function PDTable({
  data,
  segment,
  activeLineID,
  lineID,
  edit,
  setShowAlert,
  setAlertMsg,
  containerRef,
}) {
  const wrapperRef = useRef(null);
  const [updatedData, setUpdatedData] = useState([]);
  const [footNoteData, setFootnoteData] = useState([]);

  const [tableSaved, setTableSaved] = useState(true);
  const [showconfirm, setShowConfirm] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [showBlankRowModal, setShowBlankRowModal] = useState(false);

  const [selectedData, setSelectedData] = useState({});
  const tableRef = useRef(null);
  const { dispatchSectionEvent } = useProtContext();

  useEffect(() => {
    if (data) {
      const parsedTable = Array.isArray(data?.TableProperties)
        ? data?.TableProperties
        : JSON.parse(data?.TableProperties);
      const formattedData = formattableData(parsedTable);
      setUpdatedData(formattedData);
      const footnoteArr = formatFootNote(
        data?.AttachmentListProperties?.filter(
          (x) => x.qc_change_type_footnote !== 'delete',
        ) || [],
      );
      setFootnoteData(footnoteArr);
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (content, columnIndex, rowIndex) => {
    const cloneData = [...updatedData];
    cloneData.forEach((record, i) => {
      if (i === rowIndex) {
        record.columns.forEach((col, j) => {
          if (j === columnIndex) {
            record.columns[j].value = content;
            record.columns[columnIndex].op_type =
              record.columns[columnIndex].op_type || QC_CHANGE_TYPE.UPDATED;
          }
        });
        if (record?.roi_id) {
          cloneData[i].op_type = QC_CHANGE_TYPE.UPDATED;
        }
      }
      return record;
    });
    setUpdatedData(cloneData);
  };

  const handleColumnOperation = (operation, index) => {
    if (operation === tableOperations.addColumnLeft) {
      const newData = addColumn(updatedData, Math.max(index, 0));
      setUpdatedData(newData);
    } else if (operation === tableOperations.addColumnRight) {
      const newData = addColumn(updatedData, index + 1);
      setUpdatedData(newData);
    } else if (operation === tableOperations.deleteColumn) {
      setIsModal(true);
      setSelectedData({
        operation,
        index,
      });
    }
  };

  const handleRowOperation = (operation, index) => {
    if (operation === tableOperations.addRowAbove) {
      const newData = addRow(updatedData, index);
      setUpdatedData(newData);
    } else if (operation === tableOperations.addRowBelow) {
      // eslint-disable-next-line
      const newData = addRow(updatedData, parseInt(index) + 1);
      setUpdatedData(newData);
    } else if (operation === tableOperations.deleteRow) {
      setIsModal(true);
      setSelectedData({
        operation,
        index,
      });
    }
  };

  const handleSwap = (operation, indexObj) => {
    if (indexObj.sourceIndex) {
      if (operation === tableOperations.swapRow) {
        const newList = swapRowElements(
          updatedData,
          indexObj.sourceIndex,
          indexObj.targetIndex,
        );
        setUpdatedData(newList);
      } else if (operation === tableOperations.swapColumn) {
        const newList = swapColumnElements(
          cloneDeep(updatedData),
          indexObj.sourceIndex,
          indexObj.targetIndex,
        );
        setUpdatedData(newList);
      }
    }
  };

  const addFootNote = () => {
    setFootnoteData([
      ...footNoteData,
      {
        ...PROTOCOL_CONSTANT.footNote,
        PrevousAttachmentIndex:
          footNoteData.length === 0 ? 0 : footNoteData.length - 1,
      },
    ]);
  };

  const checkBlankRows = () => {
    let bool = false;
    updatedData
      .filter((row) => row.op_type !== QC_CHANGE_TYPE.DELETED)
      .forEach((row) => {
        const arr = row.columns.filter(
          (col) => removeHtmlTags(col.value) !== '',
        );
        if (arr.length === 0) {
          bool = true;
        }
      });
    return bool;
  };

  const handleSave = () => {
    if (checkBlankRows()) {
      setShowBlankRowModal(true);
      return;
    }
    const content = {
      ...segment.content,
      TableProperties: updatedData,
      AttachmentListProperties: footNoteData,
    };

    setTableSaved(true);
    dispatchSectionEvent('CONTENT_UPDATE', {
      type: CONTENT_TYPE.TABLE,
      lineID,
      currentLineId: activeLineID,
      content,
      isSaved: true,
    });
  };

  const isEditable = () => {
    return lineID === activeLineID && !tableSaved;
  };

  const deleteTableData = () => {
    let newData = [];
    if (selectedData.operation === tableOperations.deleteRow) {
      newData = deleteRow(updatedData, selectedData.index);
      setUpdatedData(newData);
    } else {
      newData = deleteColumn(updatedData, selectedData.index);
    }
    setUpdatedData(newData);
    setSelectedData({});
    setIsModal(false);
  };

  const onContainerClick = () => {
    if (tableSaved) {
      setTableSaved(false);
      dispatchSectionEvent('CONTENT_UPDATE', {
        type: CONTENT_TYPE.TABLE,
        lineID,
        currentLineId: lineID,
        content: { ...segment.content },
        isSaved: false,
      });
    }
    if (activeLineID !== lineID && !tableSaved) {
      const content = {
        ...segment.content,
      };
      dispatchSectionEvent('CONTENT_UPDATE', {
        type: CONTENT_TYPE.TABLE,
        lineID,
        currentLineId: lineID,
        content,
        isSaved: false,
      });
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !tableSaved &&
        containerRef.current &&
        containerRef.current.contains(event.target)
      ) {
        event.preventDefault();
        setShowAlert(true);
        setAlertMsg('Please save the table.');
      }
    }
    if (tableSaved) {
      document.removeEventListener('mousedown', handleClickOutside);
    } else {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [tableSaved]);

  return (
    //  eslint-disable-next-line
    <section
      data-testId="section"
      className="content-table-wrapper"
      ref={wrapperRef}
      onClick={() => {
        onContainerClick();
      }}
    >
      {showconfirm && (
        <div className="confirmation-popup" data-testId="confirmPopup">
          <p>{confirmText}</p>
          <ButtonGroup
            buttonProps={[
              {
                label: 'Cancel',
                onClick: () => setShowConfirm(false),
              },
              {
                label: 'Delete',
                onClick: (e) => {
                  e.stopPropagation();
                  dispatchSectionEvent('CONTENT_DELETED', {
                    currentLineId: activeLineID,
                  });
                },
              },
            ]}
          />
        </div>
      )}
      {isEditable() && (
        <div className="table-button-container">
          <Tooltip title="Add Footnote" placement="right">
            <IconButton
              color="primary"
              size="small"
              data-testId="button-container"
              onClick={addFootNote}
            >
              <Plus className="plus-icon" size="small" />
            </IconButton>
          </Tooltip>
          <ButtonGroup
            buttonProps={[
              {
                size: 'small',
                label: 'Delete',
                onClick: () => setShowConfirm(true),
              },
              {
                size: 'small',
                label: 'Save Table',
                onClick: handleSave,
              },
            ]}
          />
        </div>
      )}
      <div
        className={`pd-table-container ${edit && 'scrollable'}`}
        ref={tableRef}
      >
        <DisplayTable
          data={updatedData}
          onChange={handleChange}
          handleRowOperation={handleRowOperation}
          handleSwap={handleSwap}
          edit={isEditable()}
          // colWidth={colWidth}
          footNoteData={footNoteData}
          setFootnoteData={setFootnoteData}
          handleColumnOperation={handleColumnOperation}
        />
      </div>
      <Modal
        className="modal delete-modal"
        data-testId="modal-close-button"
        open={isModal}
        variant="secondary"
        onClose={() => setIsModal(false)}
        title="Please confirm if you want to continue with deletion"
        buttonProps={[
          {
            label: 'No',
            size: 'small',
          },
          {
            label: 'Yes',
            size: 'small',
            onClick: deleteTableData,
          },
        ]}
        id="neutral"
      />

      <Modal
        className="modal delete-modal"
        data-testId="modal-blankRow-warning"
        open={showBlankRowModal}
        variant="warning"
        onClose={() => setShowBlankRowModal(false)}
        title="Warning"
        message="Please enter values in every rows to save the table."
        buttonProps={[
          {
            label: 'Ok',
            size: 'small',
            onClick: () => setShowBlankRowModal(false),
          },
        ]}
      />
    </section>
  );
}

export default PDTable;

PDTable.propTypes = {
  data: PropTypes.isRequired,
  segment: PropTypes.isRequired,
  activeLineID: PropTypes.isRequired,
  lineID: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  setShowAlert: PropTypes.isRequired,
  setAlertMsg: PropTypes.isRequired,
  containerRef: PropTypes.isRequired,
};
