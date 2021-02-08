import React, { useEffect } from "react";
import Collapsible from "react-collapsible";

import {
  CheckboxCard,
  TextCard,
  RadioCard,
  DateRangeCard,
  TableOfContent,
  CheckboxTest,
} from "./CustomFilterCards";

import Loader from "../../Components/Loader/Loader";

import { useSelector, useDispatch } from "react-redux";
import { indications, sponsors } from "./searchSlice";

import {
  TOC,
  phases,
  documentStatus,
  dateSection,
  dateType,
} from "./Data/constants";

const CollapseCard = ({
  name,
  indicationData,
  sponsorData,
  onConstructSearchQuery,
  searchQuery,
  dateRangeValue,
  clearAll
}) => {
  if (name === "TOC") {
    return (
      <Collapsible trigger={TOC.sectionName}>
        {/* <TextCard section={TOC} /> */}
        {TOC.sectionContent && TOC.sectionContent.length > 0 && (
          <CheckboxCard
            section={TOC}
            identifier="toc"
            onCheckboxClick={onConstructSearchQuery}
            listValue={searchQuery.toc}
          />
        )}
      </Collapsible>
    );
  } else if (name === "indication") {
    return (
      <div className="spon-container">
        <Collapsible trigger="Indications">
          {indicationData.sectionContent &&
          indicationData.sectionContent.length > 0 ? (
            <CheckboxTest
              section={indicationData}
              identifier="indication"
              onCheckboxClick={onConstructSearchQuery}
              listValue={searchQuery.indication}
              clearAll={clearAll}
            />
          ) : (
            <div
              style={{
                height: 300,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Loader />
            </div>
          )}
        </Collapsible>
      </div>
    );
  } else if (name === "sponsor") {
    return (
      <div className="spon-container">
        <Collapsible trigger="Sponsors">
          {sponsorData.sectionContent &&
          sponsorData.sectionContent.length > 0 ? (
            <CheckboxTest
              section={sponsorData}
              identifier="sponsor"
              onCheckboxClick={onConstructSearchQuery}
              listValue={searchQuery.sponsor}
              clearAll={clearAll}
            />
          ) : (
            <div
              style={{
                height: 300,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Loader />
            </div>
          )}
        </Collapsible>
      </div>
    );
  } else if (name === "phase") {
    return (
      <Collapsible trigger={phases.sectionName}>
        <CheckboxCard
          section={phases}
          identifier="phase"
          onCheckboxClick={onConstructSearchQuery}
          listValue={searchQuery.phase}
        />
      </Collapsible>
    );
  } else if (name === "document") {
    return (
      <Collapsible trigger={documentStatus.sectionName}>
        <CheckboxCard
          section={documentStatus}
          identifier="documentStatus"
          onCheckboxClick={onConstructSearchQuery}
          listValue={searchQuery.documentStatus}
        />
      </Collapsible>
    );
  } else if (name === "date") {
    return (
      <span className="date-filter">
        <Collapsible
          trigger={dateSection.sectionName}
          classname="testing"
          style={{ height: "550px", float: "left", width: "100%" }}
        >
          <DateRangeCard
            section={dateSection}
            dateType={dateType}
            identifier="dateType"
            identifier2="dateSection"
            onCheckboxClick={onConstructSearchQuery}
            listValue={
              searchQuery.dateType &&
              searchQuery.dateType.length > 0 &&
              searchQuery.dateType[0]
            }
            listValue2={
              searchQuery.dateSection &&
              searchQuery.dateSection.length > 0 &&
              searchQuery.dateSection[0]
            }
            dateRangeValue={dateRangeValue}
            clearAll={clearAll}
          />
        </Collapsible>
      </span>
    );
  }
  return null;
  // return (
  //   <Collapsible trigger={section.sectionName}>
  //     {section.fieldType === "text" ? (
  //       <TableOfContent
  //         state={state}
  //         key={section.sectionId}
  //         section={section}
  //         index={index}
  //       />
  //     ) : section.fieldType === "radio" ? (
  //       section.sectionName === "Date Range" ? (
  //         <DateRangeCard
  //           state={state}
  //           key={section.sectionId}
  //           section={section}
  //           index={index}
  //         />
  //       ) : (
  //         <RadioCard
  //           state={state}
  //           key={section.sectionId}
  //           section={section}
  //           index={index}
  //         />
  //       )
  //     ) : (
  //       <CheckboxCard
  //         state={state}
  //         key={section.sectionId}
  //         section={section}
  //         index={index}
  //       />
  //     )}
  //   </Collapsible>
  // );
};

export default CollapseCard;
