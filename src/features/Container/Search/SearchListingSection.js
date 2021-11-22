import React from "react";
import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";
import Typography from "apollo-react/components/Typography";
import SearchCard from "./SearchCard";
import Checkbox from "apollo-react/components/Checkbox";
import Folder from "apollo-react-icons/Folder";
import Switch from "apollo-react/components/Switch";
import Card from "apollo-react/components/Card";
import { Link } from "react-router-dom";
import { handleProtocolTitle } from "../../../utils/utilFunction";
import { uploadDateValidation } from "../../../utils/utilFunction";
import { userRole } from "../../../AppConstant/AppConstant";
import { formatESDate } from "../../../utils/utilFunction";

const SearchListingSection = ({
  data,
  setExpanded,
  compareTwoProtocol,
  selection,
  history,
  onViewAssociateProtocolClick,
  protocolSelected,
  handleFollow,
}) => {
  // const userId1 = useSelector(userId);
  const onExpandClick = (data) => {
    setExpanded(
      data.AiDocId,
      { id: data.AiDocId, expanded: !data.expanded },
      data
    );
  };
  const handleFollowChange = (e, checked, data) => {
    handleFollow(e, checked, data);
  };
  const handleLinkRender = (data) => {
    if (data.UserRole === userRole.primary) {
      return (
        <label className="blueText">
          Protocol :{" "}
          <Link
            className="title-link-protocol-1"
            to={`/protocols?protocolId=${data.AiDocId}`}
          >
            {data.protocolNumber}
          </Link>
        </label>
      );
    } else {
      if (uploadDateValidation(formatESDate(data.uploadDate))) {
        return (
          <label className="blueText">
            Protocol :{" "}
            <Link
              className="title-link-protocol-1"
              to={`/protocols?protocolId=${data.AiDocId}`}
            >
              {data.protocolNumber}
            </Link>
          </label>
        );
      } else {
        return (
          <label className="blueText">
            Protocol :{" "}
            <span className="title-no-link-protocol-1">
              {data.protocolNumber}
            </span>
          </label>
        );
      }
    }
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
  return (
    <Card interactive style={{ width: "99%", margin: "10px", marginTop: 2 }}>
      <div
        className="marginTop width100 marginLeft10"
        data-testid={`searchListing-card-${data.AiDocId}`}
      >
        <div className="width100">
          <div className="width30px">
            <Checkbox />
          </div>
          <div className="width30px">
            <Folder style={{ color: "purple" }} />
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
              {handleProtocolTitle(data.protocolDescription, "title-value")}
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
};

export default SearchListingSection;
