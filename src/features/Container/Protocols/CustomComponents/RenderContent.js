import React from 'react';
import PropTypes from 'prop-types';

import EditContent from './EditContent';
import './renderContent.scss';

function RenderContent({
  sectionData,
  handleContentEdit,
  activeLineID,
  setActiveLineID,
  deleteSection,
  edit,
}) {
  const { type, content, line_id: lineID } = sectionData;

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
          edit={edit}
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
          edit={edit}
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
        edit={edit}
      />
    );
  }
}

export default React.memo(RenderContent);

RenderContent.propTypes = {
  sectionData: PropTypes.isRequired,
  handleContentEdit: PropTypes.isRequired,
  activeLineID: PropTypes.isRequired,
  setActiveLineID: PropTypes.isRequired,
  deleteSection: PropTypes.isRequired,
  edit: PropTypes.isRequired,
};
