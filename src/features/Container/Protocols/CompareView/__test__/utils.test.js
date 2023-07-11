import { blobToFormData } from '../utils';

describe('blobToFormData', () => {
  it('should create a FormData object with the correct values', () => {
    const sourceBlob = new Blob(['Source File'], { type: 'application/pdf' });
    const targetBlob = new Blob(['Target File'], { type: 'application/pdf' });
    blobToFormData(sourceBlob, targetBlob);
  });
});
