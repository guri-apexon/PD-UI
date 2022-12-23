import React, { useState, useEffect } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import PropTypes from 'prop-types';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import { isArray } from 'lodash';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import { useSelector, useDispatch } from 'react-redux';
import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import EyeShow from 'apollo-react-icons/EyeShow';
import MultilineEdit from './Digitized_edit';
import Loader from '../../Components/Loader/Loader';
import {
  sectionDetailsResult,
  sectionLoader,
  setSectionLoader,
  resetSectionData,
} from './protocolSlice';

function DigitizeAccordion({
  item,
  protocol,
  primaryRole,
  currentActiveCard,
  setCurrentActiveCard,
}) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [showedit, setShowEdit] = useState(false);

  const sectionHeaderDetails = useSelector(sectionDetailsResult);
  const sectionContentLoader = useSelector(sectionLoader);

  // const { sections, linkId } = sectionHeaderDetails;

  const introContent = `1.1 Background Information
  Central venous access devices (CVADs) are essential for managing chronic and acute conditions for
  which long-term medication is required, for example, the treatment of pain, cancer, infection, or to
  supply nutrition. In addition to the infusion of therapeutic agents, CVADs also allow for the
  withdrawal of blood and are therefore useful in reducing the need for repeated venipuncture.
  Each year, as many as 25% of the approximately 7 million catheters that are placed in patients to
  deliver chemotherapy, nutritional support, antibiotics, or blood products become occluded (Brown,
  2004; Richardson, 2007). Catheter occlusion can result in patient discomfort, deep vein thrombosis,
  hospitalization and possibly the need for invasive procedures, along with increased costs.
  Moreover, occluded catheters can result in delayed or missed therapies and often requires surgical
  replacement.
  The majority of occlusions are caused by formation of a thrombus within or around the catheter. A
  fibrin sheath is one of the most common causes of thrombotic obstruction. It can occur within 24
  hours after CVAD placement and usually develops within 2 weeks. The fibrin sheath does not
  usually affect catheter function but may cause a partial obstruction by creating a one-way valve
  over the catheter tip. Intraluminal clots account for 5–25% of all catheter occlusions and may cause
  complete catheter obstruction. Catheter-related venous thrombosis refers to a thrombus that
  develops in proximity to a CVAD. A mural thrombus is a blood clot that adheres to the vessel wall
  and can occlude the tip of the catheter but does not completely occlude the vein in which the
  catheter is positioned.
  After ruling out mechanical dysfunction and medication or parenteral nutrition-related causes, the
  next step is to exclude thrombotic obstruction. Although diagnostic imaging techniques or
  linograms are available, a common practice is to treat suspected thrombus-related occlusions
  empirically with thrombolytics (fibrinolytics with thrombolytic agents) allows catheter function to
  be restored efficiently and is a cost-effective alternative to replacing the catheter. In the United
  States, the current standard treatment for CVAD occlusions is intra-catheter instillation of alteplase
  2 mg/2mL (Baskin et al, 2009).
  Fibrinolytic agents, sometimes referred to as plasminogen activators, are classified into two types:
  fibrin-specific and non–fibrin-specific agents. Fibrin-specific agents, which include alteplase (tPA),
  reteplase (recombinant plasminogen activator [r-PA]), and tenecteplase, produce limited
  plasminogen conversion in the absence of fibrin. Non–fibrin-specific agents (e.g., streptokinase)
  catalyze systemic fibrinolysis (Rivera-Bou, 2017).
  Tissue plasminogen activator (tPA) is a naturally occurring fibrinolytic agent found in vascular
  endothelial cells and is involved in the balance between thrombolysis and thrombogenesis. It
  exhibits significant fibrin specificity and affinity. At the site of the thrombus, the binding of t-PA
  and plasminogen to the fibrin surface induces a conformational change that facilitates conversion of
  plasminogen to plasmin and dissolves the clot (Ouriel, 2004).
  Alteplase has a plasma half-life of 4-6 minutes. It is FDA-approved under the brand name
  ACTIVASE® for the treatment of acute ischemic stroke (AIS), acute myocardial infarction (AMI)
  to reduce mortality and incidence of heart failure, and acute massive pulmonary embolism (PE) for
  lysis. At present, alteplase is the only thrombolytic agent approved in the US under the name`;

  const [sections, setsections] = useState([
    {
      content: introContent,
    },
  ]);

  const sectionArr = [
    {
      key: '94e85982-7c37-11ed-8245-005056ab6469',
      content: `Document Code:CLI-CUSA-081-HEM-01-APP 16.1.1-01117
    Title:CUSA-081-HEM-01 (READY 1) Clinical Protocol
    Version:4.0,CURRENT
    Status:Approved, since: 06-Jun-2019 18:28:12 UTC
    Electronic Signature:
    Signed by: Carolyn Beaudot (CAROLYN.BEAUDOT)
    Date: 06-Jun-2019 18:26:17 UTC
    Meaning of Signature: Statistician
    Signed by: Morganti Roberto (USR01935)
    Date: 06-Jun-2019 18:28:07 UTC
    Meaning of Signature: Sponsor Medical Expert
    Note: Each electronic signature above is equivalent to a handwritten signature since the
    computer system managing the electronic document fully complies with the international rules
    (i.e. FDACFR21part11, EU Annex11) concerning Electronic Records and Electronic Signatures
    Management.
    Confidential Declaration
    This document contains confidential data which is the property of Chiesi. The use of this data or any
    part of it must be authorized by the Department Head/Study Responsible. A secrecy agreement must
    be set up and signed prior to disclosing any content of the document to a Third Party`,
    },
    {
      key: '94e85988-7c37-11ed-b8d0-005056ab6469',
      content: introContent,
    },
  ];
  const handleChange = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (expanded) {
      setCurrentActiveCard(item.link_id);
      const selectedLink = sectionArr.find((x) => x.key === item.link_id);
      setsections([
        {
          content: selectedLink?.content ? selectedLink.content : introContent,
        },
      ]);
      // if (linkId !== item.link_id) {
      //   dispatch(setSectionLoader());
      //   dispatch(resetSectionData());
      //   dispatch({
      //     type: 'GET_SECTION_LIST',
      //     payload: {
      //       linkId: item.link_id,
      //       docId: item.doc_id,
      //       protocol,
      //     },
      //   });
      // }
    } else if (!expanded && currentActiveCard === item.link_id) {
      setCurrentActiveCard(null);
      setShowEdit(false);
    }
    // eslint-disable-next-line
  }, [expanded]);

  useEffect(() => {
    if (currentActiveCard !== item.link_id && expanded) {
      setExpanded(false);
    } else if (currentActiveCard === item.link_id && !expanded) {
      setExpanded(true);
    }
    // eslint-disable-next-line
  }, [currentActiveCard]);

  const onEditClick = () => {
    setExpanded(true);
    setShowEdit(true);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary>
        <div
          className=""
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 48,
          }}
        >
          <Typography
            style={{
              fontweight: 'strong',
            }}
            data-testid="accordion-header"
            // onClick={onClickHandler()}
          >
            {item.source_file_section}
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <EyeShow />
            {!primaryRole && (
              <Pencil onClick={onEditClick} style={{ paddingLeft: '20px' }} />
            )}
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails
        style={{
          width: '80% !important',
          height: 'auto',
          overflowX: 'scroll',
          overflowY: 'scroll',
        }}
      >
        {sectionContentLoader && (
          <div
            className="loader"
            style={{
              height: '40px',
            }}
          >
            <Loader />
          </div>
        )}
        {sections &&
          isArray(sections) &&
          sections?.map((value) => (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {showedit ? (
                <MultilineEdit />
              ) : (
                <Typography key={React.key}>{value.content}</Typography>
              )}
            </>
          ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default DigitizeAccordion;

DigitizeAccordion.propTypes = {
  item: PropTypes.isRequired,
  protocol: PropTypes.isRequired,
  primaryRole: PropTypes.isRequired,
  currentActiveCard: PropTypes.isRequired,
  setCurrentActiveCard: PropTypes.isRequired,
};
