import Modal from 'apollo-react/components/Modal/Modal';
import PropTypes from 'prop-types';
import { Apis } from '../../../../utils/api';
import { getViewerUrlSignature } from './utils';

function CompareView({ isModal, setIsModal, identifier }) {
  const accountId = 'LFJCPS-test'; // process.env.REACT_APP_DRAFTABLE_ACCOUNT_ID;
  const authToken = 'ba9aa669ca6823bdeac636f62d521487'; // process.env.REACT_APP_DRAFTABLE_TOKEN;
  const sessionDuration = new Date(new Date().getTime() + 15 * 60000);
  const futureUTCTime = new Date(sessionDuration.toUTCString());
  const validUntilTimestamp = new Date(futureUTCTime).getTime() / 1000;

  const handleClose = () => {
    setIsModal(false);
  };

  const signature = getViewerUrlSignature(
    accountId,
    authToken,
    identifier,
    validUntilTimestamp,
  );

  const url = `${Apis.DRAFTABLE_API_URL}/viewer/${accountId}/${identifier}?valid_until=${validUntilTimestamp}&signature=${signature}`;
  return (
    <Modal
      disableBackdropClick
      className="modal-browser"
      open={isModal}
      variant="default"
      onClose={handleClose}
      title="View in Browser"
      buttonProps={[
        { label: 'Cancel', onClick: handleClose, variant: 'primary' },
      ]}
      id="renameTermsModal"
      data-testId="dialog"
    >
      <iframe className="modal-browser" title="uni" src={url} name="page" />
    </Modal>
  );
}

export default CompareView;

CompareView.propTypes = {
  setIsModal: PropTypes.isRequired,
  isModal: PropTypes.isRequired,
  identifier: PropTypes.isRequired,
};
