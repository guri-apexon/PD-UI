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
import PropTypes from 'prop-types';
import './DipaViewStructure.scss';
import Grid from 'apollo-react/components/Grid/Grid';
import Pencil from 'apollo-react-icons/Pencil';
import Tooltip from 'apollo-react/components/Tooltip';
import IconButton from 'apollo-react/components/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

function DipaViewStructure({
  ID,
  actualText,
  segments = [],
  childs = [],
  open = false,
  handleExpandChange,
  handleAdd,
  handleUpdate,
  handleDelete,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tooltip, setTooltip] = useState(false);

  const openTooltip = () => {
    setTooltip(true);
  };

  const closeTooltip = () => {
    setTooltip(false);
  };

  return (
    <Grid item xs={12}>
      <Accordion
        key={ID}
        expanded={open}
        onChange={() => handleExpandChange(ID)}
        className="container"
        data-testid="accordion-expand"
      >
        <AccordionSummary data-testid="summary-expand">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography>{actualText}</Typography>
            </Grid>
            <Grid className="paragraph-icon">
              <Typography className="segment-dc">
                <span className="segment-derived-count">Derived Count</span>
                <b className="segment-length">{segments.length}</b>
              </Typography>
              {handleAdd && open ? (
                <>
                  <span className="icon-eyeshow">
                    <EyeShow />
                  </span>
                  <span className="icon-pencil">
                    <Save onClick={handleUpdate} data-testid="save" />
                  </span>
                </>
              ) : (
                <>
                  <ClickAwayListener onClickAway={closeTooltip}>
                    <div>
                      <Tooltip
                        title={`Last updated on 
                        2/16/2023.`}
                        placement="right"
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        onClose={closeTooltip}
                        open={tooltip}
                      >
                        <IconButton data-testid="tooltip-icon">
                          <span className="icon-eyeshow">
                            <EyeShow
                              data-testid="show-icon"
                              onClick={openTooltip}
                            />
                          </span>
                        </IconButton>
                      </Tooltip>
                    </div>
                  </ClickAwayListener>
                  <span className="icon-pencil">
                    <Pencil data-testid="edit-button" />
                  </span>
                </>
              )}
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails
          className="accordion-details"
          data-testid="accordion-segment"
        >
          <Grid item xs={2} className="accordion-details-grid">
            <Grid className="trash-plus-grid">
              <Plus
                data-testid="plus-icon"
                onClick={(e) => setAnchorEl(!anchorEl ? e.currentTarget : null)}
              >
                {`${!anchorEl ? 'Open' : 'Close'} popper`}
              </Plus>
              <Trash
                className="trash-icon"
                data-testid="delete-icon"
                onClick={() => handleDelete(ID)}
              />
            </Grid>
            <Popover
              open={!!anchorEl}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              className="popover"
              data-testid="popover-card"
            >
              <Card interactive>
                <div className="add-group">Add Group</div>
                <div data-testid="add-segment">
                  <Grid
                    className="add-group-grid"
                    onClick={() => handleAdd(ID)}
                  >
                    Add Segment
                  </Grid>
                </div>
              </Card>
            </Popover>
          </Grid>
          {segments.map((segment) => (
            <div className="segment-typography" key={segment.ID}>
              <Typography>{segment.derive_seg}</Typography>
            </div>
          ))}

          <div data-testid="accord-summary">
            {childs.map((seg, i) => (
              <AccordionSummary key={ID}>
                <Typography>
                  <DipaViewStructure
                    key={seg.actual_text}
                    ID={seg.ID}
                    actualText={seg.actual_text}
                    level={seg.level}
                    segments={seg.derive_seg}
                    childs={seg.child}
                    open={seg.open}
                    index={i}
                    handleExpandChange={handleExpandChange}
                  />
                </Typography>
              </AccordionSummary>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </Grid>
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
  handleUpdate: PropTypes.isRequired,
  handleDelete: PropTypes.isRequired,
};
