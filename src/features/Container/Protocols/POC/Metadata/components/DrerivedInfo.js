import "./attribute.scss";
import { isEmpty } from "lodash";

import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";

const DerivedInfo = ({ data }) => {
  console.log("Derived Data", data);
  return !isEmpty(data) ? (
    <Accordion>
      <AccordionSummary>
        <div className="meta-parent-header">Derived Information</div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="attributes-term">
          <div>
            <div style={{ display: "block" }}>
              <h5>Derived Count: {data.derived_count}</h5>
            </div>

            <h5>Derived Mechanism: </h5>
            {data.derived_mechanism.length > 0 && (
              <ul>
                {data.derived_mechanism.map((ele) => {
                  return <li>{ele}</li>;
                })}
              </ul>
            )}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  ) : (
    <div></div>
  );
};

export default DerivedInfo;
