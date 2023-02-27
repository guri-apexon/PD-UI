import React, { useEffect, useState } from 'react';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Drag from 'apollo-react-icons/Drag';
import Button from 'apollo-react/components/Button';
import Modal from 'apollo-react/components/Modal';
import FieldGroup from 'apollo-react/components/FieldGroup';
import TextField from 'apollo-react/components/TextField';
import DigitizeAccordion from './DigitizeAccordion';
import Loader from '../../../Components/Loader/Loader';
import {
  headerResult,
  protocolSummary,
  rightBladeValue,
  TOCActive,
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
  const [currentEditCard, setCurrentEditCard] = useState(null);
  const [sectionSequence, setSectionSequence] = useState(-1);
  const [tocActive, setTocActive] = useState([]);
  const [state, setState] = useState(false);

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

  const handleOpen = (variant) => {
    setState({ ...state, [variant]: true });
  };

  const handleClose = (variant) => {
    setState({ ...state, [variant]: false });
  };
  // const selectedWord = document.getElementById('selected-word');
  // const myButton = document.getElementById('my-button');

  // document.addEventListener('selectionchange', function () {
  //   const selection = window.getSelection().toString().trim();
  //   if (selection !== '') {
  //     selectedWord.textContent = selection;
  //     myButton.style.display = 'inline-block';
  //   } else {
  //     selectedWord.textContent = '';
  //     myButton.style.display = 'none';
  //   }
  // });

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
                        currentEditCard={currentEditCard}
                        setCurrentEditCard={setCurrentEditCard}
                        scrollToTop={scrollToTop}
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
        {rightValue === PROTOCOL_RIGHT_MENU.CLINICAL_TERM && (
          <Button
            id="my-button"
            className="button-style"
            variant="primary"
            onClick={() => handleOpen('neutral')}
          >
            Add tag
          </Button>
        )}
      </div>

      <Modal
        open={state.neutral}
        onClose={() => handleClose('neutral')}
        buttonProps={[{}, { label: 'Add tag' }]}
        id="neutral"
      >
        <FieldGroup
          header="Add term to selected term/phrase"
          style={{ maxWidth: 540 }}
        >
          <TextField label="synonyms" placeholder="synonyms" fullWidth />
          <TextField
            label="Clinical terms"
            placeholder="Clinical terms"
            fullWidth
          />
          <TextField label="Ontology" placeholder="Ontology" fullWidth />
          <TextField
            label="Preffered term"
            placeholder="Preffered term"
            fullWidth
          />
          <TextField label="Class" placeholder="Class" fullWidth />
        </FieldGroup>
      </Modal>
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
