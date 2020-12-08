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

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seachValue: [] };
  }

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

        console.log(resultList)
    return (
      <div id="searchPanel">
        <Panel width="20%">
          <Typography variant="body2" gutterBottom>
            {
              <div className="width100 refine-search">
                <span>Refine your Search</span>
                <div className="floatRight">
                  <Link onClick={clearAllCheckbox} size="small">
                    {" "}
                    Clear All
                  </Link>
                </div>
              </div>
            }
          </Typography>
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
          <Typography variant="body1" gutterBottom>
            <div className="width100">
              <div className="width100 marginTop">
                <div className="width100 ">
                  <div className="width150px marginLeft10">
                    <span>
                      Showing 1 - {noOfProtocolsPerPages} of {protocols}{" "}
                    </span>
                  </div>
                  <div className="width5">
                    <SearchIcon style={{ color: "#0557d5" }} size="small" />
                  </div>
                  <div id="chip"></div>
                  {resultList.success && resultList.data.map((protocol) => (
                    <div>
                      <CompositeAccordion data={protocol} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Typography>
        </Panel>
      </div>
    );
  }
}
