import { useState } from 'react';
import moment from 'moment';

import { toast } from 'react-toastify';
import Modal from 'apollo-react/components/Modal';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography/Typography';
import EyeShow from 'apollo-react-icons/EyeShow';
import Save from 'apollo-react-icons/Save';
import Trash from 'apollo-react-icons/Trash';
import TextField from 'apollo-react/components/TextField';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import './DipaViewStructure.scss';
import Grid from 'apollo-react/components/Grid/Grid';
import Pencil from 'apollo-react-icons/Pencil';
import Tooltip from 'apollo-react/components/Tooltip';
import IconButton from 'apollo-react/components/IconButton';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import Plus from 'apollo-react-icons/Plus';

function DipaViewStructure({
  ID,
  actualText,
  segments = [],
  childs = [],
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
  countTooltip,
  editedByTooltip,
  lockDetails,
  userId,
}) {
  const [tooltip, setTooltip] = useState(false);
  const [isAccordianExpanded, setIsAccordianExpanded] = useState(false);
  const [unSaved, setUnSaved] = useState(false);

  const onPencilIconClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    /**
     * Need to check if the section is locked by any other primary user or not
     *
     * - if yes then only allow editing segments.
     * - if no, then we need to show who has locked the segment.
     */
    if (Object.keys(lockDetails).length > 0) {
      if (lockDetails?.section_lock || lockDetails?.userId === userId) {
        toggleEditingIDs(segments.map((seg) => seg.ID));
      } else {
        toast.error(`Section is in use by user ${lockDetails?.user_name}`);
      }
    }
  };

  const menuItems = [
    {
      text: 'Add Group',
      onClick: () => handleAddGroup(ID),
      'data-testid': 'add-group',
    },
    {
      text: 'Add Segment',
      onClick: () => handleAdd(ID),
      'data-testid': 'add-segment',
    },
  ];

  function pencilTooltip() {
    return (
      <Tooltip title="Edit Segment" placement="right">
        <IconButton
          data-testid="pencil-tooltip"
          disabled={!isAccordianExpanded}
        >
          <Pencil data-testid="edit-button" onClick={onPencilIconClick} />
        </IconButton>
      </Tooltip>
    );
  }

  const handleAccordianClick = (e, expanded) => {
    if (editingIDList.length > 0) {
      setUnSaved(true);
    } else {
      setIsAccordianExpanded(expanded);
      if (expanded) {
        handleExpandChange(true);
      }
    }
  };

  return (
    <div className="dipaview-accordion">
      <Accordion
        key={ID}
        className="container"
        data-testid="accordion-expand"
        onChange={handleAccordianClick}
        expanded={isAccordianExpanded}
      >
        <AccordionSummary
          data-testid="summary-expand"
          className="dipaview-summary-expand"
        >
          <Grid item xs={12} className="actual-text">
            {editingIDList?.includes(ID) ? (
              <TextField
                placeholder="Actual text.."
                inputProps={{
                  'data-testid': 'addgroup-textfield',
                }}
                onChange={debounce((e) => {
                  e.stopPropagation();
                  onChangeSegmentGroup(ID, e);
                }, 200)}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onFocus={(e) => {
                  e.stopPropagation();
                }}
                className="actual-textfield"
              />
            ) : (
              <Typography
                onClick={() => handleExpandChange()}
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

            <div className="dipaview-icons">
              <Tooltip
                extraLabels={[
                  {
                    title: 'Last Edited Date',
                    subtitle: moment(tooltipValue).format('DD-MMM-YYYY'),
                  },
                  {
                    title: 'No. of times Edited',
                    subtitle: countTooltip,
                  },
                  {
                    title: 'Last Edited By',
                    subtitle: editedByTooltip || 'NA',
                  },
                ]}
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
                {(editingIDList.length > 0 &&
                  editingIDList.some((listItem) =>
                    segments.map((seg) => seg.ID).includes(listItem),
                  )) ||
                (editingIDList.length > 0 && editingIDList?.includes(ID)) ? (
                  <Save
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate();
                    }}
                    data-testid="save"
                    className="save-button"
                  />
                ) : (
                  pencilTooltip()
                )}
              </span>
            </div>
          </Grid>
        </AccordionSummary>

        <AccordionDetails className="accordion-details">
          <Grid item xs={2} className="accordion-details-grid">
            <Grid className="trash-plus-grid">
              <IconMenuButton id="actions" menuItems={menuItems}>
                <Plus data-testid="plus-icon" />
              </IconMenuButton>
              <IconButton
                className="trash-icon"
                data-testid="delete-icon"
                onClick={() => setOpenModal(ID)}
              >
                <Trash />
              </IconButton>
            </Grid>
          </Grid>

          <div data-testid="accord-summary" className="dipaview-summary">
            {childs.map((seg, i) => (
              <AccordionSummary key={ID} className="dipaview-container">
                <DipaViewStructure
                  key={seg.ID}
                  ID={seg.ID}
                  actualText={seg.actual_text}
                  level={seg.level}
                  segments={seg.derive_segemnt}
                  childs={seg.child}
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
                  lockDetails={lockDetails}
                  userId={userId}
                />
              </AccordionSummary>
            ))}
          </div>
          <Grid item xs={12} className="accordion-details-grid">
            {segments.map((segment) => (
              <div className="segment-typography" key={segment.ID}>
                {editingIDList.includes(segment.ID) ? (
                  <TextField
                    placeholder="Segment.."
                    onChange={(e) => onChangeSegment(segment.ID, e)}
                    className="segment-text"
                    defaultValue={segment?.derive_seg || ''}
                    inputProps={{
                      'data-testid': 'segment-textfield',
                    }}
                  />
                ) : (
                  <Grid container alignItems="center">
                    <Grid item xs={11}>
                      <Typography>{segment.derive_seg}</Typography>
                    </Grid>
                    <Grid item xs={1} className="section-delete-btn">
                      <IconButton
                        size="small"
                        onClick={() => setOpenModal(segment.ID)}
                      >
                        <Trash />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}
              </div>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Modal
        disableBackdropClick
        data-testid="losework-dipa-modal"
        open={unSaved}
        variant="warning"
        onClose={() => setUnSaved(false)}
        title="Lose your work?"
        message="All unsaved changes will be lost"
        buttonProps={[
          {
            label: 'Keep editing',
            'data-testid': 'editing-modal-button',
            onClick: () => setUnSaved(false),
          },
          {
            label: 'Leave without saving',
            'data-testid': 'leave-modal-button',
            onClick: () => {
              setIsAccordianExpanded(true);
              setUnSaved(false);
              handleExpandChange(true);
            },
          },
        ]}
      />
    </div>
  );
}

export default DipaViewStructure;
DipaViewStructure.propTypes = {
  ID: PropTypes.isRequired,
  actualText: PropTypes.isRequired,
  segments: PropTypes.isRequired,
  childs: PropTypes.isRequired,
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
  countTooltip: PropTypes.isRequired,
  editedByTooltip: PropTypes.isRequired,
  lockDetails: PropTypes.objectOf(
    PropTypes.shape({
      doc_id: PropTypes.string,
      last_updated: PropTypes.string,
      link_id: PropTypes.string,
      section_lock: PropTypes.bool,
      userId: PropTypes.string,
      user_name: PropTypes.string,
    }),
  ).isRequired,
  userId: PropTypes.string.isRequired,
};
