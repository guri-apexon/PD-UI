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
app.use(express.static(path.join(__dirname, "protocols")));

const client = new elasticsearch.Client({
  host: "http://ca2spdml04q:9200/pd-index-3",
  //   log: "trace",
  // apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

function constructFilterArray(data) {
  // const data = {
  //   sponsors: ["NVT AG", "Hospira"],
  //   indications: ["AIDS", "Cough"],
  //   phases: ["Phase 0", "Phase 1a"],
  //   status: ["Draft", "Final Approved"],
  // };
  let queryArr = [];

  for (let i = 0; i < data.sponsors.length; i++) {
    let query = {
      term: {
        "sponsor.keyword": data.sponsors[i],
      },
    };
    queryArr.push(query);
  }
  for (let i = 0; i < data.indications.length; i++) {
    let query = {
      term: {
        "Indication.keyword": data.indications[i],
      },
    };
    queryArr.push(query);
  }
  for (let i = 0; i < data.phases.length; i++) {
    let query = {
      term: {
        "phase.keyword": data.phases[i],
      },
    };
    queryArr.push(query);
  }
  for (let i = 0; i < data.status.length; i++) {
    let query = {
      term: {
        "DocumentStatus.keyword": data.status[i].toLowerCase(),
      },
    };
    queryArr.push(query);
  }
  let final = {
    bool: {
      should: queryArr,
    },
  };
  // console.log(JSON.stringify(queryArr));
  return final;
}
// constructFilterArray();

function constructMustArray(docStatus, key, from, to, toc) {
  const query = [
    {
      multi_match: {
        query: key,
        fields: toc,
      },
    },
    {
      range: {
        [docStatus]: {
          gte: from,
          lt: to,
        },
      },
    },
  ];
  return query;
}

app.get("/elastic", (req, res) => {
  console.log(req.url);
  console.log(req.query);
  const key = req.query.key;
  const from = req.query.dateFrom;
  const to = req.query.dateTo;

  let toc = [];
  let docStatus = [];
  let sponsorArr = [];
  let indicationArr = [];
  let phaseArr = [];
  if (req.query.toc) {
    toc = req.query.toc.split("_");
  }
  if (req.query.documentStatus) {
    docStatus = req.query.documentStatus.split("_");
  }
  if (req.query.indication) {
    indicationArr = req.query.indication.split("_");
  }
  if (req.query.sponsor) {
    sponsorArr = req.query.sponsor.split("_");
  }
  if (req.query.phase) {
    phaseArr = req.query.phase.split("_");
  }

  // const sponsorArr = req.query.sponsor.split("_");
  // const indicationArr = req.query.indication.split("_");
  // const phaseArr = req.query.phase.split("_");

  console.log("Sponsor : ", sponsorArr);
  console.log("Indication : ", indicationArr);
  console.log("Phase : ", phaseArr);
  console.log("Document Status : ", docStatus);

  const filters = {
    sponsors: sponsorArr,
    indications: indicationArr,
    phases: phaseArr,
    status: docStatus,
  };
  let filterArr = constructFilterArray(filters);
  let mustQuery;
  if (from && to) {
    const dateField =
      docStatus[0] === "active" ? "approval_date" : "uploadDate";
    mustQuery = constructMustArray(dateField, key, from, to, toc);
  } else {
    mustQuery = [
      {
        multi_match: {
          query: key,
          // type: "phrase",
          fields: toc,
        },
      },
    ];
  }

  const FinalQuery = {
    query: {
      bool: {
        must: mustQuery,
        filter: filterArr,
      },
    },
    size: 1000,
    _source: [
      "AiDocId",
      "ProtocolNo",
      "ProtocolTitle",
      "SponsorName",
      "Indication",
      "DocumentStatus",
      "phase",
      "approval_date",
      "uploadDate",
      "MoleculeDevice",
    ],
  };

  console.log("FInal Query", JSON.stringify(FinalQuery));
  client
    .search({
      body: FinalQuery,
    })
    .then((resp) => {
      console.log(resp.took);

      res.send(resp);
    })
    .catch((e) => {
      res.send(e);
    });
  // debugger
  // let queryDate;
  // switch (docStatus) {
  //   case "draft":
  //     queryDate = "uploadDate";
  //     break;
  //   case "active":
  //     queryDate = "approval_date";
  //     break;
  //   default:
  //     queryDate = "uploadDate";
  // }
  // let baseQuery = {
  //   query: {
  //     bool: {
  //       must: [],
  //     },
  //   },
  // };
  // if (key) {
  //   let item = {
  //     multi_match: {},
  //   };
  //   item.multi_match["query"] = key;
  //   item.multi_match["type"] = "phrase";
  //   const obj = baseQuery.query.bool.must;
  //   obj.push(item);
  // console.log('item',item);
  // console.log('baseQ', baseQuery);
  // var myJSON = JSON.stringify(baseQuery);
  // var myObj = JSON.parse(myJSON);
  // console.log('myJSON',myJSON);
  // console.log('myObj', myObj);
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
  // }
  // if (docStatus) {
  //   console.log("-------------------doc---------------");
  //   let item = {
  //     multi_match: {
  //       query: docStatus,
  //       fields: ["DocumentStatus"],
  //     },
  //   };
  // item.multi_match["query"] = docStatus;
  // item.multi_match["fields"] = ["DocumentStatus"];
  // const obj = baseQuery.query.bool.must;
  // obj.push(item);
  // console.log('item',item);
  // console.log('baseQ', baseQuery);
  // var myJSON = JSON.stringify(baseQuery);
  // var myObj = JSON.parse(myJSON);
  // console.log('myJSON',myJSON);
  // console.log('myObj', myObj);
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
  // }
  // if (from && to) {
  //   console.log("-------------------date---------------");
  //   let item = {
  //     range: {
  //       [queryDate]: {
  //         gte: from,
  //         lt: to,
  //       },
  //     },
  //   };
  // const obj = baseQuery.query.bool.must;
  // obj.push(item);
  // console.log('item',item);
  // console.log('baseQ', baseQuery);
  // var myJSON = JSON.stringify(baseQuery);
  // var myObj = JSON.parse(myJSON);
  // console.log('myJSON',myJSON);
  // console.log('myObj', myObj);
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
  // }
  // client
  //   .search({
  //     body: baseQuery,
  //   })
  //   .then((resp) => {
  //     console.log(resp.took);

  //     res.send(resp);
  //   })
  //   .catch((e) => {
  //     res.send(e);
  //   });
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
