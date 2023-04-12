/* eslint-disable */
import React, { useState } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import Checkbox from 'apollo-react/components/Checkbox';
import Folder from 'apollo-react-icons/Folder';
import Switch from 'apollo-react/components/Switch';
import Card from 'apollo-react/components/Card';
import { Link } from 'react-router-dom';
import Modal from 'apollo-react/components/Modal';
import { toast } from 'react-toastify';
import {
  handleProtocolTitle,
  uploadDateValidation,
  formatESDate,
} from '../../../utils/utilFunction';

import { userRole, messages } from '../../../AppConstant/AppConstant';

import SearchCard from './SearchCard';

function SearchListingSection({
  data,
  setExpanded,
  compareTwoProtocol,
  selection,
  history,
  onViewAssociateProtocolClick,
  protocolSelected,
  handleFollow,
}) {
  // const userId1 = useSelector(userId);
  const [openModal, setModalOpen] = useState(false);
  const [documentSelected, setDocumentSelected] = useState({});
  const onExpandClick = (data) => {
    setExpanded(
      data.AiDocId,
      { id: data.AiDocId, expanded: !data.expanded },
      data,
    );
  };
  const handleFollowChange = (e, checked, data) => {
    handleFollow(e, checked, data);
  };
  const handleLinkRender = (data) => {
    if (data.UserRole === userRole.primary) {
      return (
        <label className="blueText">
          Protocol :{' '}
          <Link
            className="title-link-protocol-1"
            to={`/protocols?protocolId=${data.AiDocId}`}
          >
            {data.protocolNumber}
          </Link>
        </label>
      );
    }
    if (uploadDateValidation(formatESDate(data.uploadDate))) {
      return (
        <label className="blueText">
          Protocol :{' '}
          <Link
            className="title-link-protocol-1"
            to={`/protocols?protocolId=${data.AiDocId}`}
          >
            {data.protocolNumber}
          </Link>
        </label>
      );
    }
    return (
      <label className="blueText">
        Protocol :{' '}
        <span
          className="title-link-protocol-1"
          // onClick={() => modalRender(data)}
        >
          {data.protocolNumber}
        </span>
      </label>
    );
  };
  // const handleTitleRender = (data) => {
  //   if (data.UserRole === userRole.primary) {
  //     return handleProtocolTitle(data.protocolDescription, "title-value");
  //   } else {
  //     if (uploadDateValidation(formatESDate(data.uploadDate))) {
  //       return handleProtocolTitle(data.protocolDescription, "title-value");
  //     } else {
  //       return (
  //         <Tooltip variant="light" title={redaction.hoverText} placement="top">
  //           <span>
  //             <span className="adjust-ellipses">
  //               <span class="blur">{redaction.text}</span>
  //             </span>
  //           </span>
  //         </Tooltip>
  //       );
  //     }
  //   }
  // };
  const modalRender = (data) => {
    setDocumentSelected(data);
    setModalOpen(!openModal);
  };
  const handleReprocess = () => {
    toast.success('API not Integrated.');
    setModalOpen(!openModal);
  };
  return (
    <Card interactive style={{ width: '99%', margin: '10px', marginTop: 2 }}>
      <Modal
        open={openModal}
        variant="warning"
        onClose={() => modalRender()}
        title="Re-Process Required"
        // subtitle="Optional Subtitle"
        message={messages.legacyDocMsg}
        buttonProps={[
          {},
          { label: 'Re-Process', onClick: () => handleReprocess() },
        ]}
        id="warning"
      />
      <div
        className="marginTop width100 marginLeft10"
        data-testid={`searchListing-card-${data.AiDocId}`}
      >
        <div className="width100">
          <div className="width30px">
            <Checkbox />
          </div>
          <div className="width30px">
            <Folder style={{ color: 'purple' }} />
          </div>
          <div className="width85">
            <div className="divBlock">
              <span>
                {handleLinkRender(data)}
                {/* <Link
                  to={`/protocols?protocolId=${data.AiDocId}`}
                  data-testid="name-value"
                  dangerouslySetInnerHTML={createFullMarkup(
                    data.protocolNumber
                  )}
                >
                  {data.protocolNumber}
                </Link> */}
              </span>
            </div>
            <div className="divBlock ellipse" data-testid="title-value">
              {handleProtocolTitle(data.protocolDescription, 'title-value')}
            </div>
          </div>
          <div className="width5 swtichButton">
            <Switch
              label="follow"
              size="small"
              checked={data.followed}
              onChange={(e, checked) => handleFollowChange(e, checked, data)}
            />
          </div>
        </div>

        <div className="width100 accordion-start">
          <Accordion expanded={data.expanded}>
            {/* <Accordion > */}
            <AccordionSummary
              style={{ maginLeft: 24 }}
              onClick={() => onExpandClick(data)}
            >
              {/* // onClick={() => setExpanded(data.protocolNumber)} */}
              <Typography>Protocol Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="width100">
                <SearchCard
                  data={data}
                  compareTwoProtocol={compareTwoProtocol}
                  selection={selection}
                  onViewAssociateProtocolClick={onViewAssociateProtocolClick}
                  protocolSelected={protocolSelected}
                />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </Card>
  );
}

export default SearchListingSection;
