/* eslint-disable */
import React, { useState } from 'react';
import concat from 'lodash/concat';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import ChevronDown from 'apollo-react-icons/ChevronDown';
import ChevronRight from 'apollo-react-icons/ChevronRight';
import { Link } from 'react-router-dom';
import IconButton from 'apollo-react/components/IconButton';
import Table, {
  compareStrings,
  compareDates,
} from 'apollo-react/components/Table';
import Tooltip from 'apollo-react/components/Tooltip';
import Loader from '../Loader/Loader';
import './ProtocolTable.scss';
import columns from './columns';
import Tag from 'apollo-react/components/Tag';
import { redaction } from '../../../AppConstant/AppConstant';
import { uploadDateValidation } from '../../../utils/utilFunction';
import Button from 'apollo-react/components/Button';

const replaceall = require('replaceall');

function ActionCell({ row }) {
  return (
    <div>
      <div className="follow-table-selection" style={{ height: 45 }}>
        <IconButton
          id="expand"
          data-testid={`expandable-row-${row.protocol}`}
          size="small"
          onClick={() => row.handleToggleRow(row.id, row)}
        >
          {row.expanded ? <ChevronDown /> : <ChevronRight />}
        </IconButton>
      </div>
    </div>
  );
}
function createFullMarkup(str) {
  return {
    __html: replaceall(
      redaction.text,
      `<span class="blur">${redaction.text}</span>`,
      str,
    ),
  };
}
function createMarkup(str) {
  return {
    __html: str
      .substring(0, 40)
      .replace(redaction.text, `<span class="blur">${redaction.text}</span>`),
  };
}
function ProtocolTitle({ row, column: { accessor: key } }) {
  const handleLinkRender = () => {
    if (row.userUploadedFlag) {
      return (
        <div>
          <Link
            className="title-link-protocol"
            to={`/protocols?protocolId=${row.id}`}
            dangerouslySetInnerHTML={createMarkup(row[key])}
          />
          <span>{row[key].length > 40 ? '...' : ''}</span>
        </div>
      );
    }
    if (uploadDateValidation(row.uploadDate)) {
      return (
        <div>
          <Link
            className="title-link-protocol"
            to={`/protocols?protocolId=${row.id}`}
            dangerouslySetInnerHTML={createMarkup(row[key])}
          />
          <span>{row[key].length > 40 ? '...' : ''}</span>
        </div>
      );
    }
    return (
      <div>
        <span
          className="title-no-link-protocol"
          dangerouslySetInnerHTML={createMarkup(row[key])}
        />
        <span>{row[key].length > 40 ? '...' : ''}</span>
      </div>
    );
  };
  return (
    <Tooltip
      variant="light"
      title="Protocol Title"
      subtitle={<div dangerouslySetInnerHTML={createFullMarkup(row[key])} />}
      placement="top"
    >
      <span>{handleLinkRender()}</span>
    </Tooltip>
  );
}

function Cell({ row, column }) {
  if (row[column.accessor] && row[column.accessor] === redaction.text) {
    return (
      <Tooltip variant="light" title={redaction.hoverText} placement="top">
        <div className="long-text blur" style={{ fontWeight: 800 }}>
          {row[column.accessor]}
        </div>
      </Tooltip>
    );
  }
  if (row[column.accessor] && row[column.accessor].length > 15) {
    return (
      <Tooltip variant="light" title={row[column.accessor]} placement="top">
        <div className="long-text" style={{ fontWeight: 800 }}>
          {row[column.accessor]}
        </div>
      </Tooltip>
    );
  }
  return <div style={{ fontWeight: 800 }}>{row[column.accessor]}</div>;
}

function ProtocolLink({ row, column: { accessor: key } }) {
  const handleLinkRender = () => {
    if (row.userUploadedFlag) {
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
    <Tooltip
      variant="light"
      title="Protocol Number"
      subtitle={row[key]}
      placement="top"
    >
      <span>{handleLinkRender()}</span>
    </Tooltip>
  );
}
function HandleUnFollow({ row }) {
  return (
    <Button
      onClick={() => row.handleUnfollow(row)}
      data-testid={`unfollow-button-test-${row.protocol}`}
    >
      <Tag label="Unfollow" color="#0076ae" />
    </Button>
  );
}

function getColumns(screen) {
  return [
    {
      accessor: 'action',
      customCell: ActionCell,
      width: '3%',
    },
    {
      accessor: 'approvalDate',
      sortFunction: compareDates,
      width: 0,
      hidden: true,
    },
    {
      header: 'Protocol',
      accessor: 'protocol',
      sortFunction: compareStrings,
      customCell: ProtocolLink,
      width: '15%',
    },
    {
      header: 'Indication',
      accessor: 'indication',
      sortFunction: compareStrings,
      width: '13%',
      customCell: Cell,
    },
    {
      header: 'Sponsor',
      accessor: 'sponsor',
      sortFunction: compareStrings,
      width: '13%',
      customCell: Cell,
    },
    {
      header: 'Phase',
      accessor: 'phase',
      sortFunction: compareStrings,
      width: '8%',
      customCell: Cell,
    },
    {
      header: 'Project ID / CRM #',
      accessor: 'projectId',
      sortFunction: compareStrings,
      width: '13%',
      customCell: Cell,
    },
    {
      header: 'Protocol Title',
      accessor: 'protocolTitle',
      sortFunction: compareStrings,
      customCell: ProtocolTitle,
      width: 100,
    },
    {
      header: 'Action',
      accessor: 'action',
      customCell: HandleUnFollow,
      width: '8%',
    },
  ];
}

function ExpandableComponent({ row }) {
  return (
    <div className="expand-asso-table">
      {row.linkEnabled ? (
        <div
          style={{
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {'associateddata' in row && row.associateddata.length > 0 && (
            <div className="view-asso-prot">
              <div>
                <h4>Associate Protocols</h4>
              </div>

              <div>
                <Table
                  columns={columns}
                  rows={
                    'associateddata' in row &&
                    row.associateddata.map((row) => ({
                      ...row,
                      key: row.id,
                    }))
                  }
                  hidePagination
                />
              </div>
            </div>
          )}
          {'associateddata' in row && row.associateddata.length === 0 && (
            <h4 style={{ textAlign: 'center' }}>
              {row.protocol} has no associated protocols available.
            </h4>
          )}
        </>
      )}
    </div>
  );
}

function ProtocolTable({
  initialRows,
  pageRows,
  screen,
  handleProtocolClick,
  isLoading,
  maxHeight,
  defaultRows,
  fetchAssociateData,
  handleUnfollow,
}) {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleToggleRow = (id, row) => {
    setExpandedRows((expandedRows) =>
      expandedRows.indexOf(id) >= 0
        ? expandedRows.filter((eid) => eid !== id)
        : concat(expandedRows, id),
    );
    if ('associateddata' in row && row.associateddata.length === 0) {
      fetchAssociateData(row);
    }
  };
  const handleRowProtocolClick = (row) => {
    handleProtocolClick({
      id: row.id,
      path: row.documentFilePath,
      protocol: row.protocol,
    });
  };
  const newRows =
    initialRows &&
    initialRows.map((row) => {
      const temp = cloneDeep(row);
      const details = {
        key: row.id,
        expanded: expandedRows.indexOf(row.id) >= 0,
        handleToggleRow,
        handleRowProtocolClick,
        screen,
        fetchAssociateData,
        handleUnfollow,
      };
      return merge(temp, details);
    });
  return (
    <div data-testid="protocol-table-wrapper" id="test-div">
      <Table
        columns={getColumns(screen)}
        rows={newRows}
        initialSortedColumn="approvalDate"
        initialSortOrder="desc"
        isLoading={isLoading}
        rowsPerPageOptions={pageRows}
        rowProps={{ hover: false }}
        tablePaginationProps={{
          labelDisplayedRows: ({ from, to, count }) =>
            `Showing ${from}-${to} of ${count}`,
          truncate: true,
        }}
        ExpandableComponent={ExpandableComponent}
        defaultRowsPerPage={defaultRows}
        hasScroll
        maxHeight={maxHeight}
      />
    </div>
  );
}

export default React.memo(ProtocolTable);
