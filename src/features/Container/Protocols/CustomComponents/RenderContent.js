import React from 'react';
import { useDispatch } from 'react-redux';
// import PDTable from '../../../Components/pd-table';
// import FileUpload from './FileUpload';
import EditContent from './EditContent';
import './renderContent.scss';

const segmentType = {
  table: 'table',
  text: 'text',
  header: 'header',
  image: 'image',
};

function RenderContent({
  data,
  edit,
  handleContentEdit,
  activeLineID,
  setActiveLineID,
  sectionName,
}) {
  const dispatch = useDispatch();
  const { type, content, line_id: lineID } = data;

  const handleImageDelete = () => {
    // dispatch({
    //   type: ActionTypes.DELETE_IMAGE,
    //   payload: { sectionName, lineID },
    // });
  };

  if (content) {
    if (type === segmentType.table) {
      // return <RenderTable data={data} edit={edit} />;
      //   return (
      //     <div onClick={() => edit && setActiveLineID(data.line_id)}>
      //       <PDTable
      //         data={content}
      //         edit={edit}
      //         onChange={handleContentEdit}
      //         index={'index'}
      //         segment={data}
      //         activeLineID={activeLineID}
      //         lineID={data.line_id}
      //       />
      //     </div>
      //   );
    } else if (type === segmentType.header) {
      return (
        <EditContent
          content={content}
          lineID={lineID}
          setActiveLineID={setActiveLineID}
          activeLineID={activeLineID}
          handleContentEdit={handleContentEdit}
        />
      );
    } else if (type === segmentType.image) {
      if ('imageButton' in data && data.imageButton === true) {
        // return <FileUpload deleteImage={handleImageDelete} />;
      }
      //   return (
      //     <div className="image-container">
      //       {edit && (
      //         <div className="image-buttons">
      //           <button className="button delete" onClick={handleImageDelete}>
      //             Delete Image
      //           </button>
      //         </div>
      //       )}
      //       <img
      //         src={'data:image/*;base64,' + content}
      //         alt=""
      //         style={{
      //           height: 'auto',
      //           maxWidth: '100%',
      //           objectFit: 'cover',
      //         }}
      //       />
      //     </div>
      //   );
    } else {
      return (
        <EditContent
          content={content}
          lineID={lineID}
          setActiveLineID={setActiveLineID}
          activeLineID={activeLineID}
          handleContentEdit={handleContentEdit}
          className="line-content edit-text-con"
        />
      );
    }
  } else {
    return null;
  }
}

export default React.memo(RenderContent);
