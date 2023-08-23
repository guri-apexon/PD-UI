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
import { assessmentData } from '../../protocolSlice';
import { useDispatch, useSelector } from 'react-redux';

const Assessment = ({ docId }) => {
  const dispatch = useDispatch();
  const assessments = useSelector(assessmentData);
  console.log('assessments', assessments);
  useEffect(() => {
    dispatch({ type: 'GET_ASSESSMENTS', payload: { docId } });
  }, []);
  return (
    <div>
      <Accordion>
        <AccordionSummary>
          <div className="accordion_summary_container">
            <Typography>Assessments</Typography>
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
          {assessments?.data && (
            <AssessmentVisitTable
              data={assessments.data.assessments[0].data}
              columns={assessments.data.columns}
              settings={false}
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
