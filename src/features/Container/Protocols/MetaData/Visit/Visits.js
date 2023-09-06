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
import { useDispatch, useSelector } from 'react-redux';
import { visitData } from '../../protocolSlice';
import VisitContent from './VisitContent';
import cloneDeep from 'lodash/cloneDeep';
import { toast } from 'react-toastify';
import RestricModal from '../Modal';
import { discardModalLabels, saveModalLabels } from '../Assessment/Assessment';

const visitTimeColumns = [
  {
    name: 'Epoch Timepoint',
    id: 'epoch_timepoint',
    checked: false,
  },
  {
    name: 'Cycle Timepoint',
    id: 'cycle_timepoint',
    checked: false,
  },
  {
    name: 'Year Timepoint',
    id: 'year_timepoint',
    checked: false,
  },
  {
    name: 'Month Timepoint',
    id: 'month_timepoint',
    checked: false,
  },
  {
    name: 'Week Timepoint',
    id: 'week_timepoint',
    checked: false,
  },
  {
    name: 'Day Timepoint',
    id: 'day_timepoint',
    checked: false,
  },
  {
    name: 'Visit Timepoint',
    id: 'visit_timepoint',
    checked: false,
  },
  {
    name: 'Window Timepoint',
    id: 'window_timepoint',
    checked: false,
  },
];

const createRowData = (row) => {
  let obj = { ...row };
  Object.keys(obj).forEach(function (index) {
    obj[index] = '';
  });
  obj.id = Math.random();
  obj.doc_id = row.doc_id;
  obj.visit_id = row.visit_id;
  obj.table_roi_id = row.table_roi_id;
  obj.visit_label = 'Visit Label';
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

const Visits = ({ docId }) => {
  const dispatch = useDispatch();
  const visitsData = useSelector(visitData);
  const [isEditEnabled, setEditEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validData, setValidData] = useState([]);
  const [dropDownData, setDropDownData] = useState([]);
  const [datafetch, setDataFetch] = useState(false);
  const [showSettings, setShowSetting] = useState(false);
  const [columnArray, setColumnArray] = useState([]);
  const [visitColumns, setVisitColumns] = useState(visitTimeColumns);
  const [discardModal, setDiscardModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [openAudit, setOpenAudit] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    visitsData?.data?.columns.length && handleColumns();
  }, [visitsData]);

  const handleColumns = () => {
    let finalColumns = cloneDeep(visitsData.data.columns);

    for (let i = 0; i < finalColumns.length; i++) {
      if (finalColumns[i].key.includes('timepoint')) {
        finalColumns[i].hidden = true;
      } else {
        finalColumns[i].hidden = false;
      }
    }
    setColumnArray(finalColumns);
  };

  useEffect(() => {
    dispatch({ type: 'GET_VISITS', payload: { docId } });
  }, []);

  const getFinalDataFromTable = (data) => {
    setDataFetch(false);
    setEditEnabled(false);
    setShowModal(false);
    dispatch({ type: 'POST_VISIT', payload: { docId, body: data } });
  };

  const setVisitData = () => {
    const data = cloneDeep(visitsData.data.visit_schedule[0].data);
    const emptyObj = [];
    const dataObj = [];

    if (data.length) {
      data.forEach((element) => {
        let objClone = cloneDeep(element);
        delete objClone.id;
        delete objClone.doc_id;
        delete objClone.visit_id;
        delete objClone.table_roi_id;
        delete objClone.visit_label;
        delete objClone.epoch_timepoint;
        delete objClone.cycle_timepoint;
        delete objClone.visit_timepoint;
        delete objClone.year_timepoint;
        delete objClone.week_timepoint;
        delete objClone.day_timepoint;
        delete objClone.window_timepoint;
        delete objClone.month_timepoint;

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
    if (visitsData?.data?.visit_schedule[0].data.length) {
      setVisitData();
    }
  }, [visitsData]);

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
    setExpanded(true);
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
    const newRow = createRowData(validData[0]);
    setValidData([...validData, newRow]);
  };
  const handleTableChange = (data) => {
    setValidData(data);
  };
  const handleColumnSelection = (key) => {
    const finalColumns = columnArray.map((col) => {
      if (col.key === key) {
        col.hidden = !col.hidden;
        return col;
      }
      return col;
    });
    setVisitColumns(
      visitColumns.map((col) => {
        if (col.id === key) {
          col.checked = !col.checked;
          return col;
        }
        return col;
      }),
    );
    setColumnArray(finalColumns);
  };
  const handleDiscard = () => {
    setVisitData();
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
        title="Visit Schedule"
        hideButtons={true}
      >
        {validData.length && columnArray.length && (
          <VisitContent
            data={validData}
            columns={columnArray}
            isEditEnabled={isEditEnabled}
            dropDownData={dropDownData}
            handleSelection={handleSelection}
            showModal={showModal}
            handleAdd={handleAdd}
            getFinalDataFromTable={getFinalDataFromTable}
            datafetch={datafetch}
            handleEdit={handleEdit}
            handleSaveData={handleSaveData}
            handleUndo={handleUndo}
            handleTableChange={handleTableChange}
            showSettings={showSettings}
            setShowSetting={setShowSetting}
            handleColumnSelection={handleColumnSelection}
            visitColumns={visitColumns}
          />
        )}
      </Modal>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary>
          <div className="accordion_summary_container">
            <Typography>Visit Schedule</Typography>
            <div className="metadata-flex">
              <span data-testId="expand" role="presentation">
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
          {validData.length && columnArray.length && (
            <VisitContent
              data={validData}
              columns={columnArray}
              isEditEnabled={isEditEnabled}
              dropDownData={dropDownData}
              handleSelection={handleSelection}
              showModal={showModal}
              handleAdd={handleAdd}
              getFinalDataFromTable={getFinalDataFromTable}
              datafetch={datafetch}
              handleEdit={handleEdit}
              handleSaveData={handleSaveData}
              handleUndo={handleUndo}
              handleTableChange={handleTableChange}
              showSettings={showSettings}
              setShowSetting={setShowSetting}
              handleColumnSelection={handleColumnSelection}
              visitColumns={visitColumns}
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
                {visitsData?.data?.field_audit_info?.last_updated || '...'}
              </span>
            </div>
            <div>
              <label>Last Edited By : </label>
              <span>
                {visitsData?.data?.field_audit_info?.last_edited_by || '...'}
              </span>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

Visits.propTypes = {
  docId: PropTypes.isRequired,
};

export default Visits;
