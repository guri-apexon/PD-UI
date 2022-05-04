import "./style.scss";

import Expandable from "./Expand/ResizeTwoComp";

const ProtocolView = ({ id, name, dfsPath }) => {
  return (
    <div className="protocol-view-new">
      <Expandable name={name} dfsPath={dfsPath} id={id} />
    </div>
  );
};

export default ProtocolView;
