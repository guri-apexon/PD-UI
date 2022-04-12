import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";

const Attributes = () => {
  return (
    <Accordion>
      <AccordionSummary>
        <div className="accordion-parent-header">Attributes</div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="medical-term">Attributes</div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Attributes;
