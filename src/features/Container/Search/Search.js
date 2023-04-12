/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './search.scss';

// ------------------- Components --------------------

// ------------------- Third Party -----------------

import Breadcrumbs from 'apollo-react/components/Breadcrumbs';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { toast } from 'react-toastify';

// ------------------- Redux -----------------
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'apollo-react/components/Loader';
import {
  searchFilter,
  searchResult,
  indications,
  sponsors,
  recent,
  range,
  totalSearchResult,
  phases,
} from './searchSlice';
import {
  // phases,
  documentStatus,
  TOC,
  dateType,
  dateSection,
  qcStatus,
} from './Data/constants';
import { POST_OBJECT } from '../../../AppConstant/AppConstant';
import SearchSection from './SearchSection';
import SearchResultSection from './SearchResultSection';
import { formatESDate, convertDatesFormat } from '../../../utils/utilFunction';

function Search(props) {
  const resultList = useSelector(searchResult);
  const totalSearchResults = useSelector(totalSearchResult);
  const filterList = useSelector(searchFilter);
  const indicationData = useSelector(indications);
  const sponsorData = useSelector(sponsors);
  const phaseData = useSelector(phases);
  const recentDate = useSelector(recent);
  const rangeDate = useSelector(range);
  const [sortValueProp, setSortValue] = useState('1');
  const dispatch = useDispatch();
  const [idPresent, setIdPresent] = useState(false);
  const [page, setPage] = React.useState(0);
  const [dateRangeValue, setDateRangeValue] = useState([null, null]);

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState({
    sponsor: [],
    indication: [],
    phase: [],
    documentStatus: [],
    qcStatus: [],
    toc: [],
    dateType: [1],
    dateSection: [1],
    range: { from: '', to: '' },
  });
  const [searchQueryTemp, setSearchQueryTemp] = useState({
    sponsor: [],
    indication: [],
    phase: [],
    documentStatus: [],
    qcStatus: [],
    toc: [],
    dateType: [1],
    dateSection: [1],
    range: { from: '', to: '' },
  });
  const [postQueryObj, setPostQueryObj] = useState(POST_OBJECT);
  const [clearAll, setClearAll] = useState(false);
  // const [elasticSearchQuery, setElasticSearchQuesry] = useState("");
  const [protocolSelected, setProtocolSelected] = useState([]);
  const [prevProtSelected, setPrevProtSelected] = useState('');
  const [filterChipObject, setFilterChipObject] = useState(POST_OBJECT);
  const [enableFilter, setEnableFilter] = useState(false);
  const [dateTemp, setDateTemp] = useState({
    dateRange: { from: '', to: '' },
  });
  // let arr = [];
  useEffect(() => {
    // axios.get('http://ca2spdml01q:8000/api/indications/?skip=0')
    dispatch({ type: 'GET_SPONSORS' });
    dispatch({ type: 'GET_INDICATIONS' });
    dispatch({ type: 'GET_PHASES', payload: phaseData });
    return () => {
      dispatch({ type: 'GET_SEARCH_RESULT', payload: '' });
    };
  }, []);
  useEffect(() => {
    const params = props.location.search;
    // const parsed = queryString.parse(params);
    let parsed = {};
    const postObj = cloneDeep(POST_OBJECT);
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
        `{"${params.replace(/&/g, '","').replace(/=/g, '":"')}"}`,
        function (key, value) {
          return key === '' ? value : decodeURIComponent(value);
        },
      );
      const tempQuery = cloneDeep(searchQuery);
      if ('?key' in parsed) {
        setIdPresent(true);
        setSearchInput(parsed['?key']);
        postObj.key = parsed['?key'];
      }
      if ('toc' in parsed && TOC.sectionContent.length > 0) {
        const tempElasticQuery = TOC.sectionContent.filter((item) =>
          parsed.toc.split('+').includes(item.title),
        );
        tempQuery.toc =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        postObj.toc = parsed.toc.split('+');
      }

      if ('sponsor' in parsed) {
        postObj.sponsor = parsed.sponsor.split('+');
      }
      if ('indication' in parsed) {
        postObj.indication = parsed.indication.split('+');
      }
      if ('phase' in parsed) {
        const tempElasticQuery = phaseData.sectionContent.filter((item) =>
          parsed.phase.split('+').includes(item.title),
        );
        tempQuery.phase =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        postObj.phase = parsed.phase.split('+');
      }

      if ('documentStatus' in parsed) {
        const tempElasticQuery = documentStatus.sectionContent.filter((item) =>
          parsed.documentStatus.split('+').includes(item.value),
        );
        tempQuery.documentStatus =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        postObj.documentStatus = parsed.documentStatus.split('+');
      }
      if ('qcStatus' in parsed) {
        const tempElasticQuery = qcStatus.sectionContent.filter((item) =>
          parsed.qcStatus.split('+').includes(item.value),
        );
        tempQuery.qcStatus =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);

        let arr = [];
        const str = parsed.qcStatus;
        if (str.includes('QC1-QC2')) {
          arr = str.split('+');
          const index = arr.indexOf('QC1-QC2');

          if (index !== -1) {
            arr[index] = 'QC1';
          }
          arr.push('QC2');
          // arr.push("FEEDBACK_RUN");
        } else {
          arr = str.split('+');
        }
        postObj.qcStatus = arr;
      }
      /* istanbul ignore else */
      if ('dateFrom' in parsed && 'dateTo' in parsed) {
        postObj.dateFrom = parsed.dateFrom;
        postObj.dateTo = parsed.dateTo;
        // resultQuery+=dateQuery;
      }
      /* istanbul ignore else */
      if ('dateType' in parsed) {
        const tempElasticQuery = dateType.sectionContent.filter((item) =>
          parsed.dateType.split('+').includes(item.value),
        );
        tempQuery.dateType =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        postObj.dateType = parsed.dateType;
      }
      /* istanbul ignore else */
      if ('dateSection' in parsed) {
        const tempElasticQuery = dateSection.sectionContent.filter((item) =>
          parsed.dateSection.split('+').includes(item.value),
        );
        tempQuery.dateSection =
          tempElasticQuery && tempElasticQuery.map((item) => item.id);
        postObj.dateSection = parsed.dateSection;
      }
      setPostQueryObj(postObj);
      setSearchQuery({ ...tempQuery, range: searchQuery.range });
      dispatch({ type: 'GET_SEARCH_RESULT', payload: postObj });
    } else {
      dispatch({ type: 'GET_SEARCH_RESULT', payload: '' });
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
  }, []);

  // newcode
  // This useEffect will get called when indication and sponsor API returns response
  useEffect(() => {
    const params = props.location.search;
    let parsed = {};
    /* istanbul ignore else */
    if (
      params &&
      sponsorData.sectionContent.length > 0 &&
      indicationData.sectionContent.length > 0 &&
      phaseData.sectionContent.length > 0
    ) {
      parsed = JSON.parse(
        `{"${params.replace(/&/g, '","').replace(/=/g, '":"')}"}`,
        function (key, value) {
          return key === '' ? value : decodeURIComponent(value);
        },
      );
      const tempQuery = cloneDeep(searchQuery);
      /* istanbul ignore else */
      if ('sponsor' in parsed && sponsorData.sectionContent.length > 0) {
        const tempElasticQuery = sponsorData.sectionContent.filter((item) =>
          parsed.sponsor.split('+').includes(item.title),
        );
        tempQuery.sponsor =
          tempElasticQuery && tempElasticQuery.map((item) => item.id).sort();
      }
      /* istanbul ignore else */
      if ('indication' in parsed && indicationData.sectionContent.length > 0) {
        const tempElasticQuery = indicationData.sectionContent.filter((item) =>
          parsed.indication.split('+').includes(item.title),
        );
        tempQuery.indication =
          tempElasticQuery && tempElasticQuery.map((item) => item.id).sort();
      }
      if ('phase' in parsed && phaseData.sectionContent.length > 0) {
        const tempElasticQuery = phaseData.sectionContent.filter((item) =>
          parsed.phase.split('+').includes(item.title),
        );
        tempQuery.phase =
          tempElasticQuery && tempElasticQuery.map((item) => item.id).sort();
      }
      setSearchQuery({ ...tempQuery, range: searchQuery.range });
    }
  }, [sponsorData, indicationData, phaseData]);
  /* istanbul ignore next */
  const handleClick = (e) => {
    e.preventdefault();
  };

  const saveRecentSearch = (input) => {
    // dispatch({
    //   type: "POST_RECENT_SEARCH_DASHBOARD",
    //   payload: input,
    // });
  };
  /* istanbul ignore next */
  const clearSearchText = (value) => {
    setClearAll(value);
  };

  const handleKeywordSearch = (input) => {
    if (input) {
      setEnableFilter(false);
      const postObj = cloneDeep(POST_OBJECT);
      postObj.key = input;
      setSortValue('1');
      setProtocolSelected([]);
      setPrevProtSelected('');
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
        range: { from: '', to: '' },
      });
      const range = {
        from: null,
        to: null,
      };
      dispatch({ type: 'FILTER_BY_DATE_RANGE_SAGA', payload: range });
      setDateRangeValue([null, null]);
      setSearchInput(input);
      setPostQueryObj(postObj);

      dispatch({ type: 'GET_SEARCH_RESULT', payload: postObj });
      if (sponsorData.sectionContent.length === 0) {
        dispatch({ type: 'GET_SPONSORS' });
      }
      if (indicationData.sectionContent.length === 0) {
        dispatch({ type: 'GET_INDICATIONS' });
      }
      clearSearchText(true);
      props.history.replace({
        pathname: '/search',
        search: `?key=${input}`,
      });
    } else {
      toast.warn('Please enter something to search.');
    }
  };
  /* istanbul ignore next */
  const contructQueryFromArray = (key, value) => {
    switch (key) {
      case 'toc': {
        let str = '&toc=';
        const extractValues = TOC.sectionContent.filter((item) =>
          value.includes(item.id),
        );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.title}+`;
            return true;
          });
          const trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case 'sponsor': {
        let str = '&sponsor=';
        const extractValues =
          sponsorData.sectionContent &&
          sponsorData.sectionContent.filter((item) => value.includes(item.id));
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.title}+`;
            return true;
          });
          const trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case 'indication': {
        let str = '&indication=';
        const extractValues =
          indicationData.sectionContent &&
          indicationData.sectionContent.filter((item) =>
            value.includes(item.id),
          );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.title}+`;
            return true;
          });
          const trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case 'phase': {
        let str = '&phase=';
        const extractValues = phaseData.sectionContent.filter((item) =>
          value.includes(item.id),
        );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.title}+`;
            return true;
          });
          const trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case 'documentStatus': {
        let str = '&documentStatus=';
        const extractValues = documentStatus.sectionContent.filter((item) =>
          value.includes(item.id),
        );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.value}+`;
            return true;
          });
          const trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case 'qcStatus': {
        let str = '&qcStatus=';
        const extractValues = qcStatus.sectionContent.filter((item) =>
          value.includes(item.id),
        );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.value}+`;
            return true;
          });
          const trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case 'dateType': {
        let str = '&dateType=';
        const extractValues = dateType.sectionContent.filter((item) =>
          value.includes(item.id),
        );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.value}+`;
            return true;
          });
          const trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      case 'dateSection': {
        let str = '&dateSection=';
        const extractValues = dateSection.sectionContent.filter((item) =>
          value.includes(item.id),
        );
        if (extractValues.length > 0) {
          extractValues.map((item) => {
            str += `${item.value}+`;
            return true;
          });
          const trimstr = str.slice(0, -1);
          str = trimstr;
        }
        return str;
      }
      default:
        return '';
    }
  };
  const isFutureDate = (value) => {
    const d_now = new Date();
    const d_inp = new Date(value);
    return d_now.getTime() <= d_inp.getTime();
  };

  const compareObjs = (a, b) => {
    if (isEqual(a, b)) {
      return false;
    }
    return true;

    // if (JSON.stringify(a) === JSON.stringify(b)) {
    //   return false;
    // }
    // return true;
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
    }
    return false;
  };
  /* istanbul ignore next */
  const getSearchInput = (input) => {
    const postObj = cloneDeep(POST_OBJECT);
    let validFilters = false;
    setSortValue('1');
    setProtocolSelected([]);
    setPrevProtSelected('');
    setPage(0);
    const tempQuery = cloneDeep(searchQuery);
    setSearchQueryTemp(tempQuery);
    setEnableFilter(false);
    const inp = input || searchInput;
    let resultQuery = `key=${inp}`;
    for (const [key, value] of Object.entries(searchQuery)) {
      if (value.length > 0) resultQuery += contructQueryFromArray(key, value);
    }
    const parsed = JSON.parse(
      `{"${resultQuery.replace(/&/g, '","').replace(/=/g, '":"')}"}`,
      function (key, value) {
        return key === '' ? value : decodeURIComponent(value);
      },
    );
    /* istanbul ignore else */
    if ('key' in parsed) {
      setSearchInput(parsed.key);
      postObj.key = parsed.key;
    }
    /* istanbul ignore else */
    if ('toc' in parsed && TOC.sectionContent.length > 0) {
      postObj.toc = parsed.toc.split('+');
    }
    /* istanbul ignore else */
    if ('sponsor' in parsed && sponsorData.sectionContent.length > 0) {
      postObj.sponsor = parsed.sponsor.split('+');
    }
    /* istanbul ignore else */
    if ('indication' in parsed && sponsorData.sectionContent.length > 0) {
      postObj.indication = parsed.indication.split('+');
    }
    /* istanbul ignore else */
    if ('phase' in parsed && phaseData.sectionContent.length > 0) {
      postObj.phase = parsed.phase.split('+');
    }
    /* istanbul ignore else */
    if ('documentStatus' in parsed) {
      postObj.documentStatus = parsed.documentStatus.split('+');
    }
    if ('qcStatus' in parsed) {
      let arr = [];
      const str = parsed.qcStatus;
      if (str.includes('QC1-QC2')) {
        arr = str.split('+');
        const index = arr.indexOf('QC1-QC2');

        if (index !== -1) {
          arr[index] = 'QC1';
        }
        arr.push('QC2');
        // arr.push("FEEDBACK_RUN");
      } else {
        arr = str.split('+');
      }
      postObj.qcStatus = arr;
    }
    /* istanbul ignore else */
    if ('dateType' in parsed) {
      postObj.dateType = parsed.dateType;
    }
    /* istanbul ignore else */
    if ('dateSection' in parsed) {
      postObj.dateSection = parsed.dateSection;
    }
    function isValidDate(d) {
      return d instanceof Date && !isNaN(d);
    }
    setIdPresent(true);
    setSearchInput(inp);
    /* istanbul ignore next else */
    let filterChanged = false;
    if (rangeDate.from && rangeDate.to) {
      const obj = {
        dateRange: { from: rangeDate.from, to: rangeDate.to },
      };
      setDateTemp(obj);
      const date11 = formatESDate(rangeDate.from);
      const date22 = formatESDate(rangeDate.to);
      const d1 = new Date(date11);
      const d2 = new Date(date22);
      // let date1 = d1.format("MM-DD-YYYY");
      // let date2 = d2.format("MM-DD-YYYY");
      const date1 = convertDatesFormat('mmddyyyy', '-', date11);
      const date2 = convertDatesFormat('mmddyyyy', '-', date22);
      /* istanbul ignore else */
      if (isValidDate(d1) && isValidDate(d2)) {
        if (isFutureDate(date1) || isFutureDate(date2)) {
          alert(
            'Future date is not allowed. Please use date range picker to select valid date.',
          );
        } else {
          // const dateQuery = `&dateFrom=${rangeDate.from}&dateTo=${rangeDate.to}`;
          // setSearchInput(dateQuery);
          postObj.dateFrom = rangeDate.from;
          postObj.dateTo = rangeDate.to;
          // resultQuery += dateQuery;

          const postObj1 = cloneDeep(postObj);
          const postQueryObj1 = cloneDeep(postQueryObj);
          delete postObj1.key;
          delete postQueryObj1.key;
          filterChanged = compareObjs(postObj1, postQueryObj1);
          validFilters = checkValidity(postObj);
          if (filterChanged && validFilters) {
            dispatch({ type: 'GET_SEARCH_RESULT', payload: postObj });
            props.history.replace({
              pathname: '/search',
              search: `?${resultQuery}`,
            });
          } else if (filterChanged && !validFilters) {
            dispatch({ type: 'GET_SEARCH_RESULT', payload: postObj });
            props.history.replace({
              pathname: '/search',
              search: `?${resultQuery}`,
            });
          } else if (!filterChanged && validFilters) {
            toast.warn('Please Edit/Modify Your Filters');
          } else {
            toast.warn('Please Select Filters');
          }
        }
      } else {
        alert(
          'Date is not valid. Please use date range picker to select valid date.',
        );
      }
    } else if (recentDate.from) {
      const obj = {
        dateRange: { from: recentDate.from, to: recentDate.to },
      };
      setDateTemp(obj);
      const dateQuery = `&dateFrom=${recentDate.from}&dateTo=${recentDate.to}`;
      postObj.dateFrom = recentDate.from;
      postObj.dateTo = recentDate.to;
      resultQuery += dateQuery;

      const postObj1 = cloneDeep(postObj);
      const postQueryObj1 = cloneDeep(postQueryObj);
      delete postObj1.key;
      delete postQueryObj1.key;
      filterChanged = compareObjs(postObj1, postQueryObj1);
      validFilters = checkValidity(postObj);
      if (filterChanged && validFilters) {
        dispatch({ type: 'GET_SEARCH_RESULT', payload: postObj });
        props.history.replace({
          pathname: '/search',
          search: `?${resultQuery}`,
        });
      } else if (filterChanged && !validFilters) {
        dispatch({ type: 'GET_SEARCH_RESULT', payload: postObj });
        props.history.replace({
          pathname: '/search',
          search: `?${resultQuery}`,
        });
      } else if (!filterChanged && validFilters) {
        toast.warn('Please Edit/Modify Your Filters');
      } else {
        toast.warn('Please Select Filters');
      }
    } else {
      const obj = {
        dateRange: { from: '', to: '' },
      };
      setDateTemp(obj);
      const postObj1 = cloneDeep(postObj);
      const postQueryObj1 = cloneDeep(postQueryObj);
      delete postObj1.key;
      delete postQueryObj1.key;
      filterChanged = compareObjs(postObj1, postQueryObj1);
      validFilters = checkValidity(postObj);
      // debugger; // eslint-disable-line no-debugger
      if (filterChanged && validFilters) {
        dispatch({ type: 'GET_SEARCH_RESULT', payload: postObj });
        props.history.replace({
          pathname: '/search',
          search: `?${resultQuery}`,
        });
      } else if (filterChanged && !validFilters) {
        if (postObj.key) {
          dispatch({ type: 'GET_SEARCH_RESULT', payload: postObj });
          props.history.replace({
            pathname: '/search',
            search: `?${resultQuery}`,
          });
        } else {
          dispatch({ type: 'GET_SEARCH_RESULT' });
          props.history.replace({
            pathname: '/search',
          });
        }
      } else if (!filterChanged && validFilters) {
        toast.warn('Please Edit/Modify Your Filters');
      } else {
        toast.warn('Please Select Filters');
      }
    }

    setPostQueryObj(postObj);
  };
  const hancleClearAll = (inputPresent, input) => {
    clearSearchText(true);
    const postObj = cloneDeep(POST_OBJECT);
    setProtocolSelected([]);
    setPrevProtSelected('');
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
        range: { from: '', to: '' },
      });
      postObj.key = input;
      const range = {
        from: null,
        to: null,
      };
      dispatch({ type: 'FILTER_BY_DATE_RANGE_SAGA', payload: range });
      dispatch({ type: 'GET_SEARCH_RESULT', payload: postObj });
      setDateRangeValue([null, null]);
      props.history.push(`/search?key=${input}`);
    } else {
      dispatch({ type: 'GET_PHASES', payload: phaseData });
      setSearchQuery({
        sponsor: [],
        indication: [],
        phase: [],
        documentStatus: [],
        qcStatus: [],
        toc: [],
        dateType: [1],
        dateSection: [1],
        range: { from: '', to: '' },
      });
      // setDateRangeValue([null, null]);
      // clearInputFields("range-date-id");
      const range = {
        from: null,
        to: null,
      };
      dispatch({ type: 'FILTER_BY_DATE_RANGE_SAGA', payload: range });
      dispatch({ type: 'GET_SEARCH_RESULT', payload: '' });
      setDateRangeValue([null, null]);
      // setClearAll(false)
      props.history.push('/search');
    }
    setPostQueryObj(postObj);
    /* istanbul ignore next */
    setSearchQueryTemp({
      sponsor: [],
      indication: [],
      phase: [],
      documentStatus: [],
      qcStatus: [],
      toc: [],
      dateType: [1],
      dateSection: [1],
      range: { from: '', to: '' },
    });
    /* istanbul ignore next */
    setDateTemp({
      dateRange: { from: '', to: '' },
    });
  };
  /* istanbul ignore next */
  const deleteSearchInput = () => {
    clearSearchText(true);
    const postObj = cloneDeep(POST_OBJECT);
    const phaseObj = {
      sectionContent: [],
    };
    dispatch({ type: 'GET_PHASES', payload: phaseObj });
    setSearchInput('');
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
      range: { from: '', to: '' },
    });
    const range = {
      from: null,
      to: null,
    };
    dispatch({ type: 'FILTER_BY_DATE_RANGE_SAGA', payload: range });
    dispatch({ type: 'GET_SEARCH_RESULT', payload: '' });
    setDateRangeValue([null, null]);
    setPostQueryObj(postObj);
    /* istanbul ignore next */
    setSearchQueryTemp({
      sponsor: [],
      indication: [],
      phase: [],
      documentStatus: [],
      qcStatus: [],
      toc: [],
      dateType: [1],
      dateSection: [1],
      range: { from: '', to: '' },
    });
    /* istanbul ignore next */
    setDateTemp({
      dateRange: { from: '', to: '' },
    });
    props.history.push('/search');
  };

  const onSearchChange = () => {
    // console.log("onSearchChange :", onSearchChange);
  };
  /* istanbul ignore next */
  useEffect(() => {
    let obj = { dateRange: { from: '', to: '' } };
    if (
      recentDate &&
      'from' in recentDate &&
      'to' in recentDate &&
      recentDate.from !== undefined &&
      recentDate.to !== undefined
    ) {
      if (recentDate.from && recentDate.to) {
        obj = {
          dateRange: { from: recentDate.from, to: recentDate.to },
        };
      } else if (rangeDate.from && rangeDate.to) {
        obj = {
          dateRange: { from: rangeDate.from, to: rangeDate.to },
        };
      }
    }
    const searchQueryObj = { ...searchQuery, range: obj.dateRange };
    setSearchQuery(searchQueryObj);
  }, [rangeDate, recentDate]);
  const onSortChange = (data, value) => {
    setPage(0);
    const postObj = cloneDeep(postQueryObj);
    postObj.sortField = data.value;
    setSortValue(value);
    dispatch({ type: 'GET_SEARCH_RESULT', payload: postObj });
    setPostQueryObj(postObj);
  };

  /* istanbul ignore next */
  useEffect(() => {
    const filterChip = cloneDeep(filterChipObject);
    for (const [key, value] of Object.entries(searchQuery)) {
      // eslint-disable-next-line no-debugger
      // debugger;
      if (value.length > 0) {
        if (key === 'toc') {
          const extractValues = TOC.sectionContent.filter((item) =>
            value.includes(item.id),
          );
          filterChip.toc = extractValues;
          setFilterChipObject(filterChip);
        } else if (key === 'sponsor') {
          const extractValues = sponsorData.sectionContent.filter((item) =>
            value.includes(item.id),
          );
          filterChip.sponsor = extractValues;
          setFilterChipObject(filterChip);
        } else if (key === 'indication') {
          const extractValues = indicationData.sectionContent.filter((item) =>
            value.includes(item.id),
          );
          filterChip.indication = extractValues;
          setFilterChipObject(filterChip);
        } else if (key === 'phase') {
          const extractValues = phaseData.sectionContent.filter((item) =>
            value.includes(item.id),
          );
          filterChip.phase = extractValues;
          setFilterChipObject(filterChip);
        } else if (key === 'documentStatus') {
          const extractValues = documentStatus.sectionContent.filter((item) =>
            value.includes(item.id),
          );
          filterChip.documentStatus = extractValues;
          setFilterChipObject(filterChip);
        } else if (key === 'qcStatus') {
          const extractValues = qcStatus.sectionContent.filter((item) =>
            value.includes(item.id),
          );
          filterChip.qcStatus = extractValues;
          setFilterChipObject(filterChip);
        } else if (key === 'dateSection') {
          const extractValues = dateSection.sectionContent.filter((item) =>
            value.includes(item.id),
          );
          filterChip.dateSection = extractValues;
          setFilterChipObject(filterChip);
        } else if (key === 'dateType') {
          const extractValues = dateType.sectionContent.filter((item) =>
            value.includes(item.id),
          );
          filterChip.dateType = extractValues;
          setFilterChipObject(filterChip);
        }
      } else if (value.length === 0) {
        // let filterChip = cloneDeep(filterChipObject);
        filterChip[key] = [];
        setFilterChipObject(filterChip);
      }
    }

    const prevFilterObj = cloneDeep(searchQueryTemp);
    const tempQuery = cloneDeep(searchQuery);

    if (compareObjs(prevFilterObj, tempQuery)) {
      setEnableFilter(true);
    } else {
      setEnableFilter(false);
    }
  }, [searchQuery]);
  /* istanbul ignore next */
  const onSearchQuery = (list, identifier) => {
    setClearAll(false);
    // let prevFilterObj = cloneDeep(searchQueryTemp);
    const tempQuery = cloneDeep(searchQuery);
    tempQuery[identifier] = list.sort();
    setSearchQuery(tempQuery);
    // if (compareObjs(prevFilterObj, tempQuery)) {
    //   setEnableFilter(true);
    // } else {
    //   setEnableFilter(false);
    // }
  };
  /* istanbul ignore next */
  const compareTwoProtocol = (data, protocol) => {
    if (prevProtSelected === '') {
      setPrevProtSelected(protocol);
      setProtocolSelected([data]);
    } else if (prevProtSelected.toLowerCase() === protocol.toLowerCase()) {
      if (protocolSelected.length === 1) {
        const index = protocolSelected.indexOf(data);
        if (index > -1) {
          setProtocolSelected((protocolSelected) =>
            protocolSelected.filter((item) => item !== data),
          );

          setPrevProtSelected('');
        } else {
          setProtocolSelected([protocolSelected[0], data]);
        }
      }
      if (protocolSelected.length === 2) {
        const index = protocolSelected.indexOf(data);
        if (index > -1) {
          setProtocolSelected((protocolSelected) =>
            protocolSelected.filter((item) => item !== data),
          );
        } else {
          alert('Comparison is available only for two protocols.');
        }
      }
    } else {
      alert('Protocol Selected is not from the same study.');
    }
  };
  /* istanbul ignore next */
  const compareProtocol = () => {
    if (protocolSelected.length === 2) {
      props.history.push(
        `/protocols?protocolId=${protocolSelected[0]}&protocolId2=${protocolSelected[1]}&value=2`,
      );
      setProtocolSelected([]);
    } else if (protocolSelected.length < 2) {
      alert('Please select at least two protocol versions to compare');
    }
  };
  /* istanbul ignore next */
  const saveSearch = () => {
    // const parsed = queryString.parse(elasticSearchQuery);

    // if (parsed) {
    //   dispatch({ type: "SAVE_SEARCH_SAGA", payload: parsed.key });
    // }
    if (postQueryObj && postQueryObj.key) {
      dispatch({ type: 'SAVE_SEARCH_SAGA', payload: postQueryObj.key });
    }
  };
  // const onSetPage = (event, value) => {
  /* istanbul ignore next */
  const onSetPage = (value) => {
    setPage(value);
    const postObj = cloneDeep(postQueryObj);
    postObj.pageNo = value + 1;
    dispatch({ type: 'GET_SEARCH_RESULT', payload: postObj });
  };
  return (
    <div className="search">
      <Breadcrumbs
        items={[
          { href: '/dashboard', onClick: (e) => handleClick(e) },
          {
            href: '/search',
            title: 'Search',
            onClick: handleClick,
          },
          {
            title: 'New Search',
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
              enableFilter={enableFilter}
              setEnableFilter={setEnableFilter}
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
              setDateRangeValue={setDateRangeValue}
              clearAll={clearAll}
              page={page}
              onSetPage={onSetPage}
              totalSearchResult={totalSearchResults}
              filters={filterChipObject}
            />
          </div>
        </div>
      ) : (
        phaseData.loader && <Loader />
      )}
    </div>
  );
}

export default Search;
