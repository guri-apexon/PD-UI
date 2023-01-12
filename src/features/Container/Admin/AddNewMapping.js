/* eslint-disable */
import { useState, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import trim from 'lodash/trim';
import cloneDeep from 'lodash/cloneDeep';

import Grid from 'apollo-react/components/Grid';
import Button from 'apollo-react/components/Button';
import Modal from 'apollo-react/components/Modal';
import TextField from 'apollo-react/components/TextField';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import {
  modalToggle,
  setModalToggle,
  setNewMappingValues,
  setNewMappingError,
  newMapping,
  newMappingError,
  rolesOptionsList,
} from './adminSlice';

const mapValue = {
  userId: null,
  protocol: null,
  role: null,
  following: null,
  projectId: null,
};
const errorValue = {
  userId: { error: false, message: '' },
  protocol: { error: false, message: '' },
  role: { error: false, message: '' },
  following: { error: false, message: '' },
};
const followOptions = ['Yes', 'No'];

function AddNewMapping() {
  const dispatch = useDispatch();
  const isOpen = useSelector(modalToggle);
  const formValue = useSelector(newMapping);
  const error = useSelector(newMappingError);
  const roles = useSelector(rolesOptionsList);
  const [role, setRole] = useState('');
  const [formErrValue, setFormErrValue] = useState(errorValue);
  const [follow, setFollow] = useState('');

  useEffect(() => {
    if (!isOpen) {
      const reset = {
        userId: { error: false, message: '' },
        protocol: { error: false, message: '' },
        role: { error: false, message: '' },
        following: { error: false, message: '' },
      };
      dispatch(setNewMappingValues(mapValue));
      setFormErrValue(reset);
      setRole('');
      setFollow('');
      dispatch(setNewMappingError(''));
    }

    // eslint-disable-next-line
  }, [isOpen]);

  const handleSaveForm = () => {
    const err = cloneDeep(formErrValue);
    if (!formValue.userId) {
      err.userId.error = true;
      err.userId.message = 'Required';
    }
    if (!formValue.protocol) {
      err.protocol.error = true;
      err.protocol.message = 'Required';
    }
    if (!formValue.role) {
      err.role.error = true;
      err.role.message = 'Required';
    }
    if (!formValue.following) {
      err.following.error = true;
      err.following.message = 'Required';
    }

    setFormErrValue(err);
    if (
      !err.userId.error &&
      formValue.userId &&
      formValue.protocol &&
      formValue.role &&
      formValue.following
    ) {
      dispatch({ type: 'ADD_NEW_MAPPING_SAGA', payload: formValue });
    }
  };

  const handleChange = (key, value) => {
    const data = cloneDeep(formValue);
    data[key] = trim(value);
    if (key === 'role' && trim(value) === 'primary') {
      data.following = '1'; // Yes
      setFollow('1');
    } else if (key === 'role' && trim(value) === 'secondary') {
      data.following = ''; // No
      setFollow('');
    }
    dispatch(setNewMappingValues(data));
  };
  const onFieldBlur = (key, value) => {
    const err = cloneDeep(formErrValue);
    const trimValue = trim(value);
    if (key === 'userId' && trimValue && !/^[0-9]*$/.test(trimValue)) {
      err.userId.error = true;
      err.userId.message = 'Enter valid User Id';
    } else if (trimValue) {
      err[key].error = false;
      err[key].message = '';
    } else {
      err[key].error = true;
      err[key].message = 'Required';
    }
    if (key === 'role' && trimValue === 'primary') {
      err.following.error = false;
      err.following.message = '';
    }
    setFormErrValue(err);
  };

  return (
    <>
      <Button
        variant="primary"
        style={{ marginRight: 10 }}
        onClick={() => dispatch(setModalToggle(true))}
      >
        Map
      </Button>
      <Modal
        variant="default"
        open={isOpen}
        onClose={() => {
          dispatch(setModalToggle(false));
        }}
        title="Map User to Protocol"
        subtitle={error && <span style={{ color: 'red' }}>{error}</span>}
        buttonProps={[{}, { label: 'Add', onClick: handleSaveForm }]}
        id="new-user-modal"
        data-testid="new-user-modal"
      >
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              label="User Id"
              placeholder="Enter User Id"
              fullWidth
              required
              helperText={formErrValue.userId.message}
              error={formErrValue.userId.error}
              onChange={(e) => handleChange('userId', e.target.value)}
              onBlur={(e) => onFieldBlur('userId', e.target.value)}
              data-testid="userId-texfield"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              label="Protocol Number"
              placeholder="Enter Protocol Number"
              fullWidth
              required
              helperText={formErrValue.protocol.message}
              error={formErrValue.protocol.error}
              onChange={(e) => handleChange('protocol', e.target.value)}
              onBlur={(e) => onFieldBlur('protocol', e.target.value)}
              data-testid="protocol-texfield"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Select
              label="Role"
              helperText={`${formErrValue.role.message} You can select one option`}
              error={formErrValue.role.error}
              onBlur={(e) => onFieldBlur('role', e.target.value)}
              fullWidth
              canDeselect
              placeholder="Select User Role"
              value={role}
              onChange={(e) => {
                handleChange('role', e.target.value);
                setRole(e.target.value);
              }}
              required
              data-testid="role-select"
            >
              {roles.protocol.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Select
              label="Following"
              helperText={`${formErrValue.following.message} You can select one option`}
              error={formErrValue.following.error}
              onBlur={(e) => onFieldBlur('following', e.target.value)}
              fullWidth
              canDeselect
              placeholder="Select Yes/No"
              value={follow}
              onChange={(e) => {
                handleChange('following', e.target.value);
                setFollow(e.target.value);
              }}
              required
              data-testid="following-select"
            >
              {followOptions.map((option) => (
                <MenuItem key={option} value={option === 'Yes' ? '1' : '0'}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              label="Project Id"
              placeholder=""
              fullWidth
              onChange={(e) => handleChange('projectId', e.target.value)}
              data-testid="projectId-texfield"
            />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}

export default memo(AddNewMapping);
