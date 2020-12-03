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
    <DashboardSearchComp
      recent={recentSearchesData}
      saved={recentSearchesData}
    />
  );
}

export default DashboardSearch;
