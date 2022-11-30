/* eslint-disable */
import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import Loader from 'apollo-react/components/Loader';
import { toast } from 'react-toastify';
import FileDownload from 'js-file-download';
import { useSelector } from 'react-redux';
import { userId } from '../../../../store/userDetails';
import { BASE_URL_8000, httpCall } from '../../../../utils/api';
import {
  covertMMDDYYYY,
  uploadDateValidation,
} from '../../../../utils/utilFunction';
import { userRole } from '../../../../AppConstant/AppConstant';

function ProtocolLink({ row, column: { accessor: key } }) {
  const handleLinkRender = () => {
    if (row.userRole === userRole.primary) {
      return (
        <div>
          <Link
            className="title-link-protocol"
            to={`/protocols?protocolId=${row.id}`}
          >
            {row[key].length > 18
              ? `${row[key].substring(0, 18)}...`
              : row[key]}
          </Link>
        </div>
      );
    }
    if (uploadDateValidation(row.uploadDate)) {
      return (
        <div>
          <Link
            className="title-link-protocol"
            to={`/protocols?protocolId=${row.id}`}
          >
            {row[key].length > 18
              ? `${row[key].substring(0, 18)}...`
              : row[key]}
          </Link>
        </div>
      );
    }
    return (
      <div>
        {/* <span className="title-no-link-protocol">{row[key]}</span> */}
        <span>
          {row[key].length > 18 ? `${row[key].substring(0, 18)}...` : row[key]}
        </span>
      </div>
    );
  };
  return (
    <span>
      <span className="adjust-ellipses">{handleLinkRender()}</span>
    </span>
  );
}
/* istanbul ignore next */
function DownloadLink({ row, column: { accessor: key } }) {
  const [loader, setLoader] = useState(false);
  const userId1 = useSelector(userId);

  const handleDownload = async (row) => {
    setLoader(true);
    const splitArr = row.documentFilePath.split('\\');
    const fileName = splitArr[splitArr.length - 1];

    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${encodeURIComponent(
        row.documentFilePath,
      )}&userId=${userId1.substring(1)}&protocol=${row.protocol}`,
      method: 'GET',
      responseType: 'blob',
    };

    const resp = await httpCall(config);
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
      <a onClick={() => handleDownload(row)}>{row[key]}</a>
    </>
  );
}
const dateFormat = ({ row }) => {
  return <>{covertMMDDYYYY(row.uploadDate)}</>;
};
const dateFormatApp = ({ row }) => {
  return <>{row.approvalDate ? covertMMDDYYYY(row.approvalDate) : '-'}</>;
};

function Cell({ row, column: { accessor: key } }) {
  return <>{row[key] ? row[key] : '-'}</>;
}

function StatusCell({ row, column: { accessor: key } }) {
  return <span className="text-capitalize">{row[key] ? row[key] : '-'}</span>;
}

const columns = [
  {
    header: 'Version #',
    accessor: 'versionNumber',
    width: '10%',
    customCell: ProtocolLink,
  },
  // {
  //   header: "Draft #",
  //   accessor: "draftVersion",
  //   width: "10%",
  //   customCell: Cell,
  // },
  {
    header: 'Source Document',
    accessor: 'fileName',
    width: '20%',
    customCell: DownloadLink,
  },
  {
    header: 'Approval Date',
    accessor: 'approvalDate',
    width: '10%',
    customCell: dateFormatApp,
  },
  {
    header: 'Upload Date',
    accessor: 'uploadDate',
    customCell: dateFormat,
    width: '10%',
  },

  {
    header: 'Document Status',
    accessor: 'documentStatus',
    customCell: StatusCell,
    width: '10%',
  },
  {
    header: 'Uploaded By',
    accessor: 'uploadedBy',
    customCell: Cell,
    width: '10%',
  },
];

export default columns;
