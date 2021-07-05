import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { recentSearches, savedSearches } from "../Dashboard/dashboardSlice";
import DashboardSearchComp from "../../Components/Dashboard/DashboardSearch";
function DashboardSearch() {
  const dispatch = useDispatch();
  const recentSearchesData = useSelector(recentSearches);
  const savedSearchesData = useSelector(savedSearches);
  useEffect(() => {
    dispatch({ type: "GET_RECENT_SEARCH_DATA" });
    dispatch({ type: "GET_SAVED_SEARCH_DATA" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DashboardSearchComp
      recent={recentSearchesData}
      saved={savedSearchesData}
    />
  );
}

export default React.memo(DashboardSearch);
