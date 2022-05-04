import "./style.scss";
import Breadcrumbs from "apollo-react/components/Breadcrumbs";

const ProtocolBreadcrumbs = ({ protocolName }) => {
  return (
    <div className="protocols-breadcrum">
      <Breadcrumbs
        items={[
          { href: "/dashboard" },
          {
            title: "Protocols",
            className: "br-cr-protocol",
            disabled: true,
            // onClick: handleClick,
          },
          {
            title: "protocolName",
          },
        ]}
        style={{ paddingInlineStart: 0, marginBottom: 0 }}
      />
    </div>
  );
};
export default ProtocolBreadcrumbs;
