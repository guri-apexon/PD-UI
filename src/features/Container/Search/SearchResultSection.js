import Panel from "apollo-react/components/Panel";
import _ from "lodash";
import Typography from "apollo-react/components/Typography";
import classNames from "classnames";
import React from "react";
import SearchListingSection from "./SearchListingSection";
import data from "./Data/row.data";
import SearchIcon from "apollo-react-icons/Search";
import Search from "apollo-react/components/Search";
import Button from "apollo-react/components/Button";
import CustomCard from "./CustomFilterCards";
import searchData from "./Data/search.metadata";
import FilterSection from "./FilterSection";
import Link from "apollo-react/components/Link";
import MenuItem from "apollo-react/components/MenuItem";
import SelectButton from "apollo-react/components/SelectButton";
import AlignJustify from "apollo-react-icons/AlignJustify";
import Chip from "apollo-react/components/Chip";
import Grid from "apollo-react/components/Grid";

import NoResultFound from "../../Components/NoResultFound";

import { SORT_DROPDOWN } from "../../../AppConstant/AppConstant";

import Loader from "../../Components/Loader/Loader";
import { connect } from "react-redux";

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seachValue: [],
      defaultExpand: false,
      accID: "",
      accordionObj: {},
      resultListData: { loader: null },
      sortValue: "1",
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (
      _.isEmpty(state.accordionObj) ||
      props.resultList.loader !== state.resultListData.loader ||
      props.resultList !== state.resultListData
    ) {
     
      let defaultValue = false;

      //For resetting ExpandAll button when all are expanded and Search button is click
      if (
        state.defaultExpand === true &&
        props.resultList &&
        props.resultList.data &&
        props.resultList.data.length > 0
      ) {
        let defaultVal = props.resultList.data.filter((value) => {
          return value.expanded && value.expanded === true;
        });
        if (defaultVal.length > 0) {
          defaultValue = true;
        } else {
          defaultValue = false;
        }
        
      }
      let result =
        props.resultList && props.resultList.data ? props.resultList.data : [];
      let arr = [];
      for (let i = 0; i < result.length; i++) {
        let obj = _.cloneDeep(result[i]);
        obj.expanded = result[i].expanded ? result[i].expanded : false;
        obj.id = result[i].AiDocId;
        // let obj = {
        //   expanded: result[i].expanded ? result[i].expanded : false,
        //   id: result[i].protocolNumber,
        //   ...result[i],
        // };
        // debugger
        arr.push(obj);
      }
      return {
        accordionObj: arr,
        resultListData: props.resultList,
        defaultExpand: defaultValue,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }
  componentDidMount() {
    
  }
  setExpanded = (id, obj, data) => {
    const { updateAssociateProtocol } = this.props;
    const { accordionObj } = this.state;
    
    // if (obj.expanded) {
    //   // dispatch({type:"UPDATE_SEARCH_ASSCIATED_PROTOCOLS", payload: data})
    //   updateAssociateProtocol(data, accordionObj);
    // }
    let accObj = accordionObj;
    let foundIndex = accObj.findIndex((obj) => obj.id === id);
    accObj[foundIndex].expanded = !accObj[foundIndex].expanded;
    if (accObj[foundIndex].expanded === false) {
      accObj[foundIndex].viewAssociate = false;
    }
   

    this.setState({
      accordionObj: [
        ...this.state.accordionObj.slice(0, foundIndex),
        Object.assign({}, this.state.accordionObj[foundIndex], obj),
        ...this.state.accordionObj.slice(foundIndex + 1),
      ],
    });
  };

  onViewAssociateProtocolClick = (data) => {
    const { updateAssociateProtocol } = this.props;
    const { accordionObj } = this.state;
    updateAssociateProtocol(data, accordionObj);
  };

  componentDidUpdate(prevProps, prevState) {
    
    const { accordionObj } = this.state;
    // if (prevState.defaultExpand !== this.state.defaultExpand) {
    // let arr = accordionObj.map(item => {
    //   return { ...item, expanded: true };
    // });
    

    // this.setState({
    //   accordionObj: accordionObj.map((item) => {
    //     return { ...item, expanded: true };
    //   }),
    // });
    // }
  }

  sortChange = (value) => {
    const { onSortChange } = this.props;
    
    let filterValue = SORT_DROPDOWN.filter((item) => item.id === value);
    
    onSortChange(filterValue[0], value);
    // this.setState({ sortValue: value.id });
  };
  onExpandAllClick = () => {
    const { accordionObj, defaultExpand } = this.state;
    let tempDefault = true;
    if (!defaultExpand) {
      tempDefault = true;
    } else {
      tempDefault = false;
    }
    let arr = accordionObj.map((item) => {
      let temp = _.cloneDeep(item);
      temp.expanded = tempDefault;
      temp.viewAssociate = tempDefault === false ? false : temp.viewAssociate;
      return temp;
    });
    this.setState({
      defaultExpand: !this.state.defaultExpand,
      accordionObj: arr,
    });
  };

  onConstructSearchQuery = (list, identifier) => {
    const { onSearchQuery } = this.props;
   
    onSearchQuery(list, identifier);
  };
  clearAllCheckbox = () => {
    
    // this.state["searchValue"] = [];
    // this.setState({ searchValue: [] });
    if (this.props.searchInput) {
      this.props.hancleClearAll(true, this.props.searchInput);
      // this.props.history.push(`/search?key=${this.props.searchInput}`);
    } else {
      this.props.hancleClearAll(false);
      // this.props.history.push(`/search`);
    }

    // window.location.reload();
  };

  render() {
    const {
      filterList = [],
      resultList,
      onSearchChange,
      sponsorData,
      indicationData,
      searchQuery,
      sortValueProp,
      dateRangeValue
    } = this.props;
    const { accordionObj, sortValue, defaultExpand } = this.state;
    

    let protocols = resultList.data && resultList.data.length;
    let maxRecordsPerPage = 10;
    let noOfProtocolsPerPages =
      protocols > 0
        ? protocols > maxRecordsPerPage
          ? protocols / maxRecordsPerPage
          : protocols
        : 0;

    return (
      <div id="searchPanel" className="searchPanel">
        <Grid container md={12}>
          <Grid md={3}>
            <div variant="body2">
              {
                <div className="refine-search">
                  <span>Refine your Search</span>
                  <div style={{ paddingTop: 5 }}>
                    <Link onClick={this.clearAllCheckbox} size="small">
                      {" "}
                      Clear All
                    </Link>
                  </div>
                  {/* <div className="floatRight">
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={this.props.handleApplyFilter}
                    >
                      Apply Filter
                    </Button>
                  </div> */}
                </div>
              }
            </div>
            <div>
              <FilterSection
                name="TOC"
                onConstructSearchQuery={this.onConstructSearchQuery}
                searchQuery={searchQuery}
              />
              <FilterSection
                name="sponsor"
                sponsorData={sponsorData}
                onConstructSearchQuery={this.onConstructSearchQuery}
                searchQuery={searchQuery}
              />
              <FilterSection
                name="indication"
                indicationData={indicationData}
                onConstructSearchQuery={this.onConstructSearchQuery}
                searchQuery={searchQuery}
              />
              <FilterSection
                name="phase"
                onConstructSearchQuery={this.onConstructSearchQuery}
                searchQuery={searchQuery}
              />
              <FilterSection
                name="document"
                onConstructSearchQuery={this.onConstructSearchQuery}
                searchQuery={searchQuery}
              />
              <FilterSection
                name="date"
                onConstructSearchQuery={this.onConstructSearchQuery}
                searchQuery={searchQuery}
                dateRangeValue={dateRangeValue}
              />
              {/* {filterList.length > 0 &&
                filterList.map((section, index) => (
                  <FilterSection
                    state={this.state}
                    key={section.sectionId}
                    section={section}
                    index={index}
                  />
                ))} */}
              {/* {filterList.length === 0 && (
                <div
                  style={{
                    height: 400,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Loader />
                </div>
              )} */}
            </div>
          </Grid>

          <Grid md={9}>
            <div className="width100 ">
              {accordionObj.length > 0 && (
                <>
                  <div className="page-count">
                    <span>
                      Showing {accordionObj.length === 0 ? "0" : "1"} -{" "}
                      {protocols} of {protocols}{" "}
                    </span>
                  </div>

                  <div className="search-icon">
                    <SearchIcon style={{ color: "#0557d5" }} size="small" />
                  </div>

                  <div className="sort-by" data-testid="sortby-container">
                    <span>Sort by</span>
                    <SelectButton
                      placeholder=""
                      size="small"
                      style={{ marginRight: 10 }}
                      value={sortValueProp}
                      defaultValue={sortValueProp}
                      onChange={(value) => this.sortChange(value)}
                    >
                      {/* <MenuItem value="1">{"Relevancy"}</MenuItem>
                  <MenuItem value="2">{"Approval Date"}</MenuItem>
                   <MenuItem value="3">{"Upload Date"}</MenuItem> */}
                      {SORT_DROPDOWN.map((item) => (
                        <MenuItem
                          data-testid={`sortby-container${item.id}`}
                          key={item.id}
                          value={item.id}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </SelectButton>
                  </div>
                  <div
                    className="expand-all"
                    onClick={() => this.onExpandAllClick()}
                  >
                    <AlignJustify style={{ color: "blue" }} size="small" />
                    <span>
                      {!defaultExpand ? "Expand All" : "Collapse All"}
                    </span>
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
                </>
              )}
              {!resultList.loader &&
              resultList.success &&
              accordionObj.length !== 0
                ? accordionObj.map((protocol, i) => (
                    <div key={protocol.AiDocId}>
                      <SearchListingSection
                        setExpanded={this.setExpanded}
                        data={protocol}
                        key={protocol.AiDocId}
                        compareTwoProtocol={this.props.compareTwoProtocol}
                        selection={this.props.selection}
                        history={this.props.history}
                        onViewAssociateProtocolClick={
                          this.onViewAssociateProtocolClick
                        }
                      />
                    </div>
                  ))
                : resultList.search && (
                    <div>
                      {!resultList.loader ? (
                        <NoResultFound />
                      ) : (
                        <div
                          style={{
                            height: 400,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Loader />
                        </div>
                      )}
                    </div>
                  )}
              {/* {resultList.loader && <Loader />} */}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAssociateProtocol: (data, obj) =>
      dispatch({
        type: "UPDATE_SEARCH_ASSOCIATED_PROTOCOLS",
        payload: { data, obj },
      })
  };
};
export default connect(null, mapDispatchToProps)(SearchPanel);
