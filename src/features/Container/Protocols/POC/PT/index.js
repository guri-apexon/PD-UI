import "./style.scss";

import Expandable from "./Expand/ResizeTwoComp";

const ProtocolView = ({ id, name, dfsPath }) => {
  return (
    <div className="protocol-view-new">
      <Expandable name={name} dfsPath={dfsPath} />
    </div>
  );
};

export default ProtocolView;
