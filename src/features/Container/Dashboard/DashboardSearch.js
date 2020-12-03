import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { recentSearches } from "../Dashboard/dashboardSlice";
import DashboardSearchComp from "../../Components/Dashboard/DashboardSearch";
function DashboardSearch() {
  const dispatch = useDispatch();
  const recentSearchesData = useSelector(recentSearches);
  useEffect(() => {
      dispatch({ type: "GET_RECENT_SEARCH_DATA" });
  }, []);
  return (
    <div style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)", padding: "15px" }}>
      <DashboardSearchComp recent={recentSearchesData} saved={recentSearchesData}/>
    </div>
  );
}

export default DashboardSearch;
