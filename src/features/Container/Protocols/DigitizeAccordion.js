import React, { useState, useEffect } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import PropTypes from 'prop-types';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import { isArray } from 'lodash';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import { useSelector, useDispatch } from 'react-redux';
import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import EyeShow from 'apollo-react-icons/EyeShow';
import MultilineEdit from './Digitized_edit';
import Loader from '../../Components/Loader/Loader';
import {
  sectionDetailsResult,
  sectionLoader,
  setSectionLoader,
  resetSectionData,
} from './protocolSlice';

function DigitizeAccordion({
  item,
  protocol,
  primaryRole,
  currentActiveCard,
  setCurrentActiveCard,
  handlePageRight,
}) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [showedit, setShowEdit] = useState(false);

  const sectionHeaderDetails = useSelector(sectionDetailsResult);
  const sectionContentLoader = useSelector(sectionLoader);

  const { sections, linkId } = sectionHeaderDetails;

  const handleChange = (sequence) => {
    handlePageRight(sequence);
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (expanded) {
      setCurrentActiveCard(item.link_id);
      if (linkId !== item.link_id) {
        dispatch(setSectionLoader());
        dispatch(resetSectionData());
        dispatch({
          type: 'GET_SECTION_LIST',
          payload: {
            linkId: item.link_id,
            docId: item.doc_id,
            protocol,
          },
        });
      }
    } else if (!expanded && currentActiveCard === item.link_id) {
      setCurrentActiveCard(null);
      setShowEdit(false);
    }
    // eslint-disable-next-line
  }, [expanded]);

  useEffect(() => {
    if (currentActiveCard !== item.link_id && expanded) {
      setExpanded(false);
    } else if (currentActiveCard === item.link_id && !expanded) {
      setExpanded(true);
    }
    // eslint-disable-next-line
  }, [currentActiveCard]);

  const onEditClick = () => {
    setExpanded(true);
    setShowEdit(true);
  };

  return (
    <Accordion expanded={expanded} onChange={() => handleChange(item.page)}>
      <AccordionSummary>
        <div className="accordion_summary_container">
          <Typography
            data-testid="accordion-header"
            // onClick={onClickHandler()}
          >
            {item.source_file_section}
          </Typography>
          <div className="accordion_summary_actions">
            <EyeShow />
            {!primaryRole && (
              <Pencil
                onClick={onEditClick}
                style={{ paddingLeft: '20px' }}
                data-testid="edit-icon"
              />
            )}
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails className="accordion_details">
        {sectionContentLoader && (
          <div className="loader accordion_details_loader">
            <Loader />
          </div>
        )}
        {sections &&
          isArray(sections) &&
          sections?.map((value) => (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {showedit ? (
                <MultilineEdit />
              ) : (
                <Typography key={React.key}>{value.content}</Typography>
              )}
            </>
          ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default DigitizeAccordion;

DigitizeAccordion.propTypes = {
  item: PropTypes.isRequired,
  protocol: PropTypes.isRequired,
  primaryRole: PropTypes.isRequired,
  currentActiveCard: PropTypes.isRequired,
  setCurrentActiveCard: PropTypes.isRequired,
  handlePageRight: PropTypes.isRequired,
};
