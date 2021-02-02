import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./search.scss";

//------------------- Components --------------------

import SearchResultSection from "./SearchResultSection";
import SearchSection from "./SearchSection";

//------------------- Third Party -----------------

import Breadcrumbs from "apollo-react/components/Breadcrumbs";
import _ from "lodash";

//------------------- Redux -----------------
import { useSelector, useDispatch } from "react-redux";
import {
  searchFilter,
  searchResult,
  indications,
  sponsors,
  recent,
  range,
} from "./searchSlice";
import {
  phases,
  documentStatus,
  TOC,
  dateType,
  dateSection,
} from "./Data/constants";
import axios from "axios";

let protArr = [];
const Search = (props) => {
  const resultList = useSelector(searchResult);
  const filterList = useSelector(searchFilter);
  const indicationData = useSelector(indications);
  const sponsorData = useSelector(sponsors);
  const recentDate = useSelector(recent);
  const rangeDate = useSelector(range);
  const [sortValueProp, setSortValue] = useState("1");
  const dispatch = useDispatch();
  const [idPresent, setIdPresent] = useState(false);
  const [dateRangeValue, setDateRangeValue] = useState([null, null]);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState({
    sponsor: [],
    indication: [],
    phase: [],
    documentStatus: [],
    toc: [],
    dateType: [],
    dateSection: [1],
  });
  const [elasticSearchQuery, setElasticSearchQuesry] = useState("");
  const [protocolSelected, setProtocolSelected] = useState([]);
  const [selection, setSelection] = useState(true);
  const [prevProtSelected, setPrevProtSelected] = useState("");
  // let arr = [];
  useEffect(() => {
    // axios.get('http://ca2spdml01q:8000/api/indications/?skip=0')
    dispatch({ type: "GET_SPONSORS" });
    dispatch({ type: "GET_INDICATIONS" });
  }, []);
  useEffect(() => {
    let params = props.location.search;
    // const parsed = queryString.parse(params);
    let parsed = {};
    // if (indicationData.sectionContent.length === 0) {
    // dispatch({ type: "GET_INDICATIONS" });
    // }
    // if (
    //   sponsorData.sectionContent.length === 0 &&
    //   indicationData.sectionContent.length === 0
    // ) {
    //   dispatch({ type: "GET_SPONSORS" });
    //   dispatch({ type: "GET_INDICATIONS" });
    // }
    if (
      params &&
      sponsorData.sectionContent.length > 0 &&
      indicationData.sectionContent.length > 0
    ) {
      parsed = JSON.parse(
        '{"' + params.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === "" ? value : decodeURIComponent(value);
        }
      );
      let elasticSearchQuery = "key=";
      let tempQuery = _.cloneDeep(searchQuery);
      if ("?key" in parsed) {
        setIdPresent(true);
        setSearchInput(parsed[`?key`]);
        elasticSearchQuery += `${parsed[`?key`]}`;
      }
      if ("toc" in parsed && TOC.sectionContent.length > 0) {
        let tempElasticQuery = TOC.sectionContent.filter((item) =>
          parsed.toc.split("+").includes(item.title)
        );
        tempQuery.toc =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        elasticSearchQuery += `&toc=${tempElasticQuery
          .map((item) => item.title)
          .join("_")}`;
      }
      if ("sponsor" in parsed && sponsorData.sectionContent.length > 0) {
        // debugger;
        let tempElasticQuery = sponsorData.sectionContent.filter((item) =>
          parsed.sponsor.split("+").includes(item.title)
        );
        tempQuery.sponsor =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        elasticSearchQuery += `&sponsor=${tempElasticQuery
          .map((item) => item.title)
          .join("_")}`;
        // debugger;
      }
      if ("indication" in parsed && indicationData.sectionContent.length > 0) {
        let tempElasticQuery = indicationData.sectionContent.filter((item) =>
          parsed.indication.split("+").includes(item.title)
        );
        tempQuery.indication =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        elasticSearchQuery += `&indication=${tempElasticQuery
          .map((item) => item.title)
          .join("_")}`;
      }
      if ("phase" in parsed) {
        // debugger;
        let tempElasticQuery = phases.sectionContent.filter((item) =>
          parsed.phase.split("+").includes(item.title)
        );
        tempQuery.phase =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        elasticSearchQuery += `&phase=${tempElasticQuery
          .map((item) => item.title)
          .join("_")}`;
      }
      if ("documentStatus" in parsed) {
        // debugger;
        let tempElasticQuery = documentStatus.sectionContent.filter((item) =>
          parsed.documentStatus.split("+").includes(item.value)
        );
        tempQuery.documentStatus =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        elasticSearchQuery += `&documentStatus=${tempElasticQuery
          .map((item) => item.value)
          .join("_")
          .trim()}`;
        // debugger;
      }
      if ("dateFrom" in parsed && "dateTo" in parsed) {
        const dateQuery = `&dateFrom=${parsed[`dateFrom`]}&dateTo=${
          parsed[`dateTo`]
        }`;
        // setSearchInput(dateQuery);
        elasticSearchQuery += `${dateQuery}`;
        // resultQuery+=dateQuery;
      }
      if ("dateType" in parsed) {
        // debugger;
        let tempElasticQuery = dateType.sectionContent.filter((item) =>
          parsed.dateType.split("+").includes(item.value)
        );
        tempQuery.dateType =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        elasticSearchQuery += `&dateType=${tempElasticQuery
          .map((item) => item.value)
          .join("_")
          .trim()}`;
        // debugger;
      }
      if ("dateSection" in parsed) {
        // debugger;
        let tempElasticQuery = dateSection.sectionContent.filter((item) =>
          parsed.dateSection.split("+").includes(item.value)
        );
        tempQuery.dateSection =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        elasticSearchQuery += `&dateSection=${tempElasticQuery
          .map((item) => item.value)
          .join("_")
          .trim()}`;
        // debugger;
      }

      setSearchQuery(tempQuery);
      // debugger;
      setElasticSearchQuesry(elasticSearchQuery);
      const parsed1 = queryString.parse(elasticSearchQuery);
      dispatch({ type: "GET_SEARCH_RESULT", payload: elasticSearchQuery });
    } else {
      dispatch({ type: "GET_SEARCH_RESULT", payload: "" });
    }

    // dispatch({ type: "GET_SEARCH_FILTER", payload: parsed.searchKey });
    // dispatch({ type: "GET_SEARCH_RESULT", payload: parsed.searchKey });
    // let tempQuery= _.cloneDeep(searchQuery);
    // tempQuery.sponsor=[1,2,3,4];
    // setSearchQuery(tempQuery);
    // if ("?key" in parsed) {
    //   setIdPresent(true);
    //   setSearchInput(parsed.key);
    //   // dispatch({ type: "GET_SEARCH_FILTER", payload: parsed.key });

    //   dispatch({ type: "GET_SEARCH_RESULT", payload: parsed.key });
    // } else {
    //   dispatch({ type: "GET_SEARCH_RESULT", payload: "" });
    //   // dispatch({ type: "GET_SEARCH_FILTER", payload: parsed.key });
    // }
  }, [dispatch, sponsorData, indicationData]);
  const handleClick = (e) => {
    e.preventdefault();
  };
  // useEffect(() => {
  //   if (searchInput.length > 0) {
  //     setIdPresent(true);
  //     let params = props.location.search;
  //     const parsed = queryString.parse(params);

  //     // dispatch({ type: "GET_SEARCH_FILTER", payload: searchInput });
  //     // dispatch({ type: "GET_SEARCH_RESULT", payload: searchInput });
  //   }
  // }, [searchInput]);

  const saveRecentSearch = (input) => {
    dispatch({
      type: "POST_RECENT_SEARCH_DASHBOARD",
      payload: input,
    });
  };

  const getSearchInput = (input) => {
    // debugger
    setSortValue("1");
    let inp = input ? input : searchInput;
    let resultQuery = `key=${inp}`;
    for (let [key, value] of Object.entries(searchQuery)) {
      if (value.length > 0) resultQuery += contructQueryFromArray(key, value);
    }
    let parsed = JSON.parse(
      '{"' + resultQuery.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
      }
    );
    // debugger;
    let elasticSearchQuery = "key=";

    if ("key" in parsed) {
      setSearchInput(parsed[`key`]);
      elasticSearchQuery += `${parsed[`key`]}`;
    }
    if ("toc" in parsed && TOC.sectionContent.length > 0) {
      let tempElasticQuery = TOC.sectionContent.filter((item) =>
        parsed.toc.split("+").includes(item.title)
      );
      elasticSearchQuery += `&toc=${tempElasticQuery
        .map((item) => item.title)
        .join("_")}`;
    }
    if ("sponsor" in parsed && sponsorData.sectionContent.length > 0) {
      let tempElasticQuery = sponsorData.sectionContent.filter((item) =>
        parsed.sponsor.split("+").includes(item.title)
      );
      elasticSearchQuery += `&sponsor=${tempElasticQuery
        .map((item) => item.title)
        .join("_")}`;
    }
    if ("indication" in parsed && sponsorData.sectionContent.length > 0) {
      let tempElasticQuery = indicationData.sectionContent.filter((item) =>
        parsed.indication.split("+").includes(item.title)
      );
      elasticSearchQuery += `&indication=${tempElasticQuery
        .map((item) => item.title)
        .join("_")}`;
    }
    if ("phase" in parsed && phases.sectionContent.length > 0) {
      let tempElasticQuery = phases.sectionContent.filter((item) =>
        parsed.phase.split("+").includes(item.title)
      );
      elasticSearchQuery += `&phase=${tempElasticQuery
        .map((item) => item.title)
        .join("_")}`;
    }
    if ("documentStatus" in parsed) {
      let tempElasticQuery = documentStatus.sectionContent.filter((item) =>
        parsed.documentStatus.split("+").includes(item.value)
      );
      elasticSearchQuery += `&documentStatus=${tempElasticQuery
        .map((item) => item.value)
        .join("_")
        .trim()}`;
    }
    if ("dateType" in parsed) {
      let tempElasticQuery = dateType.sectionContent.filter((item) =>
        parsed.dateType.split("+").includes(item.value)
      );
      elasticSearchQuery += `&dateType=${tempElasticQuery
        .map((item) => item.value)
        .join("_")
        .trim()}`;
    }
    if ("dateSection" in parsed) {
      // debugger;
      let tempElasticQuery = dateSection.sectionContent.filter((item) =>
        parsed.dateSection.split("+").includes(item.value)
      );
      elasticSearchQuery += `&dateSection=${tempElasticQuery
        .map((item) => item.value)
        .join("_")
        .trim()}`;
    }

    setIdPresent(true);
    setSearchInput(inp);
    if (rangeDate.from && rangeDate.to) {
      const dateQuery = `&dateFrom=${rangeDate.from}&dateTo=${rangeDate.to}`;
      // setSearchInput(dateQuery);
      elasticSearchQuery += `${dateQuery}`;
      resultQuery += dateQuery;
    } else if (recentDate.from) {
      // setSearchInput(parsed[`key`]);
      const dateQuery = `&dateFrom=${recentDate.from}&dateTo=${recentDate.to}`;
      // setSearchInput(dateQuery);
      elasticSearchQuery += `${dateQuery}`;
      resultQuery += dateQuery;
      // elasticSearchQuery+=` ${parsed[`key`]}`;
    }
    // dispatch({ type: "GET_SEARCH_FILTER", payload: input });
    setElasticSearchQuesry(elasticSearchQuery);
    dispatch({ type: "GET_SEARCH_RESULT", payload: elasticSearchQuery });
    props.history.replace({ pathname: "/search", search: `?${resultQuery}` });
    // debugger
  };
  const hancleClearAll = (inputPresent, input) => {
    if (inputPresent) {
      setSearchQuery({
        sponsor: [],
        indication: [],
        phase: [],
        documentStatus: [],
        toc: [],
        dateType: [],
        dateSection: [1],
      });
      // let ele = document.getElementById("range-date-id");
      // clearInputFields("range-date-id");
      setDateRangeValue([null, null])
      dispatch({ type: "GET_SEARCH_RESULT", payload: `key=${input}` });
      props.history.push(`/search?key=${input}`);
    } else {
      setSearchQuery({
        sponsor: [],
        indication: [],
        phase: [],
        documentStatus: [],
        toc: [],
        dateType: [],
        dateSection: [1],
      });
      setDateRangeValue([null, null])
      // clearInputFields("range-date-id");
      dispatch({ type: "GET_SEARCH_RESULT", payload: "" });
      props.history.push(`/search`);
    }
  };
  const contructQueryFromArray = (key, value) => {
    switch (key) {
      case "toc": {
        let str = "&toc=";
        let extractValues = TOC.sectionContent.filter((item) =>
          value.includes(item.id)
        );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.title}+`;
            return true;
          });
          let trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case "sponsor": {
        let str = "&sponsor=";
        let extractValues =
          sponsorData.sectionContent &&
          sponsorData.sectionContent.filter((item) => value.includes(item.id));
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.title}+`;
            return true;
          });
          let trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case "indication": {
        let str = "&indication=";
        let extractValues =
          indicationData.sectionContent &&
          indicationData.sectionContent.filter((item) =>
            value.includes(item.id)
          );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.title}+`;
            return true;
          });
          let trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case "phase": {
        let str = "&phase=";
        let extractValues = phases.sectionContent.filter((item) =>
          value.includes(item.id)
        );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.title}+`;
            return true;
          });
          let trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case "documentStatus": {
        let str = "&documentStatus=";
        let extractValues = documentStatus.sectionContent.filter((item) =>
          value.includes(item.id)
        );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.value}+`;
            return true;
          });
          let trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case "dateType": {
        let str = "&dateType=";
        let extractValues = dateType.sectionContent.filter((item) =>
          value.includes(item.id)
        );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.value}+`;
            return true;
          });
          let trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case "dateSection": {
        let str = "&dateSection=";
        let extractValues = dateSection.sectionContent.filter((item) =>
          value.includes(item.id)
        );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.value}+`;
            return true;
          });
          let trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      default:
        return "";
    }
  };
  const deleteSearchInput = () => {
    setSearchInput("");
    setIdPresent(false);
    setSearchQuery({
      sponsor: [],
      indication: [],
      phase: [],
      documentStatus: [],
      toc: [],
      dateType: [],
    });
    dispatch({ type: "GET_SEARCH_RESULT", payload: "" });
    props.history.push(`/search`);
  };

  const onSearchChange = () => {
    // console.log("onSearchChange :", onSearchChange);
  };
  const onSortChange = (data, value) => {
    if (value === "1") {
      setSortValue(value);
      dispatch({ type: "GET_SEARCH_RESULT", payload: elasticSearchQuery });
    } else {
      let newList = _.cloneDeep(resultList);
      setSortValue(value);
      newList.data &&
        newList.data.sort((a, b) => {
          if (data && data.label === "Approval Date") {
            // let first = a[data.value] ? new Date(a[data.value]) : "";
            // let second = b[data.value] ? new Date(b[data.value]) : "";
            let first = a[data.value] ? a[data.value] : "";
            let second = b[data.value] ? b[data.value] : "";
            return second - first;
          } else {
            let first = a[data.value] ? a[data.value] : "";
            let second = b[data.value] ? b[data.value] : "";
            return second - first;
          }
        });
      dispatch({ type: "UPDATE_SEARCH_RESULT", payload: newList });
    }
  };

  const onSearchQuery = (list, identifier) => {
    let tempQuery = _.cloneDeep(searchQuery);
    tempQuery[identifier] = list;
    setSearchQuery(tempQuery);
    // debugger;
  };

  const compareTwoProtocol = (data, protocol) => {
    // debugger;
    // if (protArr.length > 0) {
    if (prevProtSelected === "") {
      setPrevProtSelected(protocol);
      const index = protArr.indexOf(data);
      if (index > -1) {
        protArr.splice(index, 1);
      } else {
        if (protArr.length < 2) {
          // debugger
          protArr.push(data);
          setProtocolSelected(protArr);
          // oldArray => [...oldArray, newElement]
        } else {
          setSelection(false);
          alert("comparison is available only for two protocols.");
        }
      }
    } else {
      if (prevProtSelected === protocol) {
        const index = protArr.indexOf(data);
        if (index > -1) {
          protArr.splice(index, 1);
        } else {
          if (protArr.length < 2) {
            // debugger
            protArr.push(data);
            setProtocolSelected(protArr);
            // oldArray => [...oldArray, newElement]
          } else {
            setSelection(false);
            alert("comparison is available only for two protocols.");
          }
        }
      } else {
        alert("Protocol Selected is not from the same study.");
      }
    }

    // }
  };
  const compareProtocol = () => {
    if (protocolSelected.length === 2) {
      props.history.push(
        `/protocols?protocolId=${protocolSelected[0]}&protocolId2=${protocolSelected[1]}&value=2`
      );
      protArr = [];
      setProtocolSelected([]);
    } else if (protocolSelected.length < 2) {
      alert("Please select at least two protocol versions to compare");
    }
  };
  const saveSearch = () => {
    const parsed = queryString.parse(elasticSearchQuery);
    if (parsed) {
      dispatch({ type: "SAVE_SEARCH_SAGA", payload: parsed.key });
    }
  };
  return (
    <div className="search">
      <Breadcrumbs
        items={[
          { href: "/dashboard", onClick: (e) => handleClick(e) },
          {
            href: "/search",
            title: "Search",
            onClick: handleClick,
          },
          {
            title: "New Search",
          },
        ]}
        style={{ paddingInlineStart: 0, marginBottom: 0 }}
      />
      <div className="marginLeft10">
        <div>
          <SearchSection
            getSearchInput={getSearchInput}
            history={props.history}
            idPresent={idPresent}
            compareProtocol={compareProtocol}
            saveSearch={saveSearch}
            saveRecentSearch={saveRecentSearch}
          />
        </div>
        <div>
          <SearchResultSection
            filterList={filterList.data}
            resultList={resultList}
            sponsorData={sponsorData}
            indicationData={indicationData}
            searchInput={searchInput}
            deleteSearchInput={deleteSearchInput}
            onSearchChange={onSearchChange}
            onSortChange={onSortChange}
            onSearchQuery={onSearchQuery}
            searchQuery={searchQuery}
            hancleClearAll={hancleClearAll}
            history={props.history}
            compareTwoProtocol={compareTwoProtocol}
            selection={selection}
            sortValueProp={sortValueProp}
            dateRangeValue={dateRangeValue}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
