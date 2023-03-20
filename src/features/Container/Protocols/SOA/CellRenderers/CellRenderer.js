import PropTypes from 'prop-types';
import { TableConst } from '../Constants';

function CellRenderer({ data, colDef }) {
  const { field } = colDef;
  return <span>{data[field] ? data[field][TableConst.DATA_VALUE] : ''}</span>;
}
CellRenderer.propTypes = {
  data: PropTypes.isRequired,
  colDef: PropTypes.isRequired,
};

export default CellRenderer;
