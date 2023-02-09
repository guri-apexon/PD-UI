import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import MultilineEdit from '../DigitizedPanel/MultilineEdit';
import store from '../../../../store/store';

const sample = [
  {
    content: 'This is an Example',
  },
];

describe('Digitize Edit', () => {
  test('should render the component', () => {
    const component = render(
      <Provider store={store}>
        <MultilineEdit data={sample} />
      </Provider>,
    );
    const richTextEditor = component.getByTestId('richTextEditor');

    expect(component).toBeTruthy();

    expect(richTextEditor).toBeInTheDocument();
  });
});
