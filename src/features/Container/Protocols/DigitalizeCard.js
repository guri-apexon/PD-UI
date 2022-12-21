import React, { useEffect, useState } from 'react';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Drag from 'apollo-react-icons/Drag';
import DigitizeAccordion from './DigitizeAccordion';
import Loader from '../../Components/Loader/Loader';
import { headerResult, protocolSummary } from './protocolSlice';

function Digitize({ sectionNumber, sectionRef, data }) {
  const dispatch = useDispatch();
  const [headerList, setHeaderList] = useState([]);

  const summary = useSelector(headerResult);
  const protocolAllItems = useSelector(protocolSummary);
  const [currentActiveCard, setCurrentActiveCard] = useState(null);
  // const [data, setData] = useState(summary);

  useEffect(() => {
    if (summary?.data) {
      setHeaderList(summary.data);
    }
  }, [summary]);

  useEffect(() => {
    if (sectionNumber === 'undefined' || sectionNumber === undefined) {
      //  refs[1].current.scrollIntoView({ behavior: 'smooth' });
    } else if (
      sectionRef &&
      sectionRef[sectionNumber] &&
      sectionRef[sectionNumber].current
    ) {
      sectionRef[sectionNumber].current.scrollIntoView({
        behavior: 'instant',
      });
      setCurrentActiveCard(headerList[sectionNumber].link_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionNumber]);

  useEffect(() => {
    dispatch({ type: 'GET_PROTOCOL_SECTION' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      className="protocol-column protocol-digitize-column"
      style={{ borderRight: '0' }}
    >
      <div className="panel-heading">Digitized Data</div>
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
};
