import React from "react";
import Collapsible from "react-collapsible";

import {
  CheckboxCard,
  TextCard,
  RadioCard,
  DateRangeCard,
  TableOfContent,
} from "./CustomFilterCards";

import { TOC, phases, documentStatus, dateSection } from "./Data/constants";

const CollapseCard = ({ name }) => {
  if (name === "TOC") {
    return (
      <Collapsible trigger={TOC.sectionName}>
        <TextCard section={TOC} />
      </Collapsible>
    );
  } else if (name === "phase") {
    return (
      <Collapsible trigger={phases.sectionName}>
        <CheckboxCard section={phases} />
      </Collapsible>
    );
  } else if (name === "document") {
    return (
      <Collapsible trigger={documentStatus.sectionName}>
        <CheckboxCard section={documentStatus} />
      </Collapsible>
    );
  } else if (name === "date") {
    return (
      <Collapsible trigger={dateSection.sectionName}>
        <DateRangeCard section={dateSection} />
      </Collapsible>
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
