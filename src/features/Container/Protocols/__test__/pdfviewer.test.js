import { useState } from 'react';
import { render } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Pdf from '../pdfviewer';

describe('pdfviewer component', () => {
  test('should show Pdf', () => {
    render(<Pdf />);
  });
});
