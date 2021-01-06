const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const elasticsearch = require("elasticsearch");


const PORT = 4000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "build")));

const client = new elasticsearch.Client({
  host: "http://ca2spdml04q:9200/pd-index-2",
  //   log: "trace",
  // apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

app.get("/elastic", (req, res) => {
  console.log(req.query);

  if (req.query.filter) {
    client
      .search({
        body: {
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: req.query.key,
                  },
                },
                {
                  multi_match: {
                    query: req.query.filter,
                    fields: [
                      "Indication",
                      "SponsorName",
                      "phase",
                      "DocumentStatus",
                    ],
                  },
                },
              ],
            },
          },
        },
      })
      .then((resp) => {
        console.log(resp.took);

        res.send(resp);
      })
      .catch((e) => {
        res.send(e);
      });
  } else {
    client
      .search({
        body: {
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: req.query.key,
                  },
                },
              ],
            },
          },
        },
      })
      .then((resp) => {
        console.log(resp.took);

        res.send(resp);
      })
      .catch((e) => {
        res.send(e);
      });
  }
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);
