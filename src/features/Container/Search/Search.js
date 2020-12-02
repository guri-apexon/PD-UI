import React, { Component } from "react";
import "./search.scss";

//------------------- Components --------------------

import SearchPanel from "./SearchPanel";
import ProtocolSearchButton from "./ProtocolSearchButton";

//------------------- Third Party -----------------

import Breadcrumbs from "apollo-react/components/Breadcrumbs";

const Search = () => {
  const handleClick = (e) => {
    e.preventdefault();
    console.log("Breadcrumb was clicked", e);
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
      <div
        className="marginLeft10 MuiTableCell-root"
      >
        <div className="width100 floatLeft">
          <ProtocolSearchButton />
        </div>
        <div className="width100 floatLeft">
          <SearchPanel />
        </div>
      </div>
    </div>
  );
};

export default Search;
