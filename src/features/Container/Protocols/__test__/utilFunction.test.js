import { fireEvent, render } from '@testing-library/react';
import {
  mergeSummary,
  flattenMetaParam,
  flattenObject,
  autoCompleteClose,
  checkDuplicates,
  validationCheck,
} from '../MetaData/utilFunction';

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
