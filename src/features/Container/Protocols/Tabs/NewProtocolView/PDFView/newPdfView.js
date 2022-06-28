import React, { useCallback, useState } from "react";
import { Document, Page } from "react-pdf";

import samplePDF from "./d5180c00025csp-FINAL-25Feb-clean.pdf";

// https://gist.github.com/wojtekmaj/f265f55e89ccb4ce70fbd2f8c7b1d95d
function highlightPattern(text, pattern) {
  // eslint-disable-next-line no-debugger
  debugger;
  const splitText = text.split(pattern);

  if (splitText.length <= 1) {
    return text;
  }

  const matches = text.match(pattern);

  return splitText.reduce(
    (arr, element, index) =>
      matches[index]
        ? [...arr, element, <mark key={index}>{matches[index]}</mark>]
        : [...arr, element],
    []
  );
}
//  const getContentWithHighLight = (content, searchText) => {
//    const regex = new RegExp(searchText, "gi");
//    const newText = content.replace(regex, `<mark class="highlight">$&</mark>`);
//    return newText;
//  };

export default function Test() {
  const [searchText, setSearchText] = useState("");

  const textRenderer = useCallback(
    (textItem) => {
      const text = highlightPattern(textItem.str, searchText);
      console.log("return", text);
      return text;
    },
    [searchText]
  );

  function onChange(event) {
    setSearchText(event.target.value);
  }

  return (
    <div style={{ height: "74vh" }}>
      <Document file={samplePDF}>
        <Page pageNumber={1} customTextRenderer={textRenderer} />
      </Document>
      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="search"
          id="search"
          value={searchText}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
