import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FileUpload from 'apollo-react/components/FileUpload';
import Grid from 'apollo-react/components/Grid';
import Button from 'apollo-react/components/Button';
import TrashIcon from 'apollo-react-icons/Trash';
import IconButton from 'apollo-react/components/IconButton';
import Pencil from 'apollo-react-icons/Pencil';
import ProtocolContext from '../ProtocolContext';
import { toBase64 } from '../../../../utils/utilFunction';
import './ImageUploader.scss';

function ImageUploader({ lineID, content, edit }) {
  const [img, setImg] = useState(null);
  const [imgBkp, setImgBkp] = useState(null);
  const [value, setValue] = useState([]);
  const [isEdit, setIsEdit] = useState(true);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [showDltCnfrm, setShowDltCnfrm] = useState(false);
  const { dispatchSectionEvent } = useContext(ProtocolContext);

  const handleDelete = () => {
    dispatchSectionEvent('CONTENT_DELETED', { currentLineId: lineID });
  };

  useEffect(() => {
    setImg(content);
    if (content !== '') {
      setIsEdit(false);
    }
    // eslint-disable-next-line
  }, [content]);

  const handleSave = () => {
    const obj = {
      currentLineId: lineID,
      content: img,
    };
    dispatchSectionEvent('CONTENT_UPDATE', obj);
    setShowEditBtn(false);
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
    // eslint-disable-next-line
  }, [value]);

  const onImgEditBtnClick = () => {
    setImgBkp(img);
    setImg('');
    setIsEdit(true);
    setValue([]);
  };

  const handleCancel = () => {
    if (!imgBkp || imgBkp === '') {
      dispatchSectionEvent('CONTENT_DELETED', { currentLineId: lineID });
    }
    setIsEdit(false);
    setImg(imgBkp);
    setImgBkp(null);
  };

  // eslint-disable-next-line
  return edit ? (
    isEdit ? (
      <div className="img-container" data-testId="file-upload">
        <div className="btn-container">
          <Button variant="secondary" size="small" onClick={handleCancel}>
            Cancel
          </Button>

          <Button
            variant="primary"
            size="small"
            onClick={handleSave}
            disabled={value.length === 0}
          >
            Save
          </Button>
        </div>

        {img === '' && value.length === 0 ? (
          <FileUpload
            label=""
            required
            value={value}
            maxItems={1}
            onUpload={handleUpload}
            onFileDelete={handleDelete}
            data-testId="file-upload"
          />
        ) : (
          <div>
            <img src={img} alt="img" className="rich-text-img" />
          </div>
        )}
      </div>
    ) : (
      /* eslint-disable */
      <div
        className="img-container-read-mode"
        data-testId="edit-readmode-img"
        onMouseOver={() => setShowEditBtn(true)}
        onMouseLeave={() => setShowEditBtn(false)}
      >
        {/* eslint-enable */}
        <img src={img} alt="img" className="rich-text-img" />
        {showEditBtn && !showDltCnfrm && (
          <div className="img-edit-btn-container">
            <IconButton
              darkMode
              destructiveAction
              onClick={() => setShowDltCnfrm(true)}
              data-testId="delete_img"
            >
              <TrashIcon />
            </IconButton>

            <IconButton
              darkMode
              destructiveAction
              onClick={onImgEditBtnClick}
              data-testId="edit_img"
            >
              <Pencil />
            </IconButton>
          </div>
        )}
        {showDltCnfrm && (
          <div
            className="delete-confirmation-box"
            data-testId="deleteConfirmBox"
          >
            <p>Please confirm if you want to continue with deletion</p>

            <div>
              <Button
                variant="secondary"
                onClick={() => setShowDltCnfrm(false)}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                onClick={handleDelete}
                data-testID="confirmDelete"
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  ) : (
    img && (
      <div className="img-container-read-mode" data-testId="readmode-img">
        <img src={img} alt="img" className="rich-text-img" />
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
