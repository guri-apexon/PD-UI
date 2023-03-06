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
  disabled,
}) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {}, []);

  const saveSection = (e) => {
    e.preventDefault();
    setSelected(null);
    onSaveClick(e);
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
          <Button
            onClick={(e) => {
              onEditClick(e);
              setSelected('edit');
            }}
            data-testId="edit-button"
          >
            <Pencil />
            {expanded && 'Edit'}
          </Button>
        ) : (
          <Button
            onClick={(e) => saveSection(e)}
            disabled={disabled}
            data-testId="save-button"
          >
            <Save className={`${selected === 'edit' ? 'active' : ''}`} />{' '}
            {expanded && 'Save'}
          </Button>
        )}
        <Button
          onClick={() => {
            setSelected('PT');
          }}
          disabled={selected === 'edit'}
        >
          {PTIcon(selected)} {expanded && 'Preferred Terms'}
        </Button>
        <Button
          disabled={selected === 'edit'}
          onClick={() => {
            setSelected('link');
          }}
        >
          <LinkIcon className={`${selected === 'link' ? 'active' : ''}`} />
          {expanded && 'Links & References'}
        </Button>
        <Button
          disabled={selected === 'edit'}
          onClick={() => {
            setSelected('CT');
            setShowEnrichedContent(true);
          }}
        >
          <Stethoscope className={`${selected === 'CT' ? 'active' : ''}`} />{' '}
          {expanded && 'Clinical Terms'}
        </Button>
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
};
