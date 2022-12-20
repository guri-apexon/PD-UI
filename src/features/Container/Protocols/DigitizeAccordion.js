import React from 'react';
import Accordion from 'apollo-react/components/Accordion';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import AccordionDetails from 'apollo-react/components/AccordionDetails';

import AccordionSummary from 'apollo-react/components/AccordionSummary';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import EyeShow from 'apollo-react-icons/EyeShow';

import Drag from 'apollo-react-icons/Drag';
import Records from './records.json';
import MultilineEdit from './Digitized_edit';
import Loader from '../../Components/Loader/Loader';
import {
  headerResult,
  protocolSummary,
  sectionDetailsResult,
} from './protocolSlice';

function DigitizeAccordion() {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [showedit, setShowEdit] = useState(false);

  useEffect(() => {
    if (expanded) {
      dispatch({
        type: 'GET_SECTION_LIST',
        payload: {
          linkId: items.link_id,
          docId: items.doc_id,
          protocol: protocolAllItems.data.protocol,
        },
      });
    }
  }, [expanded]);

  return (
    <Accordion expanded={expanded} onChange={() => handleChange(index)}>
      <AccordionSummary
        style={{
          fontSize: '0.5em',
        }}
      >
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
            {items.source_file_section}
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <EyeShow />
            {data.userPrimaryRoleFlag === true ? null : (
              <Pencil
                onClick={() => setEditFlag(true)}
                style={{ paddingLeft: '20px' }}
              />
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
        {sectionHeaderDetails.data &&
          sectionHeaderDetails.data.map((value) => (
            <>
              {editFlag ? (
                <MultilineEdit editFlag={editFlag} getedited={getedited} />
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
