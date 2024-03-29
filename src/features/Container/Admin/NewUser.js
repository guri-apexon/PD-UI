/* eslint-disable */
import Button from 'apollo-react/components/Button';
import Grid from 'apollo-react/components/Grid';
import Loader from 'apollo-react/components/Loader';
import MenuItem from 'apollo-react/components/MenuItem';
import Modal from 'apollo-react/components/Modal';
import Select from 'apollo-react/components/Select';
import TextField from 'apollo-react/components/TextField';
import cloneDeep from 'lodash/cloneDeep';
import trim from 'lodash/trim';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  formErrorValues,
  getUserError,
  getUserLoader,
  modalToggle,
  newUser,
  newUserError,
  rolesOptionsList,
  setFormError,
  setNewUserError,
  setNewUserValues,
  setUserError,
} from './adminSlice';

const userValue = {
  userId: null,
  id: '',
  firstName: null,
  lastName: null,
  email: null,
  country: null,
  userRole: '',
  viaTicketNumber: null,
};

const emailReg =
  /^(([a-zA-Z0-9])|([a-zA-Z0-9]+\.[A-Za-z]))+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

function NewUser({ setIsOpen }) {
  const dispatch = useDispatch();
  const isOpen = useSelector(modalToggle);
  const formValue = useSelector(newUser);
  const error = useSelector(newUserError);
  const userIdError = useSelector(getUserError);
  const userLoader = useSelector(getUserLoader);
  const formErrValue = useSelector(formErrorValues);
  const userRoles = useSelector(rolesOptionsList);
  const [userId, setUserId] = useState(formValue.id);
  const [role, setRole] = useState(formValue.userRole);

  const handleSaveForm = () => {
    const err = cloneDeep(formErrValue);
    if (!formValue.firstName) {
      err.firstName.error = true;
      err.firstName.message = 'Required';
    } else {
      err.firstName.error = false;
      err.firstName.message = '';
    }
    if (!formValue.lastName) {
      err.lastName.error = true;
      err.lastName.message = 'Required';
    } else {
      err.lastName.error = false;
      err.lastName.message = '';
    }
    if (!formValue.email) {
      err.email.error = true;
      err.email.message = 'Required';
    } else if (!emailReg.test(formValue.email)) {
      err.email.error = true;
      err.email.message = 'Enter valid email';
    } else {
      err.email.error = false;
      err.email.message = '';
    }
    if (!formValue.country) {
      err.country.error = true;
      err.country.message = 'Required';
    } else {
      err.country.error = false;
      err.country.message = '';
    }
    if (!userId) {
      err.userId.error = true;
      err.userId.message = 'Required';
    } else if (userId && !/^[0-9]*$/.test(userId)) {
      err.userId.error = true;
      err.userId.message = 'Enter valid user id';
    } else {
      err.userId.error = false;
      err.userId.message = '';
    }
    if (!role) {
      err.userRole.error = true;
      err.userRole.message = 'Required';
    } else {
      err.userRole.error = false;
      err.userRole.message = '';
    }
    if (!formValue.viaTicketNumber) {
      err.viaTicketNumber.error = true;
      err.viaTicketNumber.message = 'Required';
    } else {
      err.viaTicketNumber.error = false;
      err.viaTicketNumber.message = '';
    }

    dispatch(setFormError(err));
    if (
      !userIdError &&
      formValue.firstName &&
      formValue.lastName &&
      formValue.email &&
      formValue.country &&
      userId &&
      role &&
      formValue.viaTicketNumber
    ) {
      dispatch({ type: 'ADD_NEW_USER_SAGA' });
    }
  };

  const handleChange = (key, value) => {
    const data = cloneDeep(formValue);

    data[key] = trim(value);
    dispatch(setNewUserValues(data));
  };
  const getUser = () => {
    const err = cloneDeep(formErrValue);
    if (userId && !/^[0-9]*$/.test(userId)) {
      err.userId.error = true;
      err.userId.message = 'Enter valid user id';
    } else if (userId) {
      err.userId.error = false;
      err.userId.message = '';
      dispatch({ type: 'GET_USER_DETAILS_LDAP', payload: userId });
    } else {
      err.userId.error = true;
      err.userId.message = 'Required';
    }
    dispatch(setFormError(err));
  };
  const onFieldBlur = (key, value) => {
    const err = cloneDeep(formErrValue);
    const trimValue = trim(value);

    if (key === 'userId' && userId && !/^[0-9]*$/.test(userId)) {
      err.userId.error = true;
      err.userId.message = 'Enter valid user id';
    } else if (key === 'email' && trimValue && !emailReg.test(trimValue)) {
      err.email.error = true;
      err.email.message = 'Enter valid email';
    } else if (trimValue) {
      err[key].error = false;
      err[key].message = '';
    } else {
      err[key].error = true;
      err[key].message = 'Required';
    }
    dispatch(setFormError(err));
  };
  return (
    <Modal
      variant="default"
      open={isOpen}
      onClose={() => {
        const reset = {
          firstName: { error: false, message: '' },
          lastName: { error: false, message: '' },
          email: { error: false, message: '' },
          country: { error: false, message: '' },
          userId: { error: false, message: '' },
          userRole: { error: false, message: '' },
          viaTicketNumber: { error: false, message: '' },
        };
        setIsOpen(false);
        dispatch(setNewUserValues(userValue));
        dispatch(setFormError(reset));
        setRole('');
        setUserId('');
        dispatch(setNewUserError(''));
        dispatch(setUserError(''));
      }}
      subtitle={error && <span style={{ color: 'red' }}>{error}</span>}
      title="Add New Users to PD"
      buttonProps={[{}, { label: 'Create', onClick: handleSaveForm }]}
      id="new-user-modal"
      data-testid="new-user-modal"
    >
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <TextField
            label="User ID"
            placeholder="Enter only number"
            fullWidth
            type="text"
            required
            value={userId}
            helperText={formErrValue.userId.message}
            error={formErrValue.userId.error}
            onChange={(e) => setUserId(trim(e.target.value))}
            onBlur={(e) => onFieldBlur('userId', e.target.value)}
            data-testid="user-id-texfield"
          />
          <span
            data-testid="user-id-error"
            style={{ color: 'red', fontSize: '13px' }}
          >
            {userIdError}
          </span>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button
            variant="primary"
            style={{ marginTop: '15%' }}
            onClick={() => getUser()}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Select
            label="User Role"
            helperText={`${formErrValue.userRole.message} You can select one option`}
            error={formErrValue.userRole.error}
            onBlur={(e) => onFieldBlur('userRole', e.target.value)}
            fullWidth
            canDeselect
            placeholder="Select User Role"
            value={role}
            onChange={(e) => {
              handleChange('userRole', e.target.value);
              setRole(e.target.value);
            }}
            required
            data-testid="user-role-select"
          >
            {userRoles.user.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={6} sm={6} />
        {userLoader && (
          <Grid item xs={12}>
            <div style={{ height: 30 }}>
              <Loader isInner />
            </div>
          </Grid>
        )}
        <Grid item xs={6} sm={6}>
          <TextField
            label="First Name"
            placeholder="First Name"
            type="text"
            fullWidth
            required
            helperText={formErrValue.firstName.message}
            error={formErrValue.firstName.error}
            value={!userIdError ? formValue.firstName : ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            onBlur={(e) => onFieldBlur('firstName', e.target.value)}
            data-testid="first-name-texfield"
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="Last Name"
            placeholder="Last Name"
            type="text"
            fullWidth
            required
            helperText={formErrValue.lastName.message}
            error={formErrValue.lastName.error}
            value={!userIdError ? formValue.lastName : ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            onBlur={(e) => onFieldBlur('lastName', e.target.value)}
            data-testid="last-name-texfield"
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="Email"
            placeholder="Email"
            fullWidth
            required
            type="email"
            helperText={formErrValue.email.message}
            error={formErrValue.email.error}
            value={!userIdError ? formValue.email : ''}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={(e) => onFieldBlur('email', e.target.value)}
            data-testid="email-texfield"
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="Country"
            placeholder="Country"
            fullWidth
            type="text"
            required
            helperText={formErrValue.country.message}
            error={formErrValue.country.error}
            value={!userIdError ? formValue.country : ''}
            onChange={(e) => handleChange('country', e.target.value)}
            onBlur={(e) => onFieldBlur('country', e.target.value)}
            data-testid="Country-texfield"
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="VIA Ticket #"
            placeholder="Enter VIA Ticket Number"
            fullWidth
            required
            helperText={formErrValue.viaTicketNumber?.message}
            error={formErrValue.viaTicketNumber?.error}
            value={!userIdError ? formValue.viaTicketNumber : ''}
            onChange={(e) => handleChange('viaTicketNumber', e.target.value)}
            onBlur={(e) => onFieldBlur('viaTicketNumber', e.target.value)}
            data-testid="viaTicket-texfield"
          />
        </Grid>
      </Grid>
    </Modal>
  );
}

export default NewUser;
