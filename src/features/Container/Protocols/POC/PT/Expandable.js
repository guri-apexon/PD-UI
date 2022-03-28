import { useEffect } from "react";
import "./expandable.scss";

const Expandable = (props) => {
  useEffect(() => {
    var m_pos;
    function resize(e) {
      // eslint-disable-next-line no-debugger
      debugger;
      var parent = resize_el.parentNode;
      var dx = m_pos - e.x;
      m_pos = e.x;
      parent.style.width =
        parseInt(getComputedStyle(parent, "").width) + dx + "px";
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
    <div id="right_panel">
      <div id="resize"></div>
      {props.children}
    </div>
  );
};

export default Expandable;
