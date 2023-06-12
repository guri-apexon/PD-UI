import userEvent from '@testing-library/user-event';
import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import MetaData from '../MetaData/MetaData';

const docid = '209340d7-8f87-471c-b7d3-680080367a1e';

const metadataApiCallValue = {
  status: true,
  name: '',
  op: 'addAttributes',
};

const initialState = {
  protocol: {
    accordionMetaData: {
      Summary: {
        _meta_data: [
          {
            display_name: 'Protocol Name',
            attr_name: 'fileName',
            attr_type: 'string',
            attr_value: 'NCT02614289.pdf',
            confidence: 'con',
            attr_id:
              '5592686490814cc0a1555e3e7b0306ef373621a44dcd262d69eef8267d3ec0c3',
            note: 'note1',
            audit_info: {
              user_id: 'u1149481',
              last_updated: '2023-04-28 07:15:25.245632',
              num_updates: 1,
            },
            id: 1,
            isCustom: false,
            is_active: true,
            is_default: false,
          },
          {
            display_name: 'ext',
            attr_name: 'ext',
            attr_type: 'string',
            attr_value: 'extext',
            confidence: '',
            attr_id:
              'b4c8230c08a805035f96afffe6bd0be7e511f6ee58e307bb45f2800ab0053e61',
            note: '',
            audit_info: {
              user_id: 'u1138076',
              last_updated: '2023-05-10 08:49:54.031560',
              num_updates: 1,
            },
            id: 36,
            isCustom: false,
            is_active: true,
            is_default: false,
          },
        ],
        formattedName: 'Summary',
        name: 'Summary',
        level: 1,
        isActive: false,
        isEdit: false,
        is_active: true,
        is_default: false,
        audit_info: {
          last_updated: '2023-05-11 10:16:43.722755',
        },
        _childs: [],
      },
      adverseevents: {
        _meta_data: [
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
        ],
        formattedName: 'adverseevents',
        name: 'adverseevents',
        level: 1,
        isActive: false,
        isEdit: false,
        is_active: true,
        is_default: false,
        audit_info: {
          user_id: null,
          last_updated: '2023-04-18 14:49:16.263334',
          num_updates: 1,
        },
        _childs: [],
      },
    },
    accordianMetaParam: {
      pb_variables: {},
      adverseevents: {},
      summary_extended: {},
    },
  },
  user: {
    userDetail: {
      userId: process.env.REACT_APP_USERID,
      username: 'Test User',
      email: 'test@iqvia.com',
      user_type: 'admin',
    },
  },
};
const initialStateNew = {
  protocol: {
    accordionMetaData: {
      Summary: {
        _meta_data: [
          {
            display_name: 'Protocol Name',
            attr_name: 'fileName',
            attr_type: 'string',
            attr_value: 'NCT02614289.pdf',
            confidence: 'con',
            attr_id:
              '5592686490814cc0a1555e3e7b0306ef373621a44dcd262d69eef8267d3ec0c3',
            note: 'note1',
            audit_info: {
              user_id: 'u1149481',
              last_updated: '2023-04-28 07:15:25.245632',
              num_updates: 1,
            },
            id: 1,
            isCustom: false,
            is_active: true,
            is_default: false,
          },
        ],
        formattedName: 'Summary',
        name: 'Summary',
        level: 1,
        isActive: false,
        isEdit: false,
        audit_info: {
          last_updated: '2023-05-11 10:16:43.722755',
        },
        _childs: [],
      },
    },
    accordianMetaParam: {
      pb_variables: {},
      adverseevents: {},
      summary_extended: {},
    },
    metadataApiCallValue,
  },
  user: {
    userDetail: {
      userId: process.env.REACT_APP_USERID,
      username: 'Test User',
      email: 'test@iqvia.com',
      user_type: 'normal',
    },
  },
};

const metadataApiCallValueNew = {
  status: true,
  name: '',
  op: 'addField',
  reqData: {
    level: 1,
    name: 'Test Field',
  },
};

const initialStateNewApi = {
  protocol: {
    accordionMetaData: {
      Summary: {
        _meta_data: [
          {
            display_name: 'Protocol Name',
            attr_name: 'fileName',
            attr_type: 'string',
            attr_value: 'NCT02614289.pdf',
            confidence: 'con',
            attr_id:
              '5592686490814cc0a1555e3e7b0306ef373621a44dcd262d69eef8267d3ec0c3',
            note: 'note1',
            audit_info: {
              user_id: 'u1149481',
              last_updated: '2023-04-28 07:15:25.245632',
              num_updates: 1,
            },
            id: 1,
            isCustom: false,
            is_active: true,
            is_default: false,
          },
        ],
        formattedName: 'Summary',
        name: 'Summary',
        level: 1,
        isActive: false,
        isEdit: false,
        is_active: true,
        is_default: false,
        audit_info: {
          last_updated: '2023-05-11 10:16:43.722755',
        },
        _childs: [],
      },
    },
    accordianMetaParam: {
      pb_variables: {},
      adverseevents: {},
      summary_extended: {},
    },
    metadataApiCallValue: metadataApiCallValueNew,
  },
  user: {
    userDetail: {
      userId: process.env.REACT_APP_USERID,
      username: 'Test User',
      email: 'test@iqvia.com',
      user_type: 'normal',
    },
  },
};
const metadataApiCallValueOP = {
  status: true,
  name: '',
  op: '',
  reqData: {
    level: 1,
    name: 'Test Field',
  },
};
const initialStateNewApiNew = {
  protocol: {
    accordionMetaData: {
      Summary: {
        _meta_data: [
          {
            display_name: 'Protocol Name',
            attr_name: 'fileName',
            attr_type: 'string',
            attr_value: 'NCT02614289.pdf',
            confidence: 'con',
            attr_id:
              '5592686490814cc0a1555e3e7b0306ef373621a44dcd262d69eef8267d3ec0c3',
            note: 'note1',
            audit_info: {
              user_id: 'u1149481',
              last_updated: '2023-04-28 07:15:25.245632',
              num_updates: 1,
            },
            id: 1,
            isCustom: false,
            is_active: true,
            is_default: false,
          },
        ],
        formattedName: 'Summary',
        name: 'Summary',
        level: 1,
        isActive: false,
        isEdit: false,
        is_active: true,
        is_default: false,
        audit_info: {
          last_updated: '2023-05-11 10:16:43.722755',
        },
        _childs: [],
      },
    },
    accordianMetaParam: {
      pb_variables: {},
      adverseevents: {},
      summary_extended: {},
    },
    metadataApiCallValue: metadataApiCallValueOP,
  },
  user: {
    userDetail: {
      userId: process.env.REACT_APP_USERID,
      username: 'Test User',
      email: 'test@iqvia.com',
      user_type: 'normal',
    },
  },
};

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(<MetaData docId={docid} />, {
      initialState: initialStateNew,
    });
    const metadataAccordian = component.getByTestId('metadata-accordian');
    expect(metadataAccordian).toBeInTheDocument();
  });
  test('should render the component new Api response', () => {
    const component = render(<MetaData docId={docid} />, {
      initialState: initialStateNewApi,
    });
    const metadataAccordian = component.getByTestId('metadata-accordian');
    expect(metadataAccordian).toBeInTheDocument();
  });
  test('should render the component new Api response', () => {
    const component = render(<MetaData docId={docid} />, {
      initialState: initialStateNewApiNew,
    });
    const metadataAccordian = component.getByTestId('metadata-accordian');
    expect(metadataAccordian).toBeInTheDocument();
  });
});

describe('MetaData AccordianView', () => {
  test('MetaData edit', () => {
    const screen = render(<MetaData docId={docid} />, { initialState });
    const metadataAccordian = screen.getByTestId('metadata-accordian');
    expect(screen).toBeTruthy();
    expect(metadataAccordian).toBeInTheDocument();

    const metaDataEdit = screen.getAllByTestId('metadataaccordian');
    fireEvent.click(screen.getAllByTestId('handle-edit')[0]);
    expect(metaDataEdit[0]).toBeInTheDocument();
  });

  test('MetaData Another Click', () => {
    const screen = render(<MetaData docId={docid} />, { initialState });
    screen.getAllByTestId('metadataaccordian');
    const threeDotMenu = screen.getByTestId('three-dot-menu');
    fireEvent.click(threeDotMenu);

    fireEvent.click(screen.getByText('Add existing section'));
    const autocomplete = screen.getByTestId('add-exist-section');
    const input = autocomplete.querySelector('input');
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });
    fireEvent.change(input, { target: { value: 'pb_variables' } });
    fireEvent.click(screen.getByText(/pb_variables/i));

    fireEvent.click(threeDotMenu);
    fireEvent.click(screen.getByText('Add new section'));
    const addNewSection = screen.getByTestId('add-new-section');
    fireEvent.focusIn(addNewSection);
    fireEvent.change(addNewSection, {
      target: { value: '' },
    });

    fireEvent.focusOut(addNewSection);
    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.change(addNewSection, {
      target: { value: 'test accordion' },
    });
    fireEvent.click(screen.getAllByRole('button')[1]);
  });

  test('Metadata Edit mode', () => {
    const component = render(<MetaData docId={docid} />, { initialState });

    const metadataAccordian = component.getByTestId('metadata-accordian');
    expect(metadataAccordian).toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId('handle-edit')[0]);
    const eyeIcon = screen.getAllByTestId('eyeIcon')[0];
    fireEvent.click(eyeIcon);
    const txtVal = screen.getAllByTestId('customeform-textField-value')[0];
    fireEvent.focusIn(txtVal);

    userEvent.type(txtVal, 'abc');
    fireEvent.focusOut(txtVal);
    const metadatadiscard = component.getByTestId('metadatadiscard');
    fireEvent.click(metadatadiscard);
    const discardButton = screen.getByRole('button', {
      name: /Discard/i,
    });
    fireEvent.click(discardButton);

    fireEvent.click(screen.getAllByTestId('handle-edit')[0]);
    fireEvent.focusIn(txtVal);
    userEvent.type(txtVal, 'abc');
    fireEvent.focusOut(txtVal);
    const metadatasave = component.getByTestId('metadatasave');
    fireEvent.click(metadatasave);
    const saveButton = screen.getByRole('button', {
      name: /Save/i,
    });
    fireEvent.click(saveButton);
  });
  test('Metadata Edit mode', () => {
    const component = render(<MetaData docId={docid} />, { initialState });

    const metadataAccordian = component.getByTestId('metadata-accordian');
    expect(metadataAccordian).toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId('handle-edit')[0]);
    const eyeIcon = screen.getAllByTestId('eyeIcon')[0];
    fireEvent.click(eyeIcon);
    const txtVal = screen.getAllByTestId('customeform-textField-value')[0];
    fireEvent.focusIn(txtVal);

    userEvent.type(txtVal, 'abc');
    fireEvent.focusOut(txtVal);
    const metadatadiscard = component.getByTestId('metadatadiscard');
    fireEvent.click(metadatadiscard);
    const discardButton = screen.getByRole('button', {
      name: /Discard/i,
    });
    fireEvent.click(discardButton);

    fireEvent.click(screen.getAllByTestId('handle-edit')[0]);
    fireEvent.focusIn(txtVal);
    userEvent.type(txtVal, 'abc');
    fireEvent.focusOut(txtVal);
    const metadatasave = component.getByTestId('metadatasave');
    fireEvent.click(metadatasave);
    const saveButton = screen.getByRole('button', {
      name: /Save/i,
    });
    fireEvent.click(saveButton);

    screen.debug(undefined, Infinity);
    fireEvent.click(screen.getAllByTestId('handle-edit')[0]);
    const metadatadelete = component.getAllByTestId('metadata-hard-trash')[0];
    fireEvent.click(metadatadelete);
    const deleteButton = screen.getByRole('button', {
      name: /Delete/i,
    });
    fireEvent.click(deleteButton);
  });
});
