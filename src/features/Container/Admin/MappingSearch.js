import { useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import trim from "lodash/trim";
import { toast } from "react-toastify";
import Search from "apollo-react/components/Search";
import Grid from "apollo-react/components/Grid";
import Button from "apollo-react/components/Button";
import BulkMap from "./BulkMap";
import AddNewMapping from "./AddNewMapping";

import { searchedData } from "./adminSlice";

function MappingSearch() {
  const dispatch = useDispatch();
  const search = useSelector(searchedData);
  const [userId, setUserId] = useState(search.userId);
  const [protocol, setProtocol] = useState(search.protocol);
  const [userErr, setUserErr] = useState(false);
  // const [protocolErr, setProtocolErr] = useState(false);

  useEffect(() => {
    setUserId(search.userId);
    setProtocol(search.protocol);
  }, [search]);

  const handleChange = (key, value) => {
    if (key === "id") {
      setUserId(trim(value));
    } else if (key === "protocol") {
      setProtocol(trim(value));
    }
  };

  const onFieldBlur = (key, value) => {
    const idValidation = /^[0-9]*$/.test(userId);
    if (key === "id" && userId && !idValidation) {
      setUserErr(true);
    } else if (key === "id") {
      setUserErr(false);
    }
  };

  const getSearchResult = () => {
    if (userErr || (!userId && !protocol)) {
      toast.error(`Please enter valid input`);
    } else {
      const data = {
        userId: userId,
        protocol: protocol,
      };
      dispatch({ type: "GET_PROTOCOL_MAP_SAGA", payload: data });
    }
  };
  return (
    <div
      className="admin-search-parent"
      data-testid="admin-search"
      id="admin-search-wrapper"
    >
      <Grid container spacing={2}>
        <Grid item xs={4} style={{ paddingLeft: "3em", paddingRight: "3em" }}>
          <Search
            placeholder="Enter User ID"
            fullWidth
            onChange={(e) => handleChange("id", e.target.value)}
            onBlur={(e) => onFieldBlur("id", e.target.value)}
            error={userErr}
            value={userId}
            helperText={userErr ? "Invalid User ID" : ""}
            data-testid="admin-search-user-id"
          />
        </Grid>
        <Grid item xs={4} style={{ paddingLeft: "3em", paddingRight: "3em" }}>
          <Search
            placeholder="Enter Protocol Number"
            fullWidth
            onChange={(e) => handleChange("protocol", e.target.value)}
            onBlur={(e) => onFieldBlur("protocol", e.target.value)}
            value={protocol}
            data-testid="admin-search-protocol-number"
          />
        </Grid>
        <Grid item xs={4} style={{ marginTop: "20px", marginBottom: "8px" }}>
          <Button
            variant="primary"
            style={{ marginRight: 10 }}
            onClick={() => getSearchResult()}
          >
            Search
          </Button>
          <AddNewMapping />
          <BulkMap />
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(MappingSearch);
