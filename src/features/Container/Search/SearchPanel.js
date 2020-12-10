import Panel from "apollo-react/components/Panel";
import _ from "lodash";
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
    this.state = {
      seachValue: [],
      defaultExpand: false,
      accID: "",
      accordionObj: {},
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (_.isEmpty(state.accordionObj) && props.resultList.success) {
      console.log("iiiiiii", props.resultList);
      let result = props.resultList.data;
      let arr = [];
      for (let i = 0; i < result.length; i++) {
        let obj = {
          expanded: false,
          id: result[i].protocolNumber,
          ...result[i],
        };
        arr.push(obj);
      }
      return {
        accordionObj: arr,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }
  componentDidMount() {
    console.log("iiiiiiiooooooiii", this.state);
  }
  setExpanded = (id, obj) => {
    const { accordionObj } = this.state;
    let accObj = accordionObj;
    let foundIndex = accObj.findIndex((obj) => obj.id === id);
    accObj[foundIndex].expanded = !accObj[foundIndex].expanded;
    console.log(accObj);
    // debugger;
    this.setState({
      accordionObj: [
        ...this.state.accordionObj.slice(0, foundIndex),
        Object.assign({}, this.state.accordionObj[foundIndex], obj),
        ...this.state.accordionObj.slice(foundIndex + 1),
      ],
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { accordionObj } = this.state;
    if (prevState.defaultExpand !== this.state.defaultExpand) {
      // let arr = accordionObj.map(item => {
      //   return { ...item, expanded: true };
      // });
      // console.log("Click expand", arr);

      this.setState({
        accordionObj: accordionObj.map(item => {
          return { ...item, expanded: true };
        })
      })
    }
  }

  render() {
    const { filterList, resultList } = this.props;
    const { accordionObj } = this.state;
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

    // console.log(this.props, "props");
    return (
      <div id="searchPanel" className="searchPanel">
        <Panel width="20%">
          <div variant="body2">
            {
              <div className="width100 refine-search">
                <span>Refine your Search</span>
                <div className="floatRight" style={{ paddingRight: 5 }}>
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
                    accordionObj.map((protocol, i) => (
                      <div>
                        <CompositeAccordion
                          setExpanded={this.setExpanded}
                          data={protocol}
                          key={protocol.protocolNumber}
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
