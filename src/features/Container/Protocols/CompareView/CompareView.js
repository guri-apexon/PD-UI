import crypto from 'crypto';
import Modal from 'apollo-react/components/Modal/Modal';
import PropTypes from 'prop-types';

function CompareView({ isModal, setIsModal, identifier }) {
  const accountId = process.env.REACT_APP_DRAFTABLE_ACCOUNT_ID; // 'dmBxrH-test';
  const authToken = process.env.REACT_APP_DRAFTABLE_TOKEN; // 'fc1031a4df237709e3508f8592356fd0';
  const futureTime = new Date(new Date().getTime() + 15 * 60000);
  const futureUTCTime = new Date(futureTime.toUTCString());
  const validUntilTimestamp = new Date(futureUTCTime).getTime() / 1000;

  const handleClose = () => {
    setIsModal(false);
  };
  const getViewerUrlSignature = (
    accountId,
    authToken,
    identifier,
    validUntilTimestamp,
  ) => {
    const policy = {
      account_id: accountId,
      identifier,
      valid_until: validUntilTimestamp,
    };
    const jsonPolicy = JSON.stringify(policy);
    const hmacDigest = crypto
      .createHmac('sha256', authToken)
      .update(jsonPolicy)
      .digest('hex');

    return hmacDigest;
  };

  const signature = getViewerUrlSignature(
    accountId,
    authToken,
    identifier,
    validUntilTimestamp,
  );

  const url = `https://api.draftable.com/v1/comparisons/viewer/${accountId}/${identifier}?valid_until=${validUntilTimestamp}&signature=${signature}`;
  return (
    <Modal
      disableBackdropClick
      className="modal-browser"
      open={isModal}
      variant="default"
      onClose={handleClose}
      title="Browser In View "
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
