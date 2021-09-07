/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
import React from "react";
import Chip from "apollo-react/components/Chip";
import "./filterchips.scss";
import { useDispatch, useSelector } from "react-redux";
import { range } from "./searchSlice";
import { formatESDate } from "../../../utils/utilFunction";

// const disableChip = (arr, value) => {
//   let newArr = [...arr];
//   for (let i = 0; i < newArr.length; i++) {
//     if (newArr[i].id === value) {
//       newArr[i].disabled = true;
//     }
//   }
//   return newArr;
// };
const removeByAttr = function (arr, attr, value) {
  var i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr] === value
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
};
const FilterChip = (props) => {
  const { filters, onSearchQuery, setDateRangeValue } = props;
  const rangeDate = useSelector(range);
  const dispatch = useDispatch();
  console.log("Search", filters);

  const handleDelete = (item, list, identifier) => {
    console.log("You clicked the delete icon.", item, list, identifier);
    const newList = removeByAttr([...list], "id", item.id);
    const finalList = newList.map((item) => item.id);
    console.log("final List", finalList);
    onSearchQuery(finalList, identifier);
    // let newFilter = { ...filters };
    // newFilter[identifier] = newList;
    // setfilters(newFilter);
    // console.log(newList, identifier, finalList);
  };
  const renderDateSection = (data) => {
    console.log(data);
    if (data[0].value === "0") {
      return <div></div>;
    } else {
      return (
        <div className="section">
          <label>Date Section :</label>
          <div className="chip-inside" key={data[0].id}>
            <Chip
              color="white"
              size="small"
              label={data[0].title}
              disabled={data[0].disabled}
              onDelete={() => handleDateSectionDelete()}
            />
          </div>
        </div>
      );
    }
  };
  const handleDateSectionDelete = () => {
    onSearchQuery([1], "dateSection");
  };
  const handleDateTypeDelete = () => {
    onSearchQuery([1], "dateType");
  };
  const renderDateType = (data) => {
    console.log(data);
    if (data[0].value === "approval_date") {
      return <div></div>;
    } else {
      return (
        <div className="section">
          <label>Date Type :</label>
          <div className="chip-inside" key={data[0].id}>
            <Chip
              color="white"
              size="small"
              label={data[0].title}
              disabled={data[0].disabled}
              onDelete={() => handleDateTypeDelete()}
            />
          </div>
        </div>
      );
    }
  };
  const renderDateRange = (dateRange) => {
    return (
      <div className="section">
        <label>Date Range :</label>
        <div className="chip-inside">
          <Chip
            color="white"
            size="small"
            label={`${formatESDate(dateRange[0])} - ${formatESDate(
              dateRange[1]
            )}`}
            onDelete={() => handleDateRangeDelete()}
          />
        </div>
      </div>
    );
  };
  const handleDateRangeDelete = () => {
    setDateRangeValue([null, null]);
    const range = {
      from: null,
      to: null,
    };
    dispatch({ type: "FILTER_BY_DATE_RANGE_SAGA", payload: range });
  };
  if (
    filters.toc.length > 0 ||
    filters.sponsor.length > 0 ||
    filters.indication.length > 0 ||
    filters.phase.length > 0 ||
    filters.documentStatus.length > 0 ||
    filters.qcStatus.length > 0 ||
    (filters.dateType.length > 0 &&
      filters.dateType[0].value !== "approval_date") ||
    (filters.dateSection.length > 0 && filters.dateSection[0].value !== "0") ||
    (rangeDate.from && rangeDate.to)
  ) {
    return (
      <div className="filter-chip" data-testid="filter-chip">
        <div className="filters">
          {filters.toc.length > 0 && (
            <div className="section">
              <label>Table of Contents :</label>
              {filters.toc.map((item) => (
                <div className="chip-inside" key={item.id}>
                  <Chip
                    color="white"
                    size="small"
                    label={item.title}
                    disabled={item.disabled}
                    onDelete={() => handleDelete(item, filters.toc, "toc")}
                  />
                </div>
              ))}
            </div>
          )}
          {filters.sponsor.length > 0 && (
            <div className="section">
              <label>Sponsors :</label>
              {filters.sponsor.map((item) => (
                <div className="chip-inside" key={item.id}>
                  <Chip
                    color="white"
                    size="small"
                    label={item.title}
                    disabled={item.disabled}
                    onDelete={() =>
                      handleDelete(item, filters.sponsor, "sponsor")
                    }
                  />
                </div>
              ))}
            </div>
          )}
          {filters.indication.length > 0 && (
            <div className="section">
              <label>Indications :</label>
              {filters.indication.map((item) => (
                <div className="chip-inside" key={item.id}>
                  <Chip
                    color="white"
                    size="small"
                    label={item.title}
                    disabled={item.disabled}
                    onDelete={() =>
                      handleDelete(item, filters.indication, "indication")
                    }
                  />
                </div>
              ))}
            </div>
          )}
          {filters.phase.length > 0 && (
            <div className="section">
              <label>Phases :</label>
              {filters.phase.map((item) => (
                <div className="chip-inside" key={item.id}>
                  <Chip
                    color="white"
                    size="small"
                    label={item.title}
                    disabled={item.disabled}
                    onDelete={() => handleDelete(item, filters.phase, "phase")}
                  />
                </div>
              ))}
            </div>
          )}
          {filters.documentStatus.length > 0 && (
            <div className="section">
              <label>Document Status :</label>
              {filters.documentStatus.map((item) => (
                <div className="chip-inside" key={item.id}>
                  <Chip
                    color="white"
                    size="small"
                    label={item.title}
                    disabled={item.disabled}
                    onDelete={() =>
                      handleDelete(
                        item,
                        filters.documentStatus,
                        "documentStatus"
                      )
                    }
                  />
                </div>
              ))}
            </div>
          )}
          {filters.qcStatus.length > 0 && (
            <div className="section">
              <label>QC Activity :</label>
              {filters.qcStatus.map((item) => (
                <div className="chip-inside" key={item.id}>
                  <Chip
                    color="white"
                    size="small"
                    label={item.title}
                    disabled={item.disabled}
                    onDelete={() =>
                      handleDelete(item, filters.qcStatus, "qcStatus")
                    }
                  />
                </div>
              ))}
            </div>
          )}
          {filters.dateType.length > 0 && renderDateType(filters.dateType)}
          {filters.dateSection.length > 0 &&
            renderDateSection(filters.dateSection)}
          {renderDateRange([rangeDate.from, rangeDate.to])}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default FilterChip;
