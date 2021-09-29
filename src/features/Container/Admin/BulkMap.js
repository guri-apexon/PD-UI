import { useState } from "react";
import Button from "apollo-react/components/Button";
import Modal from "apollo-react/components/Modal";
import FileUpload from "apollo-react/components/FileUpload";

function BulkMap() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleSaveForm = () => {
    console.log("click save");
  };

  const handleUpload = (selectedFiles) => {
    console.log(selectedFiles);
    setSelectedFiles(selectedFiles);
  };

  const handleDelete = (file) => {
    console.log(file);
    setSelectedFiles([]);
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
        onClose={() => setIsOpen(false)}
        title="Map User to Protocol"
        // subtitle={}
        buttonProps={[{}, { label: "Upload", onClick: handleSaveForm }]}
        id="new-user-modal"
        data-testid="new-user-modal"
      >
        <div style={{ maxWidth: 426 }}>
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
      </Modal>
    </>
  );
}

export default BulkMap;
