import React from 'react';
import PropTypes from 'prop-types';

import EditContent from './EditContent';
import './renderContent.scss';
import { CONTENT_TYPE } from '../../../../AppConstant/AppConstant';
import PDTable from './PDTable';

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
    if (type === CONTENT_TYPE.HEADER) {
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
    if (type === CONTENT_TYPE.TEXT) {
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
    if (type === CONTENT_TYPE.TABLE) {
      return (
        // eslint-disable-next-line
        <div //onClick={() => edit && setActiveLineID(lineID)}
        >
          <PDTable
            data={content}
            edit={edit}
            // onChange={handleContentEdit}
            index="index"
            segment={sectionData}
            activeLineID={activeLineID}
            lineID={activeLineID}
          />
        </div>
        // <PDTable
        //   data={data}
        //   edit={edit}
        //   handleSave={handleTableSave}
        //   key={lineID}
        //   enableTableForEdit={enableTableForEdit}
        //   handleTableDelete={handleTableDelete}
        // />
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
