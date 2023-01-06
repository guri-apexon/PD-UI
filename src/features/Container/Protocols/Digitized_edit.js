import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import HoverComponent from './CustomComponents/HoverComponent';
import RenderContent from './CustomComponents/RenderContent';
import './Digitized_edit.scss';

import {
  updateContent,
  addContent,
  markContentForDelete,
} from '../../../utils/utilFunction';

function MultilineEdit({ data }) {
  const [activeLineID, setActiveLineID] = useState('');

  const sectionName = null;

  const [sectionData, setSectionData] = useState([...data]);

  const handleAddSegment = (obj, lineId) => () => {
    const arr = addContent(sectionData, obj, lineId);
    setSectionData(arr);
  };

  // const handleSectionHeaderEdit = (value, line_id) => [
  //   console.log(value, line_id),
  // ];
  const handleContentEdit = (value, lineId) => {
    console.log({ value });
    const obj = {
      type: 'modify',
      lineId,
      sectionName,
      content: value,
    };
    const arr = updateContent(sectionData, obj);
    setSectionData(arr);
  };

  const deleteSection = (lineId) => {
    const arr = markContentForDelete(sectionData, lineId);
    setSectionData(arr);
  };

  useEffect(() => {
    console.clear();
    console.log({ sectionData });
  }, [sectionData]);

  return (
    <div className="Richtextcontainer" data-testId="richTextEditor">
      {/* <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current}
            overscanRowCount={5}
            rowCount={sectionData.length}
            // eslint-disable-next-line
            rowRenderer={({ key, index, style, parent }) => {
              const item = sectionData[index];
              return (
                <CellMeasurer
                  key={key}
                  cache={cache.current}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}
                >
                  <div className="content_container" style={style}>
                    <div
                      onClick={() => setActiveLineID(item.line_id)}
                      style={{ position: 'relative' }}
                    >
                      <RenderContent
                        data={item}
                        sectionName={sectionName}
                        handleContentEdit={handleContentEdit}
                        activeLineID={activeLineID}
                      />
                      <HoverComponent
                        lineId={item.line_id}
                        activeLineID={activeLineID}
                        handleAddSegment={handleAddSegment}
                      />
                    </div>
                  </div>
                </CellMeasurer>
              );
            }}
          />
        )}
      </AutoSizer> */}
      {sectionData
        ?.filter((obj) => obj.qc_change_type !== 'delete')
        .map((data) => (
          <div key={data.line_id}>
            <div className="content_container">
              <div
                onClick={() => setActiveLineID(data.line_id)}
                style={{ position: 'relative' }}
              >
                <RenderContent
                  data={data}
                  sectionName={sectionName}
                  handleContentEdit={handleContentEdit}
                  activeLineID={activeLineID}
                  deleteSection={deleteSection}
                />
                {activeLineID === data.line_id && (
                  <HoverComponent
                    lineId={data.line_id}
                    activeLineID={activeLineID}
                    handleAddSegment={handleAddSegment}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  data: PropTypes.isRequired,
};
