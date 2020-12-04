import {useState} from 'react';
import { useHistory } from "react-router-dom";
import ChevronRight from "apollo-react-icons/ChevronRight";
import Button from "apollo-react/components/Button";
import Search from "apollo-react/components/Search";
import Grid from "apollo-react/components/Grid";
import { Link } from "react-router-dom";

function DashboardSearch({ recent, saved }) {
  let history = useHistory();
  const [viewMore, setViewMore] = useState(false);
  return (
    <div className="dashboard-search-parent">
      <h3>Search</h3>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{ paddingLeft: "3em", paddingRight: "3em" }}>
          <Search
            placeholder="Protocol Number, Indication, Key word, etc"
            fullWidth
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                history.push(`/search/key=${e.target.value}`);
              }
            }}
          />
          <div>
            <h3>Recent Searches</h3>
            {recent && recent.length > 0 ? (
              <ul className={viewMore ? "search-list-ul-scroll" : "search-list-ul"}>
                {recent.map((item, index) => {
                  if (index <= 5 || viewMore) {
                    return (
                      <li key={item.searchId} className="search-list-li">
                        <Link to={`/search?key=${item.searchName}`}>
                          {item.searchName}
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
            ) : (
              "No Search data available"
            )}
          </div>
          {recent.length > 5 ?
          <Button variant="secondary" style={{ width: "100%" }} onClick={() => setViewMore(!viewMore)}>
            <span>{viewMore ? 'View Less' : 'View More'}</span>
            <ChevronRight className="view-more-icon" />
          </Button>: null}
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
                {saved.map((item) => (
                  <li key={item.searchId} className="search-list-li">
                    <Link to={`/search?key=${item.searchName}`}>
                      {item.searchName}
                    </Link>
                  </li>
                ))}
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
