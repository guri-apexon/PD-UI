import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FileUpload from 'apollo-react/components/FileUpload';
import Button from 'apollo-react/components/Button';
import ProtocolContext from '../ProtocolContext';
import { toBase64 } from '../../../../utils/utilFunction';
import './ImageUploader.scss';

function ImageUploader({ lineID, content, edit }) {
  const [img, setImg] = useState(null);
  const [value, setValue] = useState([]);
  const { dispatchSectionEvent } = useContext(ProtocolContext);

  const handleDelete = () => {
    dispatchSectionEvent('CONTENT_DELETED', { currentLineId: lineID });
  };

  const handleSave = () => {
    const obj = {
      currentLineId: lineID,
      content: img,
    };
    dispatchSectionEvent('CONTENT_UPDATE', obj);
  };

  const getBase64image = async (file) => {
    const imgSrc = await toBase64(file);
    setImg(imgSrc);
  };

  const handleUpload = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value.length > 0) {
      getBase64image(value[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (content !== '') {
      setImg(content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return edit ? (
    <div className="img-container">
      <div className="btn-container">
        <Button
          variant="secondary"
          size="small"
          style={{ marginRight: 10 }}
          onClick={handleDelete}
        >
          Delete
        </Button>

        <Button
          variant="primary"
          size="small"
          style={{ marginRight: 10 }}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>

      {content === '' && value.length === 0 ? (
        <FileUpload
          label=""
          required
          value={value}
          maxItems={1}
          onUpload={handleUpload}
          onFileDelete={handleDelete}
        />
      ) : (
        <img src={img} alt="img" className="richTextImg" />
      )}
    </div>
  ) : (
    img && (
      <div className="img-container">
        <img src={img} alt="img" className="richTextImg" />
      </div>
    )
  );
}

export default ImageUploader;

ImageUploader.propTypes = {
  content: PropTypes.isRequired,
  lineID: PropTypes.isRequired,
  edit: PropTypes.isRequired,
};
