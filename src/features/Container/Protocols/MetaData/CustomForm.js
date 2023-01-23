import { useState, useEffect } from 'react';
import Grid from 'apollo-react/components/Grid';
import TextField from 'apollo-react/components/TextField';
import Select from 'apollo-react/components/Select';
import MenuItem from 'apollo-react/components/MenuItem';
import Trash from 'apollo-react-icons/Trash';
import DatePicker from 'apollo-react/components/DatePickerV2';
import PropTypes from 'prop-types';

function CustomForm({ deleteMetaData, handleChange, item }) {
  const [type, setType] = useState('String');

  useEffect(() => {
    console.log({ item });
  }, [item]);

  const onTypeChange = (e) => {
    setType(e.target.value);
    handleChange(e);
  };

  const [inputValue, setInputValue] = useState(null);

  return (
    <Grid
      container
      spacing={1}
      className="gridContainer"
      data-testid="customeform"
    >
      <Grid item xs={11} className="fieldContainer">
        <TextField
          label=""
          placeholder="Enter Key"
          className="keyText"
          name="header"
          value={item?.header}
          inputProps={{ 'data-testid': 'customeform-textField-key' }}
          onChange={(e) => handleChange(e)}
        />
        <div className="valueText">
          {(type === 'String' || type === 'Number') && (
            <TextField
              label=""
              placeholder="Enter Value"
              type={type === 'String' ? 'text' : 'number'}
              name="name"
              fullWidth
              value={item?.name}
              inputProps={{ 'data-testid': 'customeform-textField-value' }}
              onChange={(e) => handleChange(e)}
              isRequired
            />
          )}

          {type === 'Date' && (
            <DatePicker
              name="name"
              dateFormat="DD-MMM-YYYY"
              placeholder="dd-mmm-yyyy"
              value={item?.name}
              onChange={(value) =>
                handleChange({ target: { name: 'name', value } })
              }
              inputValue={inputValue}
              onInputChange={(inputValue) => setInputValue(inputValue)}
              isRequired
            />
          )}
          {type === 'Boolean' && (
            <Select
              placeholder="Select Value"
              label=""
              name="name"
              fullWidth
              value={item?.name}
              onChange={handleChange}
              isRequired
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          )}

          <Select
            label=""
            name="type"
            value={item?.type}
            onChange={(e) => onTypeChange(e)}
            placeholder="Select Type"
            fullWidth
            inputProps={{ 'data-testid': 'customeform-textField-checkbox' }}
            className="selectBox"
            isRequired
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
    </Grid>
  );
}

CustomForm.propTypes = {
  deleteMetaData: PropTypes.isRequired,
  handleChange: PropTypes.isRequired,
  item: PropTypes.isRequired,
};

export default CustomForm;
