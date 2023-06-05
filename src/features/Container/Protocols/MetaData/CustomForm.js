import Grid from 'apollo-react/components/Grid';
import TextField from 'apollo-react/components/TextField';
import Select from 'apollo-react/components/Select';
import MenuItem from 'apollo-react/components/MenuItem';
import DatePicker from 'apollo-react/components/DatePickerV2';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import METADATA_CONSTANTS from './constants';
import { loggedUser } from '../../../../store/userDetails';
import { USERTYPE } from '../../../../AppConstant/AppConstant';

export function InputKeyField({
  keyName,
  handleChange,
  handleBlur,
  inputValue,
}) {
  return (
    <TextField
      label=""
      placeholder="Enter Key"
      className="keyText"
      name={keyName}
      value={inputValue}
      inputProps={{ 'data-testid': 'customeform-textField-key' }}
      data-testid="customeform-textField-key"
      onChange={(e) => handleChange(e)}
      onBlur={(e) => handleBlur(e)}
    />
  );
}

export function ValueField({
  keyName,
  type,
  inputValue,
  attrStatus,
  dateValue,
  handleChange,
  handleDateChange,
  handleBlur,
  attrDisabled,
}) {
  const userDetails = useSelector(loggedUser);
  const onTypeChange = (e) => {
    handleChange(e);
  };
  const metaDataType = (type) => {
    return ['string', 'array'].includes(type) ? 'text' : 'number';
  };
  return (
    <Grid
      container
      spacing={1}
      className="gridContainer"
      data-testid="customeform"
    >
      <Grid item xs={11} className="fieldContainer">
        <div className="valueText">
          {METADATA_CONSTANTS.TYPES.includes(type) && (
            <TextField
              label=""
              placeholder="Enter Value"
              type={metaDataType(type)}
              name={keyName}
              fullWidth
              value={inputValue}
              title={inputValue}
              inputProps={{ 'data-testid': 'customeform-textField-value' }}
              onChange={(e) => handleChange(e)}
              onBlur={handleBlur}
            />
          )}

          {['date'].includes(type) && (
            <DatePicker
              className="date-field"
              name={keyName}
              dateFormat="DD-MMM-YYYY"
              placeholder="dd-mmm-yyyy"
              inputProps={{ 'data-testid': 'customeform-textField-date' }}
              value={dateValue}
              onChange={(dateValue) => handleDateChange(dateValue)}
              onBlur={handleBlur}
              onInputChange={(inputValue) => handleChange(inputValue)}
            />
          )}
          {['boolean'].includes(type) && (
            <Select
              placeholder="Select Value"
              label=""
              name={keyName}
              fullWidth
              value={inputValue || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{
                'data-testid': 'customeform-textField-checkbox1',
              }}
            >
              {METADATA_CONSTANTS.BOOLEAN_VALUES.map((each) => (
                <MenuItem key={each} value={each}>
                  {each}
                </MenuItem>
              ))}
            </Select>
          )}
          {keyName !== 'note' && keyName !== 'confidence' && (
            <Select
              label=""
              name="attr_type"
              value={type}
              disabled={
                userDetails.user_type !== USERTYPE.ADMIN && !attrDisabled
              }
              onChange={(e) => onTypeChange(e)}
              onBlur={handleBlur}
              placeholder="Select Type"
              fullWidth
              inputProps={{ 'data-testid': 'customeform-textField-checkbox' }}
              className="selectBox"
            >
              {METADATA_CONSTANTS.DROPDOWN_LIST.map((list) => (
                <MenuItem key={list.value} value={list.value}>
                  {list.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

InputKeyField.propTypes = {
  keyName: PropTypes.isRequired,
  handleChange: PropTypes.isRequired,
  handleBlur: PropTypes.isRequired,
  inputValue: PropTypes.isRequired,
};
ValueField.propTypes = {
  keyName: PropTypes.isRequired,
  handleChange: PropTypes.isRequired,
  type: PropTypes.isRequired,
  inputValue: PropTypes.isRequired,
  attrStatus: PropTypes.isRequired,
  handleBlur: PropTypes.isRequired,
  handleDateChange: PropTypes.isRequired,
  dateValue: PropTypes.isRequired,
  attrDisabled: PropTypes.isRequired,
};
