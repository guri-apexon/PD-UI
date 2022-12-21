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
}) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [showedit, setShowEdit] = useState(false);

  const sectionHeaderDetails = useSelector(sectionDetailsResult);
  const sectionContentLoader = useSelector(sectionLoader);

  const { sections, linkId } = sectionHeaderDetails;

  const handleChange = () => {
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
  }, [expanded]);

  useEffect(() => {
    if (currentActiveCard !== item.link_id && expanded) {
      setExpanded(false);
    } else if (currentActiveCard === item.link_id && !expanded) {
      setExpanded(true);
    }
  }, [currentActiveCard]);

  const onEditClick = () => {
    setExpanded(true);
    setShowEdit(true);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary>
        <div
          className=""
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 48,
          }}
        >
          <Typography
            style={{
              fontweight: 'strong',
            }}
            // onClick={onClickHandler()}
          >
            {item.source_file_section}
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <EyeShow />
            {!primaryRole && (
              <Pencil onClick={onEditClick} style={{ paddingLeft: '20px' }} />
            )}
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails
        style={{
          width: '80% !important',
          height: 'auto',
          overflowX: 'scroll',
          overflowY: 'scroll',
        }}
      >
        {sectionContentLoader && (
          <div
            className="loader"
            style={{
              height: '40px',
            }}
          >
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
};
