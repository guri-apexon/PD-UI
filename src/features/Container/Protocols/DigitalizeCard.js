import React, { useEffect, useState } from 'react';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Drag from 'apollo-react-icons/Drag';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
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
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    }),
  );

  const dispatch = useDispatch();
  const [headerList, setHeaderList] = useState([]);

  const summary = useSelector(headerResult);
  const protocolAllItems = useSelector(protocolSummary);
  const [currentActiveCard, setCurrentActiveCard] = useState(null);
  const [sectionSequence, setSectionSequence] = useState(0);

  useEffect(() => {
    if (summary?.data) {
      setHeaderList(summary.data);
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
      },
    });
    // eslint-disable-next-line
  }, []);

  const rowRenderer = ({ key, index, style, parent }) => {
    const item = headerList[index];
    return (
      <CellMeasurer
        key={key}
        cache={cache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div
          ref={sectionRef[index]}
          className="digitized_data_item"
          style={style}
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
              item={item}
              protocol={protocolAllItems.data.protocol}
              primaryRole={data.userPrimaryRoleFlag}
              currentActiveCard={currentActiveCard}
              setCurrentActiveCard={setCurrentActiveCard}
              index={index}
              handlePageRight={handlePageRight}
            />
          </div>
        </div>
      </CellMeasurer>
    );
  };

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
            {/* <div style={{ width: '100%', height: '78vh' }}> */}
            {/* <AutoSizer>
              {({ width, height }) => (
                <List
                  width={width}
                  height={height}
                  rowHeight={cache.current.rowHeight}
                  deferredMeasurementCache={cache.current}
                  rowCount={headerList.length}
                  rowRenderer={rowRenderer}
                />
              )}
            </AutoSizer> */}
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
            {/* </div> */}
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
