/* eslint-disable */
import React, { useEffect, useState } from 'react';

import Table from 'apollo-react/components/Table';
import Grid from 'apollo-react/components/Grid';
import Link from 'apollo-react/components/Link';
import { useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { toast } from 'react-toastify';
import Tooltip from 'apollo-react/components/Tooltip';
import Loader from 'apollo-react/components/Loader';
import FileDownload from 'js-file-download';
import { BASE_URL_8000, httpCall } from '../../../utils/api';
import { formatESDate } from '../../../utils/utilFunction';
import { userId } from '../../../store/userDetails';
import Loader1 from '../../Components/Loader/Loader';
import columns from './Data/column.data';
import { redaction } from '../../../AppConstant/AppConstant';

const textLength = 24;
function SearchCard({
  data,
  compareTwoProtocol,
  selection,
  onViewAssociateProtocolClick,
  protocolSelected,
}) {
  const [dataRow, setDataRow] = useState([]);
  const userId1 = useSelector(userId);
  const [loader, setLoader] = useState(false);

  const createFullMarkup = (str) => {
    if (str || str !== undefined) {
      if (str.includes(redaction.text)) {
        return {
          __html: str.replace(
            redaction.text,
            `<span class="blur">${redaction.text}</span>`,
          ),
        };
      }
      return {
        __html: str,
      };
    }
  };

  useEffect(() => {
    const arrOfObj = cloneDeep(data.rows);
    const result = arrOfObj.map(function (el) {
      const o = { ...el };
      o.protocolSelected = protocolSelected;
      return o;
    });
    setDataRow(result);
  }, [protocolSelected, data]);
  /* istanbul ignore next */
  const handleSelectRow = (data, protocol) => {
    compareTwoProtocol(data, protocol);
  };

  const handleDownload = async (row) => {
    // console.log("UserID Required", userId1);
    setLoader(true);
    const splitArr = row.path.split('\\');
    const fileName = splitArr[splitArr.length - 1];
    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${encodeURIComponent(
        row.path,
      )}&userId=${userId1.substring(1)}&protocol=${row.protocolNumber}`,
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
  const redactionCheckRender = (value, testid) => {
    return value && value === redaction.text ? (
      <Tooltip variant="light" title={redaction.hoverText} placement="left">
        <span className="blur">{value}</span>
      </Tooltip>
    ) : (
      <>
        {value && value.length > textLength ? (
          <Tooltip variant="light" title={value} placement="left">
            <p
              className="grid-item grid-key-value"
              data-testid={testid}
              style={{ marginRight: 10 }}
            >
              {value}
            </p>
          </Tooltip>
        ) : (
          <p className="grid-item grid-key-value" data-testid={testid}>
            {value}
          </p>
        )}
      </>
    );
  };
  const handleDateRedaction = (value, testid) => {
    if (testid === 'date-value') {
      // console.log("approval date", value);
    }
    return value && value === redaction.text ? (
      <Tooltip variant="light" title={redaction.hoverText} placement="left">
        <span className="blur">{value}</span>
      </Tooltip>
    ) : (
      <p className="grid-item grid-key-value" data-testid={testid}>
        {formatESDate(value)}
      </p>
    );
  };
  return (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      {loader && <Loader />}
      <Grid md={11} container>
        {/* ------------------------------------------------- */}
        <Grid md={6} container>
          <Grid md={6}>
            <p className="grid-item bold-class">Indication :</p>
          </Grid>
          <Grid md={6}>
            {redactionCheckRender(data.indication, 'indication-value')}
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Sponsor :</p>
          </Grid>
          <Grid md={6}>
            {redactionCheckRender(data.sponsor, 'sponsor-value')}
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">ProjectId / Opportunity :</p>
          </Grid>
          <Grid md={6}>
            {redactionCheckRender(data.projectId, 'projectid-value')}
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Document Status :</p>
          </Grid>
          <Grid md={6}>
            <span className="text-capitalize">
              {redactionCheckRender(data.documentStatus, 'status-value')}
            </span>
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Version #:</p>
          </Grid>
          <Grid md={6}>
            {redactionCheckRender(data.version, 'version-value')}
          </Grid>
        </Grid>
        {/* ------------------------------------------------- */}
        <Grid md={6} container>
          <Grid md={6}>
            <p className="grid-item bold-class">Phase :</p>
          </Grid>
          <Grid md={6}>{redactionCheckRender(data.phase, 'phase-value')}</Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Molecule/Device :</p>
          </Grid>
          <Grid md={6}>
            {redactionCheckRender(data.molecule, 'molecule-value')}
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Approval Date:</p>
          </Grid>
          <Grid md={6}>
            {handleDateRedaction(data.approval_date, 'date-value')}
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Upload Date :</p>
          </Grid>
          <Grid md={6}>
            {handleDateRedaction(data.uploadDate, 'upload-value')}
            {/* {redactionCheckRender(
              data.uploadDate ? formatESDate(data.uploadDate) : "-",
              "upload-value"
            )} */}
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Source :</p>
          </Grid>
          <Grid md={6}>
            <a
              onClick={() => handleDownload(data)}
              className="grid-item grid-key-value"
              data-testid="source-value"
              style={{
                color: '#0138ff',
                textDecoration: 'underline',
                cursor: 'pointer',
                whiteSpace: 'normal',
              }}
              dangerouslySetInnerHTML={createFullMarkup(data.source)}
            />
          </Grid>
        </Grid>
        {/* ------------------------------------------------- */}

        <Grid md={3}>
          <p className="grid-item bold-class">QC Activity :</p>
        </Grid>
        <Grid md={3}>
          <p
            className="grid-item grid-key-value text-capitalize"
            data-testid="qc-activity-value"
          >
            {redactionCheckRender(data.qcStatus, 'qc-activity-value')}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item bold-class">Uploaded By :</p>
        </Grid>
        <Grid md={3}>
          <p
            className="grid-item grid-key-value text-capitalize"
            data-testid="qc-activity-value"
          >
            {redactionCheckRender(data.uploadedBy, 'uploadedBy-value')}
          </p>
        </Grid>
      </Grid>
      <Link
        onClick={() => onViewAssociateProtocolClick(data)}
        variant="secondary"
        size="small"
        style={{ marginRight: 10, marginTop: 5, fontWeight: 600 }}
        disabled={data && data.viewAssociate && data.viewAssociate}
        data-testid="view_associated_protocol"
      >
        View Associate Protocols
      </Link>
      {/* <span onClick={()=> onViewAssociateProtocolClick(data)}> View </span> */}
      <div
        className={`${
          data.viewAssociate ? 'show-associate-prot' : 'hide-associate'
        }`}
        style={{
          display: data.viewAssociate ? 'block' : 'none',
        }}
      >
        {data && data.rowsLoading ? (
          <div
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Loader1 />
          </div>
        ) : (
          <div className="width100 search-inner-table">
            {dataRow.length > 0 && (
              <Table
                columns={columns}
                rows={dataRow.map((row) => ({
                  ...row,
                  handleSelectRow,
                  key: row.id,
                  selection,
                }))}
                hidePagination
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchCard;
