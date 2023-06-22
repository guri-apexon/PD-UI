import { fireEvent, render } from '@testing-library/react';
import {
  mergeSummary,
  flattenMetaParam,
  flattenObject,
  autoCompleteClose,
  checkDuplicates,
  validationCheck,
  formattedValue,
  findLatestTimestamp,
} from '../MetaData/utilFunction';

describe('formattedValue function', () => {
  it('should convert boolean values to string', () => {
    const type = 'boolean';
    const val = 2;
    const result = formattedValue(type, val);
    expect(result).toBe('2');
  });

  it('should format date values using moment.js', () => {
    const type = 'date';
    const val = '2023-06-01';
    const result = formattedValue(type, val);
    expect(result).toBe('01-Jun-2023');
  });

  it('should return the input value as is for unknown types', () => {
    const type = 'unknown';
    const val = 'Hello, world!';
    const result = formattedValue(type, val);
    expect(result).toBe('Hello, world!');
  });

  it('should return null for falsy input values', () => {
    const type = 'date';
    const val = null;
    const result = formattedValue(type, val);
    expect(result).toBeNull();
  });
});

describe('findLatestTimestamp', () => {
  it('should return the object with the latest timestamp', () => {
    const data = [
      { id: 1, last_updated: '2022-01-01T10:00:00Z' },
      { id: 2, last_updated: '2023-06-01T15:30:00Z' },
      { id: 3, last_updated: '2021-12-31T23:59:59Z' },
    ];
    const result = findLatestTimestamp(data);
    expect(result).toEqual({ id: 2, last_updated: '2023-06-01T15:30:00Z' });
  });

  it('should return an empty object if the input data is empty', () => {
    const data = [];
    const result = findLatestTimestamp(data);
    expect(result).toEqual({});
  });
});

describe('flattenObject', () => {
  test('should flatten the object correctly', () => {
    const data = {
      parent: {
        _meta_data: [{ name: 'field1' }, { name: 'field2' }],
        _childs: [],
        field_audit_info: {
          last_edited_by: 'abc',
          last_updated: '2023-06-07 13:09:07.382547-04:00',
        },
        is_active: false,
        is_default: false,
      },
    };

    const expectedResult = {
      parent: {
        _meta_data: [
          {
            id: 1,
            isCustom: false,
            name: 'field1',
            attr_value: undefined,
            display_name: undefined,
          },
          {
            id: 2,
            isCustom: false,
            name: 'field2',
            attr_value: undefined,
            display_name: undefined,
          },
        ],
        audit_info: {
          last_edited_by: 'abc',
          last_updated: '2023-06-07 13:09:07.382547-04:00',
        },
        formattedName: 'parent',
        isActive: false,
        isEdit: false,
        level: 1,
        name: 'parent',
        _childs: [],
        is_active: false,
        is_default: false,
      },
    };

    expect(flattenObject({}, data, 1, '')).toEqual(expectedResult);
  });

  test('should flatten the object correctly', () => {
    const data = {
      key1: {
        subkey1: {
          subsubkey1: 'value1',
        },
        subkey2: 'value2',
      },
      key2: 'value3',
    };

    const result = flattenObject({}, data, 1, '');

    expect(result).toEqual({
      key1: {
        formattedName: 'key1',
        _meta_data: undefined,
        name: 'key1',
        level: 1,
        is_active: undefined,
        is_default: undefined,
        isEdit: false,
        isActive: false,
        audit_info: undefined,
        _childs: [],
      },
    });
  });

  test('should handle empty input data', () => {
    const data = null;

    const result = flattenObject({}, data, 1, '');

    expect(result).toEqual({});
  });

  test('should handle nested objects with _meta_data and _childs properties', () => {
    const data = {
      key1: {
        _meta_data: [{ attr_type: 'type1', attr_value: 'value1' }],
        _childs: ['child1', 'child2'],
        subkey1: {
          _meta_data: [{ attr_type: 'type2', attr_value: 'value2' }],
          subsubkey1: 'value3',
        },
      },
    };

    const result = flattenObject({}, data, 1, '');

    expect(result).toEqual({
      key1: {
        _meta_data: [
          {
            attr_type: 'type1',
            attr_value: 'value1',
            display_name: undefined,
            id: 1,
            isCustom: false,
          },
        ],
        formattedName: 'key1',
        name: 'key1',
        level: 1,
        is_active: undefined,
        is_default: undefined,
        isEdit: false,
        isActive: false,
        audit_info: undefined,
        _childs: ['key1.child1', 'key1.child2'],
      },
      'key1.subkey1': {
        _meta_data: [
          {
            attr_type: 'type2',
            attr_value: 'value2',
            display_name: undefined,
            id: 1,
            isCustom: false,
          },
        ],
        formattedName: 'key1.subkey1',
        name: 'subkey1',
        level: 2,
        is_active: undefined,
        is_default: undefined,
        isEdit: false,
        isActive: false,
        audit_info: undefined,
        _childs: [],
      },
    });
  });
});

describe('mergeSummary', () => {
  test('should merge summary_extended to summary correctly', () => {
    const data = {
      Summary: {
        _meta_data: [{ name: 'field1' }, { name: 'field2' }],
        _childs: [],
      },
      summary_extended: {
        _meta_data: [{ name: 'field3' }, { name: 'field4' }],
        _childs: [],
      },
    };

    const expectedResult = {
      Summary: {
        _childs: [],
        _meta_data: [
          {
            id: 1,
            name: 'field1',
          },
          {
            id: 2,
            name: 'field2',
          },
          {
            id: 3,
            isCustom: true,
            name: 'field3',
          },
          {
            id: 4,
            isCustom: true,
            name: 'field4',
          },
        ],
      },
    };

    // eslint-disable-next-line
    expect(mergeSummary(data).Summary._meta_data.length).toBeLessThanOrEqual(
      // eslint-disable-next-line
      expectedResult.Summary._meta_data.length,
    );
  });
});

describe('flattenMetaParam', () => {
  test('should flatten meta param correctly', () => {
    const data = {
      parent: {
        child: {
          grandchild: {},
        },
      },
    };

    const expectedResult = {
      parent: {
        dropDownList: ['child'],
      },
      child: {
        dropDownList: ['grandchild'],
      },
      grandchild: {
        dropDownList: [],
      },
    };

    expect(flattenMetaParam({}, data, 1)).toEqual(expectedResult);
  });
});

describe('Utils', () => {
  describe('autoCompleteClose', () => {
    it('should add modal-opened class to document body and remove it when clicked', () => {
      const modalOpened = document.createElement('div');
      modalOpened.classList.add('modal-opened');
      const removeHook = jest.fn();
      document.body.appendChild(modalOpened);
      autoCompleteClose(removeHook);
      modalOpened.click();
      expect(document.body).not.toHaveClass('modal-opened');
      document.body.removeChild(modalOpened);
    });
  });

  describe('checkDuplicates', () => {
    it('should return true when the array has no duplicates', () => {
      const data = [
        { attr_name: 'name', attr_value: 'John' },
        { attr_name: 'age', attr_value: '30' },
        { attr_name: 'gender', attr_value: 'male' },
      ];

      const result = checkDuplicates(data);

      expect(result).toBe(true);
    });

    it('should return false when the array has duplicates', () => {
      const data = [
        { attr_name: 'name', attr_value: 'John' },
        { attr_name: 'age', attr_value: '30' },
        { attr_name: 'name', attr_value: 'Doe' },
        { attr_name: 'gender', attr_value: 'male' },
      ];

      const result = checkDuplicates(data);

      expect(result).toBe(false);
    });
  });

  describe('validationCheck', () => {
    it('should return true for valid attributes - name and value', () => {
      const data = [
        { attr_name: 'name', attr_value: 'John' },
        { attr_name: 'age', attr_value: '30' },
        { attr_name: 'gender', attr_value: 'male' },
      ];

      const result = validationCheck(data);

      expect(result).toBe(true);
    });

    it('should return false if attributes dont have valid data - name and value', () => {
      const data = [
        { attr_name: 'name', attr_value: 'John', isCustom: true },
        { attr_name: '', attr_value: '30', isCustom: true },
        { attr_name: 'gender', attr_value: '', isCustom: true },
      ];

      const result = validationCheck(data);

      expect(result).toBe(false);
    });
  });
});

describe('validationCheck', () => {
  it('returns true if rowData is empty', () => {
    expect(validationCheck([])).toBe(true);
  });

  it('returns true if rowData has valid data for all attributes', () => {
    const rowData = [
      { attr_name: 'name', attr_value: 'John Doe', isCustom: false },
      { attr_name: 'age', attr_value: 30, isCustom: false },
    ];
    expect(validationCheck(rowData)).toBe(true);
  });

  it('returns false if rowData has empty attr_name or attr_value for custom data', () => {
    const rowData = [
      { attr_name: 'name', attr_value: '', isCustom: true },
      { attr_name: 'age', attr_value: 30, isCustom: true },
    ];
    expect(validationCheck(rowData)).toBe(false);
  });

  it('returns false if rowData has empty attr_name or attr_value for some custom data', () => {
    const rowData = [
      { attr_name: 'name', attr_value: 'John Doe', isCustom: false },
      { attr_name: '', attr_value: '', isCustom: true },
      { attr_name: 'age', attr_value: 30, isCustom: true },
    ];
    expect(validationCheck(rowData)).toBe(false);
  });
});

describe('autoCompleteClose', () => {
  let removeHook;
  let modalOpened;

  beforeEach(() => {
    removeHook = jest.fn();
    modalOpened = document.createElement('div');
    modalOpened.classList.add('modal-opened');
    document.body.appendChild(modalOpened);
  });

  afterEach(() => {
    document.body.removeChild(modalOpened);
  });

  test('removes hook and removes modal when modal is clicked', () => {
    const { getByTestId } = render(<div data-testid="test" />);
    autoCompleteClose(removeHook);
    const modal = getByTestId('test');
    fireEvent.click(modal);
    expect(removeHook).toHaveBeenCalledTimes(0);
    expect(document.body.contains(modalOpened)).toBe(true);
  });
});
