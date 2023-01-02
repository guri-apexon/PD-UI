import React, { useEffect, useState } from 'react';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Drag from 'apollo-react-icons/Drag';
import DigitizeAccordion from './DigitizeAccordion';
import Loader from '../../Components/Loader/Loader';
import { headerResult, protocolSummary } from './protocolSlice';

function Digitize({
  sectionNumber,
  sectionRef,
  data,
  paginationPage,
  handlePageRight,
}) {
  const dispatch = useDispatch();
  const [headerList, setHeaderList] = useState([]);

  const summary = useSelector(headerResult);
  const protocolAllItems = useSelector(protocolSummary);
  const [currentActiveCard, setCurrentActiveCard] = useState(0);
  const [sectionSequence, setSectionSequence] = useState(undefined);

  useEffect(() => {
    if (summary?.data?.length) {
      setHeaderList(
        summary.data.filter((x) => {
          return x.source_file_section !== 'blank_header';
        }),
      );
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
      setCurrentActiveCard(headerList[sectionSequence].link_id);
    }
    // eslint-disable-next-line
  }, [sectionSequence]);

  useEffect(() => {
    if (sectionNumber >= 0) {
      setSectionSequence(sectionNumber);
    }
  }, [sectionNumber]);

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
  }, [paginationPage]);

  return (
    <Card
      className="protocol-column protocol-digitize-column"
      style={{ borderRight: '0' }}
    >
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
                <Drag
                  style={{
                    color: 'grey',
                    fontSize: '1.2em',
                    padding: '15px',
                    paddingLeft: '5px',
                  }}
                />
                <div>
                  <DigitizeAccordion
                    item={items}
                    protocol={protocolAllItems.data.protocol}
                    primaryRole={data.userPrimaryRoleFlag}
                    currentActiveCard={currentActiveCard}
                    setCurrentActiveCard={setCurrentActiveCard}
                    index={index}
                    handlePageRight={handlePageRight}
                  />
                </div>
              </div>
            ))}
            {!summary.success && <div className="loader">No Data found</div>}
          </>
        )}
      </div>
    </Card>
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
