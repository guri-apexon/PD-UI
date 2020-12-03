import { useHistory } from "react-router-dom";
import Search from "apollo-react/components/Search";
import Grid from "apollo-react/components/Grid";
import { Link } from "react-router-dom";

function DashboardSearch({ recent, saved }) {
  let history = useHistory();
  return (
    <div className='dashboard-search-parent'>
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
              <ul className='search-list-ul'>
                {recent.map((item) => (
                  <li key={item.searchId} className='search-list-li'>
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
              <ul className='search-list-ul'>
                {saved.map((item) => (
                  <li key={item.searchId} className='search-list-li'>
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
