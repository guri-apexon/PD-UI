const { TOC } = require("../constants/elasticSearch");

const constructFilterArray = function (data) {
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
  return queryArr;
};

const getTOCArray = function (toc) {
  let tocArr = TOC.sectionContent;
  let newTOC = [];
  for (let i = 0; i < toc.length; i++) {
    for (let j = 0; j < tocArr.length; j++) {
      if (toc[i] === tocArr[j].title) {
        newTOC = newTOC.concat(tocArr[j].dependancy);
      }
    }
  }
  return newTOC;
};

module.exports = {
  constructFilterArray,
  getTOCArray,
};
