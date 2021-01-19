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
import Divider from "apollo-react/components/Divider";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//const [value, setValue] = React.useState(true);

//const handleChange = (e, checked) => {
//    setValue(checked);
//};

const SearchListingSection = ({
  data,
  setExpanded,
  compareTwoProtocol,
  selection,
  history,
}) => {
  // console.log("--------",data)
  const dispatch = useDispatch();
  const onExpandClick = (data) => {
    // if(!data.expanded){
    //   dispatch({type:"UPDATE_SEARCH_ASSCIATED_PROTOCOLS", payload: data})
    // }
    setExpanded(
      data.protocolNumber,
      { id: data.protocolNumber, expanded: !data.expanded },
      data
    );
  };
  const handleTitle = async (title) => {
    try {
      const resp = await axios.get(
        `http://ca2spdml01q:8000/api/latest_approved_document/?protocol=${title}`
      );
      const data = resp.data;
      // debugger
      if (data) {
        history.push(`/protocols?protocolId=${data.id}`);
      } else {
        alert("There is no Approved Final version for this protocol.");
      }
      console.log("Title", data);
    } catch (e) {
      alert("Something went wrong.");
    }
  };
  return (
    <Card
      interactive
      style={{ width: "99%", margin: "10px", marginTop: 2 }}
    >
      <div className="marginTop width100 marginLeft10">
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
                <strong onClick={() => handleTitle(data.protocolNumber)}>
                  {data.protocolNumber}
                </strong>
              </span>
            </div>
            <div className="divBlock ellipse">{data.protocolDescription}</div>
          </div>
          <div className="width5 swtichButton">
            <Switch label="follow" size="small" checked={data.followed} />
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
