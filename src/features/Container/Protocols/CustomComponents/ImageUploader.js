import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FileUpload from 'apollo-react/components/FileUpload';
import Button from 'apollo-react/components/Button';
import ProtocolContext from '../ProtocolContext';
import { toBase64 } from '../../../../utils/utilFunction';
import './ImageUploader.scss';

function ImageUploader({ lineID, content, edit }) {
  const [img, setImg] = useState(null);
  const [imgBkp, setImgBkp] = useState(null);
  const [value, setValue] = useState([]);
  const [isEdit, setIsEdit] = useState(true);
  const [showEditBtn, setShowEditBtn] = useState(false);
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
    setIsEdit(false);
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

  const onImgEditBtnClick = () => {
    setIsEdit(true);
    setImgBkp(img);
    const obj = {
      currentLineId: lineID,
      content: '',
    };
    dispatchSectionEvent('CONTENT_UPDATE', obj);
    setValue([]);
  };

  const handleCancel = () => {
    if (!imgBkp) {
      dispatchSectionEvent('CONTENT_DELETED', { currentLineId: lineID });
    } else {
      setImg(imgBkp);
      const obj = {
        currentLineId: lineID,
        content: imgBkp,
      };
      dispatchSectionEvent('CONTENT_UPDATE', obj);
    }
    setImgBkp(null);
    setIsEdit(false);
  };

  // eslint-disable-next-line no-nested-ternary
  return edit ? (
    isEdit ? (
      <div className="img-container" data-testId="file-upload">
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
            variant="secondary"
            size="small"
            style={{ marginRight: 10 }}
            onClick={handleCancel}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="small"
            style={{ marginRight: 10 }}
            onClick={handleSave}
            disabled={value.length === 0}
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
      /* eslint-disable */
      <div
        className="img-container-read-mode"
        onMouseOver={() => setShowEditBtn(true)}
        onMouseLeave={() => setShowEditBtn(false)}
      >
        <img src={img} alt="img" className="richTextImg" />
        {showEditBtn && (
          <div className="img-edit-btn-container">
            <Button
              variant="primary"
              size="small"
              style={{ marginRight: 10 }}
              onClick={onImgEditBtnClick}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      /* eslint-enable */
    )
  ) : (
    img && (
      <div className="img-container-read-mode">
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
