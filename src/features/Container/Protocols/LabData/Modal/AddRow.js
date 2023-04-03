import PropTypes from 'prop-types';
import Modal from 'apollo-react/components/Modal';
import Grid from 'apollo-react/components/Grid';
import TextField from 'apollo-react/components/TextField';

function AddRow(props) {
  const {
    isAdd,
    setIsAdd,
    handleCreate,
    tableIndex,
    setTableIndex,
    assessmentName,
    setAssessmentName,
    procedureName,
    setProcedureName,
    assessmentPreferred,
    setAssessmentPreferred,
    procedurePreferred,
    setProcedurePreferred,
  } = props;
  return (
    <Modal
      data-testid="add-row-modal"
      open={isAdd}
      onClose={() => setIsAdd(false)}
      title="Add New Lab data"
      buttonProps={[
        { label: 'Cancel' },
        { label: 'Create', onClick: () => handleCreate() },
      ]}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Table Index"
            value={tableIndex}
            onChange={(e) => setTableIndex(e.target.value)}
            fullWidth
            placeholder="Table Index"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Table Name"
            value={tableIndex}
            onChange={(e) => setTableIndex(e.target.value)}
            fullWidth
            placeholder="Table Name"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Assessment Name"
            value={assessmentName}
            onChange={(e) => setAssessmentName(e.target.value)}
            fullWidth
            placeholder="Assessment Name"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Procedure name"
            value={procedureName}
            onChange={(e) => setProcedureName(e.target.value)}
            fullWidth
            placeholder="Procedure Name"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Assessment Preferred Name"
            value={assessmentPreferred}
            onChange={(e) => setAssessmentPreferred(e.target.value)}
            fullWidth
            placeholder="Assessment Preferred Name"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Procedure Preferred Name"
            value={procedurePreferred}
            onChange={(e) => setProcedurePreferred(e.target.value)}
            fullWidth
            placeholder="Procedure Preferred Name"
          />
        </Grid>
      </Grid>
    </Modal>
  );
}

AddRow.propTypes = {
  isAdd: PropTypes.isRequired,
  setIsAdd: PropTypes.isRequired,
  handleCreate: PropTypes.isRequired,
  tableIndex: PropTypes.isRequired,
  setTableIndex: PropTypes.isRequired,
  assessmentName: PropTypes.isRequired,
  setAssessmentName: PropTypes.isRequired,
  procedureName: PropTypes.isRequired,
  setProcedureName: PropTypes.isRequired,
  assessmentPreferred: PropTypes.isRequired,
  setAssessmentPreferred: PropTypes.isRequired,
  procedurePreferred: PropTypes.isRequired,
  setProcedurePreferred: PropTypes.isRequired,
};
export default AddRow;
