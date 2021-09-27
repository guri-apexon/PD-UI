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
// import { userId } from "../../../store/userDetails";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { BASE_URL_8000, httpCall } from "../../../utils/api";
import Tooltip from "apollo-react/components/Tooltip";
//const [value, setValue] = React.useState(true);

//const handleChange = (e, checked) => {
//    setValue(checked);
//};

const textLength = 50;
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
  // const handleTitle = async (data) => {
  //   const config = {
  //     url: `${BASE_URL_8000}/api/user_protocol/is_primary_user?userId=${userId1.substring(
  //       1
  //     )}&protocol=${data.protocolNumber}`,
  //     method: "GET",
  //   };
  //   const resp = await httpCall(config);
  //   if (resp && resp.data) {
  //     history.push(`/protocols?protocolId=${data.AiDocId}`);
  //   } else {
  //     toast.info("Access Provisioned to Primary Users only");
  //   }
  // };
  const handleFollowChange = (e, checked, data) => {
    handleFollow(e, checked, data);
  };
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
              <span className="blueText">
                Protocol:{" "}
                {/* <strong
                  onClick={() => handleTitle(data)}
                  data-testid="name-value"
                >
                  {data.protocolNumber}
                </strong> */}
                <Link to={`/protocols?protocolId=${data.AiDocId}`}>
                  {data.protocolNumber}
                </Link>
              </span>
            </div>
            <div className="divBlock ellipse" data-testid="title-value">
              {data.protocolDescription &&
              data.protocolDescription.length > textLength ? (
                <Tooltip
                  variant="light"
                  // title="Title"
                  subtitle={data.protocolDescription}
                  placement="left"
                  // style={{ marginRight: 48 }}
                >
                  <p
                    className="grid-item grid-key-value"
                    style={{ marginRight: 10 }}
                  >
                    {data.protocolDescription}
                  </p>
                </Tooltip>
              ) : (
                <p className="grid-item grid-key-value">
                  {data.protocolDescription}
                </p>
              )}
              {/* {data.protocolDescription} */}
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
