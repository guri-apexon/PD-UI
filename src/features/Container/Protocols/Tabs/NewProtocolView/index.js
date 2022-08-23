import Expandable from "./Expand";

function ProtocolNewView({ id, name, dfsPath, fileType }) {
  return (
    <Expandable id={id} name={name} dfsPath={dfsPath} fileType={fileType} />
  );
}

export default ProtocolNewView;
