/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import withStyles from '@material-ui/core/styles/withStyles';
import React, { useState, useEffect, useRef } from 'react';
import { neutral8 } from 'apollo-react/colors';
import PropTypes from 'prop-types';
import Blade from 'apollo-react/components/Blade';
import Switch from 'apollo-react/components/Switch';
import Button from 'apollo-react/components/Button';
import House from 'apollo-react-icons/House';
import PresentationBarDark from 'apollo-react-icons/PresentationBarDark';
import MedicalCard from 'apollo-react-icons/MedicalCard';
import Stethoscope from 'apollo-react-icons/Stethoscope';
import Lab from 'apollo-react-icons/Lab';
import './BladeRight.scss';

const styles = {
  blade: {
    color: neutral8,
    lineHeight: '24px',
    marginTop: '4.5%',
    width: '200px',
  },
};

function BladeRight({ handleRightBlade, dataSummary }) {
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);
  const [value, setValue] = React.useState(false);
  const wrapperRef = useRef(null);

  const [textValue, setTextValue] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

  const handleChange = (e, checked) => {
    setValue(checked);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e, expanded) => {
    setExpand(expanded);
  };
  const handleClick = (index) => {
    const newPanels = textValue.map(() => false);
    newPanels[index] = !newPanels[index];
    setTextValue(newPanels);
    onClose();
  };

  useEffect(() => {
    if (!open) {
      setOpen(true);
      setExpand(false);
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div>
      <div className="bladeContainerRight">
        <Blade
          onChange={onChange}
          open={open}
          expanded={expand}
          onClose={onClose}
          title="Controls"
          className="blade"
          width={263}
          marginTop={141}
          hasBackdrop
          side="right"
          BackdropProps={onClose}
          data-testId="rightblade"
        >
          <div ref={wrapperRef}>
            <div className="switch-padding">
              <Switch
                size="small"
                label="Preferred Term"
                checked={value}
                onChange={handleChange}
              />
            </div>
            <hr className="line" />
            <div>
              <h3>Navigation Menu</h3>
              <ul className="Button-flex">
                <Button
                  className={textValue[0] ? 'link-text-clicked' : 'link-text'}
                  onClick={() => {
                    handleClick(0);
                    handleRightBlade('Home');
                  }}
                  data-testId="rightbladeclick"
                >
                  <House className="icon-padding" /> Home
                </Button>
                <Button
                  className={textValue[1] ? 'link-text-clicked' : 'link-text'}
                  onClick={() => {
                    handleClick(1);
                  }}
                >
                  <PresentationBarDark className="icon-padding" /> Clinical
                  Terms
                </Button>
                <Button
                  className={textValue[2] ? 'link-text-clicked' : 'link-text'}
                  onClick={() => {
                    handleClick(2);
                  }}
                >
                  <MedicalCard className="icon-padding" /> Dipa View
                </Button>
                <Button
                  className={textValue[3] ? 'link-text-clicked' : 'link-text'}
                  onClick={() => {
                    handleClick(3);
                  }}
                >
                  <Stethoscope className="icon-padding" /> Normalized Soa
                </Button>
                <Button
                  className={textValue[4] ? 'link-text-clicked' : 'link-text'}
                  disabled={!dataSummary?.userPrimaryRoleFlag}
                  onClick={() => {
                    handleClick(4);
                    handleRightBlade('MetaData');
                  }}
                >
                  <Lab className="icon-padding" /> Meta Data
                </Button>
              </ul>
            </div>
          </div>
        </Blade>
      </div>
    </div>
  );
}

BladeRight.propTypes = {
  // eslint-disable-next-line react/require-default-props
  handleRightBlade: PropTypes.func,
  dataSummary: PropTypes.isRequired,
};
export default withStyles(styles)(BladeRight);
