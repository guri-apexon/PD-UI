/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cloneDeep from 'lodash/cloneDeep';
import uniqBy from 'lodash/uniqBy';
import {
  followedProtocolsList,
  tableLoader,
  getFollowedProtocols,
} from './dashboardSlice';
import ProtocolTableComp from '../../Components/Dashboard/FollowingTable';

function FollowedProtocols({ pageRows, maxHeight }) {
  const dispatch = useDispatch();
  const protocolData = useSelector(followedProtocolsList);
  const loader = useSelector(tableLoader);

  const fetchAssociateData = async (row) => {
    dispatch({
      type: 'FETCH_ASSOCIATE_DATA',
      payload: { protocol: row.protocol, id: row.id },
    });
  };
  const handleUnfollow = (row) => {
    dispatch({
      type: 'HANDLE_FOLLOW_SAGA',
      payload: { data: row, follow: false },
    });
  };
  useEffect(() => {
    if (protocolData.length > 0) {
      const tempData = cloneDeep(protocolData);
      tempData.sort((a, b) => {
        const aDate = new Date(a.approvalDate);
        const bDate = new Date(b.approvalDate);
        return bDate - aDate;
      });
      const temp = uniqBy(tempData, 'protocol');
      for (let i = 0; i < temp.length; i++) {
        temp[i].associateddata = [];
        temp[i].linkEnabled = true;
      }
      dispatch(getFollowedProtocols(temp));
    }
  }, []);
  return (
    <ProtocolTableComp
      initialRows={protocolData && protocolData.length > 0 ? protocolData : []}
      isLoading={loader}
      pageRows={protocolData && protocolData.length > 0 ? pageRows : []}
      screen="FollowedProtocols"
      maxHeight={maxHeight}
      defaultRows={pageRows[0]}
      fetchAssociateData={fetchAssociateData}
      handleUnfollow={handleUnfollow}
    />
  );
}

export default FollowedProtocols;
