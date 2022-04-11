import { useState } from "react";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import Button from "apollo-react/components/Button/Button";
import "./style.scss";
import Loader from "../../../../Components/Loader/Loader";
import { isEmpty } from "lodash";

const Objectives = [
  {
    name: "All Objectives",
    value: "All objectives",
  },
  {
    name: "Primary Objectives",
    value: "Primary objectives",
  },
  {
    name: "Secondary Objectives",
    value: "Secondary objectives",
  },
  {
    name: "Safety Objectives",
    value: "Safety objectives",
  },
  {
    name: "Exploratory Objectives",
    value: "Exploratory objectives",
  },
];
const Endpoints = [
  {
    name: "All Endpoints",
    value: "All endpoints",
  },
  {
    name: "Primary Endpoints",
    value: "Primary endpoints",
  },
  {
    name: "Secondary Endpoints",
    value: "Secondary endpoints",
  },
  {
    name: "Safety Endpoints",
    value: "Safety endpoints",
  },
  {
    name: "Exploratory Endpoints",
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
  const renderContent = (data, header) => {
    console.log("Data", data);
    return (
      <div>
        <h3>{header}</h3>
        {Object.keys(data).map((key) => {
          if (key !== "derived_info") {
            return (
              <div>
                <h5>{key}</h5>
                <p>{renderList(data[key])}</p>
              </div>
            );
          }
        })}
      </div>
    );
  };
  const handleSearchCriteria = (value, area) => {
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
