import userEvent from '@testing-library/user-event';
import { cloneDeep } from 'lodash';
import { render, fireEvent } from '../../../../test-utils/test-utils';
import MetaData from '../MetaData/MetaData';
import { metaVariables } from './data';

const summaryExtended = {
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
      isCustom: true,
    },
  ],
  _childs: [],
};
const initialState = {
  protocol: {
    accordionMetaData: {
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
    },
    accordianMetaParam: {
      summary_extended: {},
      summary: {
        'Lab Data': {},
        'Primary Objective/Endpoint': {},
      },
      level: {
        aa: {
          bb: {},
        },
        a: {
          b: {},
        },
      },
      details: {},
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
            summaryExtended,
          },
        },
      },
      op: 'metadata',
    },
  },
};
const anotherState = cloneDeep(initialState);
anotherState.protocol.metaDataVariable.op = 'metaparam';

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
    console.log('intial', initialState);
    const metadataAccordian = screen.getAllByTestId('metadataaccordian');
    screen.debug();
    fireEvent.click(screen.getAllByTestId('meta-item-accordion')[0]);
    fireEvent.click(screen.getAllByTestId('meta-item-accordion')[1]);
    fireEvent.click(screen.getAllByTestId('metadataplus')[0]);
    fireEvent.click(screen.getAllByTestId('metadatasave')[0]);
    fireEvent.click(screen.getAllByTestId('save-term-field')[0]);

    userEvent.type(
      screen.getAllByTestId('suggestion-field')[0].querySelector('input'),
      'new_label',
    );
    expect(metadataAccordian[0]).toBeInTheDocument();
    fireEvent.click(metadataAccordian[0]);
  });
  test('MetaData Another Click', () => {
    const screen = render(<MetaData />, { initialState: anotherState });
    screen.getAllByTestId('metadataaccordian');
  });
});
