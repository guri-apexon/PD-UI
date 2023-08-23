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
import AssessmentVisitTable from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { visitData } from '../../protocolSlice';

const Visits = ({ docId }) => {
  const dispatch = useDispatch();
  const visitsData = useSelector(visitData);
  const [isEditEnabled, setEditEnabled] = useState(false);

  useEffect(() => {
    dispatch({ type: 'GET_VISITS', payload: { docId } });
  }, []);

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

  return (
    <div>
      <Accordion>
        <AccordionSummary>
          <div className="accordion_summary_container">
            <Typography>Visit Schedule</Typography>
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
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="assessment-detail">
          {visitsData?.data?.data && (
            <AssessmentVisitTable
              data={visitsData.data.data}
              columns={visitsData.data.columns}
              settings={true}
              editEnabled={isEditEnabled}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

Visits.propTypes = {
  docId: PropTypes.isRequired,
};

export default Visits;
