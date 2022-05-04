import "./Protocol.scss";
import ProtocolBreadcrumbs from "./Components/Breadcrum";
import TabContainer from "./Tabs";

const Protocols = (props) => {
  return (
    <div className="protocol-component">
      <ProtocolBreadcrumbs />
      <TabContainer history={props.history} />
    </div>
  );
};
export default Protocols;
