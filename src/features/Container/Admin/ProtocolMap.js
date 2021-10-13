import { useSelector } from "react-redux";
import { loader, protocolMap } from "./adminSlice";
import MappingSearch from "./MappingSearch";
import MappingTable from "./MappingTable";

function ProtocolMap() {
  const isLoading = useSelector(loader);
  const initialRows = useSelector(protocolMap);
  return (
    <>
      <MappingSearch />
      <MappingTable initialRows={initialRows} loader={isLoading} />
    </>
  );
}

export default ProtocolMap;
