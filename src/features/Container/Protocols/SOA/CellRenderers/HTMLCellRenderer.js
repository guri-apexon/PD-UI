export default class MedalCellRenderer {
  // init method gets the details of the cell to be renderer
  init(params) {
    this.eGui = document.createElement('span');
    this.eGui.id = 'foot-note-element';
    this.eGui.innerHTML = params.value;
  }

  getGui() {
    return this.eGui;
  }
}
