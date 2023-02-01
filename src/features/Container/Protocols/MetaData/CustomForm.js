import Grid from 'apollo-react/components/Grid';
import TextField from 'apollo-react/components/TextField';
import Select from 'apollo-react/components/Select';
import MenuItem from 'apollo-react/components/MenuItem';
import Trash from 'apollo-react-icons/Trash';
import DatePicker from 'apollo-react/components/DatePickerV2';
import PropTypes from 'prop-types';

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
      onChange={(e) => handleChange(e)}
      onBlur={(e) => handleBlur(e)}
    />
  );
}

export function ValueField({
  item,
  keyName,
  type,
  inputValue,
  dateValue,
  setDateValue,
  handleChange,
  handleBlur,
  deleteMetaData,
}) {
  const onTypeChange = (e) => {
    handleChange(e);
  };

  return (
    <Grid
      container
      spacing={1}
      className="gridContainer"
      data-testid="customeform"
    >
      {(!item.isCustom && keyName === 'attr_value') || keyName === 'note' ? (
        <TextField
          label=""
          className="keyText"
          placeholder="Enter Value"
          type="text"
          name={keyName}
          fullWidth
          value={inputValue}
          inputProps={{ 'data-testid': 'customeform-textField-value' }}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
        />
      ) : (
        <>
          <Grid item xs={11} className="fieldContainer">
            <div className="valueText">
              {(type === 'String' || type === 'Number') && (
                <TextField
                  label=""
                  placeholder="Enter Value"
                  type={type === 'String' ? 'text' : 'number'}
                  name={keyName}
                  fullWidth
                  value={inputValue}
                  inputProps={{ 'data-testid': 'customeform-textField-value' }}
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                />
              )}

              {type === 'Date' && (
                <DatePicker
                  name={keyName}
                  dateFormat="DD-MMM-YYYY"
                  placeholder="dd-mmm-yyyy"
                  value={dateValue}
                  onChange={(dateValue) => setDateValue(dateValue)}
                  inputValue={inputValue}
                  onBlur={handleBlur}
                  // onInputChange={(inputValue) => setInputValue(inputValue)}
                />
              )}
              {type === 'Boolean' && (
                <Select
                  placeholder="Select Value"
                  label=""
                  name={keyName}
                  fullWidth
                  value={inputValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </Select>
              )}

              <Select
                label=""
                name="attr_type"
                value={type}
                onChange={(e) => onTypeChange(e)}
                onBlur={handleBlur}
                placeholder="Select Type"
                fullWidth
                inputProps={{ 'data-testid': 'customeform-textField-checkbox' }}
                className="selectBox"
              >
                <MenuItem value="String">String</MenuItem>
                <MenuItem value="Number">Number</MenuItem>
                <MenuItem value="Boolean">Boolean</MenuItem>
                <MenuItem value="Date">Date</MenuItem>
              </Select>
            </div>
          </Grid>
          <Grid item xs={1} className="delContainer">
            <Trash onClick={deleteMetaData} />
          </Grid>
        </>
      )}
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
  deleteMetaData: PropTypes.isRequired,
  handleChange: PropTypes.isRequired,
  item: PropTypes.isRequired,
  type: PropTypes.isRequired,
  inputValue: PropTypes.isRequired,
  handleBlur: PropTypes.isRequired,
  dateValue: PropTypes.isRequired,
  setDateValue: PropTypes.isRequired,
};
