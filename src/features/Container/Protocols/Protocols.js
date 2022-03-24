import "./Protocol.scss";
import ProtocolBreadcrumbs from "./Breadcrum";
import TabContainer from "./TabContainer";

const Protocols = (props) => {
  return (
    <div className="protocol-component">
      <ProtocolBreadcrumbs />
      <TabContainer history={props.history} />
    </div>
  );
};
export default Protocols;
