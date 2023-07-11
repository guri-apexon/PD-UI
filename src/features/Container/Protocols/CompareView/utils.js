import crypto from 'crypto';

export const getViewerUrlSignature = (
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

export const blobToFormData = (sourceBlob, targetBlob) => {
  const formData = new FormData();
  formData.append('left.file', sourceBlob, 'filename.pdf');
  formData.append('left.file_type', 'pdf');
  formData.append('right.file', targetBlob, 'filename.pdf');
  formData.append('right.file_type', 'pdf');
  return formData;
};
