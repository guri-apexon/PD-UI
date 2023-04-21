import React, { useEffect, useState } from 'react';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Drag from 'apollo-react-icons/Drag';
import Button from 'apollo-react/components/Button';
import Modal from 'apollo-react/components/Modal';
import Loader from '../../../Components/Loader/Loader';
import SOA from '../SOA/SOA';
import {
  protocolSummary,
  rightBladeValue,
  SectionIndex,
  TOCActive,
  protocolTocData,
} from '../protocolSlice';
import './Digitized.scss';
import MetaData from '../MetaData/MetaData';
import DipaView from '../DIPA/DipaView';
import { PROTOCOL_RIGHT_MENU } from '../Constant/Constants';
import LabData from '../LabData/LabData';
import AddClinicalTerm from '../EnrichedContent/AddClinicalTerm';
import DigitizeAccordion from './DigitizeAccordion';
import { primaryUserFinalSubmit } from '../../Dashboard/constant';
import { replaceHtmlTags } from './utils';

function DigitalizeCard({
  sectionNumber,
  sectionRef,
  data,
  paginationPage,
  handlePageRight,
  globalPreferredTerm,
  handleRightFullScreen,
  fullRightScreen,
  showExpandIcon,
}) {
  const dispatch = useDispatch();
  const [headerList, setHeaderList] = useState([]);
  const BladeRightValue = useSelector(rightBladeValue);
  const summary = useSelector(protocolTocData);
  const protocolAllItems = useSelector(protocolSummary);
  const sectionIndex = useSelector(SectionIndex);
  const [rightValue, setRightValue] = useState(BladeRightValue);
  const [currentActiveCard, setCurrentActiveCard] = useState(null);
  const [sectionSequence, setSectionSequence] = useState(-1);
  const [tocActive, setTocActive] = useState([]);
  const [currentEditCard, setCurrentEditCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const tocActiveSelector = useSelector(TOCActive);
  const userDetail = useSelector((state) => state.user.userDetail);
  const [linkId, setLinkId] = useState();

  useEffect(() => {
    dispatch({
      type: 'GET_PROTOCOL_TOC_DATA',
      payload: {
        docId: data?.id,
        tocFlag: 1,
      },
    });

    dispatch({
      type: 'GET_DOC_SECTION_LOCK',
      payload: {
        docId: data?.id,
      },
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tocActiveSelector) setTocActive(tocActiveSelector);
  }, [tocActiveSelector]);

  useEffect(() => {
    if (summary?.data?.length) {
      setHeaderList(
        summary.data.map((x) => {
          if (x.source_file_section !== 'blank_header') {
            return {
              ...x,
              source_file_section: replaceHtmlTags(x.source_file_section),
            };
          }
          return x;
        }),
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
    handleRightFullScreen(false);
    setRightValue(BladeRightValue);
    // eslint-disable-next-line
  }, [BladeRightValue]);

  const handleTocSection = (index) => {
    const tempTOCActive = [...tocActive];
    tempTOCActive[index] = true;
    dispatch({
      type: 'SET_TOC_Active',
      payload: {
        data: tempTOCActive,
      },
    });
  };

  useEffect(() => {
    const listLength = headerList.length - 1;
    for (let i = 0; i < headerList.length; i++) {
      if (headerList[i].page === paginationPage) {
        setSectionSequence(i);
        handleTocSection(i);
        break;
      } else if (headerList[i].page > paginationPage) {
        setSectionSequence(i - 1);
        handleTocSection(i - 1);
        break;
      }
    }
    if (headerList[listLength]?.page < paginationPage) {
      setSectionSequence(listLength);
      handleTocSection(listLength);
    }
    // eslint-disable-next-line
  }, [paginationPage]);

  const handleFinalSubmit = () => {
    dispatch({
      type: 'SUBMIT_WORKFLOW_DATA',
      payload: { ...primaryUserFinalSubmit, docId: data.id },
    });
    setModalOpen(false);
  };

  const handleOpenAccordion = (refObj) => {
    setHeaderList(
      headerList.map((x) => {
        if (!refObj && x.linkandReference) {
          return { ...x, linkandReference: null };
        }
        if (refObj?.link_id === x.link_id) {
          return { ...x, linkandReference: refObj.destination_link_text };
        }
        return x;
      }),
    );
  };
  return (
    <div data-testid="protocol-column-wrapper">
      {[PROTOCOL_RIGHT_MENU.HOME, PROTOCOL_RIGHT_MENU.CLINICAL_TERM].includes(
        rightValue,
      ) && (
        <Card className="protocol-column protocol-digitize-column card-boarder">
          <div className="panel-heading" data-testid="header">
            Digitized Data
            {protocolAllItems.data.redactProfile === 'profile_1' &&
              rightValue === PROTOCOL_RIGHT_MENU.HOME &&
              userDetail.user_type !== 'QC1' &&
              headerList.length > 0 && (
                <div className="submit-protocol">
                  <Button
                    className="button-style"
                    variant="secondary"
                    onClick={() => setModalOpen(true)}
                    disabled={!protocolAllItems.isWorkflowDone}
                    size="small"
                  >
                    Submit
                  </Button>
                </div>
              )}
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
                        globalPreferredTerm={globalPreferredTerm}
                        headerList={headerList}
                        setCurrentEditCard={setCurrentEditCard}
                        currentEditCard={currentEditCard}
                        handleLinkId={handleLinkId}
                        handleOpenAccordion={handleOpenAccordion}
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
      <Modal
        disableBackdropClick
        open={modalOpen}
        variant="warning"
        onClose={() => setModalOpen(false)}
        message="Do you want to submit this document ?"
        title="Confirm Action"
        buttonProps={[
          {},

          {
            label: 'Submit',

            onClick: () => handleFinalSubmit(),
          },
        ]}
        id="Submit"
      />
      {rightValue === PROTOCOL_RIGHT_MENU.PROTOCOL_ATTRIBUTES && (
        <MetaData docId={data.id} />
      )}
      {rightValue === PROTOCOL_RIGHT_MENU.LAB_DATA && (
        <LabData docId={data.id} />
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
        <DipaView
          docId={data.id}
          handleRightFullScreen={handleRightFullScreen}
          fullRightScreen={fullRightScreen}
          showExpandIcon={showExpandIcon}
        />
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
  globalPreferredTerm: PropTypes.isRequired,
  handleRightFullScreen: PropTypes.func.isRequired,
  fullRightScreen: PropTypes.bool.isRequired,
  showExpandIcon: PropTypes.bool.isRequired,
};
