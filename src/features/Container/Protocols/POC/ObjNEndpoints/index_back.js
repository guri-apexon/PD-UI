import { useState } from "react";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import Button from "apollo-react/components/Button/Button";
import "./style.scss";
import Loader from "../../../../Components/Loader/Loader";
import { isEmpty } from "lodash";

const Objectives = [
  {
    name: "All objectives",
    value: "All objectives",
  },
  {
    name: "Primary objectives",
    value: "Primary objectives",
  },
  {
    name: "Secondary objectives",
    value: "Secondary objectives",
  },
  {
    name: "Safety objectives",
    value: "Safety objectives",
  },
  {
    name: "Exploratory objectives",
    value: "Exploratory objectives",
  },
];
const Endpoints = [
  {
    name: "All endpoints",
    value: "All endpoints",
  },
  {
    name: "Primary endpoints",
    value: "Primary endpoints",
  },
  {
    name: "Secondary endpoints",
    value: "Secondary endpoints",
  },
  {
    name: "Safety endpoints",
    value: "Safety endpoints",
  },
  {
    name: "Exploratory endpoints",
    value: "Exploratory endpoints",
  },
];

const ObjectiveEndpoints = ({ id, name, dfsPath }) => {
  const [objectiveData, setObjectiveData] = useState(null);
  const [endpointData, setEndpointData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [objectiveName, setObjectiveName] = useState("All objectives");
  const [endpointName, setEndpointName] = useState("All endpoints");
  const fetchData = async () => {
    setLoader(true);
    if (objectiveName && endpointName) {
      let url = `${BASE_URL_8000}/api/segments/get_objectives_endpoints?aidocid=${id}&objectives=${objectiveName}&endpoints=${endpointName}`;

      const config = {
        url: url,
        method: "GET",
      };
      const { data, success } = await httpCall(config);
      if (success) {
        const objectives = data[id].objectives;
        const endpoints = data[id].endpoints;
        setObjectiveData(objectives);
        setEndpointData(endpoints);
        setLoader(false);
        setError(false);
      } else {
        setObjectiveData(null);
        setEndpointData(null);
        setLoader(false);
        setError(true);
      }
    }
  };
  const renderList = (list) => {
    return (
      <div>
        {list.map((item) => {
          return <p>{`${item.ser_num}. ${item.text}`}</p>;
        })}
      </div>
    );
  };
  const renderDerivedInfo = (obj) => {
    return (
      <div className="derived-info">
        <h4>Derived Information</h4>
        <h5>Derived Count: {obj.derived_count}</h5>
        <h5>Derived Mechanism: </h5>
        {obj.derived_mechanism.length > 0 && (
          <ul>
            {obj.derived_mechanism.map((ele) => {
              return <li>{ele}</li>;
            })}
          </ul>
        )}
      </div>
    );
  };
  const renderContent = (data, header) => {
    console.log("Data", data);
    return (
      <div>
        <h2>{header}</h2>
        {Object.keys(data).map((key) => {
          if (key !== "derived_info") {
            return (
              <div>
                <h4 className="key-headers">{key}</h4>
                <p>{renderList(data[key])}</p>
                <div>
                  {header === "Endpoints" &&
                    renderDerivedInfo(data.derived_info[key])}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };
  const handleSearchCriteria = (value, area) => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (area === "Objectives") {
      for (let i = 0; i < Objectives.length; i++) {
        if (value === Objectives[i].name) {
          setObjectiveName(Objectives[i].value);
        }
      }
    } else {
      for (let i = 0; i < Endpoints.length; i++) {
        if (value === Endpoints[i].name) {
          setEndpointName(Endpoints[i].value);
        }
      }
    }
  };
  return (
    <div>
      <div className="view-data-container" style={{ marginBottom: 50 }}>
        <div>
          <label>Objectives: </label>
          <select
            className="entity-name-select"
            onChange={(e) => handleSearchCriteria(e.target.value, "Objectives")}
            value={objectiveName}
          >
            {Objectives.map((item) => {
              return <option>{item.name}</option>;
            })}
          </select>
          <div>
            <label>Endpoints: </label>
            <select
              className="entity-name-select"
              onChange={(e) =>
                handleSearchCriteria(e.target.value, "Endpoints")
              }
              value={endpointName}
            >
              {Endpoints.map((item) => {
                return <option>{item.name}</option>;
              })}
            </select>
          </div>
          <Button
            variant="primary"
            size="small"
            style={{ margin: 10 }}
            onClick={(e) => fetchData()}
          >
            Search
          </Button>
        </div>
        {loader && (
          <div
            style={{
              height: 400,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Loader />
          </div>
        )}
        {!loader && (
          <div className="protocol-column">
            <div
              className="accordion-start-container"
              data-testid="protocol-column-wrapper"
              style={{ marginBottom: 50 }}
            >
              {objectiveData &&
                !isEmpty(objectiveData) &&
                renderContent(objectiveData, "Objectives")}
            </div>
          </div>
        )}
        {!loader && (
          <div className="protocol-column">
            <div
              className="accordion-start-container"
              data-testid="protocol-column-wrapper"
              style={{ marginBottom: 50 }}
            >
              {endpointData &&
                !isEmpty(endpointData) &&
                renderContent(endpointData, "Endpoints")}
            </div>
          </div>
        )}
        {error && (
          <div
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <h2>No Data Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default ObjectiveEndpoints;
