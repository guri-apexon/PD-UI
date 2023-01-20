import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Blade from 'apollo-react/components/Blade';
import Switch from 'apollo-react/components/Switch';
import Button from 'apollo-react/components/Button';
import { useDispatch } from 'react-redux';
import {
  PROTOCOL_RIGHT_MENU,
  PROTOCOL_RIGHT_MENU_ARR,
} from '../Constant/Constants';
import './BladeRight.scss';

function BladeRight({ dataSummary }) {
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);
  const [value, setValue] = React.useState(false);
  const dispatch = useDispatch();

  const [accordianData, setAccordianData] = useState(PROTOCOL_RIGHT_MENU_ARR);
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
      item.isActive = indexblade === index;
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

  const getDisable = (flag, name) => {
    if (name === PROTOCOL_RIGHT_MENU.META_DATA && !flag) {
      return true;
    }
    if (name === PROTOCOL_RIGHT_MENU.CLINICAL_TERM && !flag) {
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
              <div className="menu-item-align">
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
                        {item?.icon} {item?.name}
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
export default BladeRight;
