import React, { useState, useEffect } from 'react';
import Stethoscope from 'apollo-react-icons/Stethoscope';
import Pencil from 'apollo-react-icons/Pencil';
import Save from 'apollo-react-icons/Save';
import LinkIcon from 'apollo-react-icons/Link';
import EyeShow from 'apollo-react-icons/EyeShow';
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
}) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {}, []);

  const saveSection = (e) => {
    e.preventDefault();
    setSelected(null);
    onSaveClick();
  };

  return (
    <div className={`action-menu ${expanded && 'expanded'}`}>
      <div className="open-close">
        {expanded ? (
          <ArrowRight onClick={() => setExpanded(false)} />
        ) : (
          <ArrowLeft onClick={() => setExpanded(true)} />
        )}
      </div>

      <div className="menu-items ">
        <div>
          {!showedit ? (
            /* eslint-disable-next-line */
            <p
              onClick={(e) => {
                onEditClick(e);
                setSelected('edit');
              }}
            >
              <Pencil /> {expanded && 'Edit'}
            </p>
          ) : (
            /* eslint-disable-next-line */
            <p onClick={(e) => saveSection(e)}>
              <Save className={`${selected === 'edit' ? 'active' : ''}`} />{' '}
              {expanded && 'Save'}
            </p>
          )}
        </div>
        <div key={React.key}>
          {/* eslint-disable-next-line */}
          <p
            onClick={() => {
              setSelected('PT');
            }}
          >
            {PTIcon(selected)} {expanded && 'Preferred Terms'}
          </p>
        </div>
        <div key={React.key}>
          {/* eslint-disable-next-line */}
          <p
            onClick={() => {
              setSelected('link');
            }}
          >
            <LinkIcon className={`${selected === 'link' ? 'active' : ''}`} />{' '}
            {expanded && 'Links & References'}
          </p>
        </div>
        <div key={React.key}>
          {/* eslint-disable-next-line */}
          <p
            onClick={() => {
              setSelected('CT');
              setShowEnrichedContent(true);
            }}
          >
            <Stethoscope className={`${selected === 'CT' ? 'active' : ''}`} />{' '}
            {expanded && 'Clinical Terms'}
          </p>
        </div>
        <div key={React.key}>
          {/* eslint-disable-next-line */}
          <p onClick={() => {}}>
            <EyeShow /> {expanded && 'Audit Information'}
          </p>
          {expanded && (
            <div className="audit-info">
              <p>Last Edited Date</p>
              <p>{auditInfo.last_reviewed_date}</p>
              <p>Numer of Times Edited</p>
              <p> {auditInfo.total_no_review}</p>
              <p>Last Edited By</p>
              <p>{auditInfo.last_reviewed_by}</p>
            </div>
          )}
        </div>
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
  setShowEnrichedContent: PropTypes.isRequired,
};
