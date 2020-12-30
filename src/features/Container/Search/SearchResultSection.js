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
      console.log("Get Static");
      let result =
        props.resultList && props.resultList.data ? props.resultList.data : [];
      let arr = [];
      for (let i = 0; i < result.length; i++) {
        let obj = {
          expanded: result[i].expanded? result[i].expanded: false ,
          id: result[i].protocolNumber,
          ...result[i],
        };
        arr.push(obj);
      }
      return {
        accordionObj: arr,
        resultListData: props.resultList,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }
  componentDidMount() {
    // console.log("iiiiiiiooooooiii", this.state);
  }
  setExpanded = (id, obj, data) => {
    const { updateAssociateProtocol } = this.props;
    const { accordionObj } = this.state;
    console.log("Expand");
    if (obj.expanded) {
      // dispatch({type:"UPDATE_SEARCH_ASSCIATED_PROTOCOLS", payload: data})
      updateAssociateProtocol(data, accordionObj);
    }
    let accObj = accordionObj;
    let foundIndex = accObj.findIndex((obj) => obj.id === id);
    accObj[foundIndex].expanded = !accObj[foundIndex].expanded;
    // console.log(accObj);
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
    console.log("Did Update");
    const { accordionObj } = this.state;
    // if (prevState.defaultExpand !== this.state.defaultExpand) {
    // let arr = accordionObj.map(item => {
    //   return { ...item, expanded: true };
    // });
    // console.log("Click expand", arr);

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
    // console.log("value", value, filterValue);
    onSortChange(filterValue[0]);
    this.setState({ sortValue: value.id });
  };
  onExpandAllClick = () => {
    const { accordionObj, defaultExpand } = this.state;
    const { updateAllAssociateProtocol } = this.props;
    let tempDefault = true;
    if (!defaultExpand) {
      tempDefault = true;
    } else {
      tempDefault = false;
    }
    let arr = accordionObj.map((item) => {
      let temp = _.cloneDeep(item);
      temp.expanded = tempDefault;
      return temp;
    });
    if (tempDefault) {
      updateAllAssociateProtocol(accordionObj);
    }
    this.setState({
      defaultExpand: !this.state.defaultExpand,
      accordionObj: arr,
    });
  };

  onConstructSearchQuery = (list, identifier) =>{
  console.log('list, identifier :', list, identifier);
    // onSearchQuery
  }

  render() {
    const {
      filterList = [],
      resultList,
      onSearchChange,
      sponsorData,
      indicationData,
    } = this.props;
    const { accordionObj, sortValue, defaultExpand } = this.state;
    const clearAllCheckbox = () => {
      // console.log(this.state["searchValue"]);
      this.state["searchValue"] = [];
      this.setState({ searchValue: [] });
    };

    let protocols = resultList.data && resultList.data.length;
    let maxRecordsPerPage = 10;
    let noOfProtocolsPerPages =
      protocols > 0
        ? protocols > maxRecordsPerPage
          ? protocols / maxRecordsPerPage
          : protocols
        : 0;

    console.log(accordionObj, "props1223", resultList, protocols);

    return (
      <div id="searchPanel" className="searchPanel">
        <Grid container md={12}>
          <Grid md={3}>
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
              <FilterSection name="TOC" />
              <FilterSection name="sponsor" sponsorData={sponsorData} onConstructSearchQuery={this.onConstructSearchQuery} />
              <FilterSection
                name="indication"
                indicationData={indicationData}
              />
              <FilterSection name="phase" />
              <FilterSection name="document" />
              <FilterSection name="date" />
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
              <div className="page-count">
                <span>
                  Showing {accordionObj.length === 0 ? "0" : "1"} -{" "}
                  {noOfProtocolsPerPages} of {protocols}{" "}
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
                  value={sortValue}
                  defaultValue="1"
                  onChange={(value) => this.sortChange(value)}
                >
                  {/* <MenuItem value="1">{"Relevancy"}</MenuItem>
                  <MenuItem value="2">{"Approval Date"}</MenuItem>
                   <MenuItem value="3">{"Upload Date"}</MenuItem> */}
                  {SORT_DROPDOWN.map((item) => (
                    <MenuItem value={item.id}>{item.label}</MenuItem>
                  ))}
                </SelectButton>
              </div>
              <div
                className="expand-all"
                onClick={() => this.onExpandAllClick()}
              >
                <AlignJustify style={{ color: "blue" }} size="small" />
                <span>{!defaultExpand ? "Expand All" : "Collapse All"}</span>
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
              {!resultList.loader &&
              resultList.success &&
              accordionObj.length !== 0
                ? accordionObj.map((protocol, i) => (
                    <div key={protocol.protocolNumber}>
                      <SearchListingSection
                        setExpanded={this.setExpanded}
                        data={protocol}
                        key={protocol.protocolNumber}
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
      }),
    updateAllAssociateProtocol: (data) =>
      dispatch({
        type: "UPDATE_ALL_SEARCH_ASSOCIATED_PROTOCOLS",
        payload: data,
      }),
  };
};
export default connect(null, mapDispatchToProps)(SearchPanel);
