import { useEffect, useState } from "react";
import "./resize.scss";
import PDFView from "../PDFView";
// import View from "../NewView";
// import ViewOnly from "../View-only";

// import Button from "apollo-react/components/Button/Button";
import AtrributeView from "../AttributeView";
import FloatingButton from "../FloatingButton/FloatingButton";

// ---------------- New Components -------------------------
import ProtocolView from "../../../ProtocolView";

const Expandable = ({ id, name, dfsPath }) => {
  const [edit, setEdit] = useState(false);
  const [showAttributes, setShowAttributes] = useState(false);
  const [pdfZoom, setPDFZoom] = useState(1.2);
  const [pdfWidth, setPDFWidth] = useState(650);
  useEffect(() => {
    if (pdfWidth < 300) {
      setPDFZoom(0.4);
    } else if (pdfWidth < 450) {
      setPDFZoom(0.7);
    } else if (pdfWidth < 600) {
      setPDFZoom(1.0);
    } else if (pdfWidth < 700) {
      setPDFZoom(1.1);
    } else if (pdfWidth < 800) {
      setPDFZoom(1.2);
    } else if (pdfWidth < 950) {
      setPDFZoom(1.4);
    } else if (pdfWidth > 950) {
      setPDFZoom(1.8);
    }
  }, [pdfWidth]);
  useEffect(() => {
    if (showAttributes) {
      setPDFWidth(900);
    } else {
      setPDFWidth(650);
    }
  }, [showAttributes]);
  useEffect(() => {
    var m_pos;

    function resize(e) {
      //   var parent = rightPanel;
      const letPanel = document.getElementById("left-panel");
      const rightPanel = document.getElementById("right-panel");
      const resizeBar = document.getElementById("resize");
      var dx = m_pos - e.x;
      m_pos = e.x;

      letPanel.style.width =
        parseInt(getComputedStyle(letPanel, "").width) - dx + "px";
      rightPanel.style.width =
        parseInt(getComputedStyle(rightPanel, "").width) + dx + "px";
      resizeBar.style.left =
        parseInt(getComputedStyle(letPanel, "").width) - dx + 5 + "px";
      setPDFWidth(parseInt(getComputedStyle(letPanel, "").width));
    }

    var resize_el = document.getElementById("resize");
    resize_el.addEventListener(
      "mousedown",
      function (e) {
        m_pos = e.x;
        document.addEventListener("mousemove", resize, false);
      },
      false
    );
    document.addEventListener(
      "mouseup",
      function () {
        document.removeEventListener("mousemove", resize, false);
      },
      false
    );
  }, []);
  const handleActionButton = (buttonName) => {
    console.log("Button Clicked", buttonName);
    // eslint-disable-next-line no-debugger
    // debugger;
    if (buttonName === "edit") {
      setEdit(true);
      setShowAttributes(false);
    } else if (buttonName === "attributes") {
      setShowAttributes(true);
    } else if (buttonName === "save") {
      if (showAttributes) {
        setShowAttributes(true);
        setEdit(false);
      } else {
        setShowAttributes(false);
        setEdit(false);
      }
    }
  };
  console.log("Edit", edit);
  console.log("Attribute", showAttributes);
  return (
    <div className="resize-container">
      {/* {!showAttributes && (
        <Button className="edit-button" onClick={() => setEdit(!edit)}>
          {edit ? "Save Changes" : "Edit Content"}
        </Button>
      )}
      <Button
        className="atrribute-button"
        onClick={() => setShowAttributes(!showAttributes)}
        style={showAttributes ? { right: 0 } : { right: 120 }}
      >
        {showAttributes ? "Content View" : "Atrribute View"}
      </Button> */}
      <div className="floating-button">
        <FloatingButton
          onChildClick={handleActionButton}
          edit={edit}
          showAttributes={showAttributes}
        />
      </div>

      <div
        id="left-panel"
        className={showAttributes ? "left-panel-attr" : "left-panel"}
      >
        <PDFView name={name} dfsPath={dfsPath} zoom={pdfZoom} />
      </div>
      <div
        className={showAttributes ? "resize-attr" : "resize"}
        id="resize"
      ></div>
      {!showAttributes && (
        <div id="right-panel" className="right-panel">
          <ProtocolView id={id} name={name} dfsPath={dfsPath} edit={edit} />
          {/* {edit ? (
            <View id={id} name={name} dfsPath={dfsPath} />
          ) : (
            <ViewOnly id={id} name={name} dfsPath={dfsPath} />
          )} */}
        </div>
      )}
      {showAttributes && (
        <div id="right-panel" className="right-panel-attr">
          <AtrributeView id={id} name={name} dfsPath={dfsPath} />
        </div>
      )}
      {/* <div id="right_panel">{props.children}</div> */}
    </div>
  );
};

export default Expandable;
