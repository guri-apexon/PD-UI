import { render } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Admin from '../Admin';

describe('Admin Screen', () => {
  test('should render Admin screen', () => {
    render(<Admin />);
  });
});
