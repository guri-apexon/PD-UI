import "./style.scss";
// import PDFView from "./PDFView";
// import View from "./NewView";
// import Expandable from "./Expandable";

import Expandable from "./Expand/ResizeTwoComp";

const ProtocolView = ({ id, name, dfsPath }) => {
  return (
    <div className="protocol-view-new">
      <Expandable name={name} dfsPath={dfsPath} />
      {/* <div className="document-section">
        <PDFView name={name} dfsPath={dfsPath} />
      </div>
      <div className="content-section">
        <Expandable>
          <View name={name} dfsPath={dfsPath} />
        </Expandable>
      </div> */}
    </div>
  );
};

export default ProtocolView;
