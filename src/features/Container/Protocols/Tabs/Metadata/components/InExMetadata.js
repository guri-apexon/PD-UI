import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { BASE_URL_8000, httpCall } from "../../../../../../utils/api";

import Attributes from "./Attributes";
import MedicalTerm from "./MedicalTerm";
import DerivedInfo from "./DrerivedInfo";

const InExMetadata = ({ data, id, scrollToPage }) => {
  console.log("Meta Info", data);
  const [metaData, setMetaData] = useState(null);
  useEffect(() => {
    setMetaData(data);
  }, [data]);
  const handleSectionClicked = async (sectionHeader) => {
    console.log("Meta Info section", sectionHeader);
    const page = sectionHeader.page;
    const sectionName = sectionHeader.source_file_section;
    // const sectionDetail = sectionHeader.detail;
    console.log("Page Value", page);
    if (page > 0) {
      scrollToPage(page);
    } else {
      let pageNumber = sectionHeader.indexes.seg_pages;
      if (pageNumber.length > 0) {
        scrollToPage(pageNumber[0]);
      }
    }
    const URL = `${BASE_URL_8000}/api/segments/section_data_by_secid?aidocid=${id}&section_id=${sectionHeader.sec_id}`;
    const config = {
      url: URL,
      method: "GET",
    };
    const { data, success } = await httpCall(config);
    if (success) {
      data.shift();
      console.log("Section data", data);
      console.log("Section data", metaData);

      let cloneMetaData = cloneDeep(metaData);
      for (let i = 0; i < cloneMetaData.length; i++) {
        if (cloneMetaData[i].source_file_section === sectionName) {
          cloneMetaData[i].detail = data;
        }
      }
      console.log("New Section data", cloneMetaData);
      setMetaData(cloneMetaData);
    }
    // if (!sectionDetail) {
    //   const childArr = sectionHeader.child_secid_seq.map((elm) => elm[0]);
    //   const childString = childArr.toString();
    //   dispatch({
    //     type: ActionTypes.GET_PROTOCOL_VIEW_NEW1,
    //     payload: {
    //       id: staticID,
    //       body: true,
    //       childString,
    //       sectionName,
    //     },
    //   });
    // } else {
    //   dispatch({
    //     type: ActionTypes.HANDLE_EXPAND_BPO1,
    //     payload: {
    //       sectionName,
    //     },
    //   });
    // }
    // if (page > 0) {
    //   scrollToPage(page);
    // } else {
    //   let pageNumber = sectionHeader.indexes.seg_pages;
    //   if (pageNumber.length > 0) {
    //     scrollToPage(pageNumber[0]);
    //   }
    // }
  };
  return (
    <div>
      {metaData &&
        metaData.map((item) => (
          <Accordion>
            <AccordionSummary>
              <div
                className="accordion-parent-header"
                onClick={() => handleSectionClicked(item)}
              >
                {item.source_file_section}
              </div>
            </AccordionSummary>
            <AccordionDetails className="meta-study-population-acco">
              <div className="study-population-acco">
                {item.detail && item.medical_terms && (
                  <Attributes data={item.attributes} />
                )}
                {item.detail && item.medical_terms && (
                  <MedicalTerm data={item.medical_terms} detail={item.detail} />
                )}
                {item.detail && item.derived_info && (
                  <DerivedInfo data={item.derived_info} />
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
};
export default InExMetadata;
