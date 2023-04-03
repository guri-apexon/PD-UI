import { useState, useRef } from 'react';
import IdleTimer from 'react-idle-timer';
import Modal from 'apollo-react/components/Modal';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

function SectionLockTimer({ updateSectionLock, onDiscardClick }) {
  const idleTimer = useRef(null);
  const [isModal, setIsModal] = useState(false);
  const [isSessionOut, setIsSessionOut] = useState(false);

  const handleOnIdle = () => {
    setIsModal(true);
    if (isSessionOut) {
      updateSectionLock(true, true);
    }
    setIsSessionOut(true);
    idleTimer.current.reset();
  };

  const handleClose = () => {
    setIsModal(false);
    setIsSessionOut(false);
    idleTimer.current.reset();
  };

  return (
    <>
      <IdleTimer
        ref={idleTimer}
        timeout={isSessionOut ? 5000 * 60 : 20000 * 60}
        onIdle={handleOnIdle}
        debounce={250}
        data-testId="idle-timer"
      />
      <Modal
        variant="default"
        open={isModal}
        onClose={handleClose}
        title="Session timeout"
        id="timer"
        data-testId="idle-modal"
        buttonProps={[
          {
            label: 'Discard Changes',
            onClick: () => {
              handleClose();
              onDiscardClick();
            },
          },
          { label: 'Continue Editing', onClick: handleClose },
        ]}
      >
        <p>
          Application is about to timeout due to inactivity. Please continue
          editing or discard.
        </p>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default SectionLockTimer;

SectionLockTimer.propTypes = {
  updateSectionLock: PropTypes.isRequired,
  onDiscardClick: PropTypes.isRequired,
};
