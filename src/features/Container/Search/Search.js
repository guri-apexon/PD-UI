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
import {  phases, documentStatus } from "./Data/constants";

const Search = (props) => {
  const resultList = useSelector(searchResult);
  const filterList = useSelector(searchFilter);
  const indicationData = useSelector(indications);
  const sponsorData = useSelector(sponsors);
  const recentDate = useSelector(recent);
  const rangeDate = useSelector(range);

  const dispatch = useDispatch();
  const [idPresent, setIdPresent] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState({sponsor:[], indication:[], phase:[], documentStatus:[]});

  useEffect(() => {
    let params = props.location.search;
    // const parsed = queryString.parse(params);
    let parsed={};
    if (indicationData.sectionContent.length === 0) {
      dispatch({ type: "GET_INDICATIONS" });
    }
    if (sponsorData.sectionContent.length === 0) {
      dispatch({ type: "GET_SPONSORS" });
    }
    if(params && sponsorData.sectionContent.length>0 && indicationData.sectionContent.length>0){
      parsed=JSON.parse('{"' + params.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
      let elasticSearchQuery ='key=';
      let tempQuery= _.cloneDeep(searchQuery);
      if ("?key" in parsed) {
        setIdPresent(true);
        setSearchInput(parsed[`?key`]);
        elasticSearchQuery+=` ${parsed[`?key`]}`;
      }
      if('sponsor' in parsed && sponsorData.sectionContent.length>0 ){
        let tempElasticQuery = sponsorData.sectionContent.filter(item => parsed.sponsor.split('+').includes(item.title)) 
        tempQuery.sponsor= tempElasticQuery && tempElasticQuery.map(item=> item.id);
        elasticSearchQuery+=  tempElasticQuery.map(item=>item.title).join(' ');
      }
      if('indication' in parsed && indicationData.sectionContent.length>0 ){
        let tempElasticQuery = indicationData.sectionContent.filter(item => parsed.indication.split('+').includes(item.title)) 
        tempQuery.indication= tempElasticQuery && tempElasticQuery.map(item=> item.id);
        elasticSearchQuery+= ` ${tempElasticQuery.map(item=>item.title).join(' ')}`;
      }
      if('phase' in parsed ){
        let tempElasticQuery = phases.sectionContent.filter(item => parsed.phase.split('+').includes(item.title)) 
        tempQuery.phase= tempElasticQuery && tempElasticQuery.map(item=> item.id);
        elasticSearchQuery+= ` ${tempElasticQuery.map(item=>item.title).join(' ')}`;
      }
      if('documentStatus' in parsed ){
        let tempElasticQuery = documentStatus.sectionContent.filter(item => parsed.documentStatus.split('+').includes(item.title)) 
        tempQuery.documentStatus= tempElasticQuery && tempElasticQuery.map(item=> item.id);
        elasticSearchQuery+= ` ${tempElasticQuery.map(item=>item.title).join(' ')}`;
      }
      if ('dateFrom' in parsed && 'dateTo' in parsed) {
        console.log('rangeDate', rangeDate);
        const dateQuery = `&dateFrom=${parsed[`dateFrom`]}&dateTo=${parsed[`dateTo`]}`
        // setSearchInput(dateQuery);
        elasticSearchQuery+=` ${dateQuery}`;
        // resultQuery+=dateQuery;
      }
      setSearchQuery(tempQuery);
      dispatch({ type: "GET_SEARCH_RESULT", payload: elasticSearchQuery});
    
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
  }, [dispatch, sponsorData]);
  const handleClick = (e) => {
    e.preventdefault();
    // console.log("Breadcrumb was clicked", e);
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

  const getSearchInput = (input) => {
    // console.log(input, searchQuery, "Search Query");
    let inp= input? input: searchInput;
    let resultQuery=`key=${inp}`;
    for (let [key, value] of Object.entries(searchQuery)) {
      if(value.length >0)
     resultQuery+=contructQueryFromArray(key, value)
    }
    let parsed=JSON.parse('{"' + resultQuery.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
    let elasticSearchQuery ='key=';
    
    if ("key" in parsed) {
      setSearchInput(parsed[`key`]);
      elasticSearchQuery+=` ${parsed[`key`]}`;
    }
    if('sponsor' in parsed && sponsorData.sectionContent.length>0 ){
      let tempElasticQuery = sponsorData.sectionContent.filter(item => parsed.sponsor.split('+').includes(item.title));
      elasticSearchQuery+=  tempElasticQuery.map(item=>item.title).join(' ');
    }
    if('indication' in parsed && sponsorData.sectionContent.length>0 ){
      let tempElasticQuery = indicationData.sectionContent.filter(item => parsed.indication.split('+').includes(item.title)) 
      elasticSearchQuery+= ` ${tempElasticQuery.map(item=>item.title).join(' ')}`;
    }
    if('phase' in parsed && phases.sectionContent.length>0 ){
      let tempElasticQuery = phases.sectionContent.filter(item => parsed.phase.split('+').includes(item.title)) 
      elasticSearchQuery+= ` ${tempElasticQuery.map(item=>item.title).join(' ')}`;
    }
    if('documentStatus' in parsed ){
      let tempElasticQuery = documentStatus.sectionContent.filter(item => parsed.documentStatus.split('+').includes(item.title)) 
      elasticSearchQuery+= ` ${tempElasticQuery.map(item=>item.title).join(' ')}`;
    }
     
    setIdPresent(true);
    setSearchInput(inp);
    if (rangeDate.from && rangeDate.to) {
      console.log('rangeDate', rangeDate);
      const dateQuery = `&dateFrom=${rangeDate.from}&dateTo=${rangeDate.to}`
      // setSearchInput(dateQuery);
      elasticSearchQuery+=` ${dateQuery}`;
      resultQuery+=dateQuery;
    }else if (recentDate.from) {
      // setSearchInput(parsed[`key`]);
      console.log('recentDate', recentDate);
      const dateQuery = `&dateFrom=${recentDate.from}&dateTo=${recentDate.to}`
      // setSearchInput(dateQuery);
      elasticSearchQuery+=` ${dateQuery}`;
      resultQuery+=dateQuery;
      // elasticSearchQuery+=` ${parsed[`key`]}`;
    }
    // dispatch({ type: "GET_SEARCH_FILTER", payload: input });
    dispatch({ type: "GET_SEARCH_RESULT", payload: elasticSearchQuery });
    props.history.replace({pathname: '/search', search: `?${resultQuery}`});
  };
  const contructQueryFromArray =(key, value)=>{
    switch (key){
      case 'sponsor':{
          let str='&sponsor=';
          let extractValues= sponsorData.sectionContent && sponsorData.sectionContent.filter( item => value.includes(item.id))
          if(extractValues.length >0){
            extractValues.map(item =>{
              str+=`${item.title}+`;
              return true;
            })
            let trimstr= str.slice(0,-1);
            str=trimstr;
          }
          return str;
      }
      case 'indication': {
        let str='&indication=';
        let extractValues= indicationData.sectionContent && indicationData.sectionContent.filter( item => value.includes(item.id))
        if(extractValues.length >0){
          extractValues.map(item =>{
            str+=`${item.title}+`;
            return true;
          })
          let trimstr= str.slice(0,-1);
          str=trimstr;
        }
        return str;
      }
      case 'phase': {
        let str='&phase=';
        let extractValues= phases.sectionContent.filter( item => value.includes(item.id))
        if(extractValues.length >0){
          extractValues.map(item =>{
            str+=`${item.title}+`;
            return true;
          })
          let trimstr= str.slice(0,-1);
          str=trimstr;
        }
        return str;
      }
      case 'documentStatus': {
        let str='&documentStatus=';
        let extractValues= documentStatus.sectionContent.filter( item => value.includes(item.id))
        if(extractValues.length >0){
          extractValues.map(item =>{
            str+=`${item.title}+`;
            return true;
          })
          let trimstr= str.slice(0,-1);
          str=trimstr;
        }
        return str;
      }
      default: return "";
    }
  }
  const deleteSearchInput = () => {
    setSearchInput("");
    setIdPresent(false);
    // props.history.push(`/search`);
    // dispatch({ type: "GET_SEARCH_RESULT", payload: "" });
  };

  const onSearchChange = () => {
    console.log("onSearchChange :", onSearchChange);
  };
  const onSortChange = (data) => {
    let newList = _.cloneDeep(resultList);
    newList.data &&
      newList.data.sort((a, b) => {
        let first = a[data.value] ? a[data.value] : "";
        let second = b[data.value] ? b[data.value] : "";
        return second - first;
      });
    // console.log('data :', data, resultList, newList);
    dispatch({ type: "UPDATE_SEARCH_RESULT", payload: newList });
  };

  const onSearchQuery = (list, identifier) => {
    let tempQuery= _.cloneDeep(searchQuery);
    tempQuery[identifier]= list;
    // console.log("onSearchQuery",list, identifier, tempQuery);
    setSearchQuery(tempQuery);
  }
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
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
