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
import Lock from 'apollo-react-icons/Lock';
import Save from 'apollo-react-icons/Save';
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

  const onEditClick = (e) => {
    e.stopPropagation();
    setExpanded(true);
    setShowEdit(true);
  };

  const rowRenderer = ({ key, index, style, parent }) => {
    const item = sections[index];

    return (
      <CellMeasurer
        key={key}
        cache={cache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>
          <Typography key={React.key}>{item.content}</Typography>
        </div>
      </CellMeasurer>
    );
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary>
        <div className="accordion_summary_container">
          <Typography
            style={{
              fontweight: 'strong',
            }}
            data-testid="accordion-header"
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
            <Lock style={{ paddingRight: '10px' }} />
            <EyeShow style={{ paddingRight: '10px' }} />
            {!primaryRole && !showedit ? (
              <Pencil onClick={onEditClick} />
            ) : (
              <Save onClick={onSaveClick} />
            )}
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
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
            <div style={{ height: '200px' }}>
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
                          <div style={style}>
                            <Typography key={React.key}>
                              {item.content}
                            </Typography>
                          </div>
                        </CellMeasurer>
                      );
                    }}
                  />
                )}
              </AutoSizer>
            </div>
          ))}

        {/* // {sections &&
        //   isArray(sections) &&
        //   sections?.map((value) => (
        //     // eslint-disable-next-line react/jsx-no-useless-fragment
        //     <>
        //       {showedit ? (
        //         <MultilineEdit />
        //       ) : (
        //         <Typography key={React.key}>{value.content}</Typography>
        //       )}
        //     </>
        //   ))} */}
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
