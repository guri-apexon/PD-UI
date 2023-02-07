import { flattenObject, mergeSummary } from '../MetaData/utilFunction';

describe('flattenObject', () => {
  it('flattens an object', () => {
    const data = {
      level1: {
        _meta_data: [{ id: 1 }, { id: 2 }],
        _childs: [],
        formattedName: 'level1',
        name: 'level1',
        level: 1,
        isActive: false,
        isEdit: false,
      },
    };
    const expectedResult = {
      level1: {
        _meta_data: [
          { id: 1, isCustom: true },
          { id: 2, isCustom: true },
        ],
        formattedName: 'level1',
        name: 'level1',
        level: 1,
        isActive: false,
        isEdit: false,
        _childs: [],
      },
    };
    expect(flattenObject(data, 1, '')).toEqual(expectedResult);
  });
});

describe('mergeSummary', () => {
  it('merges summary with summary_extended', () => {
    const data = {
      summary: {
        _meta_data: [{ id: 1 }],
      },
      summary_extended: {
        _meta_data: [{ id: 2 }, { id: 3 }],
      },
    };
    const expectedResult = {
      summary: {
        _meta_data: [
          { id: 1 },
          { id: 2, isCustom: true },
          { id: 3, isCustom: true },
        ],
      },
    };
    expect(mergeSummary(data)).toEqual(expectedResult);
  });
});
