/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./search.scss";

//------------------- Components --------------------

import SearchResultSection from "./SearchResultSection";
import SearchSection from "./SearchSection";
import { POST_OBJECT } from "../../../AppConstant/AppConstant";

//------------------- Third Party -----------------

import Breadcrumbs from "apollo-react/components/Breadcrumbs";
import cloneDeep from "lodash/cloneDeep";
import { toast } from "react-toastify";

//------------------- Redux -----------------
import { useSelector, useDispatch } from "react-redux";
import {
  searchFilter,
  searchResult,
  indications,
  sponsors,
  recent,
  range,
  totalSearchResult,
  phases,
} from "./searchSlice";
import {
  // phases,
  documentStatus,
  TOC,
  dateType,
  dateSection,
  qcStatus,
} from "./Data/constants";
import Loader from "apollo-react/components/Loader";
import { formatESDate, convertDatesFormat } from "../../../utils/utilFunction";

const Search = (props) => {
  const resultList = useSelector(searchResult);
  const totalSearchResults = useSelector(totalSearchResult);
  const filterList = useSelector(searchFilter);
  const indicationData = useSelector(indications);
  const sponsorData = useSelector(sponsors);
  const phaseData = useSelector(phases);
  const recentDate = useSelector(recent);
  const rangeDate = useSelector(range);
  const [sortValueProp, setSortValue] = useState("1");
  const dispatch = useDispatch();
  const [idPresent, setIdPresent] = useState(false);
  const [page, setPage] = React.useState(0);
  const [dateRangeValue, setDateRangeValue] = useState([null, null]);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState({
    sponsor: [],
    indication: [],
    phase: [],
    documentStatus: [],
    qcStatus: [],
    toc: [],
    dateType: [1],
    dateSection: [1],
  });
  const [postQueryObj, setPostQueryObj] = useState(POST_OBJECT);
  const [clearAll, setClearAll] = useState(false);
  // const [elasticSearchQuery, setElasticSearchQuesry] = useState("");
  const [protocolSelected, setProtocolSelected] = useState([]);
  const [prevProtSelected, setPrevProtSelected] = useState("");
  // let arr = [];
  useEffect(() => {
    // axios.get('http://ca2spdml01q:8000/api/indications/?skip=0')
    dispatch({ type: "GET_SPONSORS" });
    dispatch({ type: "GET_INDICATIONS" });
    dispatch({ type: "GET_PHASES", payload: phaseData });
    return () => {
      dispatch({ type: "GET_SEARCH_RESULT", payload: "" });
    };
  }, []);
  useEffect(() => {
    let params = props.location.search;
    // const parsed = queryString.parse(params);
    let parsed = {};
    let postObj = cloneDeep(POST_OBJECT);
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
    /* istanbul ignore else */
    if (params) {
      parsed = JSON.parse(
        '{"' + params.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === "" ? value : decodeURIComponent(value);
        }
      );
      let tempQuery = cloneDeep(searchQuery);
      /* istanbul ignore else */
      if ("?key" in parsed) {
        setIdPresent(true);
        setSearchInput(parsed[`?key`]);
        postObj.key = parsed[`?key`];
      }
      /* istanbul ignore else */
      if ("toc" in parsed && TOC.sectionContent.length > 0) {
        let tempElasticQuery = TOC.sectionContent.filter((item) =>
          parsed.toc.split("+").includes(item.title)
        );
        tempQuery.toc =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        postObj.toc = parsed.toc.split("+");
      }
      /* istanbul ignore else */
      if ("sponsor" in parsed) {
        postObj.sponsor = parsed.sponsor.split("+");
      }
      /* istanbul ignore else */
      if ("indication" in parsed) {
        postObj.indication = parsed.indication.split("+");
      }
      /* istanbul ignore else */
      if ("phase" in parsed) {
        let tempElasticQuery = phaseData.sectionContent.filter((item) =>
          parsed.phase.split("+").includes(item.title)
        );
        tempQuery.phase =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        postObj.phase = parsed.phase.split("+");
      }
      /* istanbul ignore else */
      if ("documentStatus" in parsed) {
        let tempElasticQuery = documentStatus.sectionContent.filter((item) =>
          parsed.documentStatus.split("+").includes(item.value)
        );
        tempQuery.documentStatus =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        postObj.documentStatus = parsed.documentStatus.split("+");
      }
      if ("qcStatus" in parsed) {
        let tempElasticQuery = qcStatus.sectionContent.filter((item) =>
          parsed.qcStatus.split("+").includes(item.value)
        );
        tempQuery.qcStatus =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        postObj.qcStatus = parsed.qcStatus.split("+");
      }
      /* istanbul ignore else */
      if ("dateFrom" in parsed && "dateTo" in parsed) {
        postObj.dateFrom = parsed[`dateFrom`];
        postObj.dateTo = parsed[`dateTo`];
        // resultQuery+=dateQuery;
      }
      /* istanbul ignore else */
      if ("dateType" in parsed) {
        let tempElasticQuery = dateType.sectionContent.filter((item) =>
          parsed.dateType.split("+").includes(item.value)
        );
        tempQuery.dateType =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        postObj.dateType = parsed[`dateType`];
      }
      /* istanbul ignore else */
      if ("dateSection" in parsed) {
        let tempElasticQuery = dateSection.sectionContent.filter((item) =>
          parsed.dateSection.split("+").includes(item.value)
        );
        tempQuery.dateSection =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        postObj.dateSection = parsed[`dateSection`];
      }
      setPostQueryObj(postObj);
      setSearchQuery(tempQuery);
      dispatch({ type: "GET_SEARCH_RESULT", payload: postObj });
    } else {
      dispatch({ type: "GET_SEARCH_RESULT", payload: "" });
    }

    // dispatch({ type: "GET_SEARCH_FILTER", payload: parsed.searchKey });
    // dispatch({ type: "GET_SEARCH_RESULT", payload: parsed.searchKey });
    // let tempQuery= cloneDeep(searchQuery);
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
  }, [dispatch]);

  //newcode
  // This useEffect will get called when indication and sponsor API returns response
  useEffect(() => {
    let params = props.location.search;
    console.log("params :", params, sponsorData, indicationData);
    let parsed = {};
    /* istanbul ignore else */
    if (
      params &&
      sponsorData.sectionContent.length > 0 &&
      indicationData.sectionContent.length > 0 &&
      phaseData.sectionContent.length > 0
    ) {
      parsed = JSON.parse(
        '{"' + params.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === "" ? value : decodeURIComponent(value);
        }
      );
      let tempQuery = cloneDeep(searchQuery);
      /* istanbul ignore else */
      if ("sponsor" in parsed && sponsorData.sectionContent.length > 0) {
        let tempElasticQuery = sponsorData.sectionContent.filter((item) =>
          parsed.sponsor.split("+").includes(item.title)
        );
        tempQuery.sponsor =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
      }
      /* istanbul ignore else */
      if ("indication" in parsed && indicationData.sectionContent.length > 0) {
        let tempElasticQuery = indicationData.sectionContent.filter((item) =>
          parsed.indication.split("+").includes(item.title)
        );
        tempQuery.indication =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
      }
      if ("phase" in parsed && phaseData.sectionContent.length > 0) {
        let tempElasticQuery = phaseData.sectionContent.filter((item) =>
          parsed.phase.split("+").includes(item.title)
        );
        tempQuery.phase =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
      }
      setSearchQuery(tempQuery);
    }
  }, [sponsorData, indicationData, phaseData]);
  /* istanbul ignore next */
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
  const handleKeywordSearch = (input) => {
    if (input) {
      let postObj = cloneDeep(POST_OBJECT);
      postObj.key = input;
      setSortValue("1");
      setProtocolSelected([]);
      setPrevProtSelected("");
      setIdPresent(true);
      setPage(0);
      setSearchQuery({
        sponsor: [],
        indication: [],
        phase: [],
        documentStatus: [],
        qcStatus: [],
        toc: [],
        dateType: [1],
        dateSection: [1],
      });
      // setDateRangeValue([null, null]);
      // clearInputFields("range-date-id");
      const range = {
        from: null,
        to: null,
      };
      // setElasticSearchQuesry("");
      dispatch({ type: "FILTER_BY_DATE_RANGE_SAGA", payload: range });
      setDateRangeValue([null, null]);
      setSearchInput(input);
      setPostQueryObj(postObj);

      dispatch({ type: "GET_SEARCH_RESULT", payload: postObj });
      if (sponsorData.sectionContent.length === 0) {
        dispatch({ type: "GET_SPONSORS" });
      }
      if (indicationData.sectionContent.length === 0) {
        dispatch({ type: "GET_INDICATIONS" });
      }
      clearSearchText(true);
      props.history.replace({
        pathname: "/search",
        search: `?key=${input}`,
      });
    } else {
      toast.warn("Please enter something to search.");
    }
  };

  const getSearchInput = (input) => {
    let postObj = cloneDeep(POST_OBJECT);
    let validFilters = false;
    setSortValue("1");
    setProtocolSelected([]);
    setPrevProtSelected("");
    setPage(0);
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
    /* istanbul ignore else */
    if ("key" in parsed) {
      setSearchInput(parsed[`key`]);
      postObj.key = parsed[`key`];
    }
    /* istanbul ignore else */
    if ("toc" in parsed && TOC.sectionContent.length > 0) {
      postObj.toc = parsed.toc.split("+");
    }
    /* istanbul ignore else */
    if ("sponsor" in parsed && sponsorData.sectionContent.length > 0) {
      postObj.sponsor = parsed.sponsor.split("+");
    }
    /* istanbul ignore else */
    if ("indication" in parsed && sponsorData.sectionContent.length > 0) {
      postObj.indication = parsed.indication.split("+");
    }
    /* istanbul ignore else */
    if ("phase" in parsed && phaseData.sectionContent.length > 0) {
      postObj.phase = parsed.phase.split("+");
    }
    /* istanbul ignore else */
    if ("documentStatus" in parsed) {
      postObj.documentStatus = parsed.documentStatus.split("+");
    }
    if ("qcStatus" in parsed) {
      postObj.qcStatus = parsed.qcStatus.split("+");
    }
    /* istanbul ignore else */
    if ("dateType" in parsed) {
      postObj.dateType = parsed[`dateType`];
    }
    /* istanbul ignore else */
    if ("dateSection" in parsed) {
      postObj.dateSection = parsed[`dateSection`];
    }
    function isValidDate(d) {
      return d instanceof Date && !isNaN(d);
    }
    setIdPresent(true);
    setSearchInput(inp);
    /* istanbul ignore next else*/
    let filterChanged = false;
    if (rangeDate.from && rangeDate.to) {
      let date11 = formatESDate(rangeDate.from);
      let date22 = formatESDate(rangeDate.to);
      let d1 = new Date(date11);
      let d2 = new Date(date22);
      // let date1 = d1.format("MM-DD-YYYY");
      // let date2 = d2.format("MM-DD-YYYY");
      const date1 = convertDatesFormat("mmddyyyy", "-", date11);
      const date2 = convertDatesFormat("mmddyyyy", "-", date22);
      /* istanbul ignore else */
      if (isValidDate(d1) && isValidDate(d2)) {
        if (isFutureDate(date1) || isFutureDate(date2)) {
          alert(
            "Future date is not allowed. Please use date range picker to select valid date."
          );
        } else {
          const dateQuery = `&dateFrom=${rangeDate.from}&dateTo=${rangeDate.to}`;
          // setSearchInput(dateQuery);
          postObj.dateFrom = rangeDate.from;
          postObj.dateTo = rangeDate.to;
          resultQuery += dateQuery;

          let postObj1 = cloneDeep(postObj);
          let postQueryObj1 = cloneDeep(postQueryObj);
          delete postObj1.key;
          delete postQueryObj1.key;
          filterChanged = compareObjs(postObj1, postQueryObj1);
          validFilters = checkValidity(postObj);
          if (filterChanged && validFilters) {
            dispatch({ type: "GET_SEARCH_RESULT", payload: postObj });
            props.history.replace({
              pathname: "/search",
              search: `?${resultQuery}`,
            });
          } else if (filterChanged && !validFilters) {
            dispatch({ type: "GET_SEARCH_RESULT", payload: postObj });
            props.history.replace({
              pathname: "/search",
              search: `?${resultQuery}`,
            });
          } else if (!filterChanged && validFilters) {
            toast.warn("Please Edit/Modify Your Filters");
          } else {
            toast.warn("Please Select Filters");
          }
        }
      } else {
        alert(
          "Date is not valid. Please use date range picker to select valid date."
        );
      }
    } else if (recentDate.from) {
      const dateQuery = `&dateFrom=${recentDate.from}&dateTo=${recentDate.to}`;
      postObj.dateFrom = recentDate.from;
      postObj.dateTo = recentDate.to;
      resultQuery += dateQuery;

      let postObj1 = cloneDeep(postObj);
      let postQueryObj1 = cloneDeep(postQueryObj);
      delete postObj1.key;
      delete postQueryObj1.key;
      filterChanged = compareObjs(postObj1, postQueryObj1);
      validFilters = checkValidity(postObj);
      if (filterChanged && validFilters) {
        dispatch({ type: "GET_SEARCH_RESULT", payload: postObj });
        props.history.replace({
          pathname: "/search",
          search: `?${resultQuery}`,
        });
      } else if (filterChanged && !validFilters) {
        dispatch({ type: "GET_SEARCH_RESULT", payload: postObj });
        props.history.replace({
          pathname: "/search",
          search: `?${resultQuery}`,
        });
      } else if (!filterChanged && validFilters) {
        toast.warn("Please Edit/Modify Your Filters");
      } else {
        toast.warn("Please Select Filters");
      }
    } else {
      let postObj1 = cloneDeep(postObj);
      let postQueryObj1 = cloneDeep(postQueryObj);
      delete postObj1.key;
      delete postQueryObj1.key;
      filterChanged = compareObjs(postObj1, postQueryObj1);
      validFilters = checkValidity(postObj);
      // debugger; // eslint-disable-line no-debugger
      if (filterChanged && validFilters) {
        dispatch({ type: "GET_SEARCH_RESULT", payload: postObj });
        props.history.replace({
          pathname: "/search",
          search: `?${resultQuery}`,
        });
      } else if (filterChanged && !validFilters) {
        if (postObj.key) {
          dispatch({ type: "GET_SEARCH_RESULT", payload: postObj });
          props.history.replace({
            pathname: "/search",
            search: `?${resultQuery}`,
          });
        } else {
          dispatch({ type: "GET_SEARCH_RESULT" });
          props.history.replace({
            pathname: "/search",
          });
        }
      } else if (!filterChanged && validFilters) {
        toast.warn("Please Edit/Modify Your Filters");
      } else {
        toast.warn("Please Select Filters");
      }
    }

    setPostQueryObj(postObj);
  };
  const compareObjs = (a, b) => {
    if (JSON.stringify(a) === JSON.stringify(b)) {
      return false;
    }
    return true;
  };

  const checkValidity = (postObj) => {
    if (
      postObj &&
      (postObj.toc.length > 0 ||
        postObj.indication.length > 0 ||
        postObj.phase.length > 0 ||
        postObj.sponsor.length > 0 ||
        postObj.documentStatus.length > 0 ||
        postObj.qcStatus.length > 0 ||
        postObj.dateFrom.length > 0 ||
        postObj.dateTo.length > 0)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const isFutureDate = (value) => {
    let d_now = new Date();
    let d_inp = new Date(value);
    return d_now.getTime() <= d_inp.getTime();
  };
  const clearSearchText = (value) => {
    setClearAll(value);
  };
  const hancleClearAll = (inputPresent, input) => {
    // setClearAll(true);
    clearSearchText(true);
    let postObj = cloneDeep(POST_OBJECT);
    setProtocolSelected([]);
    setPrevProtSelected("");
    if (inputPresent) {
      setSearchQuery({
        sponsor: [],
        indication: [],
        phase: [],
        documentStatus: [],
        toc: [],
        dateType: [1],
        qcStatus: [],
        dateSection: [1],
      });
      postObj.key = input;
      // let ele = document.getElementById("range-date-id");
      // clearInputFields("range-date-id");
      // setDateRangeValue([null, null]);
      // setClearAll(false)
      const range = {
        from: null,
        to: null,
      };
      dispatch({ type: "FILTER_BY_DATE_RANGE_SAGA", payload: range });
      dispatch({ type: "GET_SEARCH_RESULT", payload: postObj });
      setDateRangeValue([null, null]);
      props.history.push(`/search?key=${input}`);
    } else {
      dispatch({ type: "GET_PHASES", payload: phaseData });
      setSearchQuery({
        sponsor: [],
        indication: [],
        phase: [],
        documentStatus: [],
        qcStatus: [],
        toc: [],
        dateType: [1],
        dateSection: [1],
      });
      // setDateRangeValue([null, null]);
      // clearInputFields("range-date-id");
      const range = {
        from: null,
        to: null,
      };
      dispatch({ type: "FILTER_BY_DATE_RANGE_SAGA", payload: range });
      dispatch({ type: "GET_SEARCH_RESULT", payload: "" });
      setDateRangeValue([null, null]);
      // setClearAll(false)
      props.history.push(`/search`);
    }
    setPostQueryObj(postObj);
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
        let extractValues = phaseData.sectionContent.filter((item) =>
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
      case "qcStatus": {
        let str = "&qcStatus=";
        let extractValues = qcStatus.sectionContent.filter((item) =>
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
    clearSearchText(true);
    let postObj = cloneDeep(POST_OBJECT);
    const phaseObj = {
      sectionContent: [],
    };
    dispatch({ type: "GET_PHASES", payload: phaseObj });
    setSearchInput("");
    setClearAll(true);
    setIdPresent(false);
    setSearchQuery({
      sponsor: [],
      indication: [],
      phase: [],
      documentStatus: [],
      qcStatus: [],
      toc: [],
      dateType: [1],
      dateSection: [1],
    });
    setPostQueryObj(postObj);
    const range = {
      from: null,
      to: null,
    };
    dispatch({ type: "FILTER_BY_DATE_RANGE_SAGA", payload: range });
    dispatch({ type: "GET_SEARCH_RESULT", payload: "" });
    setDateRangeValue([null, null]);
    props.history.push(`/search`);
  };

  const onSearchChange = () => {
    // console.log("onSearchChange :", onSearchChange);
  };
  const onSortChange = (data, value) => {
    setPage(0);
    let postObj = cloneDeep(postQueryObj);
    postObj.sortField = data.value;
    setSortValue(value);
    dispatch({ type: "GET_SEARCH_RESULT", payload: postObj });
    setPostQueryObj(postObj);
  };

  const onSearchQuery = (list, identifier) => {
    setClearAll(false);
    let tempQuery = cloneDeep(searchQuery);
    tempQuery[identifier] = list;
    setSearchQuery(tempQuery);
  };

  const compareTwoProtocol = (data, protocol) => {
    if (prevProtSelected === "") {
      setPrevProtSelected(protocol);
      setProtocolSelected([data]);
    } else {
      if (prevProtSelected.toLowerCase() === protocol.toLowerCase()) {
        if (protocolSelected.length === 1) {
          const index = protocolSelected.indexOf(data);
          if (index > -1) {
            setProtocolSelected((protocolSelected) =>
              protocolSelected.filter((item) => item !== data)
            );
            console.log(protocolSelected);
            setPrevProtSelected("");
          } else {
            setProtocolSelected([protocolSelected[0], data]);
          }
        }
        if (protocolSelected.length === 2) {
          const index = protocolSelected.indexOf(data);
          if (index > -1) {
            setProtocolSelected((protocolSelected) =>
              protocolSelected.filter((item) => item !== data)
            );
          } else {
            alert("Comparison is available only for two protocols.");
          }
        }
      } else {
        alert("Protocol Selected is not from the same study.");
      }
    }
  };
  const compareProtocol = () => {
    if (protocolSelected.length === 2) {
      props.history.push(
        `/protocols?protocolId=${protocolSelected[0]}&protocolId2=${protocolSelected[1]}&value=2`
      );
      setProtocolSelected([]);
    } else if (protocolSelected.length < 2) {
      alert("Please select at least two protocol versions to compare");
    }
  };
  const saveSearch = () => {
    // const parsed = queryString.parse(elasticSearchQuery);

    // if (parsed) {
    //   dispatch({ type: "SAVE_SEARCH_SAGA", payload: parsed.key });
    // }
    if (postQueryObj && postQueryObj.key) {
      dispatch({ type: "SAVE_SEARCH_SAGA", payload: postQueryObj.key });
    }
  };
  // const onSetPage = (event, value) => {
  const onSetPage = (value) => {
    setPage(value);
    let postObj = cloneDeep(postQueryObj);
    postObj.pageNo = value + 1;
    dispatch({ type: "GET_SEARCH_RESULT", payload: postObj });
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
      {sponsorData.sectionContent.length > 0 &&
      indicationData.sectionContent.length > 0 ? (
        <div className="marginLeft10">
          <div>
            <SearchSection
              getSearchInput={getSearchInput}
              history={props.history}
              idPresent={idPresent}
              compareProtocol={compareProtocol}
              saveSearch={saveSearch}
              saveRecentSearch={saveRecentSearch}
              handleKeywordSearch={handleKeywordSearch}
            />
          </div>
          <div>
            <SearchResultSection
              getSearchInput={getSearchInput}
              filterList={filterList.data}
              resultList={resultList}
              sponsorData={sponsorData}
              indicationData={indicationData}
              phaseData={phaseData}
              searchInput={searchInput}
              deleteSearchInput={deleteSearchInput}
              onSearchChange={onSearchChange}
              onSortChange={onSortChange}
              onSearchQuery={onSearchQuery}
              searchQuery={searchQuery}
              hancleClearAll={hancleClearAll}
              history={props.history}
              compareTwoProtocol={compareTwoProtocol}
              sortValueProp={sortValueProp}
              dateRangeValue={dateRangeValue}
              protocolSelected={protocolSelected}
              clearAll={clearAll}
              page={page}
              onSetPage={onSetPage}
              totalSearchResult={totalSearchResults}
            />
          </div>
        </div>
      ) : (
        phaseData.loader && <Loader />
      )}
    </div>
  );
};

export default Search;
