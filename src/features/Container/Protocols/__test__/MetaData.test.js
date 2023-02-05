import { render, fireEvent } from '../../../../test-utils/test-utils';
import MetaData from '../MetaData/MetaData';

const initialState = {
  protocol: {
    accordianMetaData: {
      summary: {
        _meta_data: [
          {
            attr_name: 'isActive',
            attr_value: true,
            id: 1,
            isCustom: false,
          },
          {
            attr_name: 'id',
            attr_value: '0be44992-9573-4010-962c-de1a1b18b08d',
            id: 2,
            isCustom: false,
          },
          {
            attr_name: 'userId',
            attr_value: 'test2',
            id: 3,
            isCustom: false,
          },
          {
            attr_name: 'fileName',
            attr_value: 'SP-1011-002 Protocol-2017-03-21-VER-Core-000001.pdf',
            id: 4,
            isCustom: false,
          },
          {
            attr_name: 'documentFilePath',
            attr_value: 'false',
            id: 5,
            isCustom: false,
          },
          {
            attr_name: 'protocol',
            attr_value: 'sp.b4b8bd0c-bd6f-4b35-b73b-dff06bfcfcbc',
            id: 6,
            isCustom: false,
          },
          {
            attr_name: 'projectId',
            attr_value: 'pid',
            id: 7,
            isCustom: false,
          },
          {
            attr_name: 'sponsor',
            attr_value: 's1',
            id: 8,
            isCustom: false,
          },
          {
            attr_name: 'indication',
            attr_value: 'ind',
            id: 9,
            isCustom: false,
          },
          {
            attr_name: 'moleculeDevice',
            attr_value: 'mol',
            id: 10,
            isCustom: false,
          },
          {
            attr_name: 'amendment',
            attr_value: 'Y',
            id: 11,
            isCustom: false,
          },
          {
            attr_name: 'versionNumber',
            attr_value: 'v3',
            id: 12,
            isCustom: false,
          },
          {
            attr_name: 'documentStatus',
            attr_value: 'final',
            id: 13,
            isCustom: false,
          },
          {
            attr_name: 'draftVersion',
            attr_value: null,
            id: 14,
            isCustom: false,
          },
          {
            attr_name: 'uploadDate',
            attr_value: '2022-11-20 02:35:12.760000',
            id: 15,
            isCustom: false,
          },
          {
            attr_name: 'isProcessing',
            attr_value: false,
            id: 16,
            isCustom: false,
          },
          {
            attr_name: 'errorCode',
            attr_value: null,
            id: 17,
            isCustom: false,
          },
          {
            attr_name: 'errorReason',
            attr_value: null,
            id: 18,
            isCustom: false,
          },
          {
            attr_name: 'percentComplete',
            attr_value: '100',
            id: 19,
            isCustom: false,
          },
          {
            attr_name: 'status',
            attr_value: 'PROCESS_COMPLETED',
            id: 20,
            isCustom: false,
          },
          {
            attr_name: 'qcStatus',
            attr_value: 'QC_NOT_STARTED',
            id: 21,
            isCustom: false,
          },
          {
            attr_name: 'runId',
            attr_value: 0,
            id: 22,
            isCustom: false,
          },
          {
            attr_name: 'compareStatus',
            attr_value: null,
            id: 23,
            isCustom: false,
          },
          {
            attr_name: 'iqvXmlPathProc',
            attr_value: null,
            id: 24,
            isCustom: false,
          },
          {
            attr_name: 'iqvXmlPathComp',
            attr_value: null,
            id: 25,
            isCustom: false,
          },
          {
            attr_name: 'protocolTitle',
            attr_value:
              'FLUTicasone in Eosinophilic esophagitis (FLUTE):  A Randomized, Double-blind, Placebo-controlled, Dose-ranging, and Maintenance Study of APT-1011 in Subjects with Eosinophilic Esophagitis',
            id: 26,
            isCustom: false,
          },
          {
            attr_name: 'shortTitle',
            attr_value: '',
            id: 27,
            isCustom: false,
          },
          {
            attr_name: 'phase',
            attr_value: 'IIb',
            id: 28,
            isCustom: false,
          },
          {
            attr_name: 'digitizedConfidenceInterval',
            attr_value: null,
            id: 29,
            isCustom: false,
          },
          {
            attr_name: 'completenessOfDigitization',
            attr_value: null,
            id: 30,
            isCustom: false,
          },
          {
            attr_name: 'approvalDate',
            attr_value: null,
            id: 31,
            isCustom: false,
          },
          {
            attr_name: 'studyStatus',
            attr_value: 'stat',
            id: 32,
            isCustom: false,
          },
          {
            attr_name: 'sourceSystem',
            attr_value: 'sys',
            id: 33,
            isCustom: false,
          },
          {
            attr_name: 'environment',
            attr_value: 'env',
            id: 34,
            isCustom: false,
          },
          {
            attr_name: 'nctId',
            attr_value: null,
            id: 35,
            isCustom: false,
          },
          {
            attr_name: 'timeCreated',
            attr_value: '2022-11-20 02:35:12.760000',
            id: 36,
            isCustom: false,
          },
          {
            attr_name: 'lastUpdated',
            attr_value: '2022-11-20 09:07:07.707000',
            id: 37,
            isCustom: false,
          },
          {
            attr_name: 'userCreated',
            attr_value: null,
            id: 38,
            isCustom: false,
          },
          {
            attr_name: 'userUpdated',
            attr_value: '2023-02-03 09:07:07.707000',
            id: 39,
            isCustom: false,
          },
          {
            attr_name: 'new',
            attr_type: 'string',
            attr_value: 'data',
            confidence: null,
            note: null,
            id: 1,
            isCustom: true,
          },
          {
            attr_name: 'boolean_test',
            attr_type: 'boolean',
            attr_value: true,
            confidence: null,
            note: null,
            id: 2,
            isCustom: true,
          },
          {
            attr_name: 'custom_key2',
            attr_type: 'date',
            attr_value: '2023-02-03 00:00:00',
            confidence: null,
            note: null,
            id: 3,
            isCustom: true,
          },
          {
            attr_name: 'custom_key',
            attr_type: 'string',
            attr_value: 'test2',
            confidence: null,
            note: null,
            id: 4,
            isCustom: true,
          },
          {
            attr_name: 'version_date',
            attr_type: 'date',
            attr_value: '2018-12-01 00:00:00',
            confidence: null,
            note: null,
            id: 5,
            isCustom: true,
          },
          {
            attr_name: 'documentStatus',
            attr_type: 'string',
            attr_value: 'Draft',
            confidence: null,
            note: null,
            id: 6,
            isCustom: true,
          },
        ],
        formattedName: 'summary',
        name: 'summary',
        level: 1,
        isActive: false,
        isEdit: false,
        _childs: [],
      },
      level: {
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
        isEdit: false,
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
        isEdit: false,
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
        data: {},
      },
    },
  },
};

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
    expect(metaDataEdit[0]).toBeInTheDocument();
  });
  test('MetaData Click', () => {
    const screen = render(<MetaData />, { initialState });
    const metadataAccordian = screen.getAllByTestId('metadataaccordian');
    expect(metadataAccordian[0]).toBeInTheDocument();
    fireEvent.click(metadataAccordian[0]);
  });
});
