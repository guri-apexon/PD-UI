const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const elasticsearch = require("elasticsearch");

const PORT = 3000;

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
  const key = req.query.key;
  const from = req.query.dateFrom;
  const to = req.query.dateTo;
  const docStatus = req.query.documentStatus;
  let queryDate;
  switch(docStatus) {
    case 'draft': queryDate = 'uploadDate';
    break;
    case 'active': queryDate = 'approval_date';
    break;
    default: queryDate = 'uploadDate';
  }
  let baseQuery = {
    "query": {
      "bool": {
        "must": []
      }
    }
  };
  if (key) {
    let item = {
      "multi_match": {}
    }
    item.multi_match["query"] = key;
    item.multi_match["type"] = "phrase";
    const obj = baseQuery.query.bool.must
    obj.push(item);
    console.log('item',item);
    console.log('baseQ', baseQuery);
    var myJSON = JSON.stringify(baseQuery);
    var myObj = JSON.parse(myJSON);
    console.log('myJSON',myJSON);
    console.log('myObj', myObj);
    // baseQuery = {
    //   "query": {
    //     "bool": {
    //       "must": [
    //         {
    //           "multi_match": {
    //             "query": key
    //           }
    //         }
    //       ]
    //     }
    //   }
    // }
  }
  if(docStatus) {
    console.log('-------------------doc---------------');
    let item = {
      "multi_match": {
        "query": docStatus,
        "fields": [ "DocumentStatus" ]
      }
    }
    // item.multi_match["query"] = docStatus;
    // item.multi_match["fields"] = ["DocumentStatus"];
    const obj = baseQuery.query.bool.must
    obj.push(item);
    console.log('item',item);
    console.log('baseQ', baseQuery);
    var myJSON = JSON.stringify(baseQuery);
    var myObj = JSON.parse(myJSON);
    console.log('myJSON',myJSON);
    console.log('myObj', myObj);
    // baseQuery = {
    //   "query": {
    //     "bool": {
    //       "must": [
    //         {
    //           "multi_match": {
    //             "query": key
    //           }
    //         },
    //         {
    //           "multi_match": {
    //             "query": docStatus
    //           }
    //         },
    //         {
    //           "range": {
    //           [queryDate]: {
    //             "gte": from,
    //             "lt": to            
    //           }
    //         }
    //         }
    //       ]
    //     }
    //   }
    // }
  }
  if (from && to) {
    console.log('-------------------date---------------');
    let item = {
      "range": {
        [queryDate]: {
          "gte": from,
          "lt": to  
        }
      }
    }
    const obj = baseQuery.query.bool.must
    obj.push(item);
    console.log('item',item);
    console.log('baseQ', baseQuery);
    var myJSON = JSON.stringify(baseQuery);
    var myObj = JSON.parse(myJSON);
    console.log('myJSON',myJSON);
    console.log('myObj', myObj);
    // baseQuery = {
    //   "query": {
    //     "bool": {
    //       "must": [
    //         {
    //           "multi_match": {
    //             "query": key
    //           }
    //         },
    //         {
    //           "range": {
    //           [queryDate]: {
    //             "gte": from,
    //             "lt": to            
    //           }
    //         }
    //         }
    //       ]
    //     }
    //   }
    // }
  }
  client
    .search({
      body: baseQuery
    })
    .then((resp) => {
      console.log(resp.took);

      res.send(resp);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.get("/filter", (req, res) => {
  console.log("server query", req.query);
  client
    .search({
      body: {
        query: {
          range: {
            uploadDate: {
              gte: req.query.from,
              lt: req.query.to,
            },
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
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);
