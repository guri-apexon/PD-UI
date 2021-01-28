import React, { useEffect } from "react";
import Collapsible from "react-collapsible";

import {
  CheckboxCard,
  TextCard,
  RadioCard,
  DateRangeCard,
  TableOfContent,
} from "./CustomFilterCards";

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
    console.log("Indication data", indicationData);
    return (
      <Collapsible trigger="Indications">
        {indicationData.sectionContent &&
          indicationData.sectionContent.length > 0 && (
            <CheckboxCard
              section={indicationData}
              identifier="indication"
              onCheckboxClick={onConstructSearchQuery}
              listValue={searchQuery.indication}
            />
          )}
      </Collapsible>
    );
  } else if (name === "sponsor") {
    console.log("sponsor data", sponsorData);
    return (
      <Collapsible trigger="Sponsors">
        {sponsorData.sectionContent &&
          sponsorData.sectionContent.length > 0 && (
            <CheckboxCard
              section={sponsorData}
              identifier="sponsor"
              onCheckboxClick={onConstructSearchQuery}
              listValue={searchQuery.sponsor}
            />
          )}
      </Collapsible>
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
            onCheckboxClick={onConstructSearchQuery}
            listValue={searchQuery.dateType}
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
