import PropTypes from 'prop-types';
import TextField from 'apollo-react/components/TextField';

function TextFieldFilter({ accessor, filters, updateFilterValue }) {
  return (
    <TextField
      value={filters[accessor]}
      name={accessor}
      onChange={updateFilterValue}
      fullWidth
      margin="none"
      size="small"
    />
  );
}

TextFieldFilter.propTypes = {
  accessor: PropTypes.isRequired,
  filters: PropTypes.isRequired,
  updateFilterValue: PropTypes.isRequired,
};
export default TextFieldFilter;
