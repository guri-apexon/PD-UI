import { useEffect, useState } from "react";
import "./style.scss";
import Attributes from "./Table";
import { httpCall, BASE_URL_8000 } from "../../../../../../utils/api";

const AtrributeView = ({ id }) => {
  const [attributes, setAttributes] = useState([]);
  const fetchData = async () => {
    try {
      const config = {
        url: `${BASE_URL_8000}/api/segments/get_document_attributes?aidocid=${id}`,
        method: "get",
      };
      const { data } = await httpCall(config);
      setAttributes(data[0].protocol_attributes);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="attribute-view">
      <Attributes data={attributes} id={id} fetchData={fetchData} />
    </div>
  );
};

export default AtrributeView;
