import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { InputKeyField } from '../MetaData/CustomForm';

describe('InputKeyField', () => {
  it('renders the correct placeholder text', () => {
    const { getByPlaceholderText } = render(
      <InputKeyField
        keyName="testKey"
        handleChange={() => {}}
        handleBlur={() => {}}
        inputValue=""
      />,
    );

    const inputElement = getByPlaceholderText('Enter Key');

    expect(inputElement).toBeInTheDocument();
  });

  it('updates the input value on change', () => {
    const handleChange = jest.fn();

    const { getByTestId } = render(
      <InputKeyField
        keyName="testKey"
        handleChange={handleChange}
        handleBlur={() => {}}
        inputValue=""
      />,
    );

    const inputElement = getByTestId('customeform-textField-key');
    fireEvent.change(inputElement, { target: { value: 'newValue' } });

    expect(handleChange).toHaveBeenCalledWith({
      target: {
        name: 'testKey',
        value: 'newValue',
      },
    });
  });

  it('calls handleBlur on input blur', () => {
    const handleBlur = jest.fn();

    const { getByTestId } = render(
      <InputKeyField
        keyName="testKey"
        handleChange={() => {}}
        handleBlur={handleBlur}
        inputValue=""
      />,
    );

    const inputElement = getByTestId('customeform-textField-key');
    fireEvent.blur(inputElement);

    expect(handleBlur).toHaveBeenCalledWith({
      target: {
        name: 'testKey',
        value: '',
      },
    });
  });
});
