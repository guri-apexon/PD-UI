import Grid from 'apollo-react/components/Grid';
import TextField from 'apollo-react/components/TextField';
import Select from 'apollo-react/components/Select';
import MenuItem from 'apollo-react/components/MenuItem';
import Trash from 'apollo-react-icons/Trash';
import PropTypes from 'prop-types';

function CustomForm({ deleteMetaData, handleChange, item }) {
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
          <TextField
            label=""
            placeholder="Enter Value"
            name="name"
            value={item?.name}
            inputProps={{ 'data-testid': 'customeform-textField-value' }}
            onChange={(e) => handleChange(e)}
          />
          <Select
            label=""
            name="type"
            value={item?.type}
            onChange={(e) => handleChange(e)}
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
    </Grid>
  );
}

CustomForm.propTypes = {
  deleteMetaData: PropTypes.isRequired,
  handleChange: PropTypes.isRequired,
  item: PropTypes.isRequired,
};

export default CustomForm;
