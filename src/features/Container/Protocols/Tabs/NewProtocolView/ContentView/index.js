import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../../store/slice";
import { ActionTypes } from "../../../store/ActionTypes";
import { isEmpty } from "lodash";

import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";

//--------------------- New Components ----------------------

import RenderError from "../Components/RenderError";
import RenderLoader from "../Components/RenderLoader";
import AccordionHeader from "../Components/AccordionHeader";
import SectionEdit from "../Components/SectionHeaderEdit";
import AccordionBody from "../Components/AccordionDetail";
import "./style.scss";
import SectionBodyEdit from "../Components/SectionBodyEdit";

// const searchText = "Inclusion-criteriaascaXsacsac";
const ProtocolView = ({ id, edit }) => {
  const dispatch = useDispatch();
  const { data, success, loader, error } = useSelector(wrapper);

  useEffect(() => {
    let staticID = id;
    dispatch({
      type: ActionTypes.GET_PROTOCOL_VIEW_NEW,
      payload: { id: staticID, body: false },
    });
  }, []);

  // const getContentWithHighLight = (content) => {
  //   const regex = new RegExp(searchText, "gi");
  //   const newText = content.replace(regex, `<mark class="highlight">$&</mark>`);
  //   return newText;
  // };
  const handleContentEdit = (event) => {
    console.log("Content Coming", event.target.value);
  };
  const scrollToPage = (page) => {
    console.log(page);
    if (page > 0) {
      const pageNum = parseInt(page);
      dispatch({ type: ActionTypes.PAGE_NUMBER, payload: pageNum });
      // if (pageNum || pageNum === 0) {
      //   const ele = document.getElementById(`page-${pageNum}`);
      //   if (ele) {
      //     ele.scrollIntoView({
      //       behavior: "smooth",
      //       block: "start",
      //     });
      //   }
      // }
    }
  };
  const handleSectionClicked = async (section) => {
    let staticID = id;
    const sectionHeader = section.header;
    const page = sectionHeader.page;
    const sectionName = sectionHeader.source_file_section;
    const sectionDetail = section.detail;

    if (!sectionDetail) {
      const childArr = sectionHeader.child_secid_seq.map((elm) => elm[0]);
      const childString = childArr.toString();
      dispatch({
        type: ActionTypes.GET_PROTOCOL_VIEW_NEW,
        payload: {
          id: staticID,
          body: true,
          childString,
          sectionName,
        },
      });
    } else {
      dispatch({
        type: ActionTypes.HANDLE_EXPAND_BPO,
        payload: {
          sectionName,
        },
      });
    }
    // eslint-disable-next-line no-debugger
    debugger;
    if (page > 0) {
      scrollToPage(page);
    } else {
      let pageNumber = sectionHeader.indexes.seg_pages;
      if (pageNumber.length > 0) {
        scrollToPage(pageNumber[0]);
      }
    }
  };
  const renderHeader = (data) => {
    if (!isEmpty(data)) {
      return Object.keys(data).map((key, index) => {
        const section = data[key];
        const sectionHeader = section.header;
        const sectionName = sectionHeader.source_file_section;
        return (
          <Accordion
            key={sectionName + index}
            className="accordion-parent"
            expanded={section.expanded}
          >
            <AccordionSummary>
              {"qc_change_type" in section &&
              section.qc_change_type === "add" ? (
                <SectionEdit section={section} />
              ) : (
                <AccordionHeader
                  section={section}
                  handleSectionClicked={handleSectionClicked}
                />
              )}
            </AccordionSummary>
            <AccordionDetails className="accordion-parent-detail-container">
              {"qc_change_type" in section &&
              section.qc_change_type === "add" ? (
                <SectionBodyEdit />
              ) : (
                section &&
                !isEmpty(section) && (
                  <AccordionBody
                    edit={edit}
                    section={section}
                    scrollToPage={scrollToPage}
                    handleContentEdit={handleContentEdit}
                  />
                )
              )}
            </AccordionDetails>
          </Accordion>
        );
      });
    }
  };
  return (
    <div>
      {loader && <RenderLoader />}
      {!loader && success && (
        <div className="view-data-container">
          <div className="protocol-column">
            <div
              className="accordion-start-container"
              data-testid="protocol-column-wrapper"
            >
              {renderHeader(data)}
            </div>
          </div>
        </div>
      )}
      {!loader && !success && error && <RenderError />}
    </div>
  );
};
export default ProtocolView;
