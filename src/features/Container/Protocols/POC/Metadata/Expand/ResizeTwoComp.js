import { useEffect, useState } from "react";
import "./resize.scss";
import PDFView from "../PDFView";
import View from "../NewView";
import ViewOnly from "../View-only";
// import Button from "apollo-react/components/Button/Button";

const Expandable = ({ id, name, dfsPath }) => {
  const [edit] = useState(false);
  const [pdfZoom, setPDFZoom] = useState(1.2);
  const [pdfWidth, setPDFWidth] = useState(650);
  useEffect(() => {
    if (pdfWidth < 300) {
      setPDFZoom(0.4);
    } else if (pdfWidth < 600) {
      setPDFZoom(1.0);
    } else if (pdfWidth < 800) {
      setPDFZoom(1.2);
    } else if (pdfWidth > 800) {
      setPDFZoom(1.8);
    }
  }, [pdfWidth]);
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
  return (
    <div className="resize-container">
      {/* <Button className="edit-button" onClick={() => setEdit(!edit)}>
        {edit ? "Save Changes" : "Edit Content"}
      </Button> */}
      <div id="left-panel" className="left-panel">
        <PDFView name={name} dfsPath={dfsPath} zoom={pdfZoom} />
      </div>
      <div className="resize" id="resize"></div>
      <div id="right-panel" className="right-panel">
        {edit ? (
          <View id={id} name={name} dfsPath={dfsPath} />
        ) : (
          <ViewOnly id={id} name={name} dfsPath={dfsPath} />
        )}
      </div>
      {/* <div id="right_panel">{props.children}</div> */}
    </div>
  );
};

export default Expandable;
