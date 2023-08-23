/* eslint-disable */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import EyeShow from 'apollo-react-icons/EyeShow';
import AssessmentVisitTable from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { visitData } from '../../protocolSlice';

const Visits = ({ docId }) => {
  const dispatch = useDispatch();
  const visitsData = useSelector(visitData);
  console.log('assessments', visitsData);
  useEffect(() => {
    dispatch({ type: 'GET_VISITS', payload: { docId } });
  }, []);
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
              <span data-testId="metadatapencil">
                <Pencil
                  className="metadata-plus-size"
                  data-testid="handle-edit"
                />
              </span>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="assessment-detail">
          {visitsData?.data?.data && (
            <AssessmentVisitTable
              data={visitsData.data.data}
              columns={visitsData.data.columns}
              settings={true}
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
