import Panel from "apollo-react/components/Panel";
import Typography from "apollo-react/components/Typography";
import classNames from "classnames";
import React, { useState } from "react";
import { CompositeAccordion } from "./CompositeAccordion";
import data from "./Data/row.data";
import SearchIcon from "apollo-react-icons/Search";
import Search from "apollo-react/components/Search";
import Button from "apollo-react/components/Button";
import CustomCard from "./Customcards";
import searchData from "./Data/search.metadata";
import CollapseCard from "./CollapseCard";
import Link from "apollo-react/components/Link";
import MenuItem from "apollo-react/components/MenuItem";
import SelectButton from "apollo-react/components/SelectButton";
import AlignJustify from "apollo-react-icons/AlignJustify";
import Chip from "apollo-react/components/Chip";

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seachValue: [], defaultExpand: false, accID: "" };
  }
  setExpanded = (id) => {
    console.log(id);
    if(id===this.state.accID){
      this.setState({ accID: "" });
    }else{
      this.setState({ accID: id });
    }
    
  };

  render() {
    const { filterList, resultList } = this.props;
    const clearAllCheckbox = () => {
      console.log(this.state["searchValue"]);
      this.state["searchValue"] = [];
      this.setState({ searchValue: [] });
    };

    let protocols = resultList.data && resultList.data.length;
    let maxRecordsPerPage = 2;
    let noOfProtocolsPerPages =
      protocols > 0
        ? protocols > maxRecordsPerPage
          ? protocols / maxRecordsPerPage
          : protocols
        : 0;

    console.log(this.props, "props");
    return (
      <div id="searchPanel" className="searchPanel">
        <Panel width="20%">
          <div variant="body2">
            {
              <div className="width100 refine-search">
                <span>Refine your Search</span>
                <div className="floatRight" style={{paddingRight:5}}>
                  <Link onClick={clearAllCheckbox} size="small">
                    {" "}
                    Clear All
                  </Link>
                </div>
              </div>
            }
          </div>
          <div>
            {filterList.map((section, index) => (
              <CollapseCard
                state={this.state}
                key={section.sectionId}
                section={section}
                index={index}
              />
            ))}
          </div>
        </Panel>
        <Panel width="78%" hideButton>
          <div variant="body1">
            <div className="width100">
              <div className="width100">
                <div className="width100 ">
                  <div className="page-count">
                    <span>
                      Showing 1 - {noOfProtocolsPerPages} of {protocols}{" "}
                    </span>
                  </div>

                  <div className="search-icon">
                    <SearchIcon style={{ color: "#0557d5" }} size="small" />
                  </div>

                  <div className="sort-by">
                    <span>Sort by</span>
                    <SelectButton
                      placeholder=""
                      size="small"
                      style={{ marginRight: 10 }}
                      value={"1"}
                      defaultValue="1"
                    >
                      <MenuItem value="1">{"Relevancy"}</MenuItem>
                      <MenuItem value="2">{"Approval Date"}</MenuItem>
                      <MenuItem value="3">{"Upload Date"}</MenuItem>
                    </SelectButton>
                  </div>
                  <div
                    className="expand-all"
                    onClick={() => {
                      this.setState({
                        defaultExpand: !this.state.defaultExpand,
                      });
                    }}
                  >
                    <AlignJustify style={{ color: "blue" }} size="small" />
                    <span>Expand All</span>
                  </div>
                  <div id="chip" className="chip">
                    {this.props.searchInput && (
                      <Chip
                        color="white"
                        label={this.props["searchInput"]}
                        value={this.props["searchInput"]}
                        onDelete={(e) => this.props.deleteSearchInput(e)}
                        size={"small"}
                      />
                    )}
                  </div>
                  {resultList.success &&
                    resultList.data.map((protocol) => (
                      <div>
                        <CompositeAccordion
                          setExpanded={this.setExpanded}
                          defaultExpand={this.state.defaultExpand}
                          data={protocol}
                          key={protocol.protocolNumber}
                          accID={this.state.accID}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}
