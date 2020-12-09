import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./search.scss";

//------------------- Components --------------------

import SearchPanel from "./SearchPanel";
import ProtocolSearchButton from "./ProtocolSearchButton";

//------------------- Third Party -----------------

import Breadcrumbs from "apollo-react/components/Breadcrumbs";

//------------------- Redux -----------------
import { useSelector, useDispatch } from "react-redux";
import {
  getFilters,
  getSearchResult,
  searchFilter,
  searchResult,
} from "./searchSlice";

const Search = (props) => {
  const resultList = useSelector(searchResult);
  const filterList = useSelector(searchFilter);

  const dispatch = useDispatch();
  const [idPresent, setIdPresent] = useState(false);

  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    let params = props.location.search;
    const parsed = queryString.parse(params);

    // dispatch({ type: "GET_SEARCH_FILTER", payload: parsed.searchKey });
    // dispatch({ type: "GET_SEARCH_RESULT", payload: parsed.searchKey });

    if ("key" in parsed) {
      setIdPresent(true);
      setSearchInput(parsed.key)
      dispatch({ type: "GET_SEARCH_FILTER", payload: parsed.searchKey });
      dispatch({ type: "GET_SEARCH_RESULT", payload: parsed.searchKey });
    }
  }, [dispatch]);
  const handleClick = (e) => {
    e.preventdefault();
    console.log("Breadcrumb was clicked", e);
  };
  useEffect(()=>{
    if(searchInput.length>0){
      setIdPresent(true);
      let params = props.location.search;
    const parsed = queryString.parse(params);
      dispatch({ type: "GET_SEARCH_FILTER", payload: parsed.searchKey });
      dispatch({ type: "GET_SEARCH_RESULT", payload: parsed.searchKey });
      console.log("--------777777777")
    }
  },[searchInput])

  const getSearchInput = (input)=>{
    console.log(input)
    setIdPresent(true);
    setSearchInput(input)
  }
  const deleteSearchInput = ()=>{
    setSearchInput("")
    setIdPresent(false)
    props.history.push(`/Search`)
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
      <div className="marginLeft10 MuiTableCell-root">
        <div className="width100 floatLeft">
          <ProtocolSearchButton getSearchInput={getSearchInput} history={props.history}/>
        </div>
        <div className="width100 floatLeft">
          {idPresent && filterList.success && <SearchPanel filterList={filterList.data} resultList={resultList} searchInput={searchInput} deleteSearchInput={deleteSearchInput}/>}
        </div>
      </div>
    </div>
  );
};

export default Search;
