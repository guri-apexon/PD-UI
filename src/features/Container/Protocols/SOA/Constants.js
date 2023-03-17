const TableEvents = {
  SET_TABLES: 'SET_TABLES',
  UPDATE_TABLE_DATA: 'UPDATE_TABLE_DATA',
  UPDATE_TABLE_RECORDS: 'UPDATE_TABLE_RECORDS',
  UPDATE_CELL_VALUES: 'UPDATE_CELL_VALUES',
  UPDATE_TABLE_COLUMNS: 'UPDATE_TABLE_COLUMNS',
  DELETE_TABLE_ROW: 'DELETE_TABLE_ROW',
  ADD_TABLE_ROW: 'ADD_TABLE_ROW',
  SET_SELECTED_TAB: 'SET_SELECTED_TAB',
  SET_ARRANGE_BY: 'SET_ARRANGE_BY',
  SET_SHOW_BY: 'SET_SHOW_BY',
  SET_SETTINGS_OPEN: 'SET_SETTINGS_OPEN',
  ADD_GROUP_ID: 'ADD_GROUP_ID',
  REMOVE_GROUP_ID: 'REMOVE_GROUP_ID',
  SET_GRID_REF: 'SET_GRID_REF',
  GRID_REFRESH: 'GRID_REFRESH',
  FILTER_GROUP_COLUMN: 'FILTER_GROUP_COLUMN',
  TIMEPOINT1: 'epoch_timepoint',
  TIMEPOINT2: 'cycle_timepoint',
  TIMEPOINT3: 'visit_timepoint',
  TIMEPOINT4: 'year_timepoint',
  TIMEPOINT5: 'month_timepoint',
  TIMEPOINT6: 'week_timepoint',
  TIMEPOINT7: 'day_timepoint',
  TIMEPOINT8: 'window_timepoint',
};
const TableConst = {
  SOA_DATA: 'soa_data',
  STUDYVISIT: 'studyVisit',
  STUDYPROCEDURE: 'studyProcedure',
  COLUMN_IDX: 'table_column_index',
  ROW_IDX: 'table_row_index',
  headerClass: 'grid-header',
  firstHeaderClass: 'first-header-column',
  FIRST_COLUMN: 'col0',
  ADD_ROW_ABOVE: 'ADD_ABOVE_ROW',
  ADD_ROW_BELOW: 'ADD_ROW_BELOW',
  VALUE_TEXT1: 'indicator_text',
  VALUE_TEXT2: 'assessment_text',
  DATA_VALUE: 'value',
  DATA_NEW_VALUE: 'data_new_value',
};
const TIMPE_POINTS = [
  TableEvents.TIMEPOINT1,
  TableEvents.TIMEPOINT2,
  TableEvents.TIMEPOINT3,
  TableEvents.TIMEPOINT4,
  TableEvents.TIMEPOINT5,
  TableEvents.TIMEPOINT6,
  TableEvents.TIMEPOINT7,
  TableEvents.TIMEPOINT8,
];
export { TableEvents, TableConst, TIMPE_POINTS };
