import { isEmpty } from "lodash";
import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";

const ObjNEnd = ({ data }) => {
  const renderList = (list) => {
    return (
      <div>
        {list.map((item) => {
          return (
            <p
              dangerouslySetInnerHTML={{
                __html: `${item.ser_num}. ${item.text}`,
              }}
            ></p>
          );
        })}
      </div>
    );
  };
  const renderDerivedInfo = (obj) => {
    return (
      <div className="derived-mechanism">
        <Accordion>
          <AccordionSummary>
            <div className="meta-parent-header">Derived Information</div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <div style={{ display: "block" }}>
                <h5>Derived Count: {obj.derived_count}</h5>
              </div>

              <h5>Derived Mechanism: </h5>
              {obj.derived_mechanism.length > 0 && (
                <ul>
                  {obj.derived_mechanism.map((ele) => {
                    return <li>{ele}</li>;
                  })}
                </ul>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };
  const renderContent = (data) => {
    console.log("Data", data);
    const objectiveData = data.objectives;
    const endpointData = data.endpoints;
    return (
      <div>
        {/* <h2>Objectives & Endpoints</h2> */}
        {Object.keys(objectiveData).map((key) => {
          if (key !== "derived_info") {
            return (
              <div className="card-section">
                <h4 className="key-headers">{key + " Objectives"}</h4>
                <p>{renderList(objectiveData[key])}</p>
                <h4 className="key-headers">{key + " Endpoints"}</h4>
                {endpointData[key] ? (
                  <>
                    <p>{renderList(endpointData[key])}</p>
                    <div>
                      {renderDerivedInfo(endpointData.derived_info[key])}
                    </div>
                  </>
                ) : (
                  <div>No Matching for {key} Endpoints</div>
                )}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  };
  return (
    <div className="protocol-column">
      <div
        // className="accordion-start-container"
        data-testid="protocol-column-wrapper"
        style={{ marginBottom: 50 }}
      >
        {data && !isEmpty(data) && renderContent(data)}
      </div>
    </div>
  );
};

export default ObjNEnd;
