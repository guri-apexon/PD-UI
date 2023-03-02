/* eslint-disable */
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Button from 'apollo-react/components/Button';
import FileUpload from 'apollo-react/components/FileUpload';
import Grid from 'apollo-react/components/Grid';
import Loader from 'apollo-react/components/Loader';
import Modal from 'apollo-react/components/Modal';
import TextField from 'apollo-react/components/TextField';
import Typography from 'apollo-react/components/Typography';
import { cloneDeep } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userId } from '../../../store/userDetails';
import {
  bulkMapError,
  bulkMapResponse,
  mappingLoader,
  setBulkMapError,
  setBulkMapResponse,
} from './adminSlice';

const errorValue = {
  viaTicketNumber: { error: false, message: '' },
};

function BulkMap() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [viaTicketNumber, setViaTicketNumber] = useState('');
  const mapLoader = useSelector(mappingLoader);
  const bulkError = useSelector(bulkMapError);
  const bulkResponse = useSelector(bulkMapResponse);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formErrValue, setFormErrValue] = useState(errorValue);

  const userId1 = useSelector(userId);

  const handleSaveForm = () => {
    const err = cloneDeep(formErrValue);
    if (selectedFiles.length < 1) {
      dispatch(setBulkMapError('Atleast single file is required for upload'));
    }
    if (isEmpty(viaTicketNumber)) {
      (err.viaTicketNumber.error = true),
        (err.viaTicketNumber.message = 'Required');
    }
    setFormErrValue(err);
    if (!isEmpty(viaTicketNumber)) {
      const requestPayload = {
        uploadedFile: selectedFiles[0],
        accessReason: viaTicketNumber,
        userUpdated: userId1,
      };
      dispatch({
        type: 'BULK_UPLOAD_MAPPING_SAGA',
        payload: requestPayload,
      });
    }
  };

  const handleUpload = (selectedFiles) => {
    if (
      selectedFiles[0].type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      setSelectedFiles(selectedFiles);
    } else {
      dispatch(
        setBulkMapError(
          'Invalid file received, please provide excel file(.xlsx)',
        ),
      );
    }
  };

  const handleDelete = () => {
    setSelectedFiles([]);
    dispatch(setBulkMapError(''));
    dispatch(setBulkMapResponse(''));
  };

  const onFieldBlur = (key) => {
    const err = cloneDeep(formErrValue);
    if (key === 'viaTicketNumber') {
      err.viaTicketNumber.error = false;
      err.viaTicketNumber.message = '';
    }
    setFormErrValue(err);
  };

  const resposeObject = () => {
    if (!isEmpty(bulkResponse)) {
      return (
        <Accordion defaultExpanded>
          <AccordionSummary>
            <Typography>Response with details are below</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'block' }}>
            {bulkResponse.map((item) => {
              return (
                <Typography style={{ color: '#2142a8' }}>{item}</Typography>
              );
            })}
          </AccordionDetails>
        </Accordion>
      );
    }
  };

  return (
    <>
      <Button
        variant="primary"
        style={{ marginRight: 10 }}
        onClick={() => setIsOpen(true)}
      >
        Bulk Map
      </Button>
      <Modal
        variant="default"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleDelete();
        }}
        title="Map User to Protocol"
        subtitle={
          bulkError && <span style={{ color: 'red' }}>{bulkError}</span>
        }
        buttonProps={[{}, { label: 'Upload', onClick: handleSaveForm }]}
        id="bulk-map-modal"
        data-testid="bulk-map-modal"
      >
        {mapLoader && (
          <div style={{ height: 30 }}>
            <Loader isInner />
          </div>
        )}
        <div style={{ maxWidth: 700, minWidth: 400 }} data-testid="file-upload">
          <div>
            <p>
              Click here for Bulk Map sample excel :{' '}
              <Link
                style={{ textDecoration: 'none' }}
                to="/Bulk Map.xlsx"
                target="_blank"
                download
              >
                Download
              </Link>
            </p>
          </div>
          <FileUpload
            label="Add file with Protocol Mapping details"
            value={selectedFiles}
            onUpload={handleUpload}
            onFileDelete={handleDelete}
            fullWidth
            dropAreaHeight={150}
            maxItems={1}
            required
          />
        </div>
        <Grid item xs={6} sm={6}>
          <TextField
            label="VIA Ticket #"
            placeholder="Enter VIA Ticket Number"
            fullWidth
            helperText={formErrValue.viaTicketNumber.message}
            error={formErrValue.viaTicketNumber.error}
            onChange={(event) => setViaTicketNumber(event.target.value)}
            onBlur={(e) => onFieldBlur('viaTicketNumber')}
            required
            data-testid="viaTicketNumber-textField"
          />
        </Grid>
        {resposeObject()}
      </Modal>
    </>
  );
}

export default BulkMap;
