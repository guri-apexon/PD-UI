import { useSelector } from 'react-redux';
import { protocolMap } from './adminSlice';
import MappingSearch from './MappingSearch';
import MappingTable from './MappingTable';

function ProtocolMap() {
  const initialRows = useSelector(protocolMap);
  return (
    <>
      <MappingSearch />
      <MappingTable initialRows={initialRows} />
    </>
  );
}

export default ProtocolMap;
