import userEvent from '@testing-library/user-event';
import { cloneDeep } from 'lodash';
import { render, fireEvent } from '../../../../test-utils/test-utils';
import MetaData from '../MetaData/MetaData';
import { metaVariables } from './data';

const summary_extended = {
  _meta_data: [
    {
      attr_name: 'new',
      attr_type: 'string',
      attr_value: 'data',
      confidence: null,
      note: null,
    },
    {
      attr_name: 'boolean_test',
      attr_type: 'boolean',
      attr_value: true,
      confidence: null,
      note: null,
    },
  ],
  _childs: [],
};
const initialState = {
  protocol: {
    accordianMetaData: {
      summary: {
        _meta_data: metaVariables,
        formattedName: 'summary',
        name: 'summary',
        level: 1,
        isActive: false,
        isEdit: true,
        _childs: [],
      },
      level: {
        _meta_data: metaVariables,
        formattedName: 'level',
        name: 'level',
        level: 1,
        isActive: false,
        isEdit: false,
        _childs: ['aa', 'a'],
      },
      aa: {
        formattedName: 'level.aa',
        name: 'aa',
        level: 2,
        isActive: false,
        isEdit: true,
        _childs: ['bb'],
      },
      bb: {
        _meta_data: [
          {
            attr_name: 'testFor',
            attr_type: 'string',
            attr_value: 'sugar',
            confidence: null,
            note: null,
            id: 1,
            isCustom: true,
          },
          {
            attr_name: 'treatment_week_timeperiod',
            attr_type: 'array',
            attr_value: ['mon', 'thu'],
            confidence: null,
            note: null,
            id: 2,
            isCustom: true,
          },
        ],
        formattedName: 'level.aa.bb',
        name: 'bb',
        level: 3,
        isActive: false,
        isEdit: true,
        _childs: [],
      },
      a: {
        formattedName: 'level.a',
        name: 'a',
        level: 2,
        isActive: false,
        isEdit: false,
        _childs: ['b'],
      },
      b: {
        _meta_data: [
          {
            attr_name: 'testFor',
            attr_type: 'string',
            attr_value: 'sugar',
            confidence: null,
            note: null,
            id: 1,
            isCustom: true,
          },
          {
            attr_name: 'treatment_week_timeperiod',
            attr_type: 'array',
            attr_value: ['mon', 'thu'],
            confidence: null,
            note: null,
            id: 2,
            isCustom: true,
          },
        ],
        formattedName: 'level.a.b',
        name: 'b',
        level: 3,
        isActive: false,
        isEdit: false,
        _childs: [],
      },
      'Objective and Endpoints': {
        _meta_data: [],
        formattedName: 'Objective and Endpoints',
        name: 'Objective and Endpoints',
        level: 1,
        isActive: false,
        isEdit: false,
        _childs: [],
      },
      details: {
        _meta_data: [
          {
            attr_name: 'testFor',
            attr_type: 'string',
            attr_value: 'sugar',
            confidence: null,
            note: null,
            id: 1,
            isCustom: true,
          },
          {
            attr_name: 'isHealthy',
            attr_type: 'boolean',
            attr_value: true,
            confidence: null,
            note: null,
            id: 2,
            isCustom: true,
          },
          {
            attr_name: 'no_of_years',
            attr_type: 'integer',
            attr_value: 29,
            confidence: null,
            note: null,
            id: 3,
            isCustom: true,
          },
          {
            attr_name: 'treatment_timeperiod',
            attr_type: 'date',
            attr_value: '1999-03-20 00:00:00',
            confidence: null,
            note: null,
            id: 4,
            isCustom: true,
          },
          {
            attr_name: 'treatment_week_timeperiod',
            attr_type: 'array',
            attr_value: ['mon', 'thu'],
            confidence: null,
            note: null,
            id: 5,
            isCustom: true,
          },
        ],
        formattedName: 'details',
        name: 'details',
        level: 1,
        isActive: false,
        isEdit: false,
        _childs: [],
      },
    },
    metaDataVariable: {
      data: {
        data: {
          data: {
            summary: {
              _meta_data: [
                {
                  attr_name: 'new',
                  attr_type: 'string',
                  attr_value: 'data',
                  confidence: null,
                  note: null,
                },
                {
                  attr_name: 'boolean_test',
                  attr_type: 'boolean',
                  attr_value: true,
                  confidence: null,
                  note: null,
                },
              ],
              _childs: [],
            },
            summary_extended,
          },
        },
      },
      op: 'metadata',
    },
    metadataApiCallValue: {
      status: true,
      op: 'addField',
      reqData: {
        name: 'summary',
        accData: {
          formattedName: 'summary',
        },
      },
    },
  },
};
const anotherState = cloneDeep(initialState);
anotherState.protocol.metaDataVariable.op = 'metaparam';
// anotherState.protocol.metadataApiCallValue.op = 'addAttributes';

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(<MetaData />, { initialState });

    const metadataAccordian = component.getByTestId('metadata-accordian');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
  });
});

describe('MetaData AccordianView', () => {
  test('MetaData edit', () => {
    const screen = render(<MetaData />, { initialState });
    const metadataAccordian = screen.getByTestId('metadata-accordian');
    screen.debug();
    expect(screen).toBeTruthy();
    expect(metadataAccordian).toBeInTheDocument();

    const metaDataEdit = screen.getAllByTestId('metadataaccordian');
    fireEvent.click(screen.getAllByTestId('handle-edit')[0]);
    expect(metaDataEdit[0]).toBeInTheDocument();
  });
  test('MetaData Click', () => {
    const screen = render(<MetaData />, { initialState });
    const metadataAccordian = screen.getAllByTestId('metadataaccordian');
    fireEvent.click(screen.getAllByTestId('meta-item-accordion')[0]);
    fireEvent.click(screen.getAllByTestId('meta-item-accordion')[1]);
    fireEvent.click(screen.getAllByTestId('metadataplus')[0]);
    fireEvent.click(screen.getAllByTestId('metadatasave')[0]);
    fireEvent.click(screen.getAllByTestId('save-term-field')[0]);
    const trash = screen.getAllByTestId('metadata-trash')[3];
    screen.debug();
    fireEvent.click(trash);

    userEvent.type(
      screen.getAllByTestId('suggestion-field')[0].querySelector('input'),
      'new_label',
    );
    expect(metadataAccordian[0]).toBeInTheDocument();
    fireEvent.click(metadataAccordian[0]);
  });
  test('MetaData Another Click', () => {
    const screen = render(<MetaData />, { initialState: anotherState });
    const metadataAccordian = screen.getAllByTestId('metadataaccordian');
  });
});
