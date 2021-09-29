import { useState, memo } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import Search from "apollo-react/components/Search";
import Grid from "apollo-react/components/Grid";
import Button from "apollo-react/components/Button";
import BulkMap from "./BulkMap";

function MappingSearch() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [protocol, setProtocol] = useState("");

  const getSearchResult = () => {
    const data = {
      id: userId,
      protocol,
    };
    dispatch({ type: "GET_PROTOCOL_MAP_SAGA", payload: data });
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
              onChange={(e) => setUserId(e.target.value)}
            />
          </span>
        </Grid>
        <Grid item xs={4} style={{ paddingLeft: "3em", paddingRight: "3em" }}>
          <span data-testid="dashboard-search-bar" id="dashboard-search-bar">
            <Search
              placeholder="Enter Protocol Number"
              fullWidth
              onChange={(e) => setProtocol(e.target.value)}
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
