import { render, fireEvent } from '@testing-library/react';
import CustomDropdown from './CustomDropdown';

describe('customDropdown test', () => {
  test('customDropdown render test', async () => {
    const formValue = {
      label: '',
    };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const sponsor = [
      {
        sponsor_name: 'NVT AG',
        sponsor_abbreviation: 'NVT',
        id: 2,
        label: 'NVT AG',
      },
    ];
    render(
      <CustomDropdown
        formValue={formValue}
        source={sponsor}
        onChange={onChange}
        onBlur={onBlur}
      />,
    );
    // debug();
  });
  test('customDropdown render test 2', async () => {
    const formValue = {
      label: '',
    };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const sponsor = [
      {
        sponsor_name: 'NVT AG',
        sponsor_abbreviation: 'NVT',
        id: 2,
        label: 'NVT AG',
      },
    ];
    const container = render(
      <CustomDropdown
        formValue={formValue}
        source={sponsor}
        onChange={onChange}
        onBlur={onBlur}
      />,
    );
    const dropdown = container.getByTestId('custom-dropdown-test-id')
      .children[0].children[0].children[1].children[0];
    fireEvent.change(dropdown, { target: { value: 'a' } });
    fireEvent.change(dropdown, { target: { value: 'N' } });
    fireEvent.change(dropdown, { target: { value: '' } });
  });
  test('customDropdown render test 3', async () => {
    const formValue = {
      label: '',
    };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const sponsor = [
      {
        sponsor_name: 'NVT AG',
        sponsor_abbreviation: 'NVT',
        id: 2,
        label: 'NVT AG',
      },
    ];
    const container = render(
      <CustomDropdown
        formValue={formValue}
        source={sponsor}
        onChange={onChange}
        onBlur={onBlur}
      />,
    );
    const dropdown = container.getByTestId('custom-dropdown-test-id')
      .children[0].children[0].children[1].children[0];
    fireEvent.change(dropdown, { target: { value: '' } });
  });
  test('customDropdown render test 4', async () => {
    const formValue = {
      label: '',
    };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const sponsor = [
      {
        sponsor_name: 'NVT AG',
        sponsor_abbreviation: 'NVT',
        id: 2,
        label: 'NVT AG',
      },
      {
        sponsor_name: 'NVT',
        sponsor_abbreviation: 'NVT',
        id: 21,
        label: 'NVT',
      },
    ];
    const container = render(
      <CustomDropdown
        formValue={formValue}
        source={sponsor}
        onChange={onChange}
        onBlur={onBlur}
      />,
    );
    const dropdown = container.getByTestId('custom-dropdown-test-id')
      .children[0].children[0].children[1].children[0];

    fireEvent.change(dropdown, { target: { value: 'a' } });
    // fireEvent.change(dropdown, { target: { value: "N)" } });
  });
  test('customDropdown render test 5', async () => {
    const formValue = {
      label: '',
    };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const sponsor = [
      {
        sponsor_name: 'NVT AG',
        sponsor_abbreviation: 'NVT',
        id: 2,
        label: 'NVT AG',
      },
    ];
    const container = render(
      <CustomDropdown
        formValue={formValue}
        source={sponsor}
        onChange={onChange}
        onBlur={onBlur}
      />,
    );
    const dropdown = container.getByTestId('custom-dropdown-test-id')
      .children[0].children[0].children[1].children[0];

    fireEvent.change(dropdown, { target: { value: 'N)' } });
  });
  test('customDropdown render test 6', async () => {
    const formValue = {
      label: '',
    };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const sponsor = [
      {
        sponsor_name: 'NVT AG',
        sponsor_abbreviation: 'NVT',
        id: 2,
        label: 'NVT AG',
      },
      {
        sponsor_name: 'NVT',
        sponsor_abbreviation: 'NVT',
        id: 21,
        label: 'NVT',
      },
    ];
    const container = render(
      <CustomDropdown
        formValue={formValue}
        source={sponsor}
        onChange={onChange}
        onBlur={onBlur}
      />,
    );
    const dropdown = container.getByTestId('custom-dropdown-test-id')
      .children[0].children[0].children[1].children[0];

    fireEvent.change(dropdown, { target: { value: 'N' } });
    fireEvent.change(dropdown, { target: { value: 'NVT' } });
  });

  test('customDropdown render test 7', async () => {
    const formValue = {
      label: '',
    };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const sponsor = [
      {
        sponsor_name: 'NVT AG',
        sponsor_abbreviation: 'NVT',
        id: 2,
        label: 'NVT AG',
      },
      {
        sponsor_name: 'NVT',
        sponsor_abbreviation: 'NVT',
        id: 21,
        label: 'NVT',
      },
    ];
    const container = render(
      <CustomDropdown
        formValue={formValue}
        source={sponsor}
        onChange={onChange}
        onBlur={onBlur}
      />,
    );
    const dropdown = container.getByTestId('custom-dropdown-test-id')
      .children[0].children[0].children[1].children[0];

    fireEvent.click(dropdown);
  });

  test('customDropdown render test 8', async () => {
    const formValue = {
      label: '',
    };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const sponsor = [
      {
        sponsor_name: 'NVT AG',
        sponsor_abbreviation: 'NVT',
        id: 2,
        label: 'NVT AG',
      },
      {
        sponsor_name: 'NVT',
        sponsor_abbreviation: 'NVT',
        id: 21,
        label: 'NVT',
      },
    ];
    const container = render(
      <CustomDropdown
        formValue={formValue}
        source={sponsor}
        onChange={onChange}
        onBlur={onBlur}
      />,
    );
    const dropdown = container.getByTestId('custom-dropdown-test-id')
      .children[0].children[0].children[1].children[0];
    const listItem = container.getByTestId('custom-dropdown-list-exist-0');
    fireEvent.change(dropdown, { target: { value: 'N' } });
    fireEvent.click(listItem);
  });
});
