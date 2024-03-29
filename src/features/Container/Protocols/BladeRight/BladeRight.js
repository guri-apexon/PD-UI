import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Blade from 'apollo-react/components/Blade';
import Switch from 'apollo-react/components/Switch';
import Button from 'apollo-react/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  PROTOCOL_RIGHT_MENU,
  PROTOCOL_RIGHT_MENU_ARR,
} from '../Constant/Constants';
import './BladeRight.scss';
import {
  discardDetails,
  rightBladeValue,
  protocolTocData,
} from '../protocolSlice';

function BladeRight({
  dataSummary,
  globalPreferredTerm,
  setGlobalPreferredTerm,
}) {
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const BladeRightValue = useSelector(rightBladeValue);
  const tocSelector = useSelector(protocolTocData);

  const [accordianData, setAccordianData] = useState(PROTOCOL_RIGHT_MENU_ARR);
  const discardSelector = useSelector(discardDetails);
  const [discardData, setDiscardData] = useState({});

  useEffect(() => {
    setDiscardData(discardSelector);
  }, [discardSelector]);

  const handleChangeGlobalPreferredTerm = (e, checked) => {
    setGlobalPreferredTerm(checked);
    setOpen(false);
  };

  const handleDiscard = (item) => {
    const { isEdited, labEdited } = discardData;
    dispatch({
      type: 'DISCARD_DETAILS',
      payload: {
        isEdited,
        isDiscarded: false,
        protocolTab: -1,
        bladeRight: item,
        labEdited,
      },
    });
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

  const handleChangeTab = (index, item) => {
    if (discardData?.labEdited || discardData?.isEdited) {
      handleDiscard({ ...item, index });
      onClose();
    } else {
      dispatch({
        type: 'GET_RIGHT_BLADE',
        payload: {
          name: item?.name,
        },
      });
      handleClick(index);
    }
  };

  useEffect(() => {
    if (!open) {
      setOpen(true);
      setExpand(false);
    }
  }, [open]);

  const getDisable = (flag, name) => {
    if (name === PROTOCOL_RIGHT_MENU.PROTOCOL_ATTRIBUTES && !flag) {
      return true;
    }
    if (name === PROTOCOL_RIGHT_MENU.CLINICAL_TERM && !flag) {
      return true;
    }
    if (name === PROTOCOL_RIGHT_MENU.LAB_DATA && !flag) {
      return true;
    }
    if (name === PROTOCOL_RIGHT_MENU.DIPA_VIEW && !flag) {
      return true;
    }
    if (name === PROTOCOL_RIGHT_MENU.SCHEDULE_OF_ACTIVITIES && !flag) {
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
                checked={globalPreferredTerm}
                onChange={handleChangeGlobalPreferredTerm}
                data-testId="preferred-term-switch"
                disabled={
                  !dataSummary?.userPrimaryRoleFlag || tocSelector.errorMsg
                }
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
                          item?.name === BladeRightValue
                            ? 'link-text-clicked'
                            : 'link-text'
                        }
                        disabled={
                          getDisable(
                            dataSummary?.userPrimaryRoleFlag,
                            item?.name,
                          ) || tocSelector.errorMsg
                        }
                        onClick={() => {
                          handleChangeTab(index, item);
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
  globalPreferredTerm: PropTypes.isRequired,
  setGlobalPreferredTerm: PropTypes.isRequired,
};
export default BladeRight;
