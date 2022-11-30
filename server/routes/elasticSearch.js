const elasticsearch = require('elasticsearch');
const { ElasticsearchFields } = require('../constants/elasticSearch');
const {
  constructFilterArray,
  getTOCArray,
} = require('../utility/elasticSearchUtility');
const { getENVURL } = require('../utility/EnvURL');

const client = new elasticsearch.Client({
  host: `${getENVURL().baseUrlElastic}`,
  //   log: "trace",
  // apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

module.exports = function (app) {
  app.get('/elastic', (req, res) => {
    const { key } = req.query;
    const from = req.query.dateFrom;
    const to = req.query.dateTo;

    let toc = [];
    let docStatus = [];
    let sponsorArr = [];
    let indicationArr = [];
    let phaseArr = [];
    let dateTypeArr = [];
    if (req.query.toc) {
      toc = req.query.toc.split('_');
    }
    if (req.query.documentStatus) {
      docStatus = req.query.documentStatus.split('_');
    }
    if (req.query.indication) {
      indicationArr = req.query.indication.split('_');
    }
    if (req.query.sponsor) {
      sponsorArr = req.query.sponsor.split('_');
    }
    if (req.query.phase) {
      phaseArr = req.query.phase.split('_');
    }
    if (req.query.dateType) {
      dateTypeArr = req.query.dateType.split('_');
    }

    const filters = {
      sponsors: sponsorArr,
      indications: indicationArr,
      phases: phaseArr,
      status: docStatus,
    };
    const filterArr = constructFilterArray(filters);
    let mustQuery;
    const tocArray = getTOCArray(toc);

    if (from && to) {
      if (docStatus.length === 2 && dateTypeArr.length === 2) {
        const rangeQuery4 = {
          range: {
            uploadDate: {
              gte: `${from}000000`,
              lte: `${to}235959`,
            },
          },
        };

        filterArr.push(rangeQuery4);
      } else if (docStatus.length === 2 && dateTypeArr[0] === 'approvalDate') {
        const rangeQuery3 = {
          range: {
            approval_date: {
              gte: from,
              lte: to,
            },
          },
        };

        filterArr.push(rangeQuery3);
      } else if (docStatus.length === 2 && dateTypeArr[0] === 'uploadDate') {
        const rangeQuery4 = {
          range: {
            uploadDate: {
              gte: `${from}000000`,
              lte: `${to}235959`,
            },
          },
        };

        filterArr.push(rangeQuery4);
      } else {
        for (let i = 0; i < docStatus.length; i++) {
          if (docStatus[i] === 'final' && dateTypeArr.length === 2) {
            const rangeQuery1 = {
              range: {
                uploadDate: {
                  gte: `${from}000000`,
                  lte: `${to}235959`,
                },
              },
            };

            filterArr.push(rangeQuery1);
          }
          if (docStatus[i] === 'draft' && dateTypeArr.length === 2) {
            const rangeQuery2 = {
              range: {
                uploadDate: {
                  gte: `${from}000000`,
                  lte: `${to}235959`,
                },
              },
            };

            filterArr.push(rangeQuery2);
          }
          if (
            docStatus[i] === 'final' &&
            dateTypeArr.length < 2 &&
            dateTypeArr.length !== 0
          ) {
            if (dateTypeArr[0] === 'approvalDate') {
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
            if (dateTypeArr[0] === 'uploadDate') {
              const rangeQuery4 = {
                range: {
                  uploadDate: {
                    gte: `${from}000000`,
                    lte: `${to}235959`,
                  },
                },
              };

              filterArr.push(rangeQuery4);
            }
          }
          if (
            docStatus[i] === 'draft' &&
            dateTypeArr.length < 2 &&
            dateTypeArr.length !== 0
          ) {
            if (dateTypeArr[0] === 'approvalDate') {
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
            if (dateTypeArr[0] === 'uploadDate') {
              const rangeQuery4 = {
                range: {
                  uploadDate: {
                    gte: `${from}000000`,
                    lte: `${to}235959`,
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
              gte: `${from}000000`,
              lte: `${to}235959`,
            },
          },
        };

        filterArr.push(rangeQuery4);
      }
      if (docStatus.length === 1 && dateTypeArr.length === 0) {
        if (docStatus[0] === 'final') {
          const rangeQuery4 = {
            range: {
              approval_date: {
                gte: from,
                lte: to,
              },
            },
          };

          filterArr.push(rangeQuery4);
        } else if (docStatus[0] === 'draft') {
          const rangeQuery4 = {
            range: {
              uploadDate: {
                gte: `${from}000000`,
                lte: `${to}235959`,
              },
            },
          };

          filterArr.push(rangeQuery4);
        }
      }
      if (docStatus.length === 0 && dateTypeArr.length === 1) {
        if (dateTypeArr[0] === 'approvalDate') {
          const rangeQuery4 = {
            range: {
              approval_date: {
                gte: from,
                lte: to,
              },
            },
          };

          filterArr.push(rangeQuery4);
        } else if (dateTypeArr[0] === 'uploadDate') {
          const rangeQuery4 = {
            range: {
              uploadDate: {
                gte: `${from}000000`,
                lte: `${to}235959`,
              },
            },
          };

          filterArr.push(rangeQuery4);
        }
      }

      if (key.includes('*') || key.includes('?')) {
        mustQuery = [
          {
            query_string: {
              query: key,
              type: 'phrase',
              fields: tocArray,
            },
          },
        ];
      } else {
        mustQuery = [
          {
            multi_match: {
              query: key,
              type: 'phrase',
              fields: tocArray,
            },
          },
        ];
      }
    } else if (key.includes('*') || key.includes('?')) {
      mustQuery = [
        {
          query_string: {
            query: key,
            type: 'phrase',
            fields: tocArray,
          },
        },
      ];
    } else {
      mustQuery = [
        {
          multi_match: {
            query: key,
            type: 'phrase',
            fields: tocArray,
          },
        },
      ];
    }
    const final = {
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
      _source: ElasticsearchFields,
    };

    // console.log("FInal Query", JSON.stringify(FinalQuery));
    client
      .search({
        body: FinalQuery,
      })
      .then((resp) => {
        // console.log(resp.took);

        res.send(resp);
      })
      .catch((e) => {
        res.send(e);
      });
  });
};
