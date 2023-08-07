import PropTypes from 'prop-types';
import { TableConst } from '../Constants';

class CellRenderer {
  // init method gets the details of the cell to be renderer
  init(params) {
    const { data, colDef } = params;
    const { field } = colDef;

    this.eGui = document.createElement('span');
    this.eGui.id = 'cellRenderer';
    this.eGui.setAttribute('data-testid', 'cellRenderer');
    this.eGui.innerHTML = data[field] ? data[field][TableConst.DATA_VALUE] : '';
  }

  getGui() {
    return this.eGui;
  }
}

CellRenderer.propTypes = {
  data: PropTypes.isRequired,
  colDef: PropTypes.isRequired,
};

export default CellRenderer;
