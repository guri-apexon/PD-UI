import { useState, memo } from "react";
import { useDispatch } from "react-redux";
import trim from "lodash/trim";
import { toast } from "react-toastify";
import Search from "apollo-react/components/Search";
import Grid from "apollo-react/components/Grid";
import Button from "apollo-react/components/Button";
import BulkMap from "./BulkMap";

function MappingSearch() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [protocol, setProtocol] = useState("");
  const [userErr, setUserErr] = useState(false);
  const [protocolErr, setProtocolErr] = useState(false);

  const handleChange = (key, value) => {
    if (key === "id") {
      setUserId(trim(value));
    } else if (key === "protocol") {
      setProtocol(trim(value));
    }
  };

  const onFieldBlur = (key, value) => {
    const alphaNumeric = /[!@#/$%&/*/^();,?"':=/+`~/]/.test(protocol);
    const idValidation = /u|q{1}[0-9]+$/.test(userId);
    console.log(idValidation);
    if (key === "id" && userId && !idValidation) {
      setUserErr(true);
    } else if (key === "id") {
      setUserErr(false);
    }
    if (key === "protocol" && protocol && alphaNumeric) {
      setProtocolErr(true);
    } else if (key === "protocol") {
      setProtocolErr(false);
    }
  };

  const getSearchResult = () => {
    if (userErr || protocolErr || (!userId && !protocol)) {
      toast.error(`Please enter valid input`);
    } else {
      const data = {
        userId,
        protocol,
      };
      dispatch({ type: "GET_PROTOCOL_MAP_SAGA", payload: data });
    }
  };
  return (
    <div
      className="dashboard-search-parent"
      data-testid="dashboard-search"
      id="dashboard-search-wrapper"
    >
      <Grid container spacing={2}>
        <Grid item xs={4} style={{ paddingLeft: "3em", paddingRight: "3em" }}>
          <span data-testid="dashboard-search-bar" id="dashboard-search-bar">
            <Search
              placeholder="Enter User ID"
              fullWidth
              onChange={(e) => handleChange("id", e.target.value)}
              onBlur={(e) => onFieldBlur("id", e.target.value)}
              error={userErr}
              helperText={userErr ? "Invalid User ID" : ""}
            />
          </span>
        </Grid>
        <Grid item xs={4} style={{ paddingLeft: "3em", paddingRight: "3em" }}>
          <span data-testid="dashboard-search-bar" id="dashboard-search-bar">
            <Search
              placeholder="Enter Protocol Number"
              fullWidth
              onChange={(e) => handleChange("protocol", e.target.value)}
              onBlur={(e) => onFieldBlur("protocol", e.target.value)}
              error={protocolErr}
              helperText={protocolErr ? "Invalid Protocol Number" : ""}
            />
          </span>
        </Grid>
        <Grid item xs={4} style={{ marginTop: "20px", marginBottom: "8px" }}>
          <Button
            variant="primary"
            style={{ marginRight: 10 }}
            onClick={() => getSearchResult()}
          >
            Search
          </Button>
          <Button
            variant="primary"
            style={{ marginRight: 10 }}
            onClick={() => console.log("open")}
          >
            Map
          </Button>
          <BulkMap />
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(MappingSearch);
