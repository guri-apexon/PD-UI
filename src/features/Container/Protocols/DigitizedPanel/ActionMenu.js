import React, { useState, useEffect } from 'react';
import Stethoscope from 'apollo-react-icons/Stethoscope';
import Pencil from 'apollo-react-icons/Pencil';
import Save from 'apollo-react-icons/Save';
import LinkIcon from 'apollo-react-icons/Link';
import EyeShow from 'apollo-react-icons/EyeShow';
import Button from 'apollo-react/components/Button';
import ArrowLeft from 'apollo-react-icons/ArrowLeft';
import ArrowRight from 'apollo-react-icons/ArrowRight';
import PropTypes from 'prop-types';

import './ActionMenu.scss';

function PTIcon(selected) {
  return <span className={`ptIcon ${selected === 'PT' && 'active'}`}>PT</span>;
}

function ActionMenu({
  auditInfo,
  showedit,
  onSaveClick,
  onEditClick,
  setShowEnrichedContent,
  setShowPrefferedTerm,
  showPrefferedTerm,
  showEnrichedContent,
  disabled,
  showLink,
  setShowLink,
  setShowEdit,
}) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [clinicalTermstoggle, setClinicalTermsToggle] = useState(true);
  const [linkReferencetoggle, setLinkReferenceToggle] = useState(true);

  useEffect(() => {}, []);

  const saveSection = (e) => {
    e.preventDefault();
    setSelected(null);
    onSaveClick(e);
  };

  // const handleToggle = (setfun) => {
  //   setToggle(!toggle);
  //   if (toggle) {
  //     setfun(true);
  //   } else {
  //     setfun(false);
  //   }
  // };

  const handlePrefferedTerm = () => {
    setSelected('PT');
    setToggle(!toggle);
    if (toggle) {
      setShowPrefferedTerm(true);
    } else {
      setShowPrefferedTerm(false);
    }
  };

  const handleClinicalTerms = () => {
    setSelected('CT');
    setClinicalTermsToggle(!clinicalTermstoggle);
    if (clinicalTermstoggle) {
      setShowEnrichedContent(true);
    } else {
      setShowEnrichedContent(false);
    }
    // handleToggle(setShowEnrichedContent(true));
  };

  const handleLinkReference = () => {
    setSelected('link');
    setLinkReferenceToggle(!linkReferencetoggle);
    if (linkReferencetoggle) {
      setShowLink(true);
    } else {
      setShowLink(false);
    }
  };

  const handleEdit = (e) => {
    onEditClick(e);
    setSelected('edit');
    setToggle(!toggle);
    if (toggle) {
      setShowEdit(true);
    } else {
      setShowEdit(false);
    }
  };

  return (
    <div className={`action-menu ${expanded && 'expanded'}`}>
      <div className="open-close" data-testId="openClosePanel">
        {expanded ? (
          <ArrowRight onClick={() => setExpanded(false)} />
        ) : (
          <ArrowLeft onClick={() => setExpanded(true)} />
        )}
      </div>

      <div className="menu-items">
        {!showedit ? (
          <button
            type="button"
            onClick={(e) => handleEdit(e)}
            data-testId="edit-button"
          >
            <Pencil />
            {expanded && 'Edit'}
          </button>
        ) : (
          <button
            className={`${showedit ? 'active_color' : ''}`}
            type="button"
            onClick={(e) => saveSection(e)}
            disabled={disabled}
            data-testId="save-button"
          >
            <Save className={`${showedit ? 'active' : ''}`} />{' '}
            {expanded && 'Save'}
          </button>
        )}

        <button
          className={`${showPrefferedTerm ? 'active_color' : ''}`}
          type="button"
          onClick={() => handlePrefferedTerm()}
          disabled={selected === 'edit'}
          data-testId="preferred-button"
        >
          {PTIcon(selected)}
          {expanded && 'Preferred Terms'}
        </button>

        <button
          className={`${showLink ? 'active_color' : ''}`}
          type="button"
          disabled={selected === 'edit'}
          onClick={() => handleLinkReference()}
          data-testId="links-button"
        >
          <LinkIcon className={`${showLink ? 'active' : ''}`} />
          {expanded && 'Links & References'}
        </button>
        <button
          className={`${showEnrichedContent ? 'active_color' : ''}`}
          type="button"
          disabled={selected === 'edit'}
          onClick={() => handleClinicalTerms()}
          data-testId="clinical-button"
        >
          <Stethoscope className={`${showEnrichedContent ? 'active' : ''}`} />{' '}
          {expanded && 'Clinical Terms'}
        </button>
        <fieldset>
          <p>
            <EyeShow />
            {expanded && 'Audit Information'}
          </p>
          {expanded && (
            <div className="audit-info">
              <p className="key">Last Edited Date</p>
              <p>{auditInfo.last_reviewed_date}</p>
              <p className="key">Numer of Times Edited</p>
              <p> {auditInfo.total_no_review}</p>
              <p className="key">Last Edited By</p>
              <p>{auditInfo.last_reviewed_by}</p>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  );
}

export default ActionMenu;

ActionMenu.propTypes = {
  auditInfo: PropTypes.isRequired,
  showedit: PropTypes.isRequired,
  onSaveClick: PropTypes.isRequired,
  onEditClick: PropTypes.isRequired,
  disabled: PropTypes.isRequired,
  setShowEnrichedContent: PropTypes.isRequired,
  setShowPrefferedTerm: PropTypes.isRequired,
  showPrefferedTerm: PropTypes.isRequired,
  showEnrichedContent: PropTypes.isRequired,
  showLink: PropTypes.isRequired,
  setShowLink: PropTypes.isRequired,
  setShowEdit: PropTypes.isRequired,
};
