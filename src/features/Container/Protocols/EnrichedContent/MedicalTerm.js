import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'apollo-react/components/Button';
import Card from 'apollo-react/components/Card';
import Popper from 'apollo-react/components/Popper';
import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import ArrowRight from 'apollo-react-icons/ArrowRight';
import './MedicalTerm.scss';

const clinicalTerms = [
  { value: 'Synonims', text: 'Synomims' },
  { value: 'Clinical Terms', text: 'Clinical Terms' },
  { value: 'Ontology', text: 'Ontology' },
  { value: 'Prefered Term', text: 'Prefered Term' },
  { value: 'Classification', text: 'Classification' },
];
function MedicalTerm({ enrichedTarget }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [SanchorEl, setSAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(enrichedTarget ? enrichedTarget?.currentTarget : null);
  }, [enrichedTarget]);
  return (
    <div>
      <Popper open={!!anchorEl} anchorEl={anchorEl}>
        <Card interactive>
          <Typography>
            <div className="prefered-Name">
              <li>
                {clinicalTerms.map((item) => {
                  return (
                    <Button
                      className="medical-Text"
                      onMouseOver={(e) =>
                        setSAnchorEl(!SanchorEl ? e.currentTarget : null)
                      }
                      key={item.value}
                      value={item.value}
                    >
                      {item.text}
                      <ArrowRight />
                    </Button>
                  );
                })}
              </li>
            </div>
          </Typography>
        </Card>
      </Popper>
      <div className="subheading-head">
        <Popper open={!!SanchorEl} anchorEl={SanchorEl}>
          <Card interactive className="cardStyle">
            <Typography>
              <li>
                {clinicalTerms.map((item) => {
                  //   console.log('item', item.text);
                  return (
                    <div
                      //   className="medical-Text"

                      key={item.value}
                      value={item.value}
                    >
                      {item.text}

                      <Pencil className="edit-Icon" />
                    </div>
                  );
                })}
              </li>
            </Typography>
          </Card>
        </Popper>
      </div>
    </div>
  );
}

export default MedicalTerm;

MedicalTerm.propTypes = {
  enrichedTarget: PropTypes.isRequired,
};
