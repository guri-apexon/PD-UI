import { useState } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography/Typography';
import EyeShow from 'apollo-react-icons/EyeShow';
import Popover from 'apollo-react/components/Popover';
import Card from 'apollo-react/components/Card';
import Save from 'apollo-react-icons/Save';
import Plus from 'apollo-react-icons/Plus';
import Trash from 'apollo-react-icons/Trash';
import TextField from 'apollo-react/components/TextField';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import './DipaViewStructure.scss';
import Grid from 'apollo-react/components/Grid/Grid';
import Pencil from 'apollo-react-icons/Pencil';
import Tooltip from 'apollo-react/components/Tooltip';
import IconButton from 'apollo-react/components/IconButton';

function DipaViewStructure({
  ID,
  actualText,
  segments = [],
  childs = [],
  open = false,
  handleExpandChange,
  handleAdd,
  handleAddGroup,
  handleUpdate,
  setOpenModal,
  onChangeSegment,
  onChangeSegmentGroup,
  editingIDList,
  setEditingIDList,
  toggleEditingIDs,
  tooltipValue,
}) {
  const [OpenPop, setOpenPop] = useState(null);
  const [tooltip, setTooltip] = useState(false);
  const [penciltooltip, setPencilTooltip] = useState(false);

  const onPencilIconClick = (e) => {
    toggleEditingIDs(segments.map((seg) => seg.ID));
    e.preventDefault();
  };

  function pencilTooltip() {
    return (
      <Tooltip
        title="Edit Segment"
        placement="right"
        disableFocusListener
        disableHoverListener
        disableTouchListener
        open={penciltooltip}
      >
        <IconButton data-testid="pencil-tooltip">
          <Pencil
            data-testid="edit-button"
            onMouseEnter={() => setPencilTooltip(true)}
            onMouseLeave={() => setPencilTooltip(false)}
            onClick={onPencilIconClick}
          />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <div>
      <Accordion
        key={ID}
        expanded={open}
        className="container"
        data-testid="accordion-expand"
      >
        <AccordionSummary
          data-testid="summary-expand"
          className="dipaview-summary-expand"
        >
          <Grid item xs={12} className="actual-text">
            {editingIDList?.includes(ID) ? (
              <TextField
                placeholder="Actual text.."
                data-testid="addgroup-textfield"
                onChange={debounce((e) => onChangeSegmentGroup(ID, e), 200)}
              />
            ) : (
              <Typography
                onClick={() => handleExpandChange(ID)}
                className="actual-text-details"
                data-testid="paragraph-text"
              >
                {actualText}
              </Typography>
            )}
            <div className="segment">
              <div className="segment-dc">
                <span className="segment-derived-count">Derived Count</span>
                <b className="segment-length">{segments.length}</b>
              </div>
            </div>
            {open ? (
              <div className="dipaview-icons">
                <Tooltip
                  title={`Created On:${tooltipValue}`}
                  placement="right"
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  open={tooltip}
                >
                  <IconButton data-testid="eyeshow-tooltip">
                    <EyeShow
                      data-testid="eyeshow-tooltip-icon"
                      onMouseEnter={() => setTooltip(true)}
                      onMouseLeave={() => setTooltip(false)}
                      className="icon-eyeshow"
                    />
                  </IconButton>
                </Tooltip>

                <span className="icon-pencil">
                  {editingIDList?.length ? (
                    <Save
                      onClick={() => handleUpdate()}
                      data-testid="save"
                      className="save-button"
                    />
                  ) : (
                    pencilTooltip()
                  )}
                </span>
              </div>
            ) : (
              <div className="dipaview-icons">
                <Tooltip
                  title={`Created On:${tooltipValue}`}
                  placement="right"
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  open={tooltip}
                >
                  <IconButton data-testid="tooltip-icon">
                    <EyeShow
                      data-testid="show-icon"
                      onMouseEnter={() => setTooltip(true)}
                      onMouseLeave={() => setTooltip(false)}
                      className="icon-eyeshow"
                    />
                  </IconButton>
                </Tooltip>
                <div className="icon-pencil">{pencilTooltip()}</div>
              </div>
            )}
          </Grid>
        </AccordionSummary>

        <AccordionDetails className="accordion-details">
          <Grid item xs={2} className="accordion-details-grid">
            <Grid className="trash-plus-grid">
              <Plus
                data-testid="plus-icon"
                onClick={(e) => setOpenPop(!OpenPop ? e.currentTarget : null)}
              >
                {`${!OpenPop ? 'Open' : 'Close'} popper`}
              </Plus>
              <Trash
                className="trash-icon"
                data-testid="delete-icon"
                onClick={() => setOpenModal(ID)}
              />
            </Grid>
            <Popover
              open={!!OpenPop}
              anchorEl={OpenPop}
              onClose={() => setOpenPop(null)}
              className="popover"
              data-testid="popover-card"
            >
              <Card interactive>
                <Grid
                  className="add-group-grid"
                  data-testid="add-group"
                  onClick={() => handleAddGroup(ID)}
                >
                  Add Group
                </Grid>

                <Grid
                  className="add-group-grid"
                  data-testid="add-segment"
                  onClick={() => handleAdd(ID)}
                >
                  Add Segment
                </Grid>
              </Card>
            </Popover>
          </Grid>
          <Grid item xs={12} className="accordion-details-grid">
            {segments.map((segment) => (
              <div className="segment-typography" key={segment.ID}>
                {editingIDList.includes(segment.ID) ? (
                  <TextField
                    placeholder="Segment.."
                    onChange={(e) => onChangeSegment(segment.ID, e)}
                    className="segment-text"
                    defaultValue={segment?.derive_seg || ''}
                    data-testid="segment-textfield"
                  />
                ) : (
                  <Typography>{segment.derive_seg}</Typography>
                )}
              </div>
            ))}
          </Grid>
          <div data-testid="accord-summary" className="dipaview-summary">
            {childs.map((seg, i) => (
              <AccordionSummary key={ID}>
                <DipaViewStructure
                  key={seg.ID}
                  ID={seg.ID}
                  actualText={seg.actual_text}
                  level={seg.level}
                  segments={seg.derive_segemnt}
                  childs={seg.child}
                  open={seg.open}
                  index={i}
                  handleExpandChange={handleExpandChange}
                  handleUpdate={handleUpdate}
                  handleAdd={handleAdd}
                  handleAddGroup={handleAddGroup}
                  setOpenModal={setOpenModal}
                  onChangeSegment={onChangeSegment}
                  onChangeSegmentGroup={onChangeSegmentGroup}
                  editingIDList={editingIDList}
                  setEditingIDList={setEditingIDList}
                  toggleEditingIDs={toggleEditingIDs}
                />
              </AccordionSummary>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default DipaViewStructure;
DipaViewStructure.propTypes = {
  ID: PropTypes.isRequired,
  actualText: PropTypes.isRequired,
  segments: PropTypes.isRequired,
  childs: PropTypes.isRequired,
  open: PropTypes.isRequired,
  handleExpandChange: PropTypes.isRequired,
  handleAdd: PropTypes.isRequired,
  handleAddGroup: PropTypes.isRequired,
  handleUpdate: PropTypes.isRequired,
  setOpenModal: PropTypes.isRequired,
  onChangeSegment: PropTypes.isRequired,
  onChangeSegmentGroup: PropTypes.isRequired,
  editingIDList: PropTypes.isRequired,
  setEditingIDList: PropTypes.isRequired,
  toggleEditingIDs: PropTypes.isRequired,
  tooltipValue: PropTypes.isRequired,
};
