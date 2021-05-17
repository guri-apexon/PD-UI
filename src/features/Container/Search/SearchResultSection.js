import React from "react";
import _ from "lodash";
import SearchListingSection from "./SearchListingSection";
import SearchIcon from "apollo-react-icons/Search";
import Button from "apollo-react/components/Button";
import FilterSection from "./FilterSection";
import Link from "apollo-react/components/Link";
import MenuItem from "apollo-react/components/MenuItem";
import SelectButton from "apollo-react/components/SelectButton";
import AlignJustify from "apollo-react-icons/AlignJustify";
import Chip from "apollo-react/components/Chip";
import Grid from "apollo-react/components/Grid";
import Pagination from "apollo-react/components/Pagination";
// import { Pagination } from '@material-ui/lab';
// import Pagination from '@material-ui/lab/Pagination';
import NoResultFound from "../../Components/NoResultFound";

import { SORT_DROPDOWN } from "../../../AppConstant/AppConstant";

import Loader from "../../Components/Loader/Loader";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_URL_8000 } from "../../../utils/api";
import { toast } from "react-toastify";
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
        props.resultList.data.data &&
        props.resultList.data.data.length > 0
      ) {
        let defaultVal = props.resultList.data.data.filter((value) => {
          return value.expanded && value.expanded === true;
        });
        if (defaultVal.length > 0) {
          defaultValue = true;
        } else {
          defaultValue = false;
        }
      }
      let result =
        props.resultList && props.resultList.data && props.resultList.data.data
          ? props.resultList.data.data
          : [];
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
  componentDidMount() {}
  setExpanded = (id, obj, data) => {
    const { updateAssociateProtocol } = this.props;
    const { accordionObj } = this.state;
    // if (obj.expanded) {
    //   // dispatch({type:"UPDATE_SEARCH_ASSCIATED_PROTOCOLS", payload: data})
    //   updateAssociateProtocol(data, accordionObj);
    // }
    let accObj = _.cloneDeep(accordionObj);
    let foundIndex = accObj.findIndex((obj) => obj.id === id);
    accObj[foundIndex].expanded = !accObj[foundIndex].expanded;
    if (accObj[foundIndex].expanded === false) {
      accObj[foundIndex].viewAssociate = false;
    }

    // this.setState({
    //   accordionObj: [
    //     ...this.state.accordionObj.slice(0, foundIndex),
    //     Object.assign({}, this.state.accordionObj[foundIndex], obj),
    //     ...this.state.accordionObj.slice(foundIndex + 1),
    //   ],
    // });
    this.setState({ accordionObj: accObj });
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
    value && onSortChange(filterValue[0], value);
    // this.setState({ sortValue: value.id });
  };
  onExpandAllClick = () => {
    const { accordionObj, defaultExpand } = this.state;
    const { updateSearchResult, resultList } = this.props;
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
    const obj1 = {
      search: true,
      loader: false,
      success: true,
      data: {
        ...resultList.data,
        data: [...arr],
      },
    };
    updateSearchResult(obj1);
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
  // onPageChange= (data, value)=>{
  //   const {onSetPage}= this.props;
  //   onSetPage(data, value)
  // }
  onPageChange = (value) => {
    const { onSetPage } = this.props;
    onSetPage(value);
  };
  handleFollow = (e, checked, protocol) => {
    const { userDetails } = this.props;
    console.log("e, checked, protocol :", e, checked, protocol, userDetails);
    const id = userDetails.userId;
    const { accordionObj } = this.state;
    let accObj = _.cloneDeep(accordionObj);
    let newObj = accObj.map((obj) => {
      if (
        obj.protocolNumber &&
        obj.protocolNumber.toLowerCase() ===
          protocol.protocolNumber.toLowerCase()
      ) {
        // if (obj.protocolNumber && (obj.protocolNumber === protocol.protocolNumber)) {
        return { ...obj, followed: !obj.followed };
      } else {
        return obj;
      }
    });
    // axios.post(
    //   // `http://ca2spdml01q:8001/api/follow_protocol/`,
    //   `${BASE_URL_8000}/api/follow_protocol/`,
    //   {
    //     userId:id.substring(1),
    //     protocol:protocol.protocolNumber,
    //     follow: checked,
    //     userRole:'secondary'
    //   }
    // )
    // .then( res=>{
    // if(res && res.status===200){
    //   // toast.info(`Protocol Successfully ${checked ? 'Followed' : 'Unfollowed'}`);
    this.setState({ accordionObj: newObj });
    // }
    // })
    // .catch(()=>{
    //   toast.error("Something Went Wrong");
    // })
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
      dateRangeValue,
      protocolSelected,
      clearAll,
      page,
      setPage,
      totalSearchResult,
      getSearchInput,
    } = this.props;
    const { accordionObj, sortValue, defaultExpand } = this.state;

    // let protocols = resultList.data && resultList.data.length;
    // let maxRecordsPerPage = 10;
    // let noOfProtocolsPerPages =
    //   protocols > 0
    //     ? protocols > maxRecordsPerPage
    //       ? protocols / maxRecordsPerPage
    //       : protocols
    //     : 0;

    return (
      <div id="searchPanel" className="searchPanel">
        <Grid container md={12}>
          <Grid md={3}>
            <div variant="body2">
              {
                <div className="refine-search">
                  <span>Refine your Search</span>
                  <div>
                    <Button
                      variant="secondary"
                      size="small"
                      style={{ marginRight: -20 }}
                      onClick={this.clearAllCheckbox}
                    >
                      Clear All
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="secondary"
                      size="small"
                      style={{ marginRight: 0 }}
                      onClick={() => getSearchInput()}
                      data-testid="apply-filter-button"
                    >
                      Apply Filter
                    </Button>
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
                clearAll={clearAll}
              />
              <FilterSection
                name="sponsor"
                sponsorData={sponsorData}
                onConstructSearchQuery={this.onConstructSearchQuery}
                searchQuery={searchQuery}
                clearAll={clearAll}
              />
              <FilterSection
                name="indication"
                indicationData={indicationData}
                onConstructSearchQuery={this.onConstructSearchQuery}
                searchQuery={searchQuery}
                clearAll={clearAll}
              />
              <FilterSection
                name="phase"
                onConstructSearchQuery={this.onConstructSearchQuery}
                searchQuery={searchQuery}
                clearAll={clearAll}
              />
              <FilterSection
                name="document"
                onConstructSearchQuery={this.onConstructSearchQuery}
                searchQuery={searchQuery}
                clearAll={clearAll}
              />
              <FilterSection
                name="date"
                onConstructSearchQuery={this.onConstructSearchQuery}
                searchQuery={searchQuery}
                dateRangeValue={dateRangeValue}
                clearAll={clearAll}
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
                    {/* <span>
                      Showing {accordionObj.length === 0 ? "0" : "1"} -{" "}
                      {protocols} of {protocols}{" "}
                    </span> */}
                    <span>
                      Showing {page * 10 + 1} -{" "}
                      {page * 10 + 10 < resultList.data.total_count
                        ? page * 10 + 10
                        : resultList.data.total_count}{" "}
                      of{" "}
                      {resultList &&
                        resultList.data &&
                        resultList.data.total_count}{" "}
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
                        protocolSelected={protocolSelected}
                        page={page}
                        setPage={setPage}
                        handleFollow={this.handleFollow}
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
              {!resultList.loader &&
                resultList.success &&
                accordionObj.length !== 0 && (
                  <div className="search-pagination">
                    {" "}
                    <Pagination
                      count={
                        resultList &&
                        resultList.data &&
                        resultList.data.total_count
                      }
                      rowsPerPage={10}
                      page={page}
                      onChangePage={this.onPageChange}
                    />
                  </div>
                )}
              {/* { !resultList.loader &&
              resultList.success &&
              accordionObj.length !== 0 && <div> <Pagination count={totalSearchResult &&Math.ceil(totalSearchResult.length/10)} rowsPerPage={10} page={page} onChange={this.onPageChange} /></div>} */}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userDetails: state.user.userDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateAssociateProtocol: (data, obj) =>
      dispatch({
        type: "UPDATE_SEARCH_ASSOCIATED_PROTOCOLS",
        payload: { data, obj },
      }),
    updateSearchResult: (obj) =>
      dispatch({ type: "UPDATE_SEARCH_RESULT", payload: obj }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
