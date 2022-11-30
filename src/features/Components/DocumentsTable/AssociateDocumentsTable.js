/* eslint-disable */
import Table from 'apollo-react/components/Table';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import FileDownload from 'js-file-download';
import Checkbox from 'apollo-react/components/Checkbox';
import Loader from 'apollo-react/components/Loader';
import { toast } from 'react-toastify';
import { httpCall, BASE_URL_8000 } from '../../../utils/api';
import { userId } from '../../../store/userDetails';
import {
  qcIconStatus,
  uploadDateValidation,
} from '../../../utils/utilFunction';
import { userRole } from '../../../AppConstant/AppConstant';

function ActionCell({ row }) {
  if (row.protocolSelected.source && row.protocolSelected.target === '') {
    return (
      <div>
        <div className="table-selection source-selected">
          <Checkbox
            label=""
            checked={row.protocolSelected.source === row.id}
            onClick={() => row.setProtocolToDownload(row)}
          />
        </div>
      </div>
    );
  }
  if (row.protocolSelected.source && row.protocolSelected.target) {
    return (
      <div>
        <div className="table-selection source-selected">
          <Checkbox
            label=""
            checked={
              !!(
                row.protocolSelected.source === row.id ||
                row.protocolSelected.target === row.id
              )
            }
            onClick={() => row.setProtocolToDownload(row)}
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="table-selection">
        <Checkbox
          label=""
          checked={
            row.protocolSelected.length > 0 &&
            row.protocolSelected.includes(row.id)
          }
          onClick={() => row.setProtocolToDownload(row)}
        />
      </div>
    </div>
  );
}

function DownloadLink({ row, column: { accessor: key } }) {
  const [loader, setLoader] = useState(false);
  const userId1 = useSelector(userId);
  console.log('UserID Required', userId1);
  const handleDownload = async (row) => {
    setLoader(true);
    const splitArr = row.documentFilePath.split('\\');
    const fileName = splitArr[splitArr.length - 1];
    console.log(fileName);
    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${encodeURIComponent(
        row.documentFilePath,
      )}&userId=${userId1.substring(1)}&protocol=${row.protocol}`,
      method: 'GET',
      responseType: 'blob',
    };
    const resp = await httpCall(config);
    /* istanbul ignore next */
    if (resp.success) {
      FileDownload(resp.data, fileName);
    } else if (resp.message === 'No Access') {
      toast.info('Access Provisioned to Primary Users only');
    } else {
      toast.error('Download Failed');
    }
    setLoader(false);
  };
  return (
    <>
      {loader && <Loader />}
      <p className="hyperlink" onClick={() => handleDownload(row)}>
        {row[key]}
      </p>
    </>
  ); // eslint-disable-line
}

function VersionCell({ row, column }) {
  const history = useHistory();
  const onHandleChange = (row) => {
    row.handleChangeTab('', 0);
    history.push(`/protocols?protocolId=${row.id}`);
  };
  if (row.userRole === userRole.primary) {
    return (
      <>
        {row.versionNumber ? (
          <p
            className="hyperlink"
            data-testid={`version-${row.versionNumber}`}
            onClick={() => onHandleChange(row)}
          >
            {' '}
            {row.versionNumber}
          </p>
        ) : (
          '-'
        )}
      </>
    );
  }
  if (uploadDateValidation(row.uploadDate)) {
    return (
      <>
        {row.versionNumber ? (
          <p
            className="hyperlink"
            data-testid={`version-${row.versionNumber}`}
            onClick={() => onHandleChange(row)}
          >
            {' '}
            {row.versionNumber}
          </p>
        ) : (
          '-'
        )}
      </>
    );
  }
  return (
    <p data-testid={`version-${row.versionNumber}`}> {row.versionNumber}</p>
  );
}

function StatusCell({ row, column: { accessor: key } }) {
  return <span className="text-capitalize">{row[key] ? row[key] : '-'}</span>;
}

const DateCell = ({ row, column }) => {
  const date = new Date(row[column.accessor]);
  if (row[column.accessor]) {
    return date
      .toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      .replace(/ /g, '-');
  }
  return '-';
};
const qcActivityStatus = ({ row }) => {
  return <div>{qcIconStatus(row.qcStatus)}</div>;
};

const columns = [
  {
    accessor: 'action',
    customCell: ActionCell,
  },
  {
    accessor: 'versionNumber',
    header: 'Associated Versions',
    customCell: VersionCell,
  },
  // {
  //   accessor: "draftVersion",
  //   header: "Draft#",
  //   customCell: Cell,
  // },
  {
    accessor: 'fileName',
    header: 'Source Document',
    customCell: DownloadLink,
  },
  {
    header: 'Uploaded Date',
    accessor: 'uploadDate',
    customCell: DateCell,
  },
  {
    header: 'Approval Date',
    accessor: 'approvalDate',
    customCell: DateCell,
  },
  {
    header: 'Document Status',
    accessor: 'documentStatus',
    customCell: StatusCell,
  },
  {
    header: 'QC Activity',
    accessor: 'qcStatus',
    customCell: qcActivityStatus,
  },
];
const noActionColumns = [
  {
    accessor: 'versionNumber',
    header: 'Associated Versions',
    customCell: VersionCell,
  },
  // {
  //   accessor: "draftVersion",
  //   header: "Draft#",
  //   customCell: Cell,
  // },
  {
    accessor: 'fileName',
    header: 'Source Document',
    customCell: DownloadLink,
  },
  {
    header: 'Uploaded Date',
    accessor: 'uploadDate',
    customCell: DateCell,
  },
  {
    header: 'Approval Date',
    accessor: 'approvalDate',
    customCell: DateCell,
  },
  {
    header: 'Document Status',
    accessor: 'documentStatus',
    customCell: StatusCell,
  },
  {
    header: 'QC Activity',
    accessor: 'qcStatus',
    customCell: qcActivityStatus,
  },
];

function AssociateDocumentsTable({
  initialsRow,
  handleChangeTab,
  protocolSelected,
  setProtocolToDownload,
  showCheckbox,
  primaryUser,
}) {
  return (
    <div
      className="associate11-document-tab"
      data-testid="associate-document-tab"
    >
      <Table
        title="Associated Documents"
        rows={initialsRow.map((row) => {
          const temp = cloneDeep(row);
          const details = {
            key: row.id,
            handleChangeTab,
            protocolSelected,
            setProtocolToDownload,
          };
          return merge(temp, details);
        })}
        columns={showCheckbox ? columns : noActionColumns}
        rowsPerPageOptions={[5, 10, 'All']}
        tablePaginationProps={{
          labelDisplayedRows: ({ from, to, count }) =>
            `${
              count === 1 ? 'Document' : 'Documents'
            } ${from}-${to} of ${count}`,
          truncate: true,
        }}
        defaultRowsPerPage={5}
        hasScroll
        maxHeight={350}
      />
    </div>
  );
}

export default AssociateDocumentsTable;
