import { render, fireEvent } from '../../../../test-utils/test-utils';
import CustomForm from '../MetaData/CustomForm';

const sample = [
  {
    content: 'This is an Example',
  },
];

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(
      <CustomForm
        item={sample}
        handleChange={jest.fn()}
        deleteMetaData={jest.fn()}
      />,
    );

    const metadataAccordian = component.getByTestId('customeform');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
  });
});

describe('Metadata CustomFied textBox Key', () => {
  test('should render the component', () => {
    const component = render(
      <CustomForm
        item={sample}
        handleChange={jest.fn()}
        deleteMetaData={jest.fn()}
      />,
    );

    const metadataAccordian = component.getByTestId('customeform');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
    const textfield = component.getByTestId('customeform-textField-key');
    expect(textfield).toBeInTheDocument();
    fireEvent.change(textfield, { target: { value: 'test' } });
    expect(textfield.value).toBe('test');
  });
});

describe('Metadata CustomFied textBox value', () => {
  test('should render the component', () => {
    const component = render(
      <CustomForm
        item={sample}
        handleChange={jest.fn()}
        deleteMetaData={jest.fn()}
      />,
    );

    const metadataAccordian = component.getByTestId('customeform');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
    const textfield = component.getByTestId('customeform-textField-value');
    expect(textfield).toBeInTheDocument();
    fireEvent.change(textfield, { target: { value: 'test1' } });
    expect(textfield.value).toBe('test1');
  });
});

describe('Metadata CustomFied checkbox', () => {
  test('should render the component', () => {
    const component = render(
      <CustomForm
        item={sample}
        handleChange={jest.fn()}
        deleteMetaData={jest.fn()}
      />,
    );

    const metadataAccordian = component.getByTestId('customeform');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
    const textfield = component.getByTestId('customeform-textField-checkbox');
    expect(textfield).toBeInTheDocument();
    fireEvent.change(textfield, { target: { value: 'test11' } });
    // expect(component.getByText('OPTION1')).toBeInTheDocument();
  });
});
