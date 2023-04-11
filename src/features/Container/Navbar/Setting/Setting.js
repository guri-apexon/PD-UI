import Modal from 'apollo-react/components/Modal';
import Checkbox from 'apollo-react/components/Checkbox';
import CheckboxGroup from 'apollo-react/components/CheckboxGroup';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SettingsIcon from 'apollo-react-icons/Cog';
import './Setting.scss';
import { useDispatch, useSelector } from 'react-redux';
import { OptInOutData } from '../navbarSlice';
import { SETTING_OPTION } from '../../../../AppConstant/AppConstant';

function Setting({ handleModal, userId }) {
  const handleClose = () => {
    handleModal(false);
  };

  const getSelectorValue = useSelector(OptInOutData);
  const [option, setOption] = useState([]);
  const [checkBoxValue, setCheckBoxValue] = useState([]);
  const [enableSubmit, setEnableSubmit] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const truevalue = [];
    if (getSelectorValue?.option) {
      const optionArr = Object.entries(getSelectorValue?.option).map(
        ([key, value]) => {
          if (value) {
            truevalue.push(key);
          }
          return {
            optionName: key.replaceAll('_', ' '),
            value,
            keyName: key,
            disabled: key === 'New_Document/Version',
          };
        },
      );
      setCheckBoxValue(optionArr);
      setOption(truevalue);
    }
  }, [getSelectorValue]);

  const handleChange = (e) => {
    setEnableSubmit(false);
    setOption(e.target.value);
  };

  const handleSave = () => {
    const values = {};
    option.forEach((item) => {
      values[item] = true;
    });

    dispatch({
      type: 'POST_OPT_IN_OUT',
      payload: {
        data: { userId, options: values },
      },
    });
    handleClose();
  };

  return (
    <div>
      <Modal
        className="setting-root"
        open
        onClose={handleClose}
        buttonProps={[
          {},
          {
            label: 'Submit',
            onClick: () => {
              handleSave();
            },
            disabled: enableSubmit,
          },
        ]}
        id="neutral"
      >
        <div className="header-flex">
          <SettingsIcon />
          <h3 className="header">Settings </h3>
        </div>
        <hr className="line-header" />
        <div className="header-padding">
          <h4>Alerts & Notifications</h4>
          <hr className="line-subheader" />
        </div>
        <div className="body-display">
          <div>
            <CheckboxGroup
              value={option}
              onChange={handleChange}
              className="checkboxFinal"
            >
              {checkBoxValue?.map((item) => {
                return (
                  <Checkbox
                    key={React.key}
                    value={item?.keyName}
                    label={item?.optionName}
                  />
                );
              })}
            </CheckboxGroup>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Setting;
Setting.propTypes = {
  handleModal: PropTypes.isRequired,
  userId: PropTypes.isRequired,
};
