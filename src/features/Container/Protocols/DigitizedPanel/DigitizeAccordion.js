/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import PropTypes from 'prop-types';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import { isArray } from 'lodash';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
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
  sectionLoader,
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
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    }),
  );

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [showedit, setShowEdit] = useState(false);
  const [sections, setSections] = useState([]);
  const [enrichedTarget, setEnrichedTarget] = useState(null);
  const sectionHeaderDetails = useSelector(sectionDetailsResult);
  const sectionContentLoader = useSelector(sectionLoader);

  const { linkId } = sectionHeaderDetails;

  useEffect(() => {
    if (
      sectionHeaderDetails?.sections &&
      isArray(sectionHeaderDetails?.sections)
    ) {
      setSections(sectionHeaderDetails?.sections);
    } else {
      setSections([]);
    }
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
  //   document
  //     .getElementsByClassName('enriched-txt')
  //     .addEventListener('click', handleEnrichedClick);
  // }, []);

  const onEditClick = (e) => {
    e.stopPropagation();
    setExpanded(true);
    setShowEdit(true);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
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
        {sectionContentLoader && (
          <div className="loader accordion_details_loader">
            <Loader />
          </div>
        )}
        {/* <MultilineEdit data={sections} /> */}
        {sections?.length > 0 &&
          (showedit ? (
            <MultilineEdit data={sections} />
          ) : (
            <div className="readable-content">
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    rowHeight={cache.current.rowHeight}
                    deferredMeasurementCache={cache.current}
                    overscanRowCount={5}
                    rowCount={sections.length}
                    // eslint-disable-next-line
                    rowRenderer={({ key, index, style, parent }) => {
                      const item = sections[index];
                      return (
                        <CellMeasurer
                          key={key}
                          cache={cache.current}
                          parent={parent}
                          columnIndex={0}
                          rowIndex={index}
                        >
                          <div
                            style={style}
                            onClick={(e) => handleEnrichedClick(e)}
                          >
                            <Typography
                              key={React.key}
                              dangerouslySetInnerHTML={createFullMarkup(
                                `${item.content}<b class="enriched-txt">Enriched Text</b>`,
                              )}
                            />
                          </div>
                        </CellMeasurer>
                      );
                    }}
                  />
                )}
              </AutoSizer>
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
