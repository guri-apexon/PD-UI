import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import FileUpload from 'apollo-react/components/FileUpload';
import Button from 'apollo-react/components/Button';
import TrashIcon from 'apollo-react-icons/Trash';
import IconButton from 'apollo-react/components/IconButton';
import Pencil from 'apollo-react-icons/Pencil';
import { useProtContext } from '../ProtocolContext';

import { toBase64 } from '../../../../utils/utilFunction';
import constant from './constants';
import './ImageUploader.scss';

function ImageUploader({ lineID, content, edit }) {
  const { supportedFileType } = constant;
  const [img, setImg] = useState(null);
  const [imgBkp, setImgBkp] = useState(null);
  const [value, setValue] = useState([]);
  const [isEdit, setIsEdit] = useState(true);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [showDltCnfrm, setShowDltCnfrm] = useState(false);
  const { dispatchSectionEvent, setSaveEnabled } = useProtContext();

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatchSectionEvent('CONTENT_DELETED', { currentLineId: lineID });
  };

  useEffect(() => {
    setImg(content);
    if (content !== '') {
      setIsEdit(false);
    }
    // eslint-disable-next-line
  }, [content]);

  const updateImageInContext = (isSaved, image) => {
    const obj = {
      currentLineId: lineID,
      content: image,
      isSaved,
    };
    dispatchSectionEvent('CONTENT_UPDATE', obj);
  };

  const handleSave = () => {
    updateImageInContext(true, img);
    setShowEditBtn(false);
    setIsEdit(false);
    setSaveEnabled(true);
  };

  const getBase64image = async (file) => {
    const imgSrc = await toBase64(file);
    setImg(imgSrc);
  };

  const handleUpload = (newValue) => {
    if (newValue) {
      const type = newValue[0].name.split('.').pop().toLowerCase();
      if (supportedFileType.includes(type)) {
        setValue(newValue);
      } else {
        toast.error('Please Upload Supported Image File');
      }
    }
  };

  useEffect(() => {
    if (value.length > 0) {
      getBase64image(value[0]);
    }
    // eslint-disable-next-line
  }, [value]);

  const onImgEditBtnClick = () => {
    updateImageInContext(false, img);
    setImgBkp(img);
    setImg('');
    setIsEdit(true);
    setValue([]);
  };

  const handleCancel = (e) => {
    if (!imgBkp) {
      e.stopPropagation();
      dispatchSectionEvent('CONTENT_DELETED', { currentLineId: lineID });
    } else {
      updateImageInContext(true, imgBkp);
    }
    setIsEdit(false);
    setImg(imgBkp);
    setImgBkp(null);
  };

  const imgPreview = () => {
    return (
      // eslint-disable-next-line
      <div
        className="img-container-read-mode"
        data-testId="edit-readmode-img"
        onMouseOver={() => setShowEditBtn(true)}
        onMouseLeave={() => setShowEditBtn(false)}
      >
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
    );
  };

  const uploadView = () => {
    return (
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
          <>
            <p className="fileUpload-helper">Supports png,jpg,jpeg,gif,bmp</p>
            <FileUpload
              label=""
              required
              value={value}
              maxItems={1}
              onUpload={handleUpload}
              onFileDelete={handleDelete}
              data-testId="file-upload"
            />
          </>
        ) : (
          <div>
            <img src={img} alt="img" className="rich-text-img" />
          </div>
        )}
      </div>
    );
  };

  const editView = () => {
    return isEdit ? uploadView() : imgPreview();
  };

  // eslint-disable-next-line
  return edit
    ? editView()
    : img && (
        <div className="img-container-read-mode" data-testId="readmode-img">
          <img src={img} alt="img" className="rich-text-img" />
        </div>
      );
}

export default ImageUploader;

ImageUploader.propTypes = {
  content: PropTypes.isRequired,
  lineID: PropTypes.isRequired,
  edit: PropTypes.isRequired,
};
