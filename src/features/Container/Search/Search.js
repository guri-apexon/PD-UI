import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./search.scss";

//------------------- Components --------------------

import SearchResultSection from "./SearchResultSection";
import SearchSection from "./SearchSection";

//------------------- Third Party -----------------

import Breadcrumbs from "apollo-react/components/Breadcrumbs";
import Loader from "apollo-react/components/Loader";

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

  const [isLoading, setLoader] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let params = props.location.search;
    const parsed = queryString.parse(params);

    // dispatch({ type: "GET_SEARCH_FILTER", payload: parsed.searchKey });
    // dispatch({ type: "GET_SEARCH_RESULT", payload: parsed.searchKey });

    if ("key" in parsed) {
      setIdPresent(true);
      setSearchInput(parsed.key);
      dispatch({ type: "GET_SEARCH_FILTER", payload: parsed.key });

      dispatch({ type: "GET_SEARCH_RESULT", payload: parsed.key });
    } else {
      dispatch({ type: "GET_SEARCH_RESULT", payload: "" });
    }
  }, [dispatch]);
  const handleClick = (e) => {
    e.preventdefault();
    // console.log("Breadcrumb was clicked", e);
  };
  useEffect(() => {
    if (searchInput.length > 0) {
      setIdPresent(true);
      let params = props.location.search;
      const parsed = queryString.parse(params);

      // dispatch({ type: "GET_SEARCH_FILTER", payload: searchInput });
      // dispatch({ type: "GET_SEARCH_RESULT", payload: searchInput });
    }
  }, [searchInput]);

  const getSearchInput = (input) => {
    // debugger;
    // console.log(input);
    setIdPresent(true);
    setSearchInput(input);
    dispatch({ type: "GET_SEARCH_FILTER", payload: input });
    dispatch({ type: "GET_SEARCH_RESULT", payload: input });
  };
  const deleteSearchInput = () => {
    setSearchInput("");
    setIdPresent(false);
    props.history.push(`/Search`);
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
          />
        </div>
        <div>
          {!resultList.success ? (
            <Loader isInner />
          ) : (
            idPresent &&
            filterList.success && (
              <SearchResultSection
                filterList={filterList.data}
                resultList={resultList}
                searchInput={searchInput}
                deleteSearchInput={deleteSearchInput}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
