import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ChevronRight from "apollo-react-icons/ChevronRight";
import ChevronLeft from "apollo-react-icons/ChevronLeft";
import Button from "apollo-react/components/Button";
import Search from "apollo-react/components/Search";
import Grid from "apollo-react/components/Grid";
import { Link } from "react-router-dom";

function DashboardSearch({ recent, saved }) {
  const dispatch = useDispatch();
  let history = useHistory();
  const [viewMore, setViewMore] = useState(false);
  return (
    <div
      className="dashboard-search-parent"
      data-testid="dashboard-search"
      id="dashboard-search-wrapper"
    >
      <h3>Search</h3>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{ paddingLeft: "3em", paddingRight: "3em" }}>
          <span data-testid="dashboard-search-bar" id="dashboard-search-bar">
            <Search
              placeholder="Protocol Number, Indication, Key word, etc"
              fullWidth
              onKeyPress={(e) => {
                console.log("--------clicked key enter");
                if (e.key === "Enter") {
                  dispatch({
                    type: "POST_RECENT_SEARCH_DASHBOARD",
                    payload: e.target.value,
                  });
                  history.push(`/search?key=${e.target.value}`);
                }
              }}
            />
          </span>
          <div>
            <h3>Recent Searches</h3>
            {recent && recent.length > 0 ? (
              <ul
                className={
                  viewMore ? "search-list-ul-scroll" : "search-list-ul"
                }
              >
                {recent.map((item, index) => {
                  if (item.keyword && (index <= 5 || viewMore)) {
                    return (
                      <li key={item.sponsorId} className="search-list-li">
                        <Link to={`/search?key=${item.keyword}`}>
                          {item.keyword}
                        </Link>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            ) : (
              "No Search data available"
            )}
          </div>
          {recent && recent.length > 5 ? (
            <span data-testid="view-more" id="view-more-btn">
              <Button
                variant="secondary"
                style={{ width: "100%" }}
                onClick={() => setViewMore(!viewMore)}
              >
                <span>{viewMore ? "View Less" : "View More"}</span>
                {viewMore ? (
                  <ChevronLeft className="view-more-icon" />
                ) : (
                  <ChevronRight className="view-more-icon" />
                )}
              </Button>
            </span>
          ) : null}
        </Grid>

        <Grid
          item
          xs={6}
          style={{
            paddingLeft: "3em",
            paddingRight: "3em",
            borderLeft: "1px solid #d9d9d9",
          }}
        >
          <div>
            <h3>Saved Searches</h3>
            {saved && saved.length > 0 ? (
              <ul className="search-list-ul">
                {saved.map((item) => {
                  if (item.keyword) {
                    return (
                      <li key={item.sponsorId} className="search-list-li">
                        <Link to={`/search?key=${item.keyword}`}>
                          {item.keyword}
                        </Link>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            ) : (
              "No Search data available"
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardSearch;
