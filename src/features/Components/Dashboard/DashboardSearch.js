// import Card from 'apollo-react/components/Card';
import Search from "apollo-react/components/Search";
import Grid from "apollo-react/components/Grid";
import Link from "apollo-react/components/Link";

function DashboardSearch({ recent, saved }) {
  return (
    <>
      <h3>Search</h3>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{ paddingLeft: "3em", paddingRight: "3em" }}>
          <Search
            placeholder="Protocol Number, Indication, Key word, etc"
            fullWidth
          />
          <div>
            <h3>Recent Searches</h3>
            {recent && recent.length > 0 ? (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {recent.map((item) => (
                  <li key={item.searchId} style={{ paddingBottom: 10 }}>
                    <Link onClick={() => console.log("link clicked")}>
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
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {saved.map((item) => (
                  <li key={item.searchId} style={{ paddingBottom: 10 }}>
                    <Link onClick={() => console.log("link clicked")}>
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
    </>
  );
}

export default DashboardSearch;
