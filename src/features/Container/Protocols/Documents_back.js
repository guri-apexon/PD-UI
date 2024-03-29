/* eslint-disable */
import React, { useState } from 'react';
import DocumentsTable from '../../Components/DocumentsTable/DocumentsTable';

import { useSelector } from 'react-redux';
import Grid from 'apollo-react/components/Grid';
import './Documents.scss';
import Button from 'apollo-react/components/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import FileDownload from 'js-file-download';
import Loader from 'apollo-react/components/Loader';
import { BASE_URL_8000, UI_URL } from '../../../utils/api';
import { protocolSummary, associateDocs } from './protocolSlice.js';
import AssociateDocumentsTable from '../../Components/DocumentsTable/AssociateDocumentsTable';

function Documents({ handleChangeTab }) {
  const summary = useSelector(protocolSummary);
  const associateDocuments = useSelector(associateDocs);
  const [protocolSelected, setProtocolSelected] = useState([]);
  const [loader, setLoader] = useState(false);

  const setProtocolToDownload = (id) => {
    console.log(id);
    if (protocolSelected.length === 0) {
      setProtocolSelected([id]);
    } else if (protocolSelected.length === 1) {
      const index = protocolSelected.indexOf(id);
      if (index > -1) {
        setProtocolSelected((protocolSelected) =>
          protocolSelected.filter((item) => item !== id),
        );
      } else {
        setProtocolSelected([...protocolSelected, id]);
      }
    } else if (protocolSelected.length === 2) {
      const index = protocolSelected.indexOf(id);
      if (index > -1) {
        setProtocolSelected((protocolSelected) =>
          protocolSelected.filter((item) => item !== id),
        );
      } else {
        toast.warn('Comparison is available only for two protocols.');
        // setProtocolSelected([...protocolSelected, id]);
      }
    }
  };
  const downloadCompare = async () => {
    console.log('Selected', protocolSelected, UI_URL);
    if (protocolSelected.length <= 1) {
      toast.warn('Please select two versions, for compare and download');
    } else if (protocolSelected.length === 2) {
      setLoader(true);
      try {
        const resp = await axios.get(
          `${BASE_URL_8000}/api/document_compare/?id1=${protocolSelected[0]}&id2=${protocolSelected[1]}`,
        );
        const { data } = resp;
        if (data.numChangesTotal > 0) {
          const path = data.compareCSVPath;
          const splitArr = path.split('/');
          const fileName = splitArr[splitArr.length - 1];
          //   const filePath = `${UI_URL}/${fileName}`;

          axios({
            url: '/api/download',
            // url: "http://localhost:4000/api/download",
            method: 'GET',
            params: {
              path,
            },
            responseType: 'blob', // Important
          })
            .then((response) => {
              FileDownload(response.data, fileName);
              setLoader(false);
              setProtocolSelected([]);
            })
            .catch((e) => {
              setLoader(false);
              toast.error('File Download Failed.');
            });
        } else {
          setLoader(false);
          toast.info('No difference found for this compare');
        }
      } catch (e) {
        setLoader(false);
        console.log('Compare Resp', e.response);
        if (e.response && e.response.data) {
          toast.error(e.response.data.detail);
        } else {
          toast.error('Data Fetching failed. Please Try Again.');
        }
      }
    }
  };
  return (
    <div className="document-tab">
      {loader && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            className="source-document-tab"
            data-testid="source-document-tab"
          >
            <DocumentsTable initialsRow={summary.success && [summary.data]} />
          </div>
        </Grid>
        {associateDocuments && associateDocuments.length > 1 && (
          <div style={{ width: '100%', marginTop: '10px', marginRight: '7px' }}>
            <Button
              onClick={() => downloadCompare()}
              variant="primary"
              data-testid="compare-download-button"
              style={{
                float: 'right',
                height: 38,
                width: 235,
                boxShadow:
                  '0 4px 8px 0 rgb(5 85 252 / 32%), 0 4px 16px 0 rgb(0 0 0 / 4%)',
              }}
            >
              Download Compare Result
            </Button>
          </div>
        )}
        <Grid item xs={12}>
          <div className="associate-document-tab">
            <AssociateDocumentsTable
              handleChangeTab={handleChangeTab}
              protocolSelected={protocolSelected}
              setProtocolToDownload={setProtocolToDownload}
              //  initialsRow={protocolData && protocolData}
              initialsRow={associateDocuments && associateDocuments}
              showCheckbox={
                !!(associateDocuments && associateDocuments.length > 1)
              }
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Documents;
