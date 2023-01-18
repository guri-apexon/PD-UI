import React, { useEffect, useState } from 'react';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Drag from 'apollo-react-icons/Drag';
import DigitizeAccordion from './DigitizeAccordion';
import Loader from '../../../Components/Loader/Loader';
import {
  headerResult,
  protocolSummary,
  rightBladeValue,
} from '../protocolSlice';
import './Digitized.scss';
import MetaData from '../MetaData/MetaData';
import { PROTOCOL_RIGHT_MENU } from '../Constant/Constants';

function Digitize({
  sectionNumber,
  sectionRef,
  data,
  paginationPage,
  handlePageRight,
}) {
  const dispatch = useDispatch();
  const [headerList, setHeaderList] = useState([]);
  const BladeRightValue = useSelector(rightBladeValue);
  const summary = useSelector(headerResult);
  const protocolAllItems = useSelector(protocolSummary);
  const [rightValue, setRightValue] = useState(BladeRightValue);
  const [currentActiveCard, setCurrentActiveCard] = useState(null);
  const [sectionSequence, setSectionSequence] = useState(-1);

  useEffect(() => {
    if (summary?.data?.length) {
      setHeaderList(
        summary.data.filter((x) => x.source_file_section !== 'blank_header'),
      );
    } else {
      setHeaderList([]);
    }
  }, [summary]);

  useEffect(() => {
    if (sectionSequence === 'undefined' || sectionSequence === undefined) {
      //  refs[1].current.scrollIntoView({ behavior: 'smooth' });
    } else if (
      sectionRef[sectionSequence] &&
      sectionRef[sectionSequence].current
    ) {
      sectionRef[sectionSequence]?.current?.scrollIntoView({
        behavior: 'instant',
      });
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

    for (let i = 0; i < headerList.length; i++) {
      if (headerList[i].page === paginationPage) {
        sectionNo = headerList[i].sequence;
        setSectionSequence(sectionNo);
        break;
      } else if (headerList[i].page > paginationPage) {
        setSectionSequence(lastpage);
        break;
      }
      lastpage = headerList[i].sequence;
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
            data-testid="protocol-column-wrapper"
          >
            {!summary?.data ? (
              <div className="loader">
                <Loader />
              </div>
            ) : (
              <>
                {headerList.map((items, index) => (
                  <div
                    key={React.key}
                    ref={sectionRef[index]}
                    className="digitized_data_item"
                  >
                    <Drag className="drag" />
                    <div>
                      <DigitizeAccordion
                        item={items}
                        protocol={protocolAllItems.data.protocol}
                        primaryRole={data.userPrimaryRoleFlag}
                        currentActiveCard={currentActiveCard}
                        setCurrentActiveCard={setCurrentActiveCard}
                        index={index}
                        handlePageRight={handlePageRight}
                        rightBladeValue={BladeRightValue}
                      />
                    </div>
                  </div>
                ))}
                {!summary.success && (
                  <div className="loader">No Data found</div>
                )}
              </>
            )}
          </div>
        </Card>
      )}
      {rightValue === PROTOCOL_RIGHT_MENU.META_DATA && <MetaData />}
    </div>
  );
}

export default Digitize;

Digitize.propTypes = {
  sectionNumber: PropTypes.isRequired,
  sectionRef: PropTypes.isRequired,
  data: PropTypes.isRequired,
  paginationPage: PropTypes.isRequired,
  handlePageRight: PropTypes.isRequired,
};
