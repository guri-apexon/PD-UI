import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Button from "apollo-react/components/Button";
import Modal from "apollo-react/components/Modal";
import Loader from "apollo-react/components/Loader";
import FileUpload from "apollo-react/components/FileUpload";
import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";
import Typography from "apollo-react/components/Typography";
import {
  loader,
  bulkMapResponse,
  bulkMapError,
  setBulkMapError,
  setBulkMapResponse,
} from "./adminSlice";

function BulkMap() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const mapLoader = useSelector(loader);
  const bulkError = useSelector(bulkMapError);
  const bulkResponse = useSelector(bulkMapResponse);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleSaveForm = () => {
    if (selectedFiles.length < 1) {
      dispatch(setBulkMapError("Atleast single file is required for upload"));
    } else {
      dispatch({
        type: "BULK_UPLOAD_MAPPING_SAGA",
        payload: selectedFiles[0],
      });
    }
  };

  const handleUpload = (selectedFiles) => {
    if (
      selectedFiles[0].type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setSelectedFiles(selectedFiles);
    } else {
      dispatch(
        setBulkMapError(
          "Invalid file received, please provide excel file(.xlsx)"
        )
      );
    }
  };

  const handleDelete = () => {
    setSelectedFiles([]);
    dispatch(setBulkMapError(""));
    dispatch(setBulkMapResponse(""));
  };

  const resposeObject = () => {
    if (!isEmpty(bulkResponse)) {
      return (
        <Accordion defaultExpanded>
          <AccordionSummary>
            <Typography>Response with details are below</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: "block" }}>
            {bulkResponse.map((item) => {
              return (
                <Typography style={{ color: "#2142a8" }}>{item}</Typography>
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
          bulkError && <span style={{ color: "red" }}>{bulkError}</span>
        }
        buttonProps={[{}, { label: "Upload", onClick: handleSaveForm }]}
        id="new-user-modal"
        data-testid="new-user-modal"
      >
        {mapLoader && (
          <div style={{ height: 30 }}>
            <Loader isInner />
          </div>
        )}
        <div style={{ maxWidth: 700, minWidth: 400 }}>
          <FileUpload
            label="Add file with Protocol Mapping details"
            value={selectedFiles}
            onUpload={handleUpload}
            onFileDelete={handleDelete}
            fullWidth
            dropAreaHeight={150}
            maxItems={1}
            required={true}
          />
        </div>
        {resposeObject()}
      </Modal>
    </>
  );
}

export default BulkMap;
