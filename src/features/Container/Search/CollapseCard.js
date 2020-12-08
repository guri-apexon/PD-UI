import React from "react";
import Collapsible from "react-collapsible";
import { CheckboxCard, TextCard, RadioCard } from "./Customcards";

const CollapseCard = ({ state, section, index }) => {
  return (
    <Collapsible trigger={section.sectionName}>
      {section.fieldType === "text" ? (
        <TextCard
          state={state}
          key={section.sectionId}
          section={section}
          index={index}
        />
      ) : section.fieldType === "radio" ? (
        <RadioCard
          state={state}
          key={section.sectionId}
          section={section}
          index={index}
        />
      ) : (
        <CheckboxCard
          state={state}
          key={section.sectionId}
          section={section}
          index={index}
        />
      )}
    </Collapsible>
  );
};

export default CollapseCard;
