import React from "react";
import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";
import Typography from "apollo-react/components/Typography";
import { CompositeTable } from "./CompositeTable";
import Checkbox from "apollo-react/components/Checkbox";
import Folder from "apollo-react-icons/Folder";
import Switch from "apollo-react/components/Switch";
import Card from "apollo-react/components/Card";
import Divider from "apollo-react/components/Divider";
//const [value, setValue] = React.useState(true);

//const handleChange = (e, checked) => {
//    setValue(checked);
//};

export const CompositeAccordion = ({
  data,
  defaultExpand,
  setExpanded,
  accID,
}) => {
  console.log("---------", defaultExpand);
  return (
    <Card
      interactive
      style={{ width: "99%", margin: "10px", float: "left", marginTop: 2 }}
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
                Protocol: <strong>{data.protocolNumber}</strong>
              </span>
            </div>
            <div className="divBlock ellipse">{data.protocolDescription}</div>
          </div>
          <div className="width5 swtichButton">
            <Switch label="follow" size="small" checked={data.followed} />
          </div>
        </div>

        <div className="width90 accordion-start">
          {/* <Accordion
            // expanded={
            //   defaultExpand ? defaultExpand : (accID === data.protocolNumber) && accID
            // }
          > */}
          <Accordion >
            <AccordionSummary
              style={{ maginLeft: 24 }}
            >
              {/* // onClick={() => setExpanded(data.protocolNumber)} */}
              <Typography>Protocol Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="width100">
                <CompositeTable data={data} />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </Card>
  );
};
