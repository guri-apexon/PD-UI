import { render } from '@testing-library/react';
import MetaDataEdit from '../MetaData/MetaDataEdit';

const sample = [
  {
    content: 'This is an Example',
  },
];

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(<MetaDataEdit data={sample} />);

    const metaDataEdit = component.getByTestId('metadata-edit');

    expect(component).toBeTruthy();

    expect(metaDataEdit).toBeInTheDocument();
  });
});
