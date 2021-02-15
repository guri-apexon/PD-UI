const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const path = require("path");
const app = express();
const cors = require("cors");
const elasticsearch = require("elasticsearch");
const https = require("https");
const session = require("express-session");
const jwt_decode = require("jwt-decode");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "protocols")));
let baseUrlElastic = "";
let baseUrlSSO = "";

function authenticateUser(user, password) {
  var token = user + ":" + password;
  var hash = Buffer.from(token).toString("base64");

  return "Basic " + hash;
}
console.log(process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  case "dev":
    baseUrlElastic = process.env.ELASTIC_DEV_URL;
    baseUrlSSO = process.env.CIMS_DEV_URL;
    break;
  case "svt":
    baseUrlElastic = process.env.ELASTIC_SVT_URL;
    baseUrlSSO = process.env.CIMS_SVT_URL;
    break;
  case "uat":
    baseUrlElastic = process.env.ELASTIC_UAT_URL;
    baseUrlSSO = process.env.CIMS_UAT_URL;
    break;
  case "prod":
    baseUrlElastic = process.env.ELASTIC_PROD_URL;
    baseUrlSSO = process.env.CIMS_PROD_URL;
    break;
  default:
    baseUrlElastic = process.env.ELASTIC_DEV_URL;
    baseUrlSSO = process.env.CIMS_DEV_URL;
}
console.log("baseUrlElastic", baseUrlElastic);
console.log("baseUrlSSO", baseUrlSSO);
const client = new elasticsearch.Client({
  host: `${baseUrlElastic}`,
  //   log: "trace",
  // apiVersion: '7.2', // use the same version of your Elasticsearch instance
});
const TOC = {
  sectionId: 1,
  sectionName: "Table Of Contents",
  fieldType: "text",
  sectionContent: [
    {
      id: 1,
      title: "Protocol Summary",
      content: "",
      dependancy: [
        "Protocol Summary",
        "Synopsis",
        "Schema",
        "Schedule of Activities (SoA)]",
      ],
      count: "2",
    },
    {
      id: 2,
      title: "Introduction",
      content: "",
      dependancy: [
        "Introduction",
        "Study Rationale",
        "Background",
        "Benefit/Risk Assessment",
        "Risk Assessment",
        "Benefit Assessment",
        "Overall Benefit: Risk Conclusion",
      ],
      count: "2",
    },
    {
      id: 3,
      title: "Objectives and [Endpoints and/or Estimands]",
      content: "",
      dependancy: ["Objectives and [Endpoints and/or Estimands]"],
      count: "5",
    },
    {
      id: 4,
      title: "Study Design",
      content: "",
      dependancy: [
        "Study Design",
        "Overall Design",
        "Scientific Rationale for Study Design",
        "Participant Input into Design",
        "Justification for Dose",
        "End of Study Definition",
      ],
      count: "6",
    },
    {
      id: 5,
      title: "Study Population",
      content: "",
      dependancy: [
        "Study Population",
        "Inclusion Criteria",
        "Exclusion Criteria",
        "Lifestyle Considerations",
        "Meals and Dietary Restrictions",
        "Caffeine, Alcohol, and Tobacco",
        "Activity",
        "Screen Failures",
        "Criteria for Temporarily Delaying [Enrollment/Randomization/Administration of Study Intervention Administration]",
      ],
      count: "4",
    },
    {
      id: 6,
      title: "Study Intervention(s) and Concomitant Therapy",
      content: "",
      dependancy: [
        "Study Intervention(s) and Concomitant Therapy",
        "Study Intervention(s) Administered",
        "Medical Devices",
        "Preparation/Handling/Storage/Accountability",
        "Measures to Minimize Bias: Randomization and Blinding",
        "Study Intervention Compliance",
        "Dose Modification",
        "Retreatment Criteria",
        "Continued Access to Study Intervention after the End of the Study",
        "Treatment of Overdose",
        "Concomitant Therapy",
        "Rescue Medicine",
      ],
      count: "2",
    },
    {
      id: 7,
      title:
        "Discontinuation of Study Intervention and Participant Discontinuation/Withdrawal",
      content: "",
      dependancy: [
        "Discontinuation of Study Intervention and Participant Discontinuation/Withdrawal",
        "Discontinuation of Study Intervention",
        "Liver Chemistry Stopping Criteria",
        "QTc Stopping Criteria",
        "Temporary Discontinuation",
        "Rechallenge",
        "Participant Discontinuation/Withdrawal from the Study",
        "Lost to Follow up",
      ],
      count: "3",
    },
    {
      id: 8,
      title: "Study Assessments and Procedures",
      content: "",
      dependancy: [
        "Study Assessments and Procedures",
        "[Efficacy and/or Immunogenicity] Assessments",
        "Safety Assessments",
        "Physical Examinations",
        "Vital Signs",
        "Electrocardiograms",
        "Clinical Safety Laboratory Assessments",
        "Pregnancy Testing",
        "Suicidal Ideation and Behavior Risk Monitoring",
        "Adverse Events (AEs), Serious Adverse Events (SAEs), and Other Safety Reporting",
        "Time Period and Frequency for Collecting AE and SAE Information",
        "Method of Detecting AEs and SAEs",
        "Follow-up of AEs and SAEs",
        "Regulatory Reporting Requirements for SAEs",
        "Pregnancy",
        "Cardiovascular and Death Events",
        "Disease-Related Events and/or Disease-Related Outcomes Not Qualifying as AEs or SAEs",
        "Adverse Events of Special Interest",
        "Medical Device Deficiencies",
        "Pharmacokinetics",
        "[Genetics and/or Pharmacogenomics]",
        "Biomarkers",
        "Immunogenicity Assessments",
        "[Health Economics OR Medical Resource Utilization and Health Economics]",
      ],
      count: "2",
    },
    {
      id: 9,
      title: "Statistical Considerations",
      content: "",
      dependancy: [
        "Statistical Considerations",
        "Statistical Hypotheses",
        "Sample Size Determination",
        "Analysis Sets",
        "Statistical Analyses",
        "General Considerations",
        "Primary Endpoint(s)",
        "Secondary Endpoint(s)",
        "Tertiary/Exploratory Endpoint(s)",
        "[Other/safety] Analysis",
        "Other Analysis",
        "Interim Analysis",
      ],
      count: "2",
    },
    {
      id: 10,
      title: "Supporting Documentation and Operational Considerations",
      content: "",
      dependancy: [
        "Supporting Documentation and Operational Considerations",
        "Appendix 1: Regulatory, Ethical, and Study Oversight Considerations",
        "Regulatory and Ethical Considerations",
        "Financial Disclosure",
        "Informed Consent Process",
        "Data Protection",
        "Committees Structure",
        "Dissemination of Clinical Study Data",
        "Data Quality Assurance",
        "Source Documents",
        "Study and Site Start and Closure",
        "Publication Policy",
        "Appendix 2: Clinical Laboratory Tests",
        "Appendix 3: AEs and SAEs: Definitions and Procedures for Recording, Evaluating, Follow-up, and Reporting",
        "Definition of AE",
        "Definition of SAE",
        "Recording and Follow-Up of AE and/or SAE",
        "Reporting of SAEs",
        "Appendix 4: Contraceptive and Barrier Guidance",
        "Definitions",
        "Contraception Guidance",
        "Appendix 5: Genetics",
        "Appendix 6: Liver Safety: Suggested Actions and Follow-up Assessments [and Study Intervention Rechallenge Guidelines]",
        "Appendix 7: AEs, ADEs, SAEs, SADEs, USADEs and Device Deficiencies: Definitions and Procedures for Recording, Evaluating, Follow-up, and Reporting in Medical Device Studies",
        "Definition of Medical Device AE and ADE",
        "Definition of Medical Device SAE, SADE and USADE",
        "Definition of Device Deficiency",
        "Recording and Follow-Up of AE and/or SAE and Device Deficiencies",
        "Reporting of SAEs",
        "Reporting of SADEs",
        "Appendix 8: Country-specific Requirements",
        "Appendix 9: Abbreviations [and Definitions]",
        "Appendix 10: Protocol Amendment History",
      ],
      count: "5",
    },
    {
      id: 11,
      title: "References",
      content: "",
      dependancy: ["References"],
      count: "6",
    },
    {
      id: 12,
      title: "Unmapped",
      content: "",
      dependancy: ["Unmapped"],
      count: "6",
    },
  ],
};

function constructFilterArray(data) {
  // const data = {
  //   sponsors: ["NVT AG", "Hospira"],
  //   indications: ["AIDS", "Cough"],
  //   phases: ["Phase 0", "Phase 1a"],
  //   status: ["Draft", "Final Approved"],
  // };

  let queryArr = [];

  if (data.indications.length > 0) {
    let query = {
      terms: {
        "Indication.keyword": data.indications,
      },
    };
    queryArr.push(query);
  }
  if (data.sponsors.length > 0) {
    let query = {
      terms: {
        "SponsorName.keyword": data.sponsors,
      },
    };
    queryArr.push(query);
  }
  if (data.phases.length > 0) {
    let query = {
      terms: {
        "phase.keyword": data.phases,
      },
    };
    queryArr.push(query);
  }
  if (data.status.length > 0) {
    let query = {
      terms: {
        "DocumentStatus.keyword": data.status,
      },
    };
    queryArr.push(query);
  }
  let final = {
    bool: {
      must: queryArr,
    },
  };
  // console.log(JSON.stringify(queryArr));
  return queryArr;
}
// constructFilterArray();

function constructMustArray(docStatus, key, from, to, toc) {
  const query = [
    {
      query_string: {
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

function getTOCArray(toc) {
  // let toc = ["Protocol Summary", "Introduction"];
  let tocArr = TOC.sectionContent;
  let newTOC = [];
  for (let i = 0; i < toc.length; i++) {
    for (let j = 0; j < tocArr.length; j++) {
      if (toc[i] === tocArr[j].title) {
        // console.log("TOC ARR", tocArr[j].dependancy);
        newTOC = newTOC.concat(tocArr[j].dependancy);
      }
    }
  }

  return newTOC;
}
// getTOCArray();

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
  let dateTypeArr = [];
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
  if (req.query.dateType) {
    dateTypeArr = req.query.dateType.split("_");
  }

  // const sponsorArr = req.query.sponsor.split("_");
  // const indicationArr = req.query.indication.split("_");
  // const phaseArr = req.query.phase.split("_");

  console.log("Sponsor : ", sponsorArr);
  console.log("Indication : ", indicationArr);
  console.log("Phase : ", phaseArr);
  console.log("Document Status : ", docStatus);
  console.log("dateType : ", dateTypeArr);

  const filters = {
    sponsors: sponsorArr,
    indications: indicationArr,
    phases: phaseArr,
    status: docStatus,
  };
  let filterArr = constructFilterArray(filters);
  let mustQuery;
  let tocArray = getTOCArray(toc);
  console.log("TOC ARR Final", tocArray);

  if (from && to) {
    console.log(">>", docStatus);

    if (docStatus.length === 2 && dateTypeArr.length === 2) {
      const rangeQuery4 = {
        range: {
          uploadDate: {
            gte: from + "000000",
            lte: to + "235959",
          },
        },
      };

      filterArr.push(rangeQuery4);
    } else if (docStatus.length === 2 && dateTypeArr[0] === "approvalDate") {
      const rangeQuery3 = {
        range: {
          approval_date: {
            gte: from,
            lte: to,
          },
        },
      };

      filterArr.push(rangeQuery3);
    } else if (docStatus.length === 2 && dateTypeArr[0] === "uploadDate") {
      const rangeQuery4 = {
        range: {
          uploadDate: {
            gte: from + "000000",
            lte: to + "235959",
          },
        },
      };

      filterArr.push(rangeQuery4);
    } else {
      for (let i = 0; i < docStatus.length; i++) {
        if (docStatus[i] === "final" && dateTypeArr.length === 2) {
          const rangeQuery1 = {
            range: {
              uploadDate: {
                gte: from + "000000",
                lte: to + "235959",
              },
            },
          };

          filterArr.push(rangeQuery1);
        }
        if (docStatus[i] === "draft" && dateTypeArr.length === 2) {
          const rangeQuery2 = {
            range: {
              uploadDate: {
                gte: from + "000000",
                lte: to + "235959",
              },
            },
          };

          filterArr.push(rangeQuery2);
        }
        if (
          docStatus[i] === "final" &&
          dateTypeArr.length < 2 &&
          dateTypeArr.length !== 0
        ) {
          if (dateTypeArr[0] === "approvalDate") {
            const rangeQuery3 = {
              range: {
                approval_date: {
                  gte: from,
                  lte: to,
                },
              },
            };

            filterArr.push(rangeQuery3);
          }
          if (dateTypeArr[0] === "uploadDate") {
            const rangeQuery4 = {
              range: {
                uploadDate: {
                  gte: from + "000000",
                  lte: to + "235959",
                },
              },
            };

            filterArr.push(rangeQuery4);
          }
        }
        if (
          docStatus[i] === "draft" &&
          dateTypeArr.length < 2 &&
          dateTypeArr.length !== 0
        ) {
          if (dateTypeArr[0] === "approvalDate") {
            const rangeQuery3 = {
              range: {
                approval_date: {
                  gte: from,
                  lte: to,
                },
              },
            };

            filterArr.push(rangeQuery3);
            // const respBody = {
            //   took: 12,
            //   timed_out: false,
            //   _shards: {
            //     total: 1,
            //     successful: 1,
            //     skipped: 0,
            //     failed: 0,
            //   },
            //   hits: {
            //     total: {
            //       value: 0,
            //       relation: "eq",
            //     },
            //     max_score: null,
            //     hits: [],
            //   },
            // };
            // res.send(respBody);
          }
          if (dateTypeArr[0] === "uploadDate") {
            const rangeQuery4 = {
              range: {
                uploadDate: {
                  gte: from + "000000",
                  lte: to + "235959",
                },
              },
            };

            filterArr.push(rangeQuery4);
          }
        }
      }
    }
    if (docStatus.length === 0 && dateTypeArr.length === 0) {
      const rangeQuery4 = {
        range: {
          uploadDate: {
            gte: from + "000000",
            lte: to + "235959",
          },
        },
      };

      filterArr.push(rangeQuery4);
    }
    if (docStatus.length === 1 && dateTypeArr.length === 0) {
      if (docStatus[0] === "final") {
        const rangeQuery4 = {
          range: {
            approval_date: {
              gte: from,
              lte: to,
            },
          },
        };

        filterArr.push(rangeQuery4);
      } else if (docStatus[0] === "draft") {
        const rangeQuery4 = {
          range: {
            uploadDate: {
              gte: from + "000000",
              lte: to + "235959",
            },
          },
        };

        filterArr.push(rangeQuery4);
      }
    }
    if (docStatus.length === 0 && dateTypeArr.length === 1) {
      if (dateTypeArr[0] === "approvalDate") {
        const rangeQuery4 = {
          range: {
            approval_date: {
              gte: from,
              lte: to,
            },
          },
        };

        filterArr.push(rangeQuery4);
      } else if (dateTypeArr[0] === "uploadDate") {
        const rangeQuery4 = {
          range: {
            uploadDate: {
              gte: from + "000000",
              lte: to + "235959",
            },
          },
        };

        filterArr.push(rangeQuery4);
      }
    }

    if (key.includes("*") || key.includes("?")) {
      mustQuery = [
        {
          query_string: {
            query: key,
            type: "phrase",
            fields: tocArray,
          },
        },
      ];
    } else {
      mustQuery = [
        {
          multi_match: {
            query: key,
            type: "phrase",
            fields: tocArray,
          },
        },
      ];
    }
  } else {
    if (key.includes("*") || key.includes("?")) {
      mustQuery = [
        {
          query_string: {
            query: key,
            type: "phrase",
            fields: tocArray,
          },
        },
      ];
    } else {
      mustQuery = [
        {
          multi_match: {
            query: key,
            type: "phrase",
            fields: tocArray,
          },
        },
      ];
    }
  }
  let final = {
    bool: {
      must: filterArr,
    },
  };

  const FinalQuery = {
    query: {
      bool: {
        must: mustQuery,
        filter: final,
        must_not: {
          term: {
            is_active: 0,
          },
        },
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
      "is_active",
      "SourceFileName",
      "documentPath",
      "ProjectId",
      "VersionNumber",
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

app.use(
  session({
    // It holds the secret key for session
    secret: "Your_Secret_Key",

    // Forces the session to be saved
    // back to the session store
    resave: true,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true,
  })
);

app.get("/health", function (req, res) {
  res.send("F5-UP");
});

app.get("/session", function (req, res) {
  console.log("session", req.session.user);
  res.send(req.session.user);
});

app.get("/refresh", function (req, res) {
  console.log("-----callback------", req.query);
  const getCookies = req.session.cookies;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  axios
    .get(`${baseUrlSSO}/validate_token`, {
      params: {
        access_token: getCookies.access_token,
        refresh_token: getCookies.refresh_token,
      },
      headers: {
        Authorization: authenticateUser(
          process.env.CIMS_USER,
          process.env.CIMS_PWD
        ),
      },
      httpsAgent: agent,
    })
    .then(({ data }) => {
      console.log(data);
      if (data.code === 102) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(false);
    });
});

//------------Revert---------------
app.use(function (req, res, next) {
  console.log('SSO',process.env.SSO_ENABLED);
  if (process.env.SSO_ENABLED === "true") {
    console.log("Cookies", req.cookies);
    const getCookies = req.cookies;
    if (!getCookies.access_token || !getCookies.refresh_token) {
      console.log("No Tokens");
      res.redirect(`${baseUrlSSO}/logout_session`);
    } else if (getCookies.access_token && getCookies.refresh_token) {
      // At request level
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      axios
        .get(`${baseUrlSSO}/validate_token`, {
          params: {
            access_token: getCookies.access_token,
            refresh_token: getCookies.refresh_token,
          },
          headers: {
            Authorization: authenticateUser(
              process.env.CIMS_USER,
              process.env.CIMS_PWD
            ),
          },
          httpsAgent: agent,
        })
        .then(({ data }) => {
          console.log(data);
          switch (data.code) {
            case 101:
              res.redirect(`${baseUrlSSO}${data.redirect_url}`);
              break;
            case 100:
              const details = {
                userId: data.user_details.username,
                username: data.user_details.first_name,
                email: data.user_details.email,
              };
              const decoded = jwt_decode(getCookies.refresh_token);

              console.log(decoded);
              req.session.user = details;
              req.session.expiry = decoded.exp;
              req.session.cookies = getCookies;
              res.cookie("exp", decoded.exp);
              next();
              break;
            // case 102:
            //   res.redirect(
            //     `${baseUrlSSO}${data.redirect_url}?callback=http://ca2spdml06d.quintiles.net:3000/dashboard`
            //   );
            //   break;
            default:
              res.redirect(`${baseUrlSSO}/logout_session`);
          }
        })
        .catch((err) => {
          console.log(err);
          res.redirect(`${baseUrlSSO}/logout_session`);
        });
    } else {
      console.log("Else part");
      res.redirect(`${baseUrlSSO}/logout_session`);
    }
  } else if(process.env.SSO_ENABLED === "false") {
    next();
  }
  
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);
