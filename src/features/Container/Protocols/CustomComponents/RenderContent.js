import React from 'react';
import PropTypes from 'prop-types';

import EditContent from './EditContent';
import './renderContent.scss';

function RenderContent({
  data,
  handleContentEdit,
  activeLineID,
  setActiveLineID,
  deleteSection,
}) {
  const { type, content, line_id: lineID } = data;

  if (content) {
    if (type === 'header') {
      return (
        <EditContent
          type="header"
          content={content}
          lineID={lineID}
          setActiveLineID={setActiveLineID}
          activeLineID={activeLineID}
          handleContentEdit={handleContentEdit}
          deleteSection={deleteSection}
        />
      );
    }
    if (type === 'text') {
      return (
        <EditContent
          type="text"
          content={content}
          lineID={lineID}
          setActiveLineID={setActiveLineID}
          activeLineID={activeLineID}
          handleContentEdit={handleContentEdit}
          deleteSection={deleteSection}
        />
      );
    }
  } else {
    return (
      <EditContent
        type="text"
        content=""
        lineID={lineID}
        setActiveLineID={setActiveLineID}
        activeLineID={activeLineID}
        handleContentEdit={handleContentEdit}
        deleteSection={deleteSection}
      />
    );
  }
}

export default React.memo(RenderContent);

RenderContent.propTypes = {
  data: PropTypes.isRequired,
  handleContentEdit: PropTypes.isRequired,
  activeLineID: PropTypes.isRequired,
  setActiveLineID: PropTypes.isRequired,
  deleteSection: PropTypes.isRequired,
};