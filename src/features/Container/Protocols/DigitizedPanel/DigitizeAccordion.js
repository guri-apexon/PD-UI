/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import Save from 'apollo-react-icons/Save';
import MultilineEdit from './Digitized_edit';
import Loader from '../../../Components/Loader/Loader';
import {
  sectionDetailsResult,
  setSectionLoader,
  resetSectionData,
} from '../protocolSlice';
import { createFullMarkup } from '../../../../utils/utilFunction';
import MedicalTerm from '../EnrichedContent/MedicalTerm';

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
  const [sections, setSections] = useState([]);
  const [enrichedTarget, setEnrichedTarget] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const sectionHeaderDetails = useSelector(sectionDetailsResult);

  const { linkId } = sectionHeaderDetails;

  useEffect(() => {
    if (
      sectionHeaderDetails?.sections &&
      isArray(sectionHeaderDetails?.sections) &&
      linkId === item.link_id
    ) {
      setShowLoader(false);
      let updatedSectionsData = [];
      let matchedIndex = null;
      const sectionsData = sectionHeaderDetails?.sections;
      updatedSectionsData = sectionsData?.map((sec, index) => {
        if (sec?.font_info?.VertAlign === 'superscript') {
          matchedIndex = index;
          return {
            ...sec,
            content: `${sec?.content}_${sectionsData[index + 1].content}`,
          };
        }
        return sec;
      });
      if (matchedIndex) {
        updatedSectionsData.splice(matchedIndex + 1, 1);
      }
      setSections(updatedSectionsData);
    } else {
      setSections([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionHeaderDetails]);

  const handleChange = () => {
    handlePageRight(item.page);
    setExpanded(!expanded);
  };

  const onSaveClick = (e) => {
    e.stopPropagation();
    setShowEdit(false);
  };

  useEffect(() => {
    if (expanded) {
      setCurrentActiveCard(item.link_id);
      if (linkId !== item.link_id) {
        setShowLoader(true);
        dispatch(setSectionLoader(true));
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

  const handleEnrichedClick = (e) => {
    if (e.target.className === 'enriched-txt') {
      // const termText = e.target.innerText;
      setEnrichedTarget(e.target);
    } else {
      setEnrichedTarget(null);
    }
  };
  // useEffect(() => {
  //   document.addEventListener('click', handleEnrichedClick);
  //   // return () => {
  //   //   document.removeEventListener('click', handleEnrichedClick);
  //   // };
  // }, []);

  const onEditClick = (e) => {
    e.stopPropagation();
    setExpanded(true);
    setShowEdit(true);
  };

  return (
    <Accordion
      expanded={expanded}
      onClick={handleChange}
      data-testid="accordion"
    >
      <AccordionSummary>
        <div className="accordion_summary_container">
          <Typography className="section-title" data-testid="accordion-header">
            {item.source_file_section}
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {/* <span data-testId="lockIcon">
              <Lock style={{ paddingRight: '10px' }} />
            </span> */}
            <span data-testId="eyeIcon">
              <EyeShow style={{ paddingRight: '10px' }} />
            </span>
            {primaryRole &&
              (!showedit ? (
                // eslint-disable-next-line
                <span data-testId="pencilIcon" onClick={onEditClick}>
                  <Pencil />
                </span>
              ) : (
                // eslint-disable-next-line
                <span data-testId="saveIcon" onClick={onSaveClick}>
                  <Save />
                </span>
              ))}
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails className="section-single-content">
        {showLoader && (
          <div className="loader accordion_details_loader">
            <Loader />
          </div>
        )}
        {sections?.length > 0 &&
          (showedit ? (
            <MultilineEdit data={sections} />
          ) : (
            <div
              className="readable-content"
              onClick={(e) => handleEnrichedClick(e)}
            >
              {sections.map((section) =>
                section?.font_info?.VertAlign === 'superscript' ? (
                  <div key={React.key} className="supContent">
                    <sup
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={createFullMarkup(
                        section.content.split('_')[0],
                      )}
                    />
                    <p
                      style={{
                        fontWeight: `${
                          section?.font_info?.isBold ||
                          section.type === 'header'
                            ? 'bold'
                            : ''
                        }`,
                        fontStyle: `${
                          section?.font_info?.Italics ? 'italics' : ''
                        }`,
                      }}
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={createFullMarkup(
                        section.content.split('_')[1],
                      )}
                    />
                  </div>
                ) : (
                  <p
                    key={React.key}
                    style={{
                      fontWeight: `${
                        section?.font_info?.isBold || section.type === 'header'
                          ? 'bold'
                          : ''
                      }`,
                      fontStyle: `${
                        section?.font_info?.Italics ? 'italics' : ''
                      }`,
                    }}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={createFullMarkup(section.content)}
                  />
                ),
              )}
            </div>
          ))}
      </AccordionDetails>
      <MedicalTerm enrichedTarget={enrichedTarget} />
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
