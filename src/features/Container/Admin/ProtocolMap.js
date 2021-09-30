import { useSelector } from "react-redux";
import Loader from "apollo-react/components/Loader";
import { loader } from "./adminSlice";
import MappingSearch from "./MappingSearch";
import MappingTable from "./MappingTable";

function ProtocolMap() {
  const isLoading = useSelector(loader);
  return (
    <>
      {isLoading && <Loader />}
      <MappingSearch />
      <MappingTable />
    </>
  );
}

export default ProtocolMap;
