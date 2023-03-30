/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Drag from 'apollo-react-icons/Drag';

import Loader from '../../../Components/Loader/Loader';
import SOA from '../SOA/SOA';
import {
  headerResult,
  protocolSummary,
  rightBladeValue,
  SectionIndex,
  TOCActive,
} from '../protocolSlice';
import './Digitized.scss';
import MetaData from '../MetaData/MetaData';
import DipaView from '../DIPA/DipaView';
import { PROTOCOL_RIGHT_MENU } from '../Constant/Constants';
import AddClinicalTerm from '../EnrichedContent/AddClinicalTerm';
import DigitizeAccordion from './DigitizeAccordion';

function DigitalizeCard({
  sectionNumber,
  sectionRef,
  data,
  paginationPage,
  handlePageRight,
  value,
}) {
  const dispatch = useDispatch();
  const [headerList, setHeaderList] = useState([]);
  const BladeRightValue = useSelector(rightBladeValue);
  const summary = useSelector(headerResult);
  const protocolAllItems = useSelector(protocolSummary);
  const sectionIndex = useSelector(SectionIndex);
  const [rightValue, setRightValue] = useState(BladeRightValue);
  const [currentActiveCard, setCurrentActiveCard] = useState(null);
  const [sectionSequence, setSectionSequence] = useState(-1);
  const [tocActive, setTocActive] = useState([]);
  const [currentEditCard, setCurrentEditCard] = useState(null);
  const [linkId, setLinkId] = useState();

  const tocActiveSelector = useSelector(TOCActive);
  useEffect(() => {
    if (tocActiveSelector) setTocActive(tocActiveSelector);
  }, [tocActiveSelector]);

  useEffect(() => {
    if (summary?.data?.length) {
      setHeaderList(
        summary.data.filter((x) => x.source_file_section !== 'blank_header'),
      );
    } else {
      setHeaderList([]);
    }
  }, [summary]);
  const scrollToTop = (index) => {
    setTimeout(() => {
      sectionRef[index]?.current?.scrollIntoView(true);
    }, 300);
  };

  const handleLinkId = (linkId) => {
    setLinkId(linkId);
  };
  useEffect(() => {
    if (sectionIndex >= 0) {
      const tempTOCActive = [...tocActive];
      tempTOCActive[sectionIndex] = true;
      dispatch({
        type: 'SET_TOC_Active',
        payload: {
          data: tempTOCActive,
        },
      });
      setSectionSequence(sectionIndex);
    }

    // eslint-disable-next-line
  }, [sectionIndex]);

  useEffect(() => {
    if (sectionRef[sectionSequence] && sectionRef[sectionSequence].current) {
      scrollToTop(sectionSequence);
      setCurrentActiveCard(headerList[sectionSequence]?.link_id);
    }
    // eslint-disable-next-line
  }, [sectionSequence]);

  useEffect(() => {
    if (sectionNumber >= 0) {
      setSectionSequence(sectionNumber);
    }
  }, [sectionNumber]);

  useEffect(() => {
    setCurrentActiveCard(0);
    setRightValue(BladeRightValue);
    // eslint-disable-next-line
  }, [BladeRightValue]);

  useEffect(() => {
    dispatch({
      type: 'GET_PROTOCOL_SECTION',
      payload: {
        docId: data.id,
        tocFlag: 0,
      },
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let sectionNo;
    let lastpage;
    const listLength = headerList.length - 1;
    for (let i = 0; i < headerList.length; i++) {
      if (headerList[i].page === paginationPage) {
        sectionNo = headerList[i].sequence;
        setSectionSequence(sectionNo);
        const tempTOCActive = [...tocActive];
        tempTOCActive[sectionNo] = true;
        dispatch({
          type: 'SET_TOC_Active',
          payload: {
            data: tempTOCActive,
          },
        });
        break;
      } else if (headerList[i].page > paginationPage) {
        setSectionSequence(lastpage);
        break;
      }
      lastpage = headerList[i].sequence;
    }
    if (headerList[listLength]?.page < paginationPage) {
      const sequence = headerList[listLength]?.sequence;
      setSectionSequence(sequence);
      const tempTOCActive = [...tocActive];
      tempTOCActive[listLength] = true;
      dispatch({
        type: 'SET_TOC_Active',
        payload: {
          data: tempTOCActive,
        },
      });
    }
    // eslint-disable-next-line
  }, [paginationPage]);

  return (
    <div data-testid="protocol-column-wrapper">
      {[PROTOCOL_RIGHT_MENU.HOME, PROTOCOL_RIGHT_MENU.CLINICAL_TERM].includes(
        rightValue,
      ) && (
        <Card className="protocol-column protocol-digitize-column card-boarder">
          <div className="panel-heading" data-testid="header">
            Digitized Data
          </div>
          <div
            className="digitize-panel-content"
            data-testid="digitize-panel-content"
          >
            {!summary?.data ? (
              <div className="loader">
                <Loader />
              </div>
            ) : (
              <>
                {headerList.map((item, index) => (
                  <div
                    key={React.key}
                    ref={sectionRef[index]}
                    className="digitized_data_item"
                  >
                    <Drag className="drag" />
                    <span data-testId={headerList.page} />
                    <div>
                      <DigitizeAccordion
                        item={item}
                        protocol={protocolAllItems.data.protocol}
                        primaryRole={data.userPrimaryRoleFlag}
                        currentActiveCard={currentActiveCard}
                        index={index}
                        handlePageRight={handlePageRight}
                        rightBladeValue={BladeRightValue}
                        scrollToTop={scrollToTop}
                        value={value}
                        headerList={headerList}
                        setCurrentEditCard={setCurrentEditCard}
                        currentEditCard={currentEditCard}
                        handleLinkId={handleLinkId}
                      />
                    </div>
                  </div>
                ))}
                {!summary.success && (
                  <div className="loader">{summary.errorMsg}</div>
                )}
              </>
            )}
          </div>
        </Card>
      )}
      {rightValue === PROTOCOL_RIGHT_MENU.PROTOCOL_ATTRIBUTES && (
        <MetaData docId={data.id} />
      )}
      <div>
        {data.userPrimaryRoleFlag && (
          <AddClinicalTerm docId={data.id} linkId={linkId} />
        )}
      </div>
      {rightValue === PROTOCOL_RIGHT_MENU.SCHEDULE_OF_ACTIVITIES && (
        <SOA docId={data.id} />
      )}
      {rightValue === PROTOCOL_RIGHT_MENU.DIPA_VIEW && (
        <DipaView docId={data.id} />
      )}
    </div>
  );
}

export default DigitalizeCard;

DigitalizeCard.propTypes = {
  sectionNumber: PropTypes.isRequired,
  sectionRef: PropTypes.isRequired,
  data: PropTypes.isRequired,
  paginationPage: PropTypes.isRequired,
  handlePageRight: PropTypes.isRequired,
  value: PropTypes.isRequired,
};
