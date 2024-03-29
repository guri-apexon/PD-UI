/* eslint-disable */
import moment from 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'apollo-react/components/Loader';
import Table, {
  compareStrings,
  compareDates,
} from 'apollo-react/components/Table';
import Cog from 'apollo-react-icons/Cog';
import Trash from 'apollo-react-icons/Trash';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from 'apollo-react/components/IconButton';
import { loader } from './adminSlice';

const DateCell = ({ row, column }) =>
  moment(row[column.accessor]).format('MM/DD/YYYY');

function ActionCell({ row }) {
  return (
    <div>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          onClick={() =>
            row.onDelete({ userId: row.userId, protocol: row.protocol })
          }
          data-testid={`delete-${row.id}`}
        >
          <Trash />
        </IconButton>
      </Tooltip>
    </div>
  );
}

const columns = [
  {
    header: 'User ID',
    accessor: 'userId',
    sortFunction: compareStrings,
  },
  {
    header: 'Protocol',
    accessor: 'protocol',
    sortFunction: compareStrings,
  },
  {
    header: 'Role',
    accessor: 'userRole',
    sortFunction: compareStrings,
  },
  {
    header: 'Following',
    accessor: 'follow',
    sortFunction: compareStrings,
  },
  {
    header: 'Created Date',
    accessor: 'timeCreated',
    sortFunction: compareDates,
    customCell: DateCell,
  },
  {
    header: 'Updated Date',
    accessor: 'lastUpdated',
    sortFunction: compareDates,
    customCell: DateCell,
  },
  {
    header: <Cog size="small" />,
    accessor: 'action',
    customCell: ActionCell,
    align: 'center',
  },
];

function MappingTable({ initialRows }) {
  const dispatch = useDispatch();

  const isLoading = useSelector(loader);

  const onDelete = ({ userId, protocol }) => {
    const confirmBox = window.confirm(
      'Do you want to delete the Selected Mapping?',
    );
    if (confirmBox) {
      dispatch({
        type: 'DELETE_USER_PROTOCOL_MAPPING',
        payload: { userId, protocol },
      });
    }
  };

  return (
    <div style={{ overflowX: 'auto', paddingTop: 20 }}>
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          rows={initialRows.map((row) => ({
            ...row,
            onDelete,
            key: row.id,
          }))}
          initialSortedColumn="lastUpdated"
          initialSortOrder="desc"
          rowsPerPageOptions={[5, 10, 15, 'All']}
          tablePaginationProps={{
            labelDisplayedRows: ({ from, to, count }) =>
              `Mapping ${from}-${to} of ${count}`,
            truncate: true,
          }}
          hasScroll
          maxHeight={345}
        />
      )}
    </div>
  );
}

export default MappingTable;
