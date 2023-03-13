import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import { useProtContext } from '../ProtocolContext';

import RenderContent from '../CustomComponents/RenderContent';
import './MultilineEdit.scss';
import {
  updateContent,
  markContentForDelete,
} from '../../../../utils/utilFunction';

import { setSectionDetails } from '../protocolSlice';
import FontProperties from '../CustomComponents/FontProperties/FontProperties';

function MultilineEdit({ sectionDataArr, edit }) {
  const [sections, setSections] = useState([]);
  const { dispatchSectionEvent } = useProtContext();
  const [showconfirm, setShowConfirm] = useState(false);
  const [enableNewSection, setEnableNewSection] = useState(false);

  useEffect(() => {
    if (sectionDataArr?.length > 0) {
      console.log('shubham');
      setSections(sectionDataArr);
    } else {
      console.log('shubham1');
      setSections([
        {
          section_level: '',
          CPT_section: 'Unmapped',
          type: 'text',
          content: 'Edit Your Text Here',
          font_info: {
            IsBold: false,
            font_size: -1,
            font_style: '',
            entity: [],
            roi_id: {
              para: '84f1e221-336b-438b-8d47-5643db2be9de',
              childbox: '',
              subtext: '',
            },
            Bold: false,
            Caps: false,
            ColorRGB: 0,
            doc_id: '36b2b7e8-0c8e-437e-9552-81db1f945799',
            DStrike: false,
            Emboss: false,
            group_type: 'fontInfo',
            hierarchy: 'paragraph',
            Highlight: '',
            id: '40f4bf56-8e9f-44ac-a0a9-979d598a0cc0',
            Imprint: false,
            iqv_standard_term: '',
            Italics: false,
            link_id: '9062b40b-874a-11ed-ac29-005056ab6469',
            link_id_level2: '',
            link_id_level3: '',
            link_id_level4: '',
            link_id_level5: '',
            link_id_level6: '',
            link_id_subsection1: '',
            link_id_subsection2: '',
            link_id_subsection3: '',
            Outline: false,
            parent_id: '2771cfd9-9246-4766-95b5-0964325a9cc2',
            rFonts: '',
            rStyle: '',
            Shadow: false,
            Size: -1,
            SmallCaps: false,
            Strike: false,
            Underline: '',
            Vanish: false,
            VertAlign: '',
          },
          level_1_CPT_section: 'Unmapped',
          file_section: 'Unmapped',
          file_section_num: '',
          file_section_level: 1,
          seq_num: 2,
          qc_change_type: '',
          line_id: '84f1e221-336b-438b-8d47-5643db2be9de',
          aidocid: '36b2b7e8-0c8e-437e-9552-81db1f945799',
          synonyms_extracted_terms: '',
          semantic_extraction: '',
          section_locked: false,
        },
        {
          section_level: '',
          CPT_section: 'Unmapped',
          type: 'text',
          content: 'Edit Your Text Here',
          font_info: {
            IsBold: false,
            font_size: -1,
            font_style: '',
            entity: [],
            roi_id: {
              para: '84f1e221-336b-438b-8d47-5643db2be9de',
              childbox: '',
              subtext: '',
            },
            Bold: false,
            Caps: false,
            ColorRGB: 0,
            doc_id: '36b2b7e8-0c8e-437e-9552-81db1f945799',
            DStrike: false,
            Emboss: false,
            group_type: 'fontInfo',
            hierarchy: 'paragraph',
            Highlight: '',
            id: '40f4bf56-8e9f-44ac-a0a9-979d598a0cc0',
            Imprint: false,
            iqv_standard_term: '',
            Italics: false,
            link_id: '9062b40b-874a-11ed-ac29-005056ab6469',
            link_id_level2: '',
            link_id_level3: '',
            link_id_level4: '',
            link_id_level5: '',
            link_id_level6: '',
            link_id_subsection1: '',
            link_id_subsection2: '',
            link_id_subsection3: '',
            Outline: false,
            parent_id: '2771cfd9-9246-4766-95b5-0964325a9cc2',
            rFonts: '',
            rStyle: '',
            Shadow: false,
            Size: -1,
            SmallCaps: false,
            Strike: false,
            Underline: '',
            Vanish: false,
            VertAlign: '',
          },
          level_1_CPT_section: 'Unmapped',
          file_section: 'Unmapped',
          file_section_num: '',
          file_section_level: 1,
          seq_num: 2,
          qc_change_type: '',
          line_id: '84f1e221-336b-438b-8d47-5643db2be9de',
          aidocid: '36b2b7e8-0c8e-437e-9552-81db1f945799',
          synonyms_extracted_terms: '',
          semantic_extraction: '',
          section_locked: false,
        },
      ]);
    }
    setEnableNewSection(true);
  }, [sectionDataArr]);

  const dispatch = useDispatch();
  const [activeLineID, setActiveLineID] = useState('');

  const sectionName = null;

  const handleContentEdit = (value, lineId) => {
    const obj = {
      type: 'modify',
      lineId,
      sectionName,
      content: value,
    };
    const arr = updateContent(sectionDataArr, obj);
    dispatch(setSectionDetails(arr));
  };

  const deleteSection = (lineId) => {
    const arr = markContentForDelete(sectionDataArr, lineId);
    dispatch(setSectionDetails(arr));
  };

  const deleteSegment = () => {
    dispatchSectionEvent('CONTENT_DELETED', { currentLineId: activeLineID });
    setShowConfirm(false);
  };

  return (
    <>
      <div className="Richtextcontainer" data-testId="richTextEditor">
        {edit && (
          <FontProperties
            activeLineID={activeLineID}
            onDeleteClick={() => setShowConfirm(true)}
            //  enableNewSection={enableNewSection}
          />
        )}
        <section className="section-edited-list">
          {sections?.map((section) => (
            // eslint-disable-next-line
            <div
              className="content_container"
              data-testId="content_container"
              key={section.line_id}
              onClick={() => edit && setActiveLineID(section.line_id)}
            >
              {console.log('section', section)}
              <RenderContent
                sectionData={section}
                sectionName={sectionName}
                handleContentEdit={handleContentEdit}
                activeLineID={activeLineID}
                deleteSection={deleteSection}
                setActiveLineID={setActiveLineID}
                edit={edit}
                // enableNewSection={enableNewSection}
              />
            </div>
          ))}
        </section>
      </div>
      {showconfirm && (
        <div className="confirmation-popup" data-testId="confirmPopup">
          <p>Please confirm if you want to continue with deletion</p>
          <ButtonGroup
            buttonProps={[
              {
                label: 'Cancel',
                onClick: () => setShowConfirm(false),
              },
              {
                label: 'Delete',
                onClick: deleteSegment,
              },
            ]}
          />
        </div>
      )}
    </>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  sectionDataArr: PropTypes.isRequired,
  edit: PropTypes.isRequired,
};
