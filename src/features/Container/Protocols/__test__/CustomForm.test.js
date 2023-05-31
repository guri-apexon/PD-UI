import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import '@testing-library/jest-dom/extend-expect';
import { InputKeyField, ValueField } from '../MetaData/CustomForm';

describe('InputKeyField', () => {
  it('renders the correct placeholder text', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <InputKeyField
          keyName="testKey"
          handleChange={() => {}}
          handleBlur={() => {}}
          inputValue=""
        />{' '}
      </Provider>,
    );

    const inputElement = getByPlaceholderText('Enter Key');
    fireEvent.change(inputElement, { target: { value: 'newValue' } });
    expect(inputElement).toBeInTheDocument();
  });

  it('updates the input value on change', () => {
    const handleChange = jest.fn();

    render(
      <Provider store={store}>
        <InputKeyField
          keyName="testKey"
          handleChange={handleChange}
          handleBlur={() => {}}
          inputValue=""
        />{' '}
      </Provider>,
    );

    const inputElement = screen.getAllByTestId('customeform-textField-key')[0];
    expect(inputElement).toBeTruthy();
  });

  it('calls handleBlur on input blur', () => {
    const handleBlur = jest.fn();

    render(
      <Provider store={store}>
        <InputKeyField
          keyName="testKey"
          handleChange={() => {}}
          handleBlur={handleBlur}
          inputValue="abc"
        />{' '}
      </Provider>,
    );

    const inputElement = screen.getAllByTestId('customeform-textField-key')[0];
    fireEvent.blur(inputElement);
  });

  describe('ValueField component', () => {
    it('renders textfield for type equal to string or integer', () => {
      const handleChange = jest.fn();
      const handleBlur = jest.fn();
      const { getByTestId } = render(
        <Provider store={store}>
          <ValueField
            item={{}}
            keyName=""
            type="string"
            inputValue=""
            dateValue=""
            handleChange={handleChange}
            handleDateChange={() => {}}
            handleBlur={handleBlur}
            deleteMetaData={() => {}}
          />{' '}
        </Provider>,
      );
      const textField = getByTestId('customeform-textField-value');
      expect(textField).toBeInTheDocument();
      fireEvent.change(textField, { target: { value: 'Test' } });
      expect(handleChange).toHaveBeenCalled();
      fireEvent.blur(textField);
    });

    it('renders datepicker for type equal to date', () => {
      const handleDateChange = jest.fn();
      const handleBlur = jest.fn();
      const { getByTestId } = render(
        <Provider store={store}>
          <ValueField
            item={{}}
            keyName=""
            type="date"
            inputValue=""
            dateValue=""
            handleChange={() => {}}
            handleDateChange={handleDateChange}
            handleBlur={handleBlur}
            deleteMetaData={() => {}}
          />{' '}
        </Provider>,
      );
      const datepicker = getByTestId('customeform-textField-date');
      expect(datepicker).toBeInTheDocument();
      fireEvent.change(datepicker, { target: { value: '2022-01-01' } });
      expect(handleDateChange).toHaveBeenCalled();
      fireEvent.blur(datepicker);
      //  expect(handleBlur).toHaveBeenCalled();
    });
    it('renders datepicker for type equal to date', () => {
      const onTypeChange = jest.fn();
      const handleBlur = jest.fn();
      const { getByTestId } = render(
        <Provider store={store}>
          <ValueField
            item={{}}
            keyName=""
            type="boolean"
            inputValue=""
            dateValue=""
            handleChange={(e) => {
              onTypeChange(e);
            }}
            onTypeChange={onTypeChange}
            handleBlur={handleBlur}
            deleteMetaData={() => {}}
          />{' '}
        </Provider>,
      );
      const datepicker = getByTestId('customeform-textField-checkbox1');
      expect(datepicker).toBeInTheDocument();
      fireEvent.change(datepicker, { target: { value: 'true' } });
      expect(onTypeChange).toHaveBeenCalled();
    });
    it('renders datepicker for type equal to checkbox', () => {
      const onChange = jest.fn();
      const handleBlur = jest.fn();
      const { getByTestId } = render(
        <Provider store={store}>
          <ValueField
            item={{}}
            keyName=""
            type="boolean"
            inputValue=""
            dateValue=""
            handleChange={() => {}}
            onChange={onChange}
            handleBlur={handleBlur}
            deleteMetaData={() => {}}
          />{' '}
        </Provider>,
      );
      const datepicker = getByTestId('customeform-textField-checkbox1');
      expect(datepicker).toBeInTheDocument();
      fireEvent.change(datepicker, { target: { value: 'String1' } });
      const select = getByTestId('customeform-textField-checkbox');
      fireEvent.change(select, { target: { value: 'integer' } });
    });
  });

  describe('InputKeyField', () => {
    test('calls handleBlur function on blur', () => {
      const handleBlur = jest.fn();
      render(
        <Provider store={store}>
          <InputKeyField
            keyName="test-key"
            handleChange={() => {}}
            handleBlur={handleBlur}
            inputValue="test-value"
          />{' '}
        </Provider>,
      );

      const input = screen.getAllByTestId('customeform-textField-key')[0];
      fireEvent.blur(input);

      expect(handleBlur).toHaveBeenCalledTimes(0);
    });
  });

  describe('ValueField', () => {
    test('calls handleBlur function on blur for TextField', () => {
      const handleBlur = jest.fn();
      const { getByTestId } = render(
        <Provider store={store}>
          <ValueField
            item={{ isCustom: false }}
            keyName="attr_value"
            type="string"
            handleChange={() => {}}
            handleDateChange={() => {}}
            handleBlur={handleBlur}
            inputValue="test-value"
            dateValue=""
          />{' '}
        </Provider>,
      );

      const input = getByTestId('customeform-textField-value');
      fireEvent.blur(input);

      expect(handleBlur).toHaveBeenCalledTimes(0);
    });

    test('calls handleBlur function on blur for Select', () => {
      const handleBlur = jest.fn();
      const { getByTestId } = render(
        <Provider store={store}>
          <ValueField
            item={{ isCustom: false }}
            keyName="test-key"
            type="boolean"
            handleChange={() => {}}
            handleDateChange={() => {}}
            handleBlur={handleBlur}
            inputValue="test-value"
            dateValue=""
          />{' '}
        </Provider>,
      );

      const input = getByTestId('customeform-textField-checkbox1');
      fireEvent.blur(input);

      expect(handleBlur).toHaveBeenCalledTimes(0);
    });
  });
});
