import userEvent from '@testing-library/user-event';
import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import MetaDataEditTable from '../MetaData/MetaDataEditTable';

const accData = {
  isActive: true,
  name: 'adverseevents',
  isEdit: true,
  level: 1,
  is_active: true,
  is_default: false,
  formattedName: 'adverseevents',
  audit_info: {
    user_id: null,
    last_updated: '2023-03-29 08:52:41.726047',
    num_updates: 1,
  },
  _childs: [],
  _meta_data: [
    {
      attr_id:
        'fd2b7c5b4dd90b059b479b1efd1f2afd497b62a83ab6950022f05e39af369963',
      attr_name: 'serious_adverse_events',
      display_name: 'Serious Adverse Events',
      attr_type: 'string',
      attr_value: 'Adverse Event YES Disability',
      confidence: '0.75',
      note: null,
      audit_info: {
        user_id: null,
        last_updated: '2023-04-18 14:49:32.495370',
        num_updates: 1,
      },
      id: 1,
      isCustom: false,
      is_active: true,
      is_default: false,
    },
    {
      attr_id:
        'd8ed58bd13469177b00d34aa8f2cae6d195b9c0448fd784fce608d7f3408535a',
      attr_name: 'ddd',
      display_name: 'ddd',
      attr_type: 'string',
      attr_value: 'hhhgg',
      confidence: '',
      note: '',
      audit_info: {
        user_id: 'u1138076',
        last_updated: '2023-05-09 16:35:10.139741',
        num_updates: 2,
      },
      id: 2,
      isCustom: false,
      is_active: true,
      is_default: false,
    },
  ],
};
const rows = {
  adverseevents: [
    {
      attr_id:
        '0d91609674457312825d910c3645bfe41a4be49e968431137e1cca57a295c1a0',
      attr_name: 'cpt_serious_adverse_event',
      display_name: 'cpt_serious_adverse_event',
      attr_type: 'array',
      attr_value: [
        'death,initial or prolonged inpatient hospitalization,persistent or significant disability/incapacity,congenital anomaly/birth defect',
      ],
      confidence: null,
      note: null,
      audit_info: {
        user_id: null,
        last_updated: '2023-04-18 14:49:16.263334',
        num_updates: 1,
      },
      id: 1,
      isCustom: false,
      is_active: true,
      is_default: false,
    },
    {
      attr_id:
        '0d91609674457312825d910c3645bfe41a4be49e968431137e1cca57a295c1a0',
      attr_name: 'test',
      display_name: 'test',
      attr_type: 'string',
      attr_value: '',
      confidence: null,
      note: null,
      audit_info: {
        user_id: null,
        last_updated: '2023-04-18 14:49:16.263334',
        num_updates: 1,
      },
      id: 2,
      isCustom: false,
      is_active: true,
      is_default: false,
    },
  ],
};
const initialState = {
  user: {
    userDetail: {
      userId: process.env.REACT_APP_USERID,
      username: 'Test User',
      email: 'test@iqvia.com',
      user_type: 'admin',
    },
  },
};

describe('Metadata Accordian Checkbox confidence', () => {
  test('should render the component', () => {
    const component = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={rows}
        setDeletedAttributes={jest.fn()}
        data={accData}
        deletedAttributes={accData}
      />,
    );
    const metadataNote = component.getByTestId('metadata-notes');
    expect(component).toBeTruthy();
    expect(metadataNote).toBeInTheDocument();
    fireEvent.click(metadataNote);
  });
});

describe('Metadata Accordian Checkbox note', () => {
  test('should render the component', () => {
    const component = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={rows}
        setDeletedAttributes={jest.fn()}
        data={accData}
        deletedAttributes={accData}
      />,
    );
    const metadataNote = component.getByTestId('metadata-confidence');
    expect(component).toBeTruthy();
    expect(metadataNote).toBeInTheDocument();
    expect(metadataNote).toBeInTheDocument();
    fireEvent.click(metadataNote);
  });
});

describe('MetaData CheckBox', () => {
  test('MetaData note', () => {
    const screen = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={rows}
        setDeletedAttributes={jest.fn()}
        data={accData}
        deletedAttributes={accData}
      />,
    );
    const metaDataNotes = screen.getByTestId('metadata-notes');
    expect(metaDataNotes).toBeInTheDocument();
    fireEvent.click(metaDataNotes);
    fireEvent.click(metaDataNotes);
    expect(metaDataNotes).toBeInTheDocument();
  });
  test('MetaData note remove', () => {
    const screen = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={rows}
        setDeletedAttributes={jest.fn()}
        data={accData}
        deletedAttributes={accData}
      />,
    );
    const metaDataNotes = screen.getByTestId('metadata-notes');
    expect(metaDataNotes).toBeInTheDocument();
    fireEvent.click(metaDataNotes);
  });
  test('MetaData confidence', () => {
    const screen = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={rows}
        setDeletedAttributes={jest.fn()}
        data={accData}
        deletedAttributes={accData}
      />,
    );
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
  });
  test('MetaData confidence remove', () => {
    const screen = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={rows}
        setDeletedAttributes={jest.fn()}
        data={accData}
        deletedAttributes={accData}
      />,
    );
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
    fireEvent.click(metaDataConfidence);
    expect(metaDataConfidence).toBeInTheDocument();
  });

  test('MetaData confidence remove', () => {
    const screen = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={rows}
        setDeletedAttributes={jest.fn()}
        data={accData}
        deletedAttributes={accData}
      />,
      { initialState },
    );
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
    fireEvent.click(metaDataConfidence);
    expect(metaDataConfidence).toBeInTheDocument();
  });
});

describe('MetaDataEditTable', () => {
  it('renders table with given rows', () => {
    const accData = {
      isActive: true,
      name: 'adverseevents',
      isEdit: true,
      is_active: true,
      is_default: false,
      level: 1,
      formattedName: 'adverseevents',
      audit_info: {
        user_id: null,
        last_updated: '2023-03-29 08:52:41.726047',
        num_updates: 1,
      },
      _childs: [],
      _meta_data: [
        {
          attr_id:
            'fd2b7c5b4dd90b059b479b1efd1f2afd497b62a83ab6950022f05e39af369963',
          attr_name: 'serious_adverse_events',
          display_name: 'Serious Adverse Events',
          attr_type: 'string',
          attr_value: 'Adverse Event YES Disability',
          confidence: '0.75',
          note: null,
          audit_info: {
            user_id: null,
            last_updated: '2023-04-18 14:49:32.495370',
            num_updates: 1,
          },
          id: 1,
          isCustom: false,
          is_active: true,
          is_default: false,
        },
        {
          attr_id:
            'd8ed58bd13469177b00d34aa8f2cae6d195b9c0448fd784fce608d7f3408535a',
          attr_name: 'ddd',
          display_name: 'ddd',
          attr_type: 'string',
          attr_value: 'hhhgg',
          confidence: '',
          note: '',
          audit_info: {
            user_id: 'u1138076',
            last_updated: '2023-05-09 16:35:10.139741',
            num_updates: 2,
          },
          id: 2,
          isCustom: false,
          is_active: true,
          is_default: false,
        },
      ],
    };

    const rows = {
      adverseevents: [
        {
          attr_id:
            '0d91609674457312825d910c3645bfe41a4be49e968431137e1cca57a295c1a0',
          attr_name: 'cpt_serious_adverse_event',
          display_name: 'cpt_serious_adverse_event',
          attr_type: 'array',
          attr_value: [
            'death,initial or prolonged inpatient hospitalization,persistent or significant disability/incapacity,congenital anomaly/birth defect',
          ],
          confidence: null,
          note: null,
          audit_info: {
            user_id: null,
            last_updated: '2023-04-18 14:49:16.263334',
            num_updates: 1,
          },
          id: 1,
          isCustom: true,
          is_active: true,
          is_default: false,
        },
      ],
    };
    const setRows = jest.fn();
    const deletedAttributes = [];
    const setDeletedAttributes = jest.fn();

    const { getByTestId } = render(
      <MetaDataEditTable
        data={accData}
        rows={rows}
        setRows={setRows}
        deletedAttributes={deletedAttributes}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );

    expect(getByTestId('metadata-table')).toBeInTheDocument();
  });
});

describe('MetaDataEditTable handleChange and handleDelete function', () => {
  const rows = {
    adverseevents: [
      {
        attr_id:
          '0d91609674457312825d910c3645bfe41a4be49e968431137e1cca57a295c1a0',
        attr_name: 'cpt_serious_adverse_event',
        display_name: 'cpt_serious_adverse_event',
        attr_type: 'array',
        attr_value: [
          'death,initial or prolonged inpatient hospitalization,persistent or significant disability/incapacity,congenital anomaly/birth defect',
        ],
        confidence: null,
        note: null,
        audit_info: {
          user_id: null,
          last_updated: '2023-04-18 14:49:16.263334',
          num_updates: 1,
        },
        id: 1,
        isCustom: false,
        is_active: true,
        is_default: false,
      },
      {
        attr_id:
          '0d91609674457312825d910c3645bfe41a4be49e968431137e1cca57a295c1a0',
        attr_name: 'test',
        display_name: 'test',
        attr_type: 'string',
        attr_value: '',
        confidence: null,
        note: null,
        audit_info: {
          user_id: null,
          last_updated: '2023-04-18 14:49:16.263334',
          num_updates: 1,
        },
        id: 2,
        isCustom: false,
        is_active: true,
        is_default: false,
      },
    ],
  };
  const setRows = jest.fn();
  const deletedAttributes = [];
  const setDeletedAttributes = jest.fn();

  it('should call handlechange function when a cell value is changed', () => {
    const { getByTestId } = render(
      <MetaDataEditTable
        data={accData}
        rows={rows}
        setRows={setRows}
        deletedAttributes={deletedAttributes}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );

    const input = getByTestId('metadata-table');
    fireEvent.change(input, { target: { innerHTML: 'NEW Value' } });
    expect(getByTestId('metadata-table')).toBeInTheDocument();
  });

  it('should handle add + button in edit mode for admin/normal', () => {
    render(
      <MetaDataEditTable
        data={accData}
        rows={rows}
        setRows={setRows}
        deletedAttributes={deletedAttributes}
        setDeletedAttributes={setDeletedAttributes}
      />,
      { initialState },
    );
    screen.debug(undefined, Infinity);
    fireEvent.click(screen.getByTestId('metadata-row-delete-admin'));
    const cancelButton = screen.getByRole('button', {
      name: /Cancel/i,
    });
    fireEvent.click(cancelButton);
    const deleteButton = screen.getByRole('button', {
      name: /Delete/i,
    });
    fireEvent.click(deleteButton);

    const edit = screen.getByTestId('metadata-select-add').children[1]
      .children[1];
    fireEvent.change(edit, { target: { value: 'test' } });

    const add = screen.getByTestId('metadata-add');
    fireEvent.click(add);
    const txtVal = screen.getByTestId('customeform-textField-value');
    fireEvent.focusIn(txtVal);

    userEvent.type(txtVal, 'abc');
    fireEvent.focusOut(txtVal);
  });
});
