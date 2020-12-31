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
} from "./searchSlice";

const Search = (props) => {
  const resultList = useSelector(searchResult);
  const filterList = useSelector(searchFilter);
  const indicationData = useSelector(indications);
  const sponsorData = useSelector(sponsors);

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
      let elasticSearchQuery ='';
      let tempQuery= _.cloneDeep(searchQuery);
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
      if ("?key" in parsed) {
        setIdPresent(true);
        setSearchInput(parsed[`?key`]);
        elasticSearchQuery+=` ${parsed[`?key`]}`;
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
    let elasticSearchQuery ='';
    if('sponsor' in parsed && sponsorData.sectionContent.length>0 ){
      let tempElasticQuery = sponsorData.sectionContent.filter(item => parsed.sponsor.split('+').includes(item.title));
      elasticSearchQuery+=  tempElasticQuery.map(item=>item.title).join(' ');
    }
    if('indication' in parsed && sponsorData.sectionContent.length>0 ){
      let tempElasticQuery = indicationData.sectionContent.filter(item => parsed.indication.split('+').includes(item.title)) 
      elasticSearchQuery+= ` ${tempElasticQuery.map(item=>item.title).join(' ')}`;
    }
    if ("key" in parsed) {
      setSearchInput(parsed[`key`]);
      elasticSearchQuery+=` ${parsed[`key`]}`;
    } 
    setIdPresent(true);
    setSearchInput(inp);
    // dispatch({ type: "GET_SEARCH_FILTER", payload: input });
    dispatch({ type: "GET_SEARCH_RESULT", payload: elasticSearchQuery });
    props.history.push(`/search?${resultQuery}`);
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
  // console.log('data :' ,resultList);

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
