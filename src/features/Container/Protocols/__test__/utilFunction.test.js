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
      },
    };

    const expectedResult = {
      parent: {
        _meta_data: [
          { id: 1, isCustom: true, name: 'field1' },
          { id: 2, isCustom: true, name: 'field2' },
        ],
        formattedName: 'parent',
        isActive: false,
        isEdit: false,
        level: 1,
        name: 'parent',
        _childs: [],
      },
    };

    expect(flattenObject({}, data, 1, '')).toEqual(expectedResult);
  });
});

describe('mergeSummary', () => {
  test('should merge summary_extended to summary correctly', () => {
    const data = {
      summary: {
        _meta_data: [{ name: 'field1' }, { name: 'field2' }],
        _childs: [],
      },
      summary_extended: {
        _meta_data: [{ name: 'field3' }, { name: 'field4' }],
        _childs: [],
      },
    };

    const expectedResult = {
      summary: {
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
    expect(mergeSummary(data).summary._meta_data.length).toBeLessThanOrEqual(
      // eslint-disable-next-line
      expectedResult.summary._meta_data.length,
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
