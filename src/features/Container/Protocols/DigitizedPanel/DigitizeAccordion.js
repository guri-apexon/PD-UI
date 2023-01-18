import React, { useState, useEffect } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import PropTypes from 'prop-types';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import { useSelector, useDispatch } from 'react-redux';
import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import Lock from 'apollo-react-icons/Lock';
import EyeShow from 'apollo-react-icons/EyeShow';
import Save from 'apollo-react-icons/Save';
import MultilineEdit from './Digitized_edit';
import Loader from '../../../Components/Loader/Loader';
import { sectionDetails } from '../protocolSlice';
import { createFullMarkup } from '../../../../utils/utilFunction';

function DigitizeAccordion({
  item,
  protocol,
  primaryRole,
  currentActiveCard,
  handlePageRight,
  currentEditCard,
  setCurrentEditCard,
}) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [showedit, setShowEdit] = useState(false);
  const [sections, setSections] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const sectionHeaderDetails = useSelector(sectionDetails);

  const { data: sectionData } = sectionHeaderDetails;

  useEffect(() => {
    if (sectionData?.length > 0) {
      const arr = sectionData.filter((obj) => obj.linkId === item.link_id);
      if (arr.length > 0) {
        setShowLoader(false);
        let updatedSectionsData = [];
        let matchedIndex = null;
        const sectionsData = arr[0].data;
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
      }
    }
    // eslint-disable-next-line
  }, [sectionHeaderDetails]);

  const handleChange = () => {
    handlePageRight(item.page);
    setExpanded(!expanded);
  };

  const onSaveClick = (e) => {
    e.stopPropagation();
    setShowEdit(false);
    setCurrentEditCard(null);
  };

  useEffect(() => {
    if (expanded) {
      const arr = sectionData.filter((obj) => obj.linkId === item.link_id);
      if (arr.length === 0) {
        setShowLoader(true);
        dispatch({
          type: 'GET_SECTION_LIST',
          payload: {
            linkId: item.link_id,
            docId: item.doc_id,
            protocol,
          },
        });
      }
    }
    // eslint-disable-next-line
  }, [expanded]);

  useEffect(() => {
    if (currentActiveCard === item.link_id && !expanded) {
      setExpanded(true);
    }
    // eslint-disable-next-line
  }, [currentActiveCard]);

  useEffect(() => {
    if (currentEditCard !== item.link_id) {
      setShowEdit(false);
    }
    // eslint-disable-next-line
  }, [currentEditCard]);

  const onEditClick = (e) => {
    e.stopPropagation();
    setExpanded(true);
    setShowEdit(true);
    setCurrentEditCard(item.link_id);
  };

  return (
    <Accordion expanded={expanded} data-testid="accordion">
      <AccordionSummary onClick={handleChange}>
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
            {showedit && (
              <span data-testId="lockIcon">
                <Lock style={{ paddingRight: '10px' }} />
              </span>
            )}

            {primaryRole && (
              <>
                <span data-testId="eyeIcon">
                  <EyeShow style={{ paddingRight: '10px' }} />
                </span>
                {!showedit ? (
                  // eslint-disable-next-line
                  <span data-testId="pencilIcon" onClick={onEditClick}>
                    <Pencil />
                  </span>
                ) : (
                  // eslint-disable-next-line
                  <span data-testId="saveIcon" onClick={onSaveClick}>
                    <Save />
                  </span>
                )}
              </>
            )}
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
            <div className="readable-content">
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
    </Accordion>
  );
}

export default DigitizeAccordion;

DigitizeAccordion.propTypes = {
  item: PropTypes.isRequired,
  protocol: PropTypes.isRequired,
  primaryRole: PropTypes.isRequired,
  currentActiveCard: PropTypes.isRequired,
  handlePageRight: PropTypes.isRequired,
  currentEditCard: PropTypes.isRequired,
  setCurrentEditCard: PropTypes.isRequired,
};
