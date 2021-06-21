import React from "react";
import Collapsible from "react-collapsible";

import { CheckboxCard, DateRangeCard, CheckboxTest } from "./CustomFilterCards";

import Loader from "../../Components/Loader/Loader";

import {
  TOC,
  phases,
  documentStatus,
  qcActivity,
  dateSection,
  dateType,
} from "./Data/constants";

const CollapseCard = ({
  name,
  indicationData,
  sponsorData,
  phaseData,
  onConstructSearchQuery,
  searchQuery,
  dateRangeValue,
  clearAll,
}) => {
  const onOpenTrigger = () => {
    console.log("onOpenTrigger");
  };
  if (name === "TOC") {
    return (
      <div data-testid="toc-checkboxes">
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
      </div>
    );
  } else if (name === "indication") {
    return (
      <div className="spon-container" data-testid="indication-checkboxes">
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
      <div className="spon-container" data-testid="sponsor-checkboxes">
        <Collapsible trigger="Sponsors" onOpening={() => onOpenTrigger()}>
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
    console.log("::::PhaseData", phaseData);
    return (
      // <div className="spon-container" data-testid="phase-checkboxes">
      //   <Collapsible trigger="Phase" onOpening={() => onOpenTrigger()}>
      // {phaseData.sectionContent &&
      // phaseData.sectionContent.length > 0 ? (
      //       <CheckboxTest
      //         section={phaseData}
      //         identifier="phase"
      //         onCheckboxClick={onConstructSearchQuery}
      //         listValue={searchQuery.phase}
      //         clearAll={clearAll}
      //       />
      // ) : (
      //   <div
      //     style={{
      //       height: 300,
      //       justifyContent: "center",
      //       alignItems: "center",
      //       display: "flex",
      //     }}
      //   >
      //     <Loader />
      //   </div>
      // )}
      //   </Collapsible>
      // </div>
      <div data-testid="phase-checkboxes">
        <Collapsible trigger="Phase">
          {phaseData.loader && (
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
          {phaseData.sectionContent && phaseData.sectionContent.length > 0 && (
            <CheckboxCard
              section={phaseData}
              identifier="phase"
              onCheckboxClick={onConstructSearchQuery}
              listValue={searchQuery.phase}
            />
          )}
          {phaseData.sectionContent &&
            phaseData.sectionContent.length === 0 &&
            !phaseData.loader && (
              <div
                style={{
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <p style={{ padding: 10, textAlign: "center" }}></p>​
              </div>
            )}
        </Collapsible>
      </div>
    );
  } else if (name === "document") {
    return (
      <div data-testid="document-checkboxes">
        <Collapsible trigger={documentStatus.sectionName}>
          <CheckboxCard
            section={documentStatus}
            identifier="documentStatus"
            onCheckboxClick={onConstructSearchQuery}
            listValue={searchQuery.documentStatus}
          />
        </Collapsible>
      </div>
    );
  } else if (name === "qcActivity") {
    return (
      <div data-testid="qc-activity-checkboxes">
        <Collapsible trigger="QC Activity">
          <CheckboxCard
            section={qcActivity}
            identifier="qcActivity"
            onCheckboxClick={onConstructSearchQuery}
            listValue={searchQuery.qcActivity}
          />
        </Collapsible>
      </div>
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
