/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import withStyles from '@material-ui/core/styles/withStyles';
import React, { useState, useEffect } from 'react';
import { neutral8 } from 'apollo-react/colors';
import PropTypes from 'prop-types';
import Blade from 'apollo-react/components/Blade';
import Switch from 'apollo-react/components/Switch';
import Button from 'apollo-react/components/Button';
import House from 'apollo-react-icons/House';
import PresentationBarDark from 'apollo-react-icons/PresentationBarDark';
import MedicalCard from 'apollo-react-icons/MedicalCard';
import Stethoscope from 'apollo-react-icons/Stethoscope';
import { useDispatch } from 'react-redux';
import Lab from 'apollo-react-icons/Lab';
import { RIGHT_BLADE_VALUE } from '../Constant/Constants';
import './BladeRight.scss';

const styles = {
  blade: {
    color: neutral8,
    lineHeight: '24px',
    marginTop: '4.5%',
    width: '200px',
  },
};

function BladeRight({ dataSummary }) {
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);
  const [value, setValue] = React.useState(false);
  const dispatch = useDispatch();

  const data = [
    { name: RIGHT_BLADE_VALUE.HOME, isActive: true },
    { name: RIGHT_BLADE_VALUE.CLINICAL_TERM, isActive: false },
    { name: RIGHT_BLADE_VALUE.DIPA_VIEW, isActive: false },
    { name: RIGHT_BLADE_VALUE.NORMALIZED_SOA, isActive: false },
    { name: RIGHT_BLADE_VALUE.META_DATA, isActive: false },
  ];
  const [accordianData, setAccordianData] = useState(data);
  const handleChange = (e, checked) => {
    setValue(checked);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e, expanded) => {
    setExpand(expanded);
  };
  const handleClick = (indexblade) => {
    const tempAccordianData = [...accordianData];
    const panelValue = tempAccordianData.map((item, index) => {
      if (indexblade === index) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
      return item;
    });
    setAccordianData(panelValue);
    onClose();
  };

  useEffect(() => {
    if (!open) {
      setOpen(true);
      setExpand(false);
    }
  }, [open]);

  const getIcon = (icon) => {
    if (icon === RIGHT_BLADE_VALUE.HOME) {
      return <House className="icon-padding" />;
    }
    if (icon === RIGHT_BLADE_VALUE.CLINICAL_TERM) {
      return <PresentationBarDark className="icon-padding" />;
    }
    if (icon === RIGHT_BLADE_VALUE.DIPA_VIEW) {
      return <MedicalCard className="icon-padding" />;
    }
    if (icon === RIGHT_BLADE_VALUE.NORMALIZED_SOA) {
      return <Stethoscope className="icon-padding" />;
    }
    if (icon === RIGHT_BLADE_VALUE.META_DATA) {
      return <Lab className="icon-padding" />;
    }
    return null;
  };
  const getDisable = (flag, name) => {
    if (name === RIGHT_BLADE_VALUE.META_DATA && !flag) {
      return true;
    }
    return false;
  };
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
          BackdropProps={{
            onClick: () => {
              setOpen(false);
            },
          }}
          side="right"
          data-testId="rightblade"
        >
          <div>
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
              <div className="divpadding">
                {accordianData?.map((item, index) => {
                  return (
                    <div className="Button-flex" key={React.key}>
                      <Button
                        className={
                          item?.isActive ? 'link-text-clicked' : 'link-text'
                        }
                        disabled={getDisable(
                          dataSummary?.userPrimaryRoleFlag,
                          item?.name,
                        )}
                        onClick={() => {
                          dispatch({
                            type: 'GET_RIGHT_BLADE',
                            payload: {
                              name: item?.name,
                            },
                          });
                          handleClick(index);
                        }}
                        data-testId="rightbladeclick"
                      >
                        {getIcon(item?.name)} {item?.name}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Blade>
      </div>
    </div>
  );
}

BladeRight.propTypes = {
  dataSummary: PropTypes.isRequired,
};
export default withStyles(styles)(BladeRight);
