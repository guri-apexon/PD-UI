import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from 'apollo-react/components/Loader';
import Modal from 'apollo-react/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Grid from 'apollo-react/components/Grid/Grid';
import Card from 'apollo-react/components/Card';
import Select from 'apollo-react/components/Select';
import MenuItem from 'apollo-react/components/MenuItem';
import Expand from 'apollo-react-icons/Expand';
import IconButton from 'apollo-react/components/IconButton';
import Tooltip from 'apollo-react/components/Tooltip';

import { v4 as uuidv4 } from 'uuid';
import startCase from 'lodash/startCase';
import {
  allDipaViewData,
  dipaViewData,
  sectionLockDetails,
} from '../protocolSlice';
import DipaViewStructure from './DipaViewStructure';
import { userId, loggedUser } from '../../../../store/userDetails';

const getFormattedCategoryName = (category) => {
  return startCase(category.replace('cpt_', ''));
};

function DipaView({
  docId,
  handleRightFullScreen,
  fullRightScreen,
  showExpandIcon,
}) {
  const [selectedSection, setSelectedSection] = useState('');
  const [metadata, setMetadata] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sections, setSections] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);
  const [userData, setUserData] = useState();
  const dipaViewSelector = useSelector(dipaViewData);
  const dipaDataSelector = useSelector(allDipaViewData);
  const lockDetails = useSelector(sectionLockDetails);
  const userIdSelector = useSelector(userId);
  const userloggedSelector = useSelector(loggedUser);
  const [editingIDList, setEditingIDList] = useState([]);
  const [tooltipValue, setTooltipValue] = useState({});
  const [countTooltip, setCountTooltip] = useState({});
  const [editedByTooltip, setEditedByTooltip] = useState({});
  const loader = useSelector(dipaViewData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'GET_DERIVED_SECTIONS',
      payload: {
        docId,
      },
    });
    dispatch({
      type: 'RESET_ALL_DIPA_VIEW',
    });
    // eslint-disable-next-line
  }, [docId]);

  useEffect(() => {
    if (dipaViewSelector?.message === 'Success') {
      setSections(
        dipaViewSelector?.data?.dipa_resource?.map((section) => ({
          ...section,
          name: getFormattedCategoryName(section.category),
        })),
      );
    }
  }, [dipaViewSelector]);

  useEffect(() => {
    const receivedData = dipaDataSelector?.data?.dipa_resource[0]?.dipa_data;
    const timeUpdated = dipaDataSelector?.data?.dipa_resource[0]?.timeUpdated;
    const editCount = dipaDataSelector?.data?.dipa_resource[0]?.editCount;
    const lastEdited = dipaDataSelector?.data?.dipa_resource[0]?.lastEditedBy;
    setTooltipValue(timeUpdated);
    setCountTooltip(editCount);
    setEditedByTooltip(lastEdited);
    setDataResponse(receivedData?.output);
  }, [dipaDataSelector]);

  useEffect(() => {
    const getChildElements = (elements = []) =>
      elements.map((d) => ({
        ...d,
        open: false,
        child: getChildElements(d?.child || []),
      }));
    const newValue = getChildElements(dataResponse);
    setMetadata(newValue);
  }, [dataResponse]);

  const getAllCategory = (userDataUpdated) => {
    dispatch({
      type: 'GET_ALL_DIPA_VIEW',
      payload: {
        data: userDataUpdated,
      },
    });
  };

  const getSectionLock = (usrData) => {
    dispatch({
      type: 'GET_SECTION_LOCK',
      payload: {
        doc_id: usrData?.doc_id,
        link_id: usrData?.id,
      },
    });
  };

  const updateSectionLock = (usrData, status) => {
    dispatch({
      type: 'UPDATE_AND_SET_SECTION_LOCk',
      payload: {
        docId: usrData?.doc_id,
        linkId: usrData?.id,
        sectionLock: status,
        userId: '',
      },
    });
  };

  const resetLock = (usrData, status) => {
    /**
     * Check if there is a lock and same user, if yes then only release it.
     */
    if (
      lockDetails?.section_lock === false &&
      status &&
      lockDetails?.userId === userIdSelector?.toString()
    ) {
      updateSectionLock(usrData, status);
    }
  };

  const handleSectionChange = (e) => {
    /**
     * Release the lock if category has changed
     */
    resetLock(userData, true);
    const selectedSection = sections.find(
      (section) => section.id === e.target.value,
    );
    const newValue = {
      category: selectedSection.category,
      doc_id: selectedSection.doc_id,
      id: selectedSection.id,
    };
    setEditingIDList([]);
    setSelectedSection(selectedSection.id);
    setUserData(newValue);
    getAllCategory(newValue);
    getSectionLock(newValue);
  };

  const handleExpandChange = (panelID) => {
    setEditingIDList([]);

    const updateOpenValue = (array) =>
      array.map((section) => ({
        ...section,
        open: section?.ID === panelID ? !section.open : section.open,
        child: section.child?.length
          ? updateOpenValue(section.child)
          : section.child,
      }));

    const removedDerived = (array) =>
      array.filter((item) => {
        if (item.child.length) {
          item.child = removedDerived(item.child);
        }
        item.derive_segemnt = item.derive_segemnt.filter(
          (item) => item.derive_seg !== '',
        );
        return item;
      });

    const tempMetadata = updateOpenValue(metadata);
    const removedDeriveSeg = removedDerived(tempMetadata);

    setMetadata([...removedDeriveSeg]);
  };

  const toggleEditingIDs = (ids = []) => {
    const toggle = (li, id) => {
      const updatedList = li;
      if (editingIDList.includes(id)) {
        return updatedList.filter((x) => x === id);
      }
      return [...updatedList, id];
    };

    let list = editingIDList;
    ids.forEach((id) => {
      list = toggle(list, id);
    });
    setEditingIDList(list);

    /**
     * Add lock if we are doing any changes
     */
    if (lockDetails?.section_lock === true) {
      updateSectionLock(userData, false);
    }
  };

  const addSegment = (parentId) => {
    const Id = uuidv4();
    const getUpdatedMetadata = (array) =>
      array.map((section) => ({
        ...section,
        derive_segemnt:
          section?.ID === parentId
            ? [{ ID: Id, derive_seg: '' }, ...(section?.derive_segemnt || [])]
            : section?.derive_segemnt || [],
        child: getUpdatedMetadata(section.child),
      }));
    const getUpdate = getUpdatedMetadata(metadata);
    setMetadata([...getUpdate]);
    toggleEditingIDs([Id]);
  };

  const deleteSegment = (parentId) => {
    const getUpdatedMetadata = (array) =>
      array.map((section) => ({
        ...section,
        derive_segemnt:
          section?.ID === parentId ? [] : section?.derive_segemnt || [],
        child: getUpdatedMetadata(section.child),
      }));
    const getUpdate = getUpdatedMetadata(metadata);
    setMetadata([...getUpdate]);
    setOpenModal(false);
    // eslint-disable-next-line
    saveData([...getUpdate]);
  };

  const addSegmentText = (parentId, e) => {
    const getUpdatedMetadata = (array) =>
      array.map((section) => ({
        ...section,
        derive_segemnt: section?.derive_segemnt.map((seg) =>
          seg.ID === parentId
            ? {
                ...seg,
                derive_seg: e.target.value,
              }
            : seg,
        ),
        child: getUpdatedMetadata(section.child),
      }));
    const updatedMetadata = getUpdatedMetadata(metadata);
    setMetadata([...updatedMetadata]);
  };

  const addSegmentGroupText = (groupId, e) => {
    const getUpdatedMetadata = (array) =>
      array.map((section) => ({
        ...section,
        actual_text:
          section?.ID === groupId ? e.target.value : section.actual_text,
        child: getUpdatedMetadata(section.child) || [],
      }));
    const updatedMetadata = getUpdatedMetadata(metadata);
    setMetadata([...updatedMetadata]);
  };

  const addGroup = (groupId) => {
    const Id = uuidv4();
    const getUpdatedMetadata = (array) =>
      array.map((section) => ({
        ...section,
        child:
          section?.ID === groupId
            ? [
                {
                  ID: Id,
                  actual_text: '',
                  derive_segemnt: [],
                  child: [],
                },
                ...(section?.child || []),
              ]
            : getUpdatedMetadata(section.child) || [],
      }));
    const getUpdate = getUpdatedMetadata(metadata);
    setMetadata([...getUpdate]);
    toggleEditingIDs([Id]);
  };

  const saveData = (deleteData) => {
    const newData = deleteData || metadata;
    const data = {
      id: userData?.id,
      doc_id: userData?.doc_id,
      category: userData?.category,
      userId: userloggedSelector.userId,
      userName: userloggedSelector.username,
      dipa_data: {
        actual_count: newData.length,
        doc_id: userData?.id,
        header: userData?.category,
        output: newData,
        subheader: userData?.category,
      },
    };
    dispatch({
      type: 'UPDATE_DIPA_VIEW',
      payload: {
        data,
      },
    });
    setEditingIDList([]);
    /**
     * After save, release lock
     */
    resetLock(userData, true);
  };

  function calculateNestedDeriveSegmentsLength(obj) {
    let sum = 0;

    if (obj.derive_segemnt) {
      sum += obj.derive_segemnt.length;
    }

    if (obj.child) {
      for (let i = 0; i < obj.child.length; i++) {
        sum += calculateNestedDeriveSegmentsLength(obj.child[i]);
      }
    }

    return sum;
  }

  const deriveSegmentsLength = metadata.reduce((acc, curr) => {
    return acc + calculateNestedDeriveSegmentsLength(curr);
  }, 0);

  return (
    <div>
      <Card className="protocol-column protocol-digitize-column card-boarder">
        <div className="panel-heading" data-testid="header">
          <b>Derived Counts</b>
          {showExpandIcon && fullRightScreen && (
            <Tooltip
              variant="dark"
              title="Default View"
              placement="left"
              onClick={() => handleRightFullScreen(null)}
              data-testid="minimize-view-tooltip"
            >
              <div
                role="button"
                data-testid="minimize-btn"
                className="minimize-icon"
              >
                <img src="./images/minimize.png" alt="minimize icon" />
              </div>
            </Tooltip>
          )}
          {showExpandIcon && !fullRightScreen && (
            <Tooltip
              data-testid="expand-view-tooltip"
              variant="dark"
              title="Expand View"
              placement="left"
            >
              <IconButton
                onClick={() => handleRightFullScreen(null)}
                className="expand-icon"
                color="primary"
                data-testid="expand-btn"
              >
                <Expand />
              </IconButton>
            </Tooltip>
          )}
        </div>

        <Grid container spacing={1} className="dipa-view-table">
          <Grid container item xs={5}>
            <Grid item xs={12} className="drop-down">
              <Select
                value={selectedSection}
                onChange={handleSectionChange}
                placeholder="Select item..."
                fullWidth
                inputProps={{
                  'data-testid': 'select-box',
                }}
              >
                {sections.map((item) => (
                  <MenuItem key={item} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          {loader.loading ? <Loader isInner /> : ''}
          {dipaDataSelector?.success && (
            <Grid item xs={7} container spacing={1} className="dipa-view-count">
              <Grid item xs={5} className="dipa-actualcount">
                Actual Count
                <br />
                <span data-testid="actual-count">
                  <b>{metadata?.length}</b>
                </span>
              </Grid>
              <Grid item xs={5} className="dipa-derivedcount">
                Derived Count
                <br />
                <span data-testid="derived-count">
                  <b>{deriveSegmentsLength}</b>
                </span>
              </Grid>
            </Grid>
          )}
        </Grid>
        <div className="structure-scroll">
          <div
            data-testid="structure-component"
            className="structure-container"
          >
            {metadata.length > 0 ? (
              <>
                {' '}
                {metadata?.map((section, index) => (
                  <DipaViewStructure
                    key={section.ID}
                    ID={section.ID}
                    actualText={section.actual_text}
                    level={section.level}
                    segments={section.derive_segemnt}
                    childs={section.child}
                    index={index}
                    handleExpandChange={handleExpandChange}
                    handleUpdate={saveData}
                    handleAdd={addSegment}
                    handleAddGroup={addGroup}
                    setOpenModal={setOpenModal}
                    onChangeSegment={addSegmentText}
                    onChangeSegmentGroup={addSegmentGroupText}
                    editingIDList={editingIDList}
                    setEditingIDList={setEditingIDList}
                    toggleEditingIDs={toggleEditingIDs}
                    tooltipValue={tooltipValue}
                    countTooltip={countTooltip}
                    editedByTooltip={editedByTooltip}
                    lockDetails={lockDetails}
                    userId={userIdSelector?.toString()}
                  />
                ))}
              </>
            ) : (
              <div className="no-data-container">No Data </div>
            )}
          </div>
        </div>
      </Card>
      <Modal
        disableBackdropClick
        open={openModal}
        variant="warning"
        onClose={() => setOpenModal(false)}
        title="Confirm Action"
        buttonProps={[
          {
            label: 'Cancel',
            'data-testid': 'cancel-modal-button',
            onClick: () => setOpenModal(false),
          },
          {
            label: 'Ok',
            'data-testid': 'save-modal-button',
            onClick: () => deleteSegment(openModal),
          },
        ]}
      >
        Are you sure you want to delete?
      </Modal>
    </div>
  );
}
export default DipaView;

DipaView.propTypes = {
  docId: PropTypes.isRequired,
  handleRightFullScreen: PropTypes.func.isRequired,
  fullRightScreen: PropTypes.bool.isRequired,
  showExpandIcon: PropTypes.bool.isRequired,
};
