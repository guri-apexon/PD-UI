import userEvent from '@testing-library/user-event';
import { cloneDeep } from 'lodash';
import * as redux from 'react-redux';
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
        audit_info: {
          user_id: null,
          last_updated: '2023-03-29 08:52:41.726047',
          num_updates: 1,
        },
      },
      level: {
        _meta_data: metaVariables,
        formattedName: 'level',
        name: 'level',
        level: 1,
        isActive: false,
        isEdit: false,
        _childs: ['aa', 'a'],
        audit_info: {
          user_id: null,
          last_updated: '2023-03-29 08:52:41.726047',
          num_updates: 1,
        },
      },
      aa: {
        formattedName: 'level.aa',
        name: 'aa',
        level: 2,
        isActive: false,
        isEdit: true,
        _childs: ['bb'],
        audit_info: {
          user_id: null,
          last_updated: '2023-03-29 08:52:41.726047',
          num_updates: 1,
        },
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

  test('handles add button click', () => {
    const screen = render(<MetaData />, { initialState: anotherState });
    const addButton = screen.getByTestId('metadata-accordian-plus');
    fireEvent.click(addButton);
    expect(
      screen.getByPlaceholderText('Select or type section name'),
    ).toBeInTheDocument();
  });

  test('fetchMetaData', () => {
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);

    const { getByPlaceholderText, getByTestId } = render(
      <MetaData docId="123" />,
      { initialState: anotherState },
    );

    const plusIcon = getByTestId('metadata-accordian-plus');

    fireEvent.click(plusIcon);
    const sectionNameInput = getByPlaceholderText(
      'Select or type section name',
    );
    fireEvent.change(sectionNameInput, { target: { value: 'summary' } });

    expect(sectionNameInput.value).toBe('summary');
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'GET_METADATA_VARIABLE',
      payload: {
        docId: '123',
        fieldName: '',
        op: 'metadata',
      },
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'GET_METADATA_VARIABLE',
      payload: {
        docId: '123',
        fieldName: '',
        op: 'metaparam',
      },
    });
    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });
});
